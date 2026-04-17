'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingAssistant from './FloatingAssistant'

function Particles() {
  const count = 200
  const mesh = useRef<THREE.Points>(null)
  
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const size = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      size[i] = Math.random() * 0.05
    }
    
    return [pos, size]
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.02
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#a5b4fc"
      />
      
      {/* Floating Assistant */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.3}
        floatingRange={[-0.1, 0.1]}
      >
        <FloatingAssistant />
      </Float>
      
      {/* Background Particles */}
      <Particles />
      
      {/* Environment */}
      <color attach="background" args={['#0f172a']} />
      <fog attach="fog" args={['#0f172a', 5, 20]} />
    </>
  )
}
