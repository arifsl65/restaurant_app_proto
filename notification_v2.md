# Personalized Notification System - Sales Demo

> **Purpose:** Visual web demo to sell the notification concept to business owners
> **Audience:** Non-technical stakeholders
> **Goal:** Show how automated, personalized messages bring customers back

---

## Demo Flow Overview (5 Pages)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                            DEMO FLOW FOR BUSINESS OWNER                         │
│                                                                                 │
│   Page 1              Page 2              Page 3              Page 4            │
│   /demo               /demo/customers     /demo/magic         /demo/auto        │
│                                                                                 │
│   ┌─────────┐         ┌─────────┐         ┌─────────┐         ┌─────────┐      │
│   │         │         │         │         │         │         │         │      │
│   │   💸    │  ────▶  │   👥    │  ────▶  │   ✨    │  ────▶  │   😴    │      │
│   │         │         │         │         │         │         │         │      │
│   │ YOU'RE  │         │   WE    │         │  WATCH  │         │  WORKS  │      │
│   │ LOSING  │         │  KNOW   │         │   THE   │         │  WHILE  │      │
│   │ MONEY   │         │ EVERYONE│         │  MAGIC  │         │  YOU    │      │
│   │         │         │         │         │         │         │  SLEEP  │      │
│   └─────────┘         └─────────┘         └─────────┘         └─────────┘      │
│                                                                                 │
│                                                               │                 │
│                                                               ▼                 │
│                                                                                 │
│                                                         Page 5                  │
│                                                         /demo/results           │
│                                                                                 │
│                                                         ┌─────────┐            │
│                                                         │         │            │
│                                                         │   📈    │            │
│                                                         │         │            │
│                                                         │PROJECTED│            │
│                                                         │ RESULTS │            │
│                                                         │         │            │
│                                                         └─────────┘            │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

| Page | Route | Headline | Goal |
|------|-------|----------|------|
| 1 | `/demo` | You're Losing Customers | Create urgency |
| 2 | `/demo/customers` | We Remember Everyone | Show the intelligence |
| 3 | `/demo/magic` | Watch the Magic | Demonstrate personalization |
| 4 | `/demo/auto` | Works While You Sleep | Show automation |
| 5 | `/demo/results` | Projected Results | Close with ROI data |

---

# PAGE 1: You're Losing Customers (`/demo`)

**Goal:** Create urgency. Show the problem with generic messages.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                         💸 YOU'RE LOSING CUSTOMERS                              │
│                                                                                 │
│               "Your messages go straight to the bin"                            │
│                                                                                 │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                                                                                 │
│       WHAT YOU SEND NOW                      WHAT THEY WANT                     │
│                                                                                 │
│       ┌─────────────────────────┐           ┌─────────────────────────┐        │
│       │                         │           │                         │        │
│       │  🔔 Spice Hut           │           │  🔔 Spice Hut           │        │
│       │                         │           │                         │        │
│       │  "Check out our         │           │  "Arif, your Lamb       │        │
│       │   latest deals!"        │    VS     │   Donner is waiting!    │        │
│       │                         │           │                         │        │
│       │  "Order now for         │           │   20% off just for      │        │
│       │   great savings"        │           │   you. Expires 6pm!"    │        │
│       │                         │           │                         │        │
│       └─────────────────────────┘           └─────────────────────────┘        │
│                                                                                 │
│       ┌─────────────────────────┐           ┌─────────────────────────┐        │
│       │                         │           │                         │        │
│       │      😴 IGNORED         │           │      😍 OPENED          │        │
│       │                         │           │                         │        │
│       │   ██░░░░░░░░░░░░░░░░░   │           │   ████████████░░░░░░░   │        │
│       │                         │           │                         │        │
│       │      2% open            │           │      12% open           │        │
│       │                         │           │                         │        │
│       └─────────────────────────┘           └─────────────────────────┘        │
│                                                                                 │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                     WHAT THIS COSTS YOU EVERY YEAR                              │
│                                                                                 │
│       ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐      │
│       │                   │  │                   │  │                   │      │
│       │      💸 £45K      │  │      📉 60%       │  │     😞 1,200      │      │
│       │                   │  │                   │  │                   │      │
│       │   Lost Revenue    │  │    Customers      │  │    Customers      │      │
│       │                   │  │   Unsubscribe     │  │     Churned       │      │
│       │                   │  │                   │  │                   │      │
│       └───────────────────┘  └───────────────────┘  └───────────────────┘      │
│                                                                                 │
│                                                                                 │
│                  ┌───────────────────────────────────────┐                      │
│                  │                                       │                      │
│                  │        SEE HOW WE FIX THIS  →         │                      │
│                  │                                       │                      │
│                  └───────────────────────────────────────┘                      │
│                                                                                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Side-by-side notification cards fade in
- Progress bars animate to show 2% vs 12%
- Cost numbers count up (£1... £10K... £45K)

