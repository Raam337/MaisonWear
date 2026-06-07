'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { formatPrice } from '@/lib/products'

import { resolveAsset } from '@/lib/utils'

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, updateQuantity, removeItem, count } =
    useCart()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            role="dialog"
            aria-label="Shopping cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="text-sm uppercase tracking-luxe">
                Shopping Bag{count > 0 ? ` (${count})` : ''}
              </h2>
              <button type="button" aria-label="Close cart" onClick={closeCart}>
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="size-10 text-muted-foreground" strokeWidth={1} />
                <p className="text-sm text-muted-foreground">Your bag is empty.</p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-2 border-b border-foreground pb-1 text-xs uppercase tracking-luxe"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.size}`}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 border-b border-border py-5"
                      >
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="relative aspect-3/4 w-20 flex-shrink-0 overflow-hidden bg-secondary"
                        >
                          <Image
                            src={resolveAsset(item.product.image || '/placeholder.svg')}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <div>
                              <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
                                {item.product.brand}
                              </p>
                              <Link
                                href={`/products/${item.product.slug}`}
                                onClick={closeCart}
                                className="mt-1 block text-sm leading-snug hover:text-accent"
                              >
                                {item.product.name}
                              </Link>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Size {item.size}
                              </p>
                            </div>
                            <button
                              type="button"
                              aria-label="Remove item"
                              onClick={() => removeItem(item.product.id, item.size)}
                              className="text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <X className="size-4" strokeWidth={1.5} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-border">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.quantity - 1,
                                  )
                                }
                                className="flex size-7 items-center justify-center transition-colors hover:bg-secondary"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-7 text-center text-xs">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.size,
                                    item.quantity + 1,
                                  )
                                }
                                className="flex size-7 items-center justify-center transition-colors hover:bg-secondary"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <span className="text-sm">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm uppercase tracking-luxe">Subtotal</span>
                    <motion.span
                      key={subtotal}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 1 }}
                      className="font-serif text-xl"
                    >
                      {formatPrice(subtotal)}
                    </motion.span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <button
                    type="button"
                    className="mt-5 w-full bg-primary py-4 text-xs uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full py-2 text-xs uppercase tracking-luxe text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
