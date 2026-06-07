'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTryOn } from '@/app/shop/try-on-context'

const LOADING_STEPS = [
  'Analyzing body posture and dimensions...',
  'Mapping fabrics to posture...',
  'Generating realistic folds and shadows...',
  'Blending editorial lighting and tones...',
  'Polishing try-on preview details...',
]

export function GenerationProgress() {
  const { userImage } = useTryOn()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % LOADING_STEPS.length)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full min-h-[550px] flex flex-col items-center justify-center bg-background border border-border p-8 text-center space-y-8">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-luxe text-accent font-semibold animate-pulse">
          AI Try-on Engine Active
        </p>
        <h3 className="font-serif text-2xl tracking-tight text-foreground">
          Curating Your Style
        </h3>
      </div>

      {/* Loading Visual Container */}
      <div className="relative w-full max-w-[320px] aspect-[3/4] border border-border overflow-hidden bg-secondary/35 shadow-inner flex items-center justify-center">
        {/* Blurry User Image Background if available */}
        {userImage && (
          <Image
            src={userImage}
            alt="Blurry Background"
            fill
            className="object-cover blur-[8px] opacity-30 scale-105"
          />
        )}

        {/* Pulsing Silhouette Overlay */}
        <div className="relative w-[65%] h-[80%] opacity-45 animate-pulse">
          <Image
            src="/try-on/silhouette.png"
            alt="Pulsing Silhouette"
            fill
            className="object-contain invert dark:invert-0"
          />
        </div>

        {/* Laser Scanning Line */}
        <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-accent/60 to-transparent shadow-[0_0_10px_#C19A6B] animate-scan" />

        {/* Scanning Shimmer Cover */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-20 pointer-events-none animate-shimmer" />
      </div>

      {/* Loading Text and Cycle Indicator */}
      <div className="space-y-3 max-w-[280px]">
        <div className="flex justify-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="size-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="size-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        <p className="text-xs uppercase tracking-luxe text-foreground font-semibold">
          Generating your outfit preview...
        </p>

        {/* Small cycling micro-status info */}
        <p className="text-[10px] text-muted-foreground tracking-wide h-4 animate-fade-in font-mono">
          {LOADING_STEPS[currentStep]}
        </p>
      </div>

      {/* Inject custom keyframe styles directly so we don't need tailwind.config edits */}
      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 2.5s linear infinite;
        }
      `}</style>
    </div>
  )
}
