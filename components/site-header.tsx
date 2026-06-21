'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/components/cart/cart-provider'
import { categories } from '@/lib/products'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/config'

export function SiteHeader() {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b transition-colors duration-300',
          scrolled
            ? 'border-border bg-background/90 backdrop-blur-md'
            : 'border-transparent bg-background',
        )}
      >
        {/* Announcement bar */}
        <div className="bg-primary text-primary-foreground">
          <p className="mx-auto max-w-7xl px-4 py-1 text-center text-[11px] tracking-luxe uppercase">
            Complimentary express shipping on all orders
          </p>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 lg:px-8">
          {/* Left: mobile menu + nav */}
          <div className="flex flex-1 items-center gap-6">
            <button
              type="button"
              aria-label="Open menu"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              <Link
                href="/"
                className={cn(
                  'group relative text-xs uppercase tracking-luxe transition-colors',
                  pathname === '/' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Home
                <span className={cn('absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 group-hover:w-full', pathname === '/' ? 'w-full' : 'w-0')} />
              </Link>
              <Link
                href="/shop"
                className={cn(
                  'group relative text-xs uppercase tracking-luxe transition-colors',
                  pathname === '/shop' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Shop
                <span className={cn('absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 group-hover:w-full', pathname === '/shop' ? 'w-full' : 'w-0')} />
              </Link>
            </nav>
          </div>

          {/* Center: logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-serif text-2xl font-semibold tracking-[0.3em] uppercase lg:text-3xl">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Right: actions */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <Link
              href="/search"
              aria-label="Search"
              className="hidden text-foreground transition-colors hover:text-accent sm:block"
            >
              <Search className="size-5" strokeWidth={1.5} />
            </Link>
            <button
              type="button"
              aria-label="Account"
              className="hidden text-foreground transition-colors hover:text-accent sm:block"
            >
              <User className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Open cart"
              onClick={openCart}
              className="relative text-foreground transition-colors hover:text-accent"
            >
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
              className="fixed inset-y-0 left-0 z-[70] flex w-[82%] max-w-sm flex-col bg-background lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-serif text-xl tracking-[0.3em] uppercase">
                  {SITE_CONFIG.name}
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col px-5 py-6">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'border-b border-border py-4 text-sm uppercase tracking-luxe transition-colors',
                    pathname === '/' ? 'text-accent font-medium' : 'text-foreground',
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'border-b border-border py-4 text-sm uppercase tracking-luxe transition-colors',
                    pathname === '/shop' ? 'text-accent font-medium' : 'text-foreground',
                  )}
                >
                  Shop
                </Link>
                <Link
                  href="/search"
                  onClick={() => setMobileOpen(false)}
                  className="py-4 text-sm uppercase tracking-luxe"
                >
                  Search
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
