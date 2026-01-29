# Notification Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    NOTIFICATION WORKFLOW - SIMPLE VIEW                   │
└─────────────────────────────────────────────────────────────────────────┘


USER ACTION                    BACKEND                           DELIVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   FLUTTER    │         │     GO       │         │   FIREBASE   │
│     APP      │────────▶│   SERVICE    │────────▶│     FCM      │
│              │         │              │         │              │
│  User opens  │         │  Trigger     │         │  Push to     │
│  app / order │         │  detected    │         │  device      │
└──────────────┘         └──────┬───────┘         └──────────────┘
                                │
                                ▼
                         ┌──────────────┐
                         │    PYTHON    │
                         │  LLM SERVICE │
                         │              │
                         │  Personalize │
                         │  message     │
                         └──────────────┘



━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         DETAILED FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


STEP 1: TRIGGER
═══════════════

    ┌─────────────────────────────────────────────────────────┐
    │                    TRIGGERS                              │
    │                                                          │
    │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
    │  │ User Event  │  │  Scheduled  │  │   Order     │      │
    │  │             │  │    Job      │  │   Status    │      │
    │  │ • App open  │  │             │  │             │      │
    │  │ • Idle 7day │  │ • Lunch 12pm│  │ • Confirmed │      │
    │  │ • Cart drop │  │ • Weekly    │  │ • Preparing │      │
    │  │ • Location  │  │ • Promo end │  │ • Delivered │      │
    │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │
    │         │                │                │              │
    │         └────────────────┼────────────────┘              │
    │                          ▼                               │
    │                   ┌─────────────┐                        │
    │                   │   GO API    │                        │
    │                   │  /trigger   │                        │
    │                   └─────────────┘                        │
    │                                                          │
    └─────────────────────────────────────────────────────────┘



STEP 2: GATHER USER CONTEXT
═══════════════════════════

    ┌─────────────────────────────────────────────────────────┐
    │                 GO SERVICE (Fiber)                       │
    │                                                          │
    │   func GetUserContext(userID string) Context {           │
    │                                                          │
    │       ┌─────────────┐                                    │
    │       │  goroutine  │──▶ SUPABASE (PostgreSQL)           │
    │       │      1      │    • user profile                  │
    │       └─────────────┘    • preferences                   │
    │                          • loyalty tier                  │
    │       ┌─────────────┐                                    │
    │       │  goroutine  │──▶ MONGODB                         │
    │       │      2      │    • order history                 │
    │       └─────────────┘    • last 10 orders                │
    │                          • favorite items                │
    │       ┌─────────────┐                                    │
    │       │  goroutine  │──▶ REDIS (GCP Memorystore)         │
    │       │      3      │    • current cart                  │
    │       └─────────────┘    • session data                  │
    │                          • last seen                     │
    │                                                          │
    │       return Context{                                    │
    │           Name: "Arif",                                  │
    │           LastOrder: 7 days ago,                         │
    │           Favorite: "Lamb Donner",                       │
    │           LoyaltyPoints: 150,                            │
    │           AvgSpend: £18.50,                              │
    │       }                                                  │
    │   }                                                      │
    │                                                          │
    └─────────────────────────────────────────────────────────┘



STEP 3: DECIDE WHAT TO SEND
═══════════════════════════

    ┌─────────────────────────────────────────────────────────┐
    │                 GO SERVICE - RULE ENGINE                 │
    │                                                          │
    │   Rules (priority order):                                │
    │                                                          │
    │   ┌─────────────────────────────────────────────────┐   │
    │   │ IF last_order > 7 days                          │   │
    │   │ THEN offer = "comeback_discount"                │   │
    │   │      discount = 20%                             │   │
    │   │      priority = HIGH                            │   │
    │   └─────────────────────────────────────────────────┘   │
    │                                                          │
    │   ┌─────────────────────────────────────────────────┐   │
    │   │ IF time = 12:00-14:00 AND is_weekday            │   │
    │   │ THEN offer = "lunch_special"                    │   │
    │   │      item = user.favorite_category              │   │
    │   └─────────────────────────────────────────────────┘   │
    │                                                          │
    │   ┌─────────────────────────────────────────────────┐   │
    │   │ IF loyalty_points >= 150                        │   │
    │   │ THEN offer = "loyalty_reward"                   │   │
    │   │      reward = "free_drink"                      │   │
    │   └─────────────────────────────────────────────────┘   │
    │                                                          │
    │   Selected: "comeback_discount" (highest priority)       │
    │                                                          │
    └─────────────────────────────────────────────────────────┘



