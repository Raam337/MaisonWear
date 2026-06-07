'use client'

import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, X, Check } from 'lucide-react'
import { products as allProducts, categories } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest'

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'newest', label: 'New Arrivals' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
]

export function ShopSection({ initialCategory }: { initialCategory?: string }) {
  const [activeCategories, setActiveCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  )
  const [sort, setSort] = useState<SortKey>('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    setActiveCategories(initialCategory ? [initialCategory] : [])
  }, [initialCategory])

  const toggleCategory = (c: string) =>
    setActiveCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    )

  const filtered = useMemo(() => {
    let list = [...allProducts]
    if (activeCategories.length) {
      list = list.filter((p) => activeCategories.includes(p.category))
    }
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew))
        break
    }
    return list
  }, [activeCategories, sort])

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-xs uppercase tracking-luxe text-accent">The Collection</p>
        <h2 className="font-serif text-4xl tracking-tight lg:text-5xl">
          Shop All Menswear
        </h2>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[105px] z-30 mt-12 flex items-center justify-between gap-4 border-y border-border bg-background/90 py-4 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 text-xs uppercase tracking-luxe"
        >
          <SlidersHorizontal className="size-4" strokeWidth={1.5} />
          Filter
          {activeCategories.length > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
              {activeCategories.length}
            </span>
          )}
        </button>

        <p className="hidden text-xs uppercase tracking-luxe text-muted-foreground sm:block">
          {filtered.length} {filtered.length === 1 ? 'Item' : 'Items'}
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="hidden text-xs uppercase tracking-luxe text-muted-foreground sm:block"
          >
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="cursor-pointer border border-border bg-background px-3 py-2 text-xs uppercase tracking-luxe outline-none focus:border-foreground"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      <AnimatePresence>
        {activeCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2 overflow-hidden pt-5"
          >
            {activeCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleCategory(c)}
                className="flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs uppercase tracking-luxe transition-colors hover:border-foreground"
              >
                {c}
                <X className="size-3" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setActiveCategories([])}
              className="text-xs uppercase tracking-luxe text-muted-foreground underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-muted-foreground">
          No products match your selection.
        </p>
      )}

      {/* Filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-[80] bg-foreground/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-[90] flex w-[85%] max-w-sm flex-col bg-background"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <h3 className="text-sm uppercase tracking-luxe">Filter by Category</h3>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setFiltersOpen(false)}
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {categories.map((c) => {
                  const active = activeCategories.includes(c)
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCategory(c)}
                      className="flex w-full items-center justify-between border-b border-border py-4 text-sm"
                    >
                      <span className={cn(active && 'text-accent')}>{c}</span>
                      <span
                        className={cn(
                          'flex size-5 items-center justify-center border transition-colors',
                          active ? 'border-accent bg-accent text-accent-foreground' : 'border-border',
                        )}
                      >
                        {active && <Check className="size-3" />}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="border-t border-border px-6 py-5">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="w-full bg-primary py-4 text-xs uppercase tracking-luxe text-primary-foreground"
                >
                  View {filtered.length} Items
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