---

# PAGE 2: Customer Intelligence Dashboard (`/demo/customers`)

**Goal:** Show we track every customer with detailed profiles and AI recommendations.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│     📊 YOUR CUSTOMER INTELLIGENCE DASHBOARD                             │
│                                                                         │
│     "We know every customer. We personalize for each one."              │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  LIVE CUSTOMER COUNT                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │     1,847                                                       │   │
│  │     ━━━━━                                                       │   │
│  │     Total Customers Tracked                                     │   │
│  │                                                                 │   │
│  │     🟢 847 Active   🟡 312 At Risk   🔴 203 Churning   ⭐ 156 VIP│   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  WHAT WE KNOW ABOUT EACH CUSTOMER                                       │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  🔍 Search customers...                        [Segment ▼]       │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │                                                                  │  │
│  │  ┌──────┐  ARIF MOHAMMED                              🟡 AT RISK│  │
│  │  │  👤  │  Last Order: 7 days ago                               │  │
│  │  │      │  Favorite: Lamb Donner with Nan (ordered 12x)         │  │
│  │  └──────┘  Avg Spend: £18.50 • Loyalty: 150 pts                 │  │
│  │            Orders: Fri/Sat evenings • Prefers: Spicy            │  │
│  │                                                                  │  │
│  │            💡 RECOMMENDATION:                                    │  │
│  │            "Send 20% comeback offer featuring Lamb Donner"       │  │
│  │                                                     [TRIGGER →] │  │
│  │  ─────────────────────────────────────────────────────────────  │  │
│  │                                                                  │  │
│  │  ┌──────┐  SARAH KHAN                                 🟢 ACTIVE │  │
│  │  │  👤  │  Last Order: 2 days ago                               │  │
│  │  │      │  Favorite: Gourmet Burger Meal (ordered 8x)           │  │
│  │  └──────┘  Avg Spend: £12.30 • Loyalty: 89 pts                  │  │
│  │            Orders: Lunch weekdays • Prefers: Mild               │  │
│  │                                                                  │  │
│  │            💡 RECOMMENDATION:                                    │  │
│  │            "Send lunch deal at 11:30am tomorrow"                 │  │
│  │                                                     [TRIGGER →] │  │
│  │  ─────────────────────────────────────────────────────────────  │  │
│  │                                                                  │  │
│  │  ┌──────┐  JAMES TAYLOR                            🔴 CHURNING  │  │
│  │  │  👤  │  Last Order: 14 days ago                              │  │
│  │  │      │  Favorite: 20 Wings Bucket (ordered 5x)               │  │
│  │  └──────┘  Avg Spend: £22.10 • Loyalty: 67 pts                  │  │
│  │            Orders: Weekend nights • Prefers: Hot                │  │
│  │                                                                  │  │
│  │            💡 RECOMMENDATION:                                    │  │
│  │            "Urgent: 25% off + free drink to win back"            │  │
│  │                                                     [TRIGGER →] │  │
│  │  ─────────────────────────────────────────────────────────────  │  │
│  │                                                                  │  │
│  │  ┌──────┐  EMMA LEWIS                                   ⭐ VIP  │  │
│  │  │  👤  │  Last Order: 1 day ago                                │  │
│  │  │      │  Favorite: Chicken Wrap Meal (ordered 23x)            │  │
│  │  └──────┘  Avg Spend: £25.40 • Loyalty: 340 pts                 │  │
│  │            Orders: Daily lunch • Prefers: Medium                │  │
│  │                                                                  │  │
│  │            💡 RECOMMENDATION:                                    │  │
│  │            "Loyalty reward ready! Free item on next order"       │  │
│  │                                                     [TRIGGER →] │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Showing 4 of 1,847 customers  •  Load more...       │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│                    ┌─────────────────────────┐                          │
│                    │   SEE IT IN ACTION  →   │                          │
│                    └─────────────────────────┘                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Counter animates from 0 to 1,847
- Segment badges animate with counts
- Customer cards slide in one by one
- Search bar has typing cursor
- [TRIGGER →] buttons pulse on hover