STEP 4: PERSONALIZE WITH LLM
════════════════════════════

    ┌─────────────────────────────────────────────────────────┐
    │           GO calls PYTHON LLM SERVICE (gRPC)             │
    │                                                          │
    │   ┌─────────────┐         ┌─────────────────────────┐   │
    │   │     GO      │  gRPC   │     PYTHON (FastAPI)    │   │
    │   │   Service   │────────▶│      LLM Service        │   │
    │   └─────────────┘         └───────────┬─────────────┘   │
    │                                       │                  │
    │                                       ▼                  │
    │   Request:                  ┌─────────────────────┐      │
    │   {                         │   OpenAI / Claude   │      │
    │     user_name: "Arif",      │        API          │      │
    │     favorite: "Lamb Donner",└─────────────────────┘      │
    │     offer: "20% off",                │                   │
    │     tone: "friendly"                 │                   │
    │   }                                  ▼                   │
    │                                                          │
    │   Python Code:                                           │
    │   ┌─────────────────────────────────────────────────┐   │
    │   │ prompt = f"""                                   │   │
    │   │ Generate a push notification:                   │   │
    │   │ - User: {user_name}                             │   │
    │   │ - Their favorite: {favorite}                    │   │
    │   │ - Offer: {offer}                                │   │
    │   │ - Tone: friendly, casual, create urgency        │   │
    │   │ - Max: 50 char title, 100 char body             │   │
    │   │ """                                             │   │
    │   │                                                 │   │
    │   │ response = openai.chat.completions.create(      │   │
    │   │     model="gpt-4o-mini",                        │   │
    │   │     messages=[{"role": "user", "content": prompt}]│  │
    │   │ )                                               │   │
    │   └─────────────────────────────────────────────────┘   │
    │                                                          │
    │   Response:                                              │
    │   {                                                      │
    │     "title": "Arif, we miss you! 🥙",                   │
    │     "body": "Your Lamb Donner is waiting. 20% off today!"│
    │   }                                                      │
    │                                                          │
    └─────────────────────────────────────────────────────────┘



STEP 5: SAVE & SEND
═══════════════════

    ┌─────────────────────────────────────────────────────────┐
    │                    GO SERVICE                            │
    │                                                          │
    │   // Save to MongoDB                                     │
    │   notification := Notification{                          │
    │       UserID:  "user_123",                               │
    │       Type:    "personal_deal",                          │
    │       Title:   "Arif, we miss you! 🥙",                  │
    │       Body:    "Your Lamb Donner is waiting...",         │
    │       Data:    {"promo": "ARIF20", "discount": 20},      │
    │       Status:  "pending",                                │
    │   }                                                      │
    │   mongo.Insert(notification)                             │
    │                                                          │
    │   // Send via Firebase                                   │
    │   ┌─────────────────────────────────────────────────┐   │
    │   │                                                 │   │
    │   │   firebase.Send(FCMMessage{                     │   │
    │   │       Token: user.FCMToken,                     │   │
    │   │       Notification: {                           │   │
    │   │           Title: "Arif, we miss you! 🥙",       │   │
    │   │           Body:  "Your Lamb Donner...",         │   │
    │   │       },                                        │   │
    │   │       Data: {                                   │   │
    │   │           "type": "personal_deal",              │   │
    │   │           "promo": "ARIF20",                    │   │
    │   │           "screen": "/menu",                    │   │
    │   │       },                                        │   │
    │   │   })                                            │   │
    │   │                                                 │   │
    │   └─────────────────────────────────────────────────┘   │
    │                                                          │
    └─────────────────────────────────────────────────────────┘



