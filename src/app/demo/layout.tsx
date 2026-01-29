'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const steps = [
  { path: '/demo', label: '1', title: 'Problem' },
  { path: '/demo/customers', label: '2', title: 'Intelligence' },
  { path: '/demo/magic', label: '3', title: 'Magic' },
  { path: '/demo/auto', label: '4', title: 'Automation' },
  { path: '/demo/results', label: '5', title: 'Results' },
]

export default function DemoLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const currentStep = steps.findIndex(s => s.path === pathname) + 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/demo" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <span className="text-white font-semibold text-lg">Spice Hut</span>
              <span className="text-orange-400 font-medium ml-2">AI</span>
            </div>
          </Link>

          {/* Progress Steps - Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {steps.map((step, i) => {
              const isActive = i + 1 === currentStep
              const isCompleted = i + 1 < currentStep

              return (
                <Link key={step.path} href={step.path} className="flex items-center">
                  <motion.div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : isCompleted
                        ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                      {isCompleted ? '✓' : step.label}
                    </span>
                    <span className="text-sm font-medium">{step.title}</span>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${isCompleted ? 'bg-orange-500/50' : 'bg-white/10'}`} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Step Indicator */}
          <div className="lg:hidden flex items-center gap-2">
            {steps.map((step, i) => (
              <Link key={step.path} href={step.path}>
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i + 1 === currentStep
                      ? 'bg-orange-500 scale-125'
                      : i + 1 < currentStep
                      ? 'bg-orange-500/50'
                      : 'bg-white/20'
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="text-white/40 text-sm hidden sm:block">
            Step {currentStep} of 5
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white/60 text-sm">Spice Hut AI Notification System</span>
            </div>
            <p className="text-white/40 text-sm">
              Powered by AI Personalization Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
