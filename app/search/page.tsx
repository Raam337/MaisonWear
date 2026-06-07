'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search as SearchIcon, X } from 'lucide-react'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

const suggestions = ['Overcoat', 'Cashmere', 'Sneakers', 'Watch', 'Denim', 'Boots']

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-luxe text-accent">Search</p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight lg:text-5xl">
          Find Your Piece
        </h1>

        <div className="relative mt-10 flex items-center border-b border-foreground">
          <SearchIcon className="size-5 text-muted-foreground" strokeWidth={1.5} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for tailoring, knitwear, accessories…"
            aria-label="Search products"
            className="w-full bg-transparent px-4 py-4 text-base outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery('')}>
              <X className="size-5 text-muted-foreground transition-colors hover:text-foreground" />
            </button>
          )}
        </div>

        {!query && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-luxe text-muted-foreground">
              Popular:
            </span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="border border-border px-3 py-1.5 text-xs uppercase tracking-luxe transition-colors hover:border-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {query && (
        <p className="mt-12 text-center text-xs uppercase tracking-luxe text-muted-foreground">
          {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </p>
      )}

      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
      >
        <AnimatePresence mode="popLayout">
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {query && results.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No pieces found. Try a different search.
        </p>
      )}
    </main>
  )
}