---

# PAGE 3: Watch the Magic (`/demo/magic`)

**Goal:** Show the 4-step personalization process visually.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                           ✨ WATCH THE MAGIC                                    │
│                                                                                 │
│              "See how we turn one customer into one perfect message"            │
│                                                                                 │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                                                                                 │
│   STEP 1                                      STEP 2                            │
│   WE SPOT THE CUSTOMER                        WE THINK ABOUT THEM               │
│                                                                                 │
│   ┌─────────────────────────────┐             ┌─────────────────────────────┐  │
│   │                             │             │                             │  │
│   │   ┌────────┐                │             │   💭                        │  │
│   │   │  😟    │  ARIF          │             │                             │  │
│   │   │        │                │   ────▶     │   "Arif loves Lamb Donner   │  │
│   │   └────────┘                │             │    and hasn't ordered in    │  │
│   │                             │             │    7 days. Let's bring      │  │
│   │   Hasn't ordered            │             │    him back with 20% off    │  │
│   │   in 7 days                 │             │    his favorite!"           │  │
│   │                             │             │                             │  │
│   └─────────────────────────────┘             └─────────────────────────────┘  │
│                                                                                 │
│         │                                               │                       │
│         │                                               │                       │
│         ▼                                               ▼                       │
│                                                                                 │
│   STEP 3                                      STEP 4                            │
│   WE WRITE THE MESSAGE                        PING! ON THEIR PHONE              │
│                                                                                 │
│   ┌─────────────────────────────┐             ┌─────────────────────────────┐  │
│   │                             │             │                             │  │
│   │   ✍️ Writing...             │             │   📱                        │  │
│   │                             │             │                             │  │
│   │   "Arif, we miss you! 🥙    │   ────▶     │   ┌───────────────────────┐ │  │
│   │                             │             │   │ 🔔 Spice Hut          │ │  │
│   │    Your Lamb Donner is      │             │   │                       │ │  │
│   │    waiting. 20% off         │             │   │ Arif, we miss you! 🥙 │ │  │
│   │    today only!█"            │             │   │ Your Lamb Donner...   │ │  │
│   │                             │             │   └───────────────────────┘ │  │
│   │   ↑ typing animation        │             │                             │  │
│   │                             │             │   Arif taps → Orders! 🎉    │  │
│   │                             │             │                             │  │
│   └─────────────────────────────┘             └─────────────────────────────┘  │
│                                                                                 │
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │   ⚡ ALL AUTOMATIC          🚫 NO STAFF NEEDED          🕐 24/7         │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│                                                                                 │
│                  ┌───────────────────────────────────────┐                      │
│                  │                                       │                      │
│                  │        SEE IT RUN AUTOMATICALLY  →    │                      │
│                  │                                       │                      │
│                  └───────────────────────────────────────┘                      │
│                                                                                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Steps highlight one by one as user scrolls
- Message types itself letter by letter
- Notification slides down on phone
- Confetti when "Orders! 🎉" appears

---

# PAGE 4: Works While You Sleep (`/demo/auto`)