STEP 6: RECEIVE ON DEVICE
═════════════════════════

    ┌─────────────────────────────────────────────────────────┐
    │                  FLUTTER APP                             │
    │                                                          │
    │   ┌─────────────────────────────────────────────────┐   │
    │   │              PUSH NOTIFICATION                   │   │
    │   │  ┌─────────────────────────────────────────┐    │   │
    │   │  │ 🔔 Spice Hut                            │    │   │
    │   │  │                                         │    │   │
    │   │  │ Arif, we miss you! 🥙                   │    │   │
    │   │  │ Your Lamb Donner is waiting. 20% off!  │    │   │
    │   │  └─────────────────────────────────────────┘    │   │
    │   └─────────────────────────────────────────────────┘   │
    │                                                          │
    │   User taps notification:                                │
    │                                                          │
    │   FirebaseMessaging.onMessageOpenedApp.listen((msg) {   │
    │       final type = msg.data['type'];                    │
    │       final screen = msg.data['screen'];                │
    │       final promo = msg.data['promo'];                  │
    │                                                          │
    │       // Navigate to menu with promo applied            │
    │       context.push('/menu?promo=$promo');               │
    │                                                          │
    │       // Track analytics                                 │
    │       analytics.log('notification_clicked', {           │
    │           'type': type,                                  │
    │           'promo': promo,                                │
    │       });                                                │
    │   });                                                    │
    │                                                          │
    └─────────────────────────────────────────────────────────┘
```

---

## Architecture Overview

```
                         ┌─────────────────┐
                         │  FLUTTER APP    │
                         │  (iOS/Android)  │
                         └────────┬────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
            ┌──────────────┐           ┌──────────────┐
            │   FIREBASE   │           │   GCP LOAD   │
            │   • Auth     │           │   BALANCER   │
            │   • FCM      │           │              │
            │   • Analytics│           └──────┬───────┘
            └──────────────┘                  │
                    ▲                         ▼
                    │              ┌─────────────────────┐
                    │              │   GCP CLOUD RUN     │
                    │              │                     │
                    │   ┌─────────────────────────────┐ │
                    │   │         GO SERVICES         │ │
                    │   │  ┌───────┐ ┌───────┐       │ │
                    │   │  │ user  │ │ order │       │ │
                    │   │  └───────┘ └───────┘       │ │
                    │   │  ┌───────┐ ┌───────┐       │ │
                    │   │  │ promo │ │notif  │───────┼─┘
                    │   │  └───┬───┘ └───────┘       │
                    │   └──────┼────────────────────-┘
                    │          │ gRPC
                    │          ▼
                    │   ┌─────────────────────────────┐
                    │   │      PYTHON SERVICE         │
                    │   │  ┌───────────────────────┐ │
                    │   │  │   LLM (FastAPI)       │ │
                    │   │  │   • OpenAI API        │ │
                    │   │  │   • Claude API        │ │
                    │   │  │   • Prompt templates  │ │
                    │   │  └───────────────────────┘ │
                    │   └─────────────────────────────┘
                    │              │
                    │              │
        ┌───────────┴──────────────┼─────────────────────┐
        │                          │                     │
        ▼                          ▼                     ▼
