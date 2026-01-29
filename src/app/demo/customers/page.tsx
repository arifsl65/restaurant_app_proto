'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

interface Customer {
  id: number
  name: string
  avatar: string
  lastOrder: string
  favorite: string
  orderCount: number
  avgSpend: string
  loyaltyPoints: number
  orderPattern: string
  preference: string
  status: 'active' | 'at_risk' | 'churning' | 'vip'
  recommendation: string
}

const customers: Customer[] = [
  {
    id: 1,
    name: 'Arif Mohammed',
    avatar: '👨',
    lastOrder: '7 days ago',
    favorite: 'Lamb Donner with Nan',
    orderCount: 12,
    avgSpend: '£18.50',
    loyaltyPoints: 150,
    orderPattern: 'Fri/Sat evenings',
    preference: 'Spicy',
    status: 'at_risk',
    recommendation: 'Send 20% comeback offer featuring Lamb Donner'
  },
  {
    id: 2,
    name: 'Sarah Khan',
    avatar: '👩',
    lastOrder: '2 days ago',
    favorite: 'Gourmet Burger Meal',
    orderCount: 8,
    avgSpend: '£12.30',
    loyaltyPoints: 89,
    orderPattern: 'Lunch weekdays',
    preference: 'Mild',
    status: 'active',
    recommendation: 'Send lunch deal at 11:30am tomorrow'
  },
  {
    id: 3,
    name: 'James Taylor',
    avatar: '👨',
    lastOrder: '14 days ago',
    favorite: '20 Wings Bucket',
    orderCount: 5,
    avgSpend: '£22.10',
    loyaltyPoints: 67,
    orderPattern: 'Weekend nights',
    preference: 'Hot',
    status: 'churning',
    recommendation: 'Urgent: 25% off + free drink to win back'
  },
  {
    id: 4,
    name: 'Emma Lewis',
    avatar: '👩',
    lastOrder: '1 day ago',
    favorite: 'Chicken Wrap Meal',
    orderCount: 23,
    avgSpend: '£25.40',
    loyaltyPoints: 340,
    orderPattern: 'Daily lunch',
    preference: 'Medium',
    status: 'vip',
    recommendation: 'Loyalty reward ready! Free item on next order'
  }
]

const statusConfig = {
  active: { label: 'ACTIVE', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: '🟢' },
  at_risk: { label: 'AT RISK', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: '🟡' },
  churning: { label: 'CHURNING', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: '🔴' },
  vip: { label: 'VIP', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: '⭐' }
}

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
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

export default function DemoCustomers() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    customers.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index])
      }, 800 + index * 300)
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
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              The Intelligence
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-blue-400">📊</span> Your Customer Intelligence
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We know every customer. We personalize for each one.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-5xl md:text-6xl font-bold text-white">
                    <AnimatedNumber value={1847} />
                  </p>
                  <p className="text-white/60 mt-1">Total Customers Tracked</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm">
                    🟢 847 Active
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-2 text-sm">
                    🟡 312 At Risk
                  </Badge>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-4 py-2 text-sm">
                    🔴 203 Churning
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2 text-sm">
                    ⭐ 156 VIP
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Customer List */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl font-semibold text-white mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            What We Know About Each Customer
          </motion.h2>

          {/* Search Bar */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex gap-4">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
                <Input
                  placeholder="Search customers..."
                  className="bg-slate-800/50 border-slate-700 text-white pl-12 h-12"
                />
              </div>
              <Button variant="outline" className="border-slate-700 text-white/60 h-12 px-6">
                Segment ▼
              </Button>
            </div>
          </motion.div>

          {/* Customer Cards */}
          <div className="space-y-4">
            {customers.map((customer, index) => (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, x: -50 }}
                animate={visibleCards.includes(index) ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-slate-600 transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar & Basic Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center text-3xl">
                        {customer.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{customer.name}</h3>
                          <Badge className={statusConfig[customer.status].color}>
                            {statusConfig[customer.status].icon} {statusConfig[customer.status].label}
                          </Badge>
                        </div>
                        <p className="text-white/60 text-sm">Last Order: {customer.lastOrder}</p>
                        <p className="text-white/80 text-sm mt-1">
                          Favorite: <span className="text-orange-400">{customer.favorite}</span> (ordered {customer.orderCount}x)
                        </p>
                        <p className="text-white/60 text-sm mt-1">
                          Avg Spend: {customer.avgSpend} • Loyalty: {customer.loyaltyPoints} pts
                        </p>
                        <p className="text-white/60 text-sm">
                          Orders: {customer.orderPattern} • Prefers: {customer.preference}
                        </p>
                      </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="lg:w-80 bg-slate-900/50 rounded-xl p-4">
                      <p className="text-amber-400 text-sm font-medium mb-2">💡 RECOMMENDATION:</p>
                      <p className="text-white/80 text-sm mb-4">&quot;{customer.recommendation}&quot;</p>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                      >
                        TRIGGER →
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <Card className="bg-slate-800/30 border-slate-700 p-4">
              <p className="text-white/40">Showing 4 of 1,847 customers • Load more...</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
          >
            <Link href="/demo/magic">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg px-12 py-6 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
              >
                See It In Action →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
