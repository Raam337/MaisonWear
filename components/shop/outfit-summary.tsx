'use client'

import { useTryOn } from '@/app/shop/try-on-context'
import { Check, X } from 'lucide-react'
import { formatPrice } from '@/lib/products'

export function OutfitSummary() {
  const { selectedProducts, toggleProductSelection, clearSelections } = useTryOn()

  if (selectedProducts.length === 0) {
    return (
      <div className="bg-secondary/40 border border-border/60 p-5 text-center">
        <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">No items selected yet</p>
        <p className="text-[10px] text-muted-foreground/60 mt-1 leading-relaxed">
          Select garments from the product grid to curate your custom look.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
        <h4 className="text-[11px] uppercase tracking-luxe text-foreground font-semibold">
          2. Selected Outfit
        </h4>
        <button
          type="button"
          onClick={clearSelections}
          className="text-[9px] uppercase tracking-luxe text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
        >
          Clear All
        </button>
      </div>

      <ul className="space-y-2.5">
        {selectedProducts.map((product) => (
          <li
            key={product.id}
            className="flex items-start justify-between gap-3 text-xs border-b border-border/30 pb-2 last:border-0 last:pb-0 group"
          >
            <div className="flex items-start gap-2">
              <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5">
                <Check className="size-3 stroke-[2.5px]" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-luxe text-muted-foreground font-medium">
                  {product.brand}
                </p>
                <p className="text-foreground leading-snug">{product.name}</p>
                <p className="text-[10px] text-muted-foreground/80 font-medium mt-0.5">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleProductSelection(product)}
              className="text-muted-foreground/50 hover:text-foreground hover:bg-secondary rounded p-0.5 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label={`Remove ${product.name}`}
            >
              <X className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>

      <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold uppercase tracking-luxe text-foreground">
        <span>Outfit Total</span>
        <span>
          {formatPrice(selectedProducts.reduce((sum, p) => sum + p.price, 0))}
        </span>
      </div>
    </div>
  )
}
