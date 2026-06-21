'use client'

import { useTryOn } from '@/app/shop/try-on-context'
import { Download, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/products'
import { SITE_CONFIG } from '@/lib/config'

export function GeneratedResult() {
  const { generatedImage, selectedProducts, resetTryOn } = useTryOn()

  const handleDownload = () => {
    if (!generatedImage) return
    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `${SITE_CONFIG.slug}-try-on-outfit.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const outfitCost = selectedProducts.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="h-full flex flex-col justify-between space-y-6 bg-background border border-border p-6 lg:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-luxe text-accent font-semibold">
            <Sparkles className="size-3.5 fill-accent/20" />
            AI Stylist Result
          </div>
          <h3 className="font-serif text-2xl lg:text-3xl tracking-tight text-foreground">
            Your Look is Ready
          </h3>
        </div>
        <div className="bg-emerald-500/10 text-emerald-600 text-[10px] px-2.5 py-1.5 uppercase tracking-luxe font-semibold rounded-[2px] flex items-center gap-1.5 border border-emerald-500/20">
          <CheckCircle2 className="size-3.5 text-emerald-500 stroke-[2.5px]" />
          Render Complete
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
        {/* Output image */}
        <div className="md:col-span-7 flex flex-col items-center justify-center bg-secondary/25 border border-border/60 aspect-3/4 relative overflow-hidden group shadow-md">
          {generatedImage && (
            <Image
              src={generatedImage}
              alt="Generated Try-On Result"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
              priority
            />
          )}
        </div>

        {/* Outfit breakdown and purchase proposal */}
        <div className="md:col-span-5 flex flex-col gap-6 justify-between">
          <div className="space-y-4">
            <h4 className="text-[11px] uppercase tracking-luxe text-foreground font-semibold border-b border-border/60 pb-2">
              Outfit Pieces
            </h4>
            <ul className="space-y-3">
              {selectedProducts.map((product) => (
                <li key={product.id} className="flex justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-luxe text-muted-foreground font-medium block">
                      {product.brand}
                    </span>
                    <span className="text-foreground leading-snug font-medium">{product.name}</span>
                  </div>
                  <span className="text-foreground font-mono">{formatPrice(product.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/35 border border-border p-4.5 space-y-3">
            <div className="flex justify-between items-center text-xs uppercase tracking-luxe font-semibold">
              <span>Total Outfit Value</span>
              <span className="text-sm font-bold text-foreground">{formatPrice(outfitCost)}</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Purchase this curated styled outfit directly, or save it to your wishlist for later.
            </p>
            <button
              type="button"
              onClick={() => alert('Outfit added to cart! Proceeding to checkout.')}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground py-3 text-[10px] font-semibold uppercase tracking-luxe transition-colors"
            >
              Add Outfit to Bag
            </button>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 bg-background hover:bg-secondary border border-border text-foreground py-4 text-xs font-semibold uppercase tracking-luxe transition-colors flex items-center justify-center gap-2"
        >
          <Download className="size-4" strokeWidth={1.5} />
          Download Photo
        </button>

        <button
          type="button"
          onClick={resetTryOn}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/95 py-4 text-xs font-semibold uppercase tracking-luxe transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw className="size-4 animate-spin-hover" strokeWidth={1.5} />
          Try on other items
        </button>
      </div>
    </div>
  )
}
