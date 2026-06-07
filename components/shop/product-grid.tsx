'use client'

import { ProductCard } from './product-card'
import type { Product } from '@/lib/products'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-xs uppercase tracking-luxe text-muted-foreground">No pieces match your current filters</p>
        <p className="mt-1 text-[11px] text-muted-foreground/60">Try clearing some options or adjust your search.</p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <motion.div
        layout
        className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
