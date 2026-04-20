# YAAR.world 3D Portfolio — Claude Instructions

## Stack

Next.js 14 App Router + TypeScript + Tailwind CSS
Three.js + React Three Fiber + @react-three/drei
@pixiv/three-vrm (VRM loading)
Mixamo FBX retargeting at runtime
Framer Motion + GSAP (scroll animations)
Groq API (YAAR AI chat)

## Design System

--orange: #FF6A00
--cyan: #00C9C8
--black: #0D0D0D
--off-white: #F4F2ED
--card-bg: #FAFAF8

Fonts: Teko / Barlow Condensed / Sora / Space Mono / Caveat

## Avatar System

VRM file: public/avatar/character.vrm
FBX animations: public/animations/\*.fbx
Avatar is ALWAYS visible — fixed position on screen
Click avatar → opens chat panel
Animation states: idle, floating, talking,
pointing, waving, dancing

## Build Order

Phase 1: Project setup + folder structure ✅
Phase 2: VRM loader + scene setup
Phase 3: Mixamo retargeting + AnimationMixer
Phase 4: Avatar interaction + Raycasting
Phase 5: All portfolio sections
Phase 6: YAAR AI chat integration
Phase 7: Scroll animations (GSAP/Framer)
Phase 8: Mobile responsive
Phase 9: Performance optimization
Phase 10: Deploy

## Rules

- TypeScript strict mode always
- No any types
- Mobile first responsive
- Avatar canvas: pointer-events none
  except on character mesh
- All sections same as original plan
- Light theme default, night theme toggle
