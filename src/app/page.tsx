'use client'

import dynamic from 'next/dynamic'
import LeadForm from '@/components/ui/LeadForm'
import ErrorBoundary from '@/components/3d/ErrorBoundary'

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-slate-900" />
})

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary>
          <Scene />
        </ErrorBoundary>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Welcome to Buzz
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI-powered platform transforming how businesses operate
          </p>
        </div>

        <LeadForm />
      </div>
    </main>
  )
}
