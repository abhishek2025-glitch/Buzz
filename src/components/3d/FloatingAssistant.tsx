'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingAssistant() {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  // Create a glowing orb with inner core
  const { outerMaterial, innerMaterial, ringMaterial } = useMemo(() => {
    return {
      outerMaterial: new THREE.MeshStandardMaterial({
        color: '#6366f1',
        emissive: '#6366f1',
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.6,
      }),
      innerMaterial: new THREE.MeshStandardMaterial({
        color: '#a5b4fc',
        emissive: '#a5b4fc',
        emissiveIntensity: 1,
        transparent: true,
        opacity: 0.9,
      }),
      ringMaterial: new THREE.MeshStandardMaterial({
        color: '#818cf8',
        emissive: '#818cf8',
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
      }),
    }
  }, [])

  // Dispose materials on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      outerMaterial.dispose()
      innerMaterial.dispose()
      ringMaterial.dispose()
    }
  }, [outerMaterial, innerMaterial, ringMaterial])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.2
      groupRef.current.position.x = Math.sin(time * 0.5) * 0.1
      // Slow rotation
      groupRef.current.rotation.y = time * 0.3
      groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.1
    }
    
    if (innerRef.current) {
      // Pulsing inner core
      const scale = 1 + Math.sin(time * 2) * 0.1
      innerRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <primitive object={outerMaterial} />
      </mesh>
      
      {/* Inner core */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <primitive object={innerMaterial} />
      </mesh>
      
      {/* Orbiting ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <primitive object={ringMaterial} />
      </mesh>
      
      {/* Second orbiting ring */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.3, 0.015, 16, 100]} />
        <primitive object={ringMaterial} />
      </mesh>
    </group>
  )
}
