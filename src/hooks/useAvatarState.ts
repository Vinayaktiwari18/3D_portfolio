'use client'

import { create } from 'zustand'
import type { AvatarState } from '@/lib/animationStates'

interface AvatarStore {
  currentState: AvatarState
  isLoaded: boolean
  isChatOpen: boolean
  isVisible: boolean
  // Actions
  setState: (state: AvatarState) => void
  setLoaded: (loaded: boolean) => void
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
}

export const useAvatarState = create<AvatarStore>((set) => ({
  currentState: 'floating',
  isLoaded: false,
  isChatOpen: false,
  isVisible: true,

  setState: (state) =>
    set({ currentState: state }),

  setLoaded: (loaded) =>
    set({ isLoaded: loaded }),

  toggleChat: () =>
    set((s) => ({ isChatOpen: !s.isChatOpen })),

  openChat: () =>
    set({ isChatOpen: true, currentState: 'talking' }),

  closeChat: () =>
    set({ isChatOpen: false, currentState: 'floating' }),
}))