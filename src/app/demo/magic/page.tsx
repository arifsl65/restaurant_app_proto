'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function TypewriterText({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [started, text, speed])

  return (
    <span>
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="animate-pulse">█</span>
      )}
    </span>
  )
}

export default function DemoMagic() {
  const [activeStep, setActiveStep] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Progress through steps automatically
    const timers = [
      setTimeout(() => setActiveStep(1), 1000),
      setTimeout(() => setActiveStep(2), 3000),
      setTimeout(() => setActiveStep(3), 5500),
      setTimeout(() => setActiveStep(4), 8000),
      setTimeout(() => setShowConfetti(true), 9500),
    ]

    return () => timers.forEach(t => clearTimeout(t))
  }, [])

  const steps = [
    {
      number: 1,
      title: 'WE SPOT THE CUSTOMER',
      icon: '👀',
    },
    {
      number: 2,
      title: 'WE THINK ABOUT THEM',
      icon: '💭',
    },
    {
      number: 3,
      title: 'WE WRITE THE MESSAGE',
      icon: '✍️',
    },
    {
      number: 4,
      title: "PING! ON THEIR PHONE",
      icon: '📱',
    },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#F97316', '#FBBF24', '#22C55E', '#3B82F6', '#A855F7'][Math.floor(Math.random() * 5)],
                }}
                initial={{ top: -20, opacity: 1, scale: 1 }}
                animate={{
                  top: '100vh',
                  opacity: 0,
                  rotate: Math.random() * 720,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              The Magic
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-purple-400">✨</span> Watch The Magic
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how we turn one customer into one perfect message
          </motion.p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1: Spot Customer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: activeStep >= 1 ? 1 : 0.3, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className={`bg-slate-800/50 border-slate-700 p-8 h-full transition-all ${activeStep === 1 ? 'ring-2 ring-purple-500/50' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white">{steps[0].title}</h3>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-20 h-20 rounded-2xl bg-slate-700 flex items-center justify-center text-4xl"
                      animate={activeStep === 1 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      😟
                    </motion.div>
                    <div>
                      <p className="text-white font-semibold text-lg">ARIF</p>
                      <p className="text-red-400 text-sm mt-1">Hasn&apos;t ordered in 7 days</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Step 2: Think About Them */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: activeStep >= 2 ? 1 : 0.3, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className={`bg-slate-800/50 border-slate-700 p-8 h-full transition-all ${activeStep === 2 ? 'ring-2 ring-purple-500/50' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white">{steps[1].title}</h3>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6">
                  <div className="text-4xl mb-4">💭</div>
                  {activeStep >= 2 && (
                    <p className="text-white/80 text-lg leading-relaxed">
                      <TypewriterText
                        text="Arif loves Lamb Donner and hasn't ordered in 7 days. Let's bring him back with 20% off his favorite!"
                        delay={0}
                        speed={30}
                      />
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Step 3: Write Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: activeStep >= 3 ? 1 : 0.3, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className={`bg-slate-800/50 border-slate-700 p-8 h-full transition-all ${activeStep === 3 ? 'ring-2 ring-purple-500/50' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-white">{steps[2].title}</h3>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">✍️</span>
                    <span className="text-white/60 text-sm">Writing...</span>
                  </div>
                  {activeStep >= 3 && (
                    <div className="space-y-2">
                      <p className="text-white font-medium text-lg">
                        <TypewriterText
                          text="Arif, we miss you! 🥙"
                          delay={0}
                          speed={40}
                        />
                      </p>
                      <p className="text-white/80">
                        <TypewriterText
                          text="Your Lamb Donner is waiting. 20% off today only!"
                          delay={1000}
                          speed={30}
                        />
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Step 4: Send to Phone */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: activeStep >= 4 ? 1 : 0.3, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className={`bg-slate-800/50 border-slate-700 p-8 h-full transition-all ${activeStep === 4 ? 'ring-2 ring-green-500/50' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-white">{steps[3].title}</h3>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 relative">
                  <div className="text-4xl mb-4">📱</div>

                  {/* Mock Phone Notification */}
                  <AnimatePresence>
                    {activeStep >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="bg-white rounded-2xl p-4 shadow-xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-lg">🔔</span>
                          </div>
                          <div>
                            <p className="text-slate-900 font-semibold text-sm">Spice Hut</p>
                            <p className="text-slate-700 text-sm">Arif, we miss you! 🥙</p>
                            <p className="text-slate-500 text-xs">Your Lamb Donner is waiting...</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {showConfetti && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 text-center"
                    >
                      <p className="text-green-400 font-bold text-lg">
                        Arif taps → Orders! 🎉
                      </p>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 10 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-white font-medium">ALL AUTOMATIC</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚫</span>
                  <span className="text-white font-medium">NO STAFF NEEDED</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🕐</span>
                  <span className="text-white font-medium">24/7</span>
                </div>
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
            transition={{ delay: 10.5 }}
          >
            <Link href="/demo/auto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-lg px-12 py-6 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all"
              >
                See It Run Automatically →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