**Goal:** Show the system is fully automated - no staff needed.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                                                                                 │
│                        😴 WORKS WHILE YOU SLEEP                                 │
│                                                                                 │
│                 "Set it once. It runs forever. No staff needed."                │
│                                                                                 │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │                                                                         │  │
│   │    LIVE NOW                                              🟢 RUNNING     │  │
│   │                                                                         │  │
│   │    ─────────────────────────────────────────────────────────────────    │  │
│   │                                                                         │  │
│   │    🕐 Just now   ✅ Sent to Arif - "We miss you!"                       │  │
│   │                                                                         │  │
│   │    🕐 1 min ago  ✅ Sent to Emma - "VIP reward ready!"                  │  │
│   │                                                                         │  │
│   │    🕐 2 min ago  ✅ Sent to James - "25% off wings!"                    │  │
│   │                                                                         │  │
│   │    🕐 3 min ago  ✅ Sent to Sarah - "Lunch time deal!"                  │  │
│   │                                                                         │  │
│   │    🕐 4 min ago  ✅ Sent to Mo - "Come back for 30% off"                │  │
│   │                                                                         │  │
│   │    🕐 5 min ago  ✅ Sent to Lisa - "Your Peri Chips await!"             │  │
│   │                                                                         │  │
│   │    ← Live feed, new items appear at top                                 │  │
│   │                                                                         │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                                                                                 │
│              TODAY'S ACTIVITY (All Automatic - No Staff Involved)               │
│                                                                                 │
│                                                                                 │
│      ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐           │
│      │                 │   │                 │   │                 │           │
│      │      312        │   │       47        │   │     £890        │           │
│      │                 │   │                 │   │                 │           │
│      │    Messages     │   │     Orders      │   │    Revenue      │           │
│      │      Sent       │   │     Today       │   │     Today       │           │
│      │                 │   │                 │   │                 │           │
│      └─────────────────┘   └─────────────────┘   └─────────────────┘           │
│              ↑ animated counters                                                │
│                                                                                 │
│                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                                                                                 │
│                          WHAT HAPPENS AUTOMATICALLY                             │
│                                                                                 │
│                                                                                 │
│      ┌────────────────────────────────────────────────────────────────────┐    │
│      │                                                                    │    │
│      │   ⏰ 6:00 AM    System checks all 1,847 customers                  │    │
│      │                                                                    │    │
│      │   🔍 6:01 AM    Found 45 who need a nudge today                    │    │
│      │                                                                    │    │
│      │   🍽️ 11:30 AM   Sent lunch deals to 234 lunch regulars             │    │
│      │                                                                    │    │
│      │   🛒 All Day    Caught 23 abandoned carts, sent reminders          │    │
│      │                                                                    │    │
│      │   🏆 All Day    Celebrated 12 loyalty milestones                   │    │
│      │                                                                    │    │
│      │   🍕 6:00 PM    Sent Friday dinner deals to 412 customers          │    │
│      │                                                                    │    │
│      │   📦 All Day    Sent 156 order updates                             │    │
│      │                                                                    │    │
│      └────────────────────────────────────────────────────────────────────┘    │
│                                                                                 │
│                                                                                 │
│                  ┌───────────────────────────────────────┐                      │
│                  │                                       │                      │
│                  │        SEE YOUR RESULTS  →            │                      │
│                  │                                       │                      │
│                  └───────────────────────────────────────┘                      │
│                                                                                 │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Live feed: new items slide in at top every few seconds
- Counters animate up
- Timeline items fade in as user scrolls

---

# PAGE 5: Projected Results (`/demo/results`)

**Goal:** Show detailed metrics and ROI. Close the deal.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│     📈 PROJECTED RESULTS                                                │
│                                                                         │
│     "What personalized notifications will do for Spice Hut"             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  BEFORE vs AFTER                                                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │   METRIC              NOW           WITH AI         CHANGE      │   │
│  │   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                                 │   │
│  │   📬 Open Rate        2.1%          12.4%          +490% ↑     │   │
│  │      ██░░░░░░░░░░     ████████████░░░░░                        │   │
│  │                                                                 │   │
│  │   👆 Click Rate       0.8%           6.2%          +675% ↑     │   │
│  │      █░░░░░░░░░░░     ██████░░░░░░░░░                          │   │
│  │                                                                 │   │
│  │   🔄 Reorder Rate     15%            38%           +153% ↑     │   │
│  │      ███░░░░░░░░░     ████████░░░░░░░                          │   │
│  │                                                                 │   │
│  │   😢 Churn Rate       12%            5%            -58% ↓      │   │
│  │      ██░░░░░░░░░░     █░░░░░░░░░░░░░░                          │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  💰 ROI CALCULATOR                                                      │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │   YOUR CURRENT NUMBERS                                          │   │
│  │                                                                 │   │
│  │   Monthly Orders:     [  500  ]                                 │   │
│  │   Avg Order Value:    [ £18.50]                                 │   │
│  │   Current Customers:  [ 1,847 ]                                 │   │
│  │                                                                 │   │
│  │   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │   │
│  │                                                                 │   │
│  │   📊 PROJECTED ANNUAL IMPACT                                    │   │
│  │                                                                 │   │
│  │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐              │   │
│  │   │             │ │             │ │             │              │   │
│  │   │   £47,250   │ │    +285     │ │    -140     │              │   │
│  │   │             │ │             │ │             │              │   │
│  │   │  Additional │ │   Extra     │ │  Customers  │              │   │
│  │   │   Revenue   │ │   Orders    │ │   Saved     │              │   │
│  │   │  Per Year   │ │  Per Month  │ │  From Churn │              │   │
│  │   │             │ │             │ │             │              │   │
│  │   └─────────────┘ └─────────────┘ └─────────────┘              │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ✅ WHAT YOU GET                                                        │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                                                                 │   │
│  │   ✓ Every customer gets a personal message                     │   │
│  │   ✓ System spots who needs a nudge                             │   │
│  │   ✓ Messages write themselves                                  │   │
│  │   ✓ Works 24/7 without staff                                   │   │
│  │   ✓ Tracks what works, improves over time                      │   │
│  │   ✓ You make more money                                        │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│                                                                         │
│         ┌─────────────────────────────────────────────────┐            │
│         │                                                 │            │
│         │       🚀 LET'S BUILD THIS FOR SPICE HUT        │            │
│         │                                                 │            │
│         └─────────────────────────────────────────────────┘            │
│                                                                         │
│                     ← Back to Start    Contact Us →                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Progress bars animate from "Before" to "After"
- Revenue numbers count up (£1... £47,250)
- Stat cards fade in one by one
- CTA button pulses

