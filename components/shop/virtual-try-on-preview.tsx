'use client'

import { useState, useRef } from 'react'
import { useTryOn } from '@/app/shop/try-on-context'
import Image from 'next/image'
import {
  Sparkles,
  MoreVertical,
  Upload,
  X,
  CheckCircle2,
  Download,
  RefreshCw,
} from 'lucide-react'
import { cn, resolveAsset } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/config'

export function VirtualTryOnPreview() {
  const {
    userImage,
    uploadedImages,
    selectedProducts,
    generatedImage,
    generating,
    toggleProductSelection,
    setUserImage,
    addUploadedImage,
    triggerTryOnGeneration,
    resetTryOn,
  } = useTryOn()

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canGenerate = userImage !== null && selectedProducts.length > 0 && !generating

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
        addUploadedImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleDownload = async () => {
    if (!generatedImage) return

    try {
      const resolvedUrl = resolveAsset(generatedImage)

      // 1. Fetch image and convert to Blob/File for sharing
      let blob: Blob
      if (resolvedUrl.startsWith('data:')) {
        const parts = resolvedUrl.split(',')
        const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png'
        const bstr = atob(parts[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        blob = new Blob([u8arr], { type: mime })
      } else {
        const response = await fetch(resolvedUrl)
        blob = await response.blob()
      }

      const mimeType = blob.type || 'image/png'
      const file = new File([blob], `${SITE_CONFIG.slug}-try-on-look.png`, { type: mimeType })

      // 2. Share via Web Share API if supported and on mobile (iOS/Android native save/share sheet)
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
                       (navigator.maxTouchPoints > 0 && /Macintosh/i.test(navigator.userAgent))
      if (isMobile && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${SITE_CONFIG.name} Try-On`,
          text: `My Virtual Try-on Look from ${SITE_CONFIG.name}`,
        })
        return
      }
    } catch (error) {
      console.warn('Native share failed or not supported, falling back to standard download:', error)
    }

    // 3. Fallback: Standard programmatic anchor click
    try {
      const link = document.createElement('a')
      link.href = resolveAsset(generatedImage)
      link.download = `${SITE_CONFIG.slug}-try-on-outfit.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Standard download failed:', error)
      // Final Fallback: Open in new tab
      window.open(resolveAsset(generatedImage), '_blank')
    }
  }

  return (
    <div className="relative h-full flex flex-col justify-between p-0 select-none bg-background animate-fade-in">
      
      {/* Hidden file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Try-on Area: Portrait display */}
      <div className="relative flex-1 min-h-[420px] lg:min-h-[580px] bg-secondary/10 flex items-center justify-center overflow-hidden border-b border-border">
        
        {/* State 1: Generating progress overlay */}
        {generating && (
          <div className="absolute inset-0 z-20 bg-background/95 flex flex-col items-center justify-center p-6 text-center space-y-6">
            <p className="text-[11px] uppercase tracking-luxe text-accent font-semibold animate-pulse">
              AI Try-on Engine Active
            </p>
            <h4 className="font-serif text-xl text-foreground">Curating Your Style</h4>
            
            <div className="relative w-full max-w-[200px] aspect-3/4 border border-border bg-secondary/25 overflow-hidden flex items-center justify-center">
              {userImage && (
                <Image
                  src={resolveAsset(userImage)}
                  alt="User Base"
                  fill
                  className="object-cover blur-[6px] opacity-35"
                />
              )}
              <div className="relative w-[60%] h-[75%] opacity-35 animate-pulse">
                <Image
                  src={resolveAsset('/try-on/silhouette.png')}
                  alt="Silhouette"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-accent/70 to-transparent shadow-[0_0_8px_#C19A6B] animate-scan" />
            </div>

            <div className="flex justify-center gap-1">
              <span className="size-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="size-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="size-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Top-Right Actions (Download + 3 dots Dropdown) */}
        <div className="absolute top-4 right-4 z-30">
          <div className="flex items-center gap-2">
            {generatedImage && (
              <button
                type="button"
                onClick={handleDownload}
                className="flex size-9 items-center justify-center bg-background/90 hover:bg-background border border-border text-foreground backdrop-blur shadow-sm transition-all cursor-pointer"
                aria-label="Download generated try-on"
                title="Download Photo"
              >
                <Download className="size-4.5 text-foreground" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex size-9 items-center justify-center bg-background/90 hover:bg-background border border-border text-foreground backdrop-blur shadow-sm transition-all cursor-pointer"
              aria-label="Try-on settings"
            >
              <MoreVertical className="size-4.5 text-foreground" />
            </button>
          </div>

          {dropdownOpen && (
            <>
              {/* Backdrop to close dropdown */}
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 border border-border bg-background shadow-xl z-50 animate-fade-in text-xs py-1.5">
                <div className="px-3.5 py-2 border-b border-border/60 text-[10px] uppercase tracking-luxe text-muted-foreground font-semibold">
                  Select Base Image
                </div>
                
                {/* Upload custom button */}
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false)
                    fileInputRef.current?.click()
                  }}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left hover:bg-secondary/40 text-foreground transition-colors"
                >
                  <Upload className="size-3.5 text-muted-foreground" />
                  <span>Upload Custom Photo</span>
                </button>

                {/* Preloaded uploaded images list */}
                {uploadedImages.map((img, index) => {
                  const isActive = userImage === img
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setUserImage(img)
                        setDropdownOpen(false)
                      }}
                      className={cn(
                        'w-full flex items-center gap-3.5 px-3.5 py-2 hover:bg-secondary/40 text-left transition-colors',
                        isActive && 'font-semibold bg-secondary/25'
                      )}
                    >
                      <div className="relative size-6 bg-secondary border border-border overflow-hidden shrink-0">
                        <Image src={resolveAsset(img)} alt={`Uploaded photo ${index + 1}`} fill className="object-cover" />
                      </div>
                      <span className="truncate">Uploaded Photo {index + 1}</span>
                      {isActive && <span className="ml-auto size-1.5 rounded-full bg-accent" />}
                    </button>
                  )
                })}

                {/* Example Models Section */}
                <div className="px-3.5 py-2 border-t border-b border-border/60 text-[10px] uppercase tracking-luxe text-muted-foreground font-semibold mt-1">
                  Example Models
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    setUserImage('/try-on/model1.jpg')
                    setDropdownOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3.5 px-3.5 py-2 hover:bg-secondary/40 text-left transition-colors',
                    userImage === '/try-on/model1.jpg' && 'font-semibold bg-secondary/25'
                  )}
                >
                  <div className="relative size-6 bg-secondary border border-border overflow-hidden shrink-0">
                    <Image src={resolveAsset('/try-on/model1.jpg')} alt="Model 1" fill className="object-cover" />
                  </div>
                  <span className="truncate">Male Model 1</span>
                  {userImage === '/try-on/model1.jpg' && <span className="ml-auto size-1.5 rounded-full bg-accent" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserImage('/try-on/model2.png')
                    setDropdownOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-3.5 px-3.5 py-2 hover:bg-secondary/40 text-left transition-colors',
                    userImage === '/try-on/model2.png' && 'font-semibold bg-secondary/25'
                  )}
                >
                  <div className="relative size-6 bg-secondary border border-border overflow-hidden shrink-0">
                    <Image src={resolveAsset('/try-on/model2.png')} alt="Model 2" fill className="object-cover" />
                  </div>
                  <span className="truncate">Male Model 2</span>
                  {userImage === '/try-on/model2.png' && <span className="ml-auto size-1.5 rounded-full bg-accent" />}
                </button>

                {/* Clear/Reset option */}
                {userImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setUserImage(null)
                      setDropdownOpen(false)
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 text-left hover:bg-destructive/10 text-destructive border-t border-border/40 transition-colors mt-1"
                  >
                    <X className="size-3.5" />
                    <span>Reset to Silhouette</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Top-Left Status Badge */}
        <div className="absolute top-4 left-4 z-10 bg-background/90 text-[10px] px-2.5 py-1 uppercase tracking-luxe flex items-center gap-1.5 border border-border backdrop-blur shadow-sm">
          {generatedImage ? (
            <>
              <CheckCircle2 className="size-3 text-emerald-500 stroke-[2.5px]" />
              <span className="text-foreground font-semibold">AI Fitting Complete</span>
            </>
          ) : userImage ? (
            <>
              <div className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-muted-foreground font-medium">Personal Base Active</span>
            </>
          ) : (
            <>
              <div className="size-1.5 rounded-full bg-muted-foreground/45" />
              <span className="text-muted-foreground/60">Silhouette Base</span>
            </>
          )}
        </div>

        {/* Displaying Image Content */}
        {generatedImage ? (
          <Image
            src={resolveAsset(generatedImage)}
            alt="AI Outfit Render"
            fill
            className="object-contain animate-fade-in"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : userImage ? (
          <Image
            src={resolveAsset(userImage)}
            alt="My Portrait"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-secondary/15 to-secondary/35">
            <div className="relative aspect-3/4 w-[60%] max-h-[80%] opacity-90 transition-transform duration-700 hover:scale-102">
              <Image
                src={resolveAsset('/try-on/silhouette.png')}
                alt="Blank Silhouette"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-6 flex flex-col items-center gap-1.5">
              <span className="text-[9px] uppercase tracking-luxe text-muted-foreground bg-background border border-border px-3 py-1 text-center shadow-sm animate-fade-in">
                No Photo Selected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls Area */}
      <div className="bg-background p-4 lg:p-6 space-y-4 shadow-sm border-t border-border/60">
        
        {/* Horizontally scrollable current selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-luxe font-semibold">
            <span className="text-foreground">Current Selection</span>
            <span className="text-muted-foreground">{selectedProducts.length} Items</span>
          </div>

          {selectedProducts.length > 0 ? (
            <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-border/60 scrollbar-track-transparent">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 bg-secondary/20 border border-border/40 p-1.5 pr-2.5 shrink-0 select-none group relative max-w-[180px]"
                >
                  <div className="relative w-8 h-10 bg-secondary overflow-hidden shrink-0 border border-border/40">
                    <Image src={resolveAsset(product.image)} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[8px] uppercase tracking-wider text-muted-foreground truncate">{product.brand}</p>
                    <p className="text-[9px] text-foreground font-medium truncate leading-tight">{product.name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleProductSelection(product)}
                    className="ml-1 text-muted-foreground/45 hover:text-foreground transition-colors shrink-0 p-0.5 cursor-pointer"
                    aria-label={`Remove ${product.name}`}
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-border/60 bg-secondary/10 py-3.5 text-center text-[10px] text-muted-foreground/70 tracking-wide">
              * Select items from the collection on the left
            </div>
          )}
        </div>

        {/* Generate and Reset actions */}
        <div className="pt-2 border-t border-border/50 flex gap-3">
          {generatedImage ? (
            <>
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 bg-background hover:bg-secondary border border-border text-foreground py-3.5 text-[10px] font-semibold uppercase tracking-luxe transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="size-3.5" strokeWidth={1.5} />
                Download Photo
              </button>
              <button
                type="button"
                onClick={resetTryOn}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/95 py-3.5 text-[10px] font-semibold uppercase tracking-luxe transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="size-3.5 animate-spin-hover" strokeWidth={1.5} />
                Try other items
              </button>
            </>
          ) : (
            <div className="w-full space-y-2">
              <button
                type="button"
                disabled={!canGenerate}
                onClick={triggerTryOnGeneration}
                className={cn(
                  'w-full py-4 text-xs font-semibold uppercase tracking-luxe transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer',
                  canGenerate
                    ? 'bg-primary text-primary-foreground hover:bg-primary/95 shadow-md active:translate-y-px'
                    : 'bg-secondary text-muted-foreground/60 border border-border cursor-not-allowed',
                )}
              >
                <Sparkles className={cn('size-3.5', canGenerate ? 'animate-pulse text-accent' : 'text-muted-foreground/45')} />
                Generate Outfit Preview
              </button>

              {/* Status helper text messages for disabled buttons */}
              {!userImage && selectedProducts.length > 0 && (
                <p className="text-[9px] text-center text-muted-foreground/85 tracking-wide">
                  * Please upload/select a photo of yourself in the top-right corner.
                </p>
              )}
              {userImage && selectedProducts.length === 0 && (
                <p className="text-[9px] text-center text-muted-foreground/85 tracking-wide">
                  * Please select at least one item on the left to try on.
                </p>
              )}
              {!userImage && selectedProducts.length === 0 && (
                <p className="text-[9px] text-center text-muted-foreground/85 tracking-wide">
                  * Upload a photo (top-right) and select garments to start.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Laser Scanning Line Animation CSS */}
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
          animation: scan 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
