'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Check, Truck, RotateCcw, ChevronRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useCart } from '@/components/cart/cart-provider'
import { cn } from '@/lib/utils'

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState<string>(
    product.sizes.length === 1 ? product.sizes[0] : '',
  )
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(false)
  const [openDetails, setOpenDetails] = useState(true)

  const handleAdd = () => {
    if (!size) {
      setError(true)
      return
    }
    addItem(product, size, quantity)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        {product.isNew && (
          <span className="absolute left-5 top-5 bg-background/90 px-3 py-1.5 text-[10px] uppercase tracking-luxe backdrop-blur">
            New In
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center px-6 py-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <p className="text-xs uppercase tracking-luxe text-accent">{product.brand}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance">
            {product.name}
          </h1>
          <p className="mt-4 text-lg">{formatPrice(product.price)}</p>

          <p className="mt-8 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-luxe text-muted-foreground">
              Colour — {product.colors[0]}
            </p>
            <div className="mt-3 flex gap-2">
              {product.colors.map((c) => (
                <span
                  key={c}
                  className="border border-foreground px-3 py-1.5 text-xs uppercase tracking-luxe"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-luxe text-muted-foreground">
                Size
              </p>
              <button className="text-xs uppercase tracking-luxe underline-offset-4 hover:underline">
                Size Guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s)
                    setError(false)
                  }}
                  className={cn(
                    'min-w-12 border px-4 py-3 text-xs uppercase tracking-luxe transition-colors',
                    size === s
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-xs text-destructive"
                >
                  Please select a size.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Quantity + add */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-12 items-center justify-center transition-colors hover:bg-secondary"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-12 items-center justify-center transition-colors hover:bg-secondary"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="flex-1 bg-primary text-xs uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
            >
              Add to Bag
            </motion.button>
          </div>

          {/* Assurances */}
          <div className="mt-8 space-y-3 border-t border-border pt-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Truck className="size-4" strokeWidth={1.5} />
              Complimentary express shipping
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <RotateCcw className="size-4" strokeWidth={1.5} />
              Free returns within 30 days
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="size-4" strokeWidth={1.5} />
              Authenticity guaranteed
            </div>
          </div>

          {/* Details accordion */}
          <div className="mt-6 border-t border-border">
            <button
              type="button"
              onClick={() => setOpenDetails((o) => !o)}
              className="flex w-full items-center justify-between py-5 text-xs uppercase tracking-luxe"
            >
              Product Details
              <ChevronRight
                className={cn(
                  'size-4 transition-transform',
                  openDetails && 'rotate-90',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {openDetails && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {product.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 pb-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 size-1 flex-shrink-0 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/"
            className="mt-4 inline-block text-xs uppercase tracking-luxe text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            ← Back to collection
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