---

# Reference Data

## Customer Segments

| Segment | Visual | Simple Name | Trigger |
|---------|--------|-------------|---------|
| Active | 🟢 | Happy | Ordered recently |
| At Risk | 🟡 | Needs a nudge | 7+ days since order |
| Churning | 🔴 | Leaving | 14+ days since order |
| VIP | ⭐ | VIP | High loyalty points |

## Sample Customers

| Name | Loves | Last Order | Status | What We Send |
|------|-------|------------|--------|--------------|
| Arif | Lamb Donner | 7 days | 🟡 Needs nudge | "We miss you! 20% off" |
| Sarah | Burger | 2 days | 🟢 Happy | "Lunch deal tomorrow" |
| James | Wings | 14 days | 🔴 Leaving | "25% off + free drink" |
| Emma | Wrap | Yesterday | ⭐ VIP | "Free drink reward!" |
| Mo | Biryani | 30 days | 🔴 Leaving | "30% off to come back" |
| Lisa | Peri Chips | 3 days | 🟢 Happy | "Upsell main item" |
| David | Tower Burger | 5 days | 🟢 Happy | "VIP upgrade soon" |
| Priya | Biryani | 10 days | 🟡 Needs nudge | "Weekend special" |

## Message Examples

**Generic (Bad):**
```
"Check out our deals! Order now for great savings."
```

**Personal (Good):**
```
"Arif, we miss you! 🥙 Your Lamb Donner is waiting. 20% off today!"
```

```
"Sarah, lunch sorted! 🍔 Your Gourmet Burger in 20 min."
```

```
"Emma, you're a VIP! 🏆 Free drink on your next order."
```

```
"James, come back for 25% off! 🍗 Your 20 Wings are calling."
```

---

# Animations Summary

| Page | Key Animations |
|------|----------------|
| 1. Problem | Side-by-side fade in, progress bars, cost counter |
| 2. Customers | Customer count up, cards slide in one by one |
| 3. Magic | 4-step progression, typing effect, notification slide |
| 4. Auto | Live feed updates, counters, timeline fade in |
| 5. Results | Metrics bars animate, revenue counter, CTA pulse |

---

# Design Notes

## Keep It Simple
- No technical words (no "AI", "LLM", "API", "database")
- Use "we" and "you" language
- Focus on feelings: "customers feel special"
- Focus on money: "make more money"

## Visual Style
- Large text, lots of whitespace
- Warm colors (orange, amber for Spice Hut brand)
- Friendly faces/emojis for customers
- Big animated numbers for impact

---

# Tech Stack (Internal Reference)

| Component | Technology |
|-----------|------------|
| Demo Pages | Next.js + Tailwind |
| Animations | Framer Motion |
| Mobile App | Flutter |
| Backend | Go (Fiber) |
| AI | Python + OpenAI/Claude |
| Database | Supabase + MongoDB + Redis |
| Push | Firebase FCM |
| Hosting | GCP Cloud Run |
