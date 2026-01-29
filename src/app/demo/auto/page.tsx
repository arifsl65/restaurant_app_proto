'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface FeedItem {
  id: number
  time: string
  name: string
  message: string
}

const initialFeed: FeedItem[] = [
  { id: 6, time: '5 min ago', name: 'Lisa', message: 'Your Peri Chips await!' },
  { id: 5, time: '4 min ago', name: 'Mo', message: 'Come back for 30% off' },
  { id: 4, time: '3 min ago', name: 'Sarah', message: 'Lunch time deal!' },
  { id: 3, time: '2 min ago', name: 'James', message: '25% off wings!' },
  { id: 2, time: '1 min ago', name: 'Emma', message: 'VIP reward ready!' },
]

const newMessages = [
  { name: 'Arif', message: 'We miss you!' },
  { name: 'David', message: 'Tower Burger special!' },
  { name: 'Priya', message: 'Weekend biryani deal!' },
  { name: 'Tom', message: 'Free delivery today!' },
  { name: 'Fatima', message: 'Loyalty points doubled!' },
]

const timeline = [
  { time: '6:00 AM', icon: '⏰', text: 'System checks all 1,847 customers' },
  { time: '6:01 AM', icon: '🔍', text: 'Found 45 who need a nudge today' },
  { time: '11:30 AM', icon: '🍽️', text: 'Sent lunch deals to 234 lunch regulars' },
  { time: 'All Day', icon: '🛒', text: 'Caught 23 abandoned carts, sent reminders' },
  { time: 'All Day', icon: '🏆', text: 'Celebrated 12 loyalty milestones' },
  { time: '6:00 PM', icon: '🍕', text: 'Sent Friday dinner deals to 412 customers' },
  { time: 'All Day', icon: '📦', text: 'Sent 156 order updates' },
]

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const steps = 60
    const increment = value / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      setCurrent(Math.min(Math.round(increment * step), value))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{current.toLocaleString()}</span>
}

export default function DemoAuto() {
  const [feed, setFeed] = useState<FeedItem[]>(initialFeed)
  const [messagesSent, setMessagesSent] = useState(312)
  const [ordersToday, setOrdersToday] = useState(47)
  const [revenue, setRevenue] = useState(890)
  const [visibleTimeline, setVisibleTimeline] = useState<number[]>([])

  // Add new feed items periodically
  useEffect(() => {
    let messageIndex = 0

    const interval = setInterval(() => {
      if (messageIndex < newMessages.length) {
        const newItem: FeedItem = {
          id: Date.now(),
          time: 'Just now',
          name: newMessages[messageIndex].name,
          message: newMessages[messageIndex].message,
        }

        setFeed(prev => [newItem, ...prev.slice(0, 5)])
        setMessagesSent(prev => prev + 1)

        // Occasionally increment orders and revenue
        if (Math.random() > 0.5) {
          setOrdersToday(prev => prev + 1)
          setRevenue(prev => prev + Math.floor(Math.random() * 20) + 10)
        }

        messageIndex++
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Animate timeline items
  useEffect(() => {
    timeline.forEach((_, index) => {
      setTimeout(() => {
        setVisibleTimeline(prev => [...prev, index])
      }, 2000 + index * 400)
    })
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              The Automation
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-indigo-400">😴</span> Works While You Sleep
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Set it once. It runs forever. No staff needed.
          </motion.p>
        </div>
      </section>

      {/* Live Feed Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">LIVE NOW</h2>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                  🟢 RUNNING
                </Badge>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {feed.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-xl"
                    >
                      <span className="text-white/40 text-sm w-20 flex-shrink-0">
                        🕐 {item.time}
                      </span>
                      <span className="text-green-400">✅</span>
                      <span className="text-white/80">
                        Sent to <span className="text-white font-medium">{item.name}</span> - &quot;{item.message}&quot;
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <p className="text-white/40 text-sm mt-4 text-center">
                ← Live feed, new items appear at top
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-xl font-semibold text-white text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            TODAY&apos;S ACTIVITY (All Automatic - No Staff Involved)
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                <motion.p
                  className="text-5xl font-bold text-white mb-2"
                  key={messagesSent}
                  initial={{ scale: 1.2, color: '#22C55E' }}
                  animate={{ scale: 1, color: '#FFFFFF' }}
                  transition={{ duration: 0.3 }}
                >
                  {messagesSent}
                </motion.p>
                <p className="text-white/60">Messages Sent</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                <motion.p
                  className="text-5xl font-bold text-white mb-2"
                  key={ordersToday}
                  initial={{ scale: 1.2, color: '#22C55E' }}
                  animate={{ scale: 1, color: '#FFFFFF' }}
                  transition={{ duration: 0.3 }}
                >
                  {ordersToday}
                </motion.p>
                <p className="text-white/60">Orders Today</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                <motion.p
                  className="text-5xl font-bold text-green-400 mb-2"
                  key={revenue}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  £{revenue}
                </motion.p>
                <p className="text-white/60">Revenue Today</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-xl font-semibold text-white text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            WHAT HAPPENS AUTOMATICALLY
          </motion.h2>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={visibleTimeline.includes(index) ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-4 p-3"
                >
                  <span className="text-amber-400 font-mono text-sm w-24 flex-shrink-0">
                    {item.time}
                  </span>
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white/80">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5 }}
          >
            <Link href="/demo/results">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg px-12 py-6 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
              >
                See Your Results →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
