'use client'

import { Search, X } from 'lucide-react'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative flex items-center border-b border-border py-2 focus-within:border-foreground transition-colors duration-300">
      <Search className="size-4 text-muted-foreground" strokeWidth={1.5} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by product name or brand..."
        className="w-full bg-transparent px-3 text-xs uppercase tracking-luxe outline-none placeholder:text-muted-foreground/60 text-foreground"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  )
}
