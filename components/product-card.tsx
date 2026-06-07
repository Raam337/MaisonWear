'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { resolveAsset } from '@/lib/utils'

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-3/4 overflow-hidden bg-secondary">
          <Image
            src={resolveAsset(product.image || '/placeholder.svg')}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-luxe text-foreground backdrop-blur">
              New
            </span>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-background/95 p-3 text-center opacity-0 backdrop-blur transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[11px] uppercase tracking-luxe text-foreground">
              View Product
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
            {product.brand}
          </p>
          <h3 className="text-sm leading-snug text-foreground">{product.name}</h3>
          <p className="text-sm text-foreground">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.article>
  )
}
