'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

interface Metric {
  label: string
  icon: string
  before: number
  after: number
  suffix: string
  improvement: string
  isDecrease?: boolean
}

const metrics: Metric[] = [
  { label: 'Open Rate', icon: '📬', before: 2.1, after: 12.4, suffix: '%', improvement: '+490%' },
  { label: 'Click Rate', icon: '👆', before: 0.8, after: 6.2, suffix: '%', improvement: '+675%' },
  { label: 'Reorder Rate', icon: '🔄', before: 15, after: 38, suffix: '%', improvement: '+153%' },
  { label: 'Churn Rate', icon: '😢', before: 12, after: 5, suffix: '%', improvement: '-58%', isDecrease: true },
]

const benefits = [
  'Every customer gets a personal message',
  'System spots who needs a nudge',
  'Messages write themselves',
  'Works 24/7 without staff',
  'Tracks what works, improves over time',
  'You make more money',
]

function AnimatedProgress({ value, delay = 0 }: { value: number; delay?: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return <Progress value={progress} className="h-3 bg-slate-700 transition-all duration-1000" />
}

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2000 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const steps = 60
    const increment = value / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      setCurrent(Math.min(increment * step, value))
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{prefix}{current.toLocaleString(undefined, { maximumFractionDigits: 0 })}{suffix}</span>
}

export default function DemoResults() {
  const [monthlyOrders, setMonthlyOrders] = useState(500)
  const [avgOrderValue, setAvgOrderValue] = useState(18.5)
  const [currentCustomers, setCurrentCustomers] = useState(1847)
  const [showCalculation, setShowCalculation] = useState(false)

  // Calculate projected results
  const additionalRevenue = Math.round(monthlyOrders * avgOrderValue * 0.57 * 12) // 57% increase
  const extraOrdersPerMonth = Math.round(monthlyOrders * 0.57)
  const customersSaved = Math.round(currentCustomers * 0.076) // 7.6% churn reduction

  useEffect(() => {
    const timer = setTimeout(() => setShowCalculation(true), 1500)
    return () => clearTimeout(timer)
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
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-6">
              The Results
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-green-400">📈</span> Projected Results
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What personalized notifications will do for Spice Hut
          </motion.p>
        </div>
      </section>

      {/* Before vs After Metrics */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-xl font-semibold text-white mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            BEFORE vs AFTER
          </motion.h2>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="grid gap-8">
              {/* Header */}
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-white/60 px-2">
                <span>METRIC</span>
                <span className="text-center">NOW</span>
                <span className="text-center">WITH AI</span>
                <span className="text-right">CHANGE</span>
              </div>

              {/* Metrics */}
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.15 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{metric.icon}</span>
                      <span className="text-white font-medium">{metric.label}</span>
                    </div>
                    <span className="text-center text-white/60">{metric.before}{metric.suffix}</span>
                    <span className="text-center text-white font-semibold">{metric.after}{metric.suffix}</span>
                    <span className={`text-right font-bold ${metric.isDecrease ? 'text-green-400' : 'text-green-400'}`}>
                      {metric.improvement} {metric.isDecrease ? '↓' : '↑'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-8">
                    <AnimatedProgress value={(metric.before / Math.max(metric.before, metric.after)) * 100} delay={800 + index * 150} />
                    <AnimatedProgress value={(metric.after / Math.max(metric.before, metric.after)) * 100} delay={800 + index * 150} />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-xl font-semibold text-white mb-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            💰 ROI CALCULATOR
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 p-8">
              <h3 className="text-lg font-medium text-white mb-6">YOUR CURRENT NUMBERS</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Monthly Orders</label>
                  <Input
                    type="number"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="bg-slate-900 border-slate-600 text-white text-lg h-12"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Avg Order Value (£)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    className="bg-slate-900 border-slate-600 text-white text-lg h-12"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Current Customers</label>
                  <Input
                    type="number"
                    value={currentCustomers}
                    onChange={(e) => setCurrentCustomers(Number(e.target.value))}
                    className="bg-slate-900 border-slate-600 text-white text-lg h-12"
                  />
                </div>
              </div>

              {showCalculation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="border-t border-slate-700 pt-8">
                    <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                      📊 PROJECTED ANNUAL IMPACT
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="bg-gradient-to-br from-green-500/20 to-green-600/10 border-green-500/30 p-6 text-center">
                        <p className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                          <AnimatedNumber value={additionalRevenue} prefix="£" />
                        </p>
                        <p className="text-white/60">Additional Revenue Per Year</p>
                      </Card>

                      <Card className="bg-slate-900/50 border-slate-700 p-6 text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                          +<AnimatedNumber value={extraOrdersPerMonth} />
                        </p>
                        <p className="text-white/60">Extra Orders Per Month</p>
                      </Card>

                      <Card className="bg-slate-900/50 border-slate-700 p-6 text-center">
                        <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                          -<AnimatedNumber value={customersSaved} />
                        </p>
                        <p className="text-white/60">Customers Saved From Churn</p>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-xl font-semibold text-white mb-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            ✅ WHAT YOU GET
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-green-400 text-xl">✓</span>
                    <span className="text-white/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>
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
            transition={{ delay: 3 }}
            className="space-y-6"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xl px-16 py-8 rounded-full shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all animate-pulse"
            >
              🚀 Let&apos;s Build This For Spice Hut
            </Button>

            <div className="flex items-center justify-center gap-8 pt-4">
              <Link href="/demo" className="text-white/40 hover:text-white/60 transition-colors">
                ← Back to Start
              </Link>
              <a href="#contact" className="text-orange-400 hover:text-orange-300 transition-colors">
                Contact Us →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
