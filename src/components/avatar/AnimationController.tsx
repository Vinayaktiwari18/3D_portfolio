'use client'

import { useEffect, useRef } from 'react'
import { useAvatarState } from '@/hooks/useAvatarState'
import {
  SECTION_ANIMATIONS,
  type AvatarState,
} from '@/lib/animationStates'

// This component watches scroll position and
// triggers avatar animations based on
// which section is visible

export function AnimationController() {
  const { setState, currentState } = useAvatarState()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const sectionId = entry.target.getAttribute('id') ?? ''
          const animState = SECTION_ANIMATIONS[sectionId]

          if (animState && animState !== currentState) {
            setState(animState as AvatarState)
          }
        })
      },
      {
        // Trigger when section is 40% visible
        threshold: 0.4,
        rootMargin: '-10% 0px -10% 0px',
      }
    )

    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [setState, currentState])

  // No visual output — just logic
  return null
}