'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from '@/components/3d/Scene'
import LeadForm from '@/components/ui/LeadForm'

export default function Home() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
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
