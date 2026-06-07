'use client'

import React, { useRef, useState } from 'react'
import { UploadCloud, X, CheckCircle2, Info } from 'lucide-react'
import { useTryOn } from '@/app/shop/try-on-context'
import { cn } from '@/lib/utils'

export function UploadPhoto() {
  const { userImage, setUserImage } = useTryOn()
  const [dragActive, setDragActive] = useState(false)
  const [showGuidelines, setShowGuidelines] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file) return

    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Unsupported file format. Please upload JPG, PNG, or WEBP.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setUserImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-[11px] uppercase tracking-luxe text-foreground font-semibold">
          1. Upload Your Photo
        </h4>
        <button
          type="button"
          onClick={() => setShowGuidelines(!showGuidelines)}
          className="flex items-center gap-1 text-[9px] uppercase tracking-luxe text-muted-foreground hover:text-foreground transition-colors"
        >
          <Info className="size-3" />
          Guidelines
        </button>
      </div>

      {showGuidelines && (
        <div className="bg-secondary/60 p-4 border border-border/80 text-[11px] leading-relaxed text-muted-foreground space-y-2.5 transition-all duration-300">
          <p className="font-semibold text-foreground uppercase tracking-wider text-[10px]">For Best Results:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Choose a **full-body** or upper-body front-facing portrait.</li>
            <li>Stand in front of a **solid, well-lit, plain background**.</li>
            <li>Wear relatively **fitted clothing** so clothing overlays match your shape.</li>
            <li>Ensure your posture is straight with hands relaxed at your sides.</li>
          </ul>
        </div>
      )}

      {userImage ? (
        <div className="relative aspect-[3/4] w-full border border-border bg-secondary overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={userImage} alt="User Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onButtonClick}
              className="bg-background/95 hover:bg-background text-foreground text-[10px] uppercase tracking-luxe px-3 py-2 border border-border transition-colors font-medium"
            >
              Replace Photo
            </button>
            <button
              type="button"
              onClick={() => setUserImage(null)}
              className="bg-destructive text-destructive-foreground text-[10px] uppercase tracking-luxe px-3 py-2 transition-colors font-medium"
              aria-label="Remove Photo"
            >
              Remove
            </button>
          </div>
          <div className="absolute top-3 left-3 bg-background/90 text-[10px] px-2 py-1 uppercase tracking-luxe flex items-center gap-1.5 backdrop-blur shadow-sm">
            <CheckCircle2 className="size-3.5 text-accent stroke-[2.5px]" />
            Photo Loaded
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={cn(
            'relative aspect-[3/4] w-full border border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 bg-secondary/35',
            dragActive
              ? 'border-primary bg-primary/5 scale-[0.99]'
              : 'border-border hover:border-foreground/40 hover:bg-secondary/60',
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
          />

          <UploadCloud className="size-8 text-muted-foreground/80 mb-3" strokeWidth={1.5} />

          <p className="text-xs uppercase tracking-luxe text-foreground font-medium">
            Drag & drop your photo
          </p>
          <p className="text-[10px] text-muted-foreground mt-1.5 max-w-[200px]">
            or click to browse from your device
          </p>

          <div className="mt-5 border border-border px-3 py-1.5 text-[9px] uppercase tracking-luxe text-muted-foreground bg-background/50">
            JPG, PNG or WEBP (Full-body recommended)
          </div>
        </div>
      )}
    </div>
  )
}
