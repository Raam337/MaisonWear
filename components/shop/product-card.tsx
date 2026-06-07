'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useTryOn } from '@/app/shop/try-on-context'
import { cn, resolveAsset } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { selectedProducts, toggleProductSelection } = useTryOn()
  const isSelected = selectedProducts.some((p) => p.id === product.id)

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2), ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer select-none"
      onClick={() => toggleProductSelection(product)}
    >
      <div
        className={cn(
          'relative aspect-3/4 overflow-hidden bg-secondary transition-all duration-300 border',
          isSelected ? 'border-primary shadow-md' : 'border-transparent group-hover:border-border',
        )}
      >
        <Image
          src={resolveAsset(product.image || '/placeholder.svg')}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
          className={cn(
            'object-cover transition-transform duration-500 ease-out',
            isSelected ? 'scale-102 opacity-95' : 'group-hover:scale-103',
          )}
        />

        {/* Selected Overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-primary/5 transition-opacity duration-300',
            isSelected ? 'opacity-100' : 'opacity-0 pointer-events-none',
          )}
        />

        {/* Checkbox Icon Indicator */}
        <div
          className={cn(
            'absolute right-3 top-3 flex size-5 items-center justify-center rounded-full border transition-all duration-300',
            isSelected
              ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-sm'
              : 'border-foreground/30 bg-background/80 text-transparent opacity-60 group-hover:opacity-100 group-hover:scale-105',
          )}
        >
          <Check className={cn('size-3 stroke-[3px] transition-transform', isSelected ? 'scale-100' : 'scale-0')} />
        </div>

        {/* Size Badge */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap max-w-[80%]">
            <span className="bg-background/80 backdrop-blur-[2px] text-[8px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider text-muted-foreground">
              {product.sizes[0]}
              {product.sizes.length > 1 ? ` +${product.sizes.length - 1}` : ''}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3.5 space-y-1">
        <div className="flex items-center justify-between gap-1.5">
          <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">
            {product.brand}
          </p>
          <span className="text-[9px] uppercase tracking-wider text-accent-foreground/60 bg-secondary/80 px-1.5 py-0.5 font-medium rounded-sm">
            {product.category}
          </span>
        </div>
        <h3 className={cn('text-xs leading-snug transition-colors', isSelected ? 'text-primary font-medium' : 'text-foreground group-hover:text-muted-foreground')}>
          {product.name}
        </h3>
        <p className="text-xs text-foreground font-medium">{formatPrice(product.price)}</p>
      </div>
    </motion.article>
  )
}