┌──────────────┐          ┌──────────────┐      ┌──────────────┐
│   SUPABASE   │          │   MONGODB    │      │    REDIS     │
│  (PostgreSQL)│          │   ATLAS      │      │  (Memorystore)│
│              │          │              │      │              │
│ • Users      │          │ • Orders     │      │ • Sessions   │
│ • Menu       │          │ • Events     │      │ • Cart       │
│ • Promo rules│          │ • Notifs log │      │ • Cache      │
└──────────────┘          └──────────────┘      └──────────────┘
```

---

## Tech Stack Functions

| TECH | FUNCTION |
|------|----------|
| **FLUTTER** | Single codebase for iOS, Android, Web |
| | UI/UX for all screens |
| | Local notifications display |
| | Firebase SDK integration |
| | State management (Riverpod) |
| **GO (Fiber)** | Main API services (fast, concurrent) |
| | Rule engine for promo logic |
| | Database connections (Mongo, PSQL, Redis) |
| | Firebase Admin SDK (send push) |
| | gRPC client to call Python LLM |
| | Scheduled jobs (cron triggers) |
| **PYTHON (FastAPI)** | LLM integration (OpenAI, Claude) |
| | Prompt engineering & templates |
| | ML models (future: recommendation) |
| | Text personalization |
| | A/B test variant generation |
| **SUPABASE (PostgreSQL)** | User accounts & profiles |
| | Menu items & categories |
| | Promo rules (static config) |
| | Loyalty points & tiers |
| | Auth (can use Supabase Auth or Firebase) |
| **MONGODB (Atlas)** | Orders (complex nested documents) |
| | User events & analytics |
| | Notification history log |
| | Flexible schema for promos |
| **REDIS (GCP)** | User sessions |
| | Shopping cart (temp data) |
| | Rate limiting (max 3 notifs/day) |
| | Feature flags cache |
| | LLM response cache (save API costs) |
| **FIREBASE** | Authentication (social, phone) |
| | Cloud Messaging (FCM) - push delivery |
| | Analytics - track events |
| | Crashlytics - error monitoring |
| **GCP** | Cloud Run (host Go & Python services) |
| | Load Balancer |
| | Cloud Scheduler (cron jobs) |
| | Memorystore (managed Redis) |
| | Secret Manager (API keys) |
| **LLM (OpenAI/Claude)** | Generate personalized notification text |
| | Dynamic offer descriptions |
| | Tone adjustment (casual, urgent, friendly) |
| | Multi-language support |

---

## Sequence Diagram

```
  Flutter        Go Service       Python LLM       Databases        Firebase
     │               │                │                │                │
     │   app_open    │                │                │                │
     │──────────────▶│                │                │                │
     │               │                │                │                │
     │               │  get user data │                │                │
     │               │───────────────────────────────▶│                │
     │               │                │                │                │
     │               │◀───────────────────────────────│                │
     │               │  user context                  │                │
     │               │                │                │                │
     │               │  check rules   │                │                │
     │               │  (internal)    │                │                │
     │               │                │                │                │
     │               │  personalize   │                │                │
     │               │───────────────▶│                │                │
     │               │                │   call LLM    │                │
     │               │                │──────────────▶│                │
     │               │                │◀──────────────│                │
     │               │◀───────────────│                │                │
     │               │  title + body  │                │                │
     │               │                │                │                │
     │               │  save notif    │                │                │
     │               │───────────────────────────────▶│                │
     │               │                │                │                │
     │               │  send push     │                │                │
     │               │────────────────────────────────────────────────▶│
     │               │                │                │                │
     │◀────────────────────────────────────────────────────────────────│
     │   push notification                                             │
     │                                                                 │
     │   user taps                                                     │
     │──────────────▶│                │                │                │
     │   open menu   │                │                │                │
     │   with promo  │                │                │                │
     │               │                │                │                │
```

---

## One-Page Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   TRIGGER ──▶ GO (rules) ──▶ PYTHON (LLM) ──▶ FIREBASE ──▶ FLUTTER     │
│                                                                         │
│   "User inactive     "Send 20%        "Arif, we         Push to        │
│    7 days"           comeback"         miss you!"        phone          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```
