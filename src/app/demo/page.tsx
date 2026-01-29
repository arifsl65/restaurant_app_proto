'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      setCurrent(Math.min(Math.round(increment * step), value))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return <span>{prefix}{current.toLocaleString()}{suffix}</span>
}

export default function DemoPage1() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setShowContent(true)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium mb-6">
              The Problem
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-red-400">💸</span> You&apos;re Losing Customers
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your messages go straight to the bin
          </motion.p>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              What You Send Now vs What They Want
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Generic Message */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 px-3 py-1 text-xs font-medium rounded-bl-lg">
                  GENERIC
                </div>

                {/* Mock Notification */}
                <div className="bg-slate-900 rounded-2xl p-4 mb-6 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">🔔</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Spice Hut</p>
                      <p className="text-white/80 text-sm mt-1">Check out our latest deals!</p>
                      <p className="text-white/60 text-xs mt-1">Order now for great savings</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-2">😴</div>
                  <p className="text-white/60 font-medium mb-4">IGNORED</p>
                  <Progress value={2} className="h-3 bg-slate-700" />
                  <p className="text-red-400 font-bold text-2xl mt-3">2% open rate</p>
                </div>
              </Card>
            </motion.div>

            {/* VS Badge */}
            <motion.div
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center">
                <span className="text-white font-bold">VS</span>
              </div>
            </motion.div>

            {/* Personalized Message */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-slate-800/50 border-green-500/30 p-6 relative overflow-hidden ring-2 ring-green-500/20">
                <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 px-3 py-1 text-xs font-medium rounded-bl-lg">
                  PERSONALIZED
                </div>

                {/* Mock Notification */}
                <div className="bg-slate-900 rounded-2xl p-4 mb-6 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">🔔</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Spice Hut</p>
                      <p className="text-white/80 text-sm mt-1">Arif, your Lamb Donner is waiting! 🥙</p>
                      <p className="text-white/60 text-xs mt-1">20% off just for you. Expires 6pm!</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-2">😍</div>
                  <p className="text-white/60 font-medium mb-4">OPENED</p>
                  <Progress value={12} className="h-3 bg-slate-700 [&>div]:bg-green-500" />
                  <p className="text-green-400 font-bold text-2xl mt-3">12% open rate</p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Improvement Badge */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="inline-block px-6 py-3 rounded-full bg-green-500/20 text-green-400 text-lg font-bold">
              +500% improvement with personalization
            </span>
          </motion.div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-white text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            What This Costs You Every Year
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {showContent && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                    <div className="text-5xl mb-4">💸</div>
                    <p className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                      <AnimatedNumber value={45000} prefix="£" />
                    </p>
                    <p className="text-white/60">Lost Revenue</p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                    <div className="text-5xl mb-4">📉</div>
                    <p className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                      <AnimatedNumber value={60} suffix="%" />
                    </p>
                    <p className="text-white/60">Customers Unsubscribe</p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
                    <div className="text-5xl mb-4">😞</div>
                    <p className="text-4xl md:text-5xl font-bold text-red-400 mb-2">
                      <AnimatedNumber value={1200} />
                    </p>
                    <p className="text-white/60">Customers Churned</p>
                  </Card>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <Link href="/demo/customers">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg px-12 py-6 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
              >
                See How We Fix This →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
