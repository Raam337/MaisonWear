'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductFiltersProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  selectedColor: string | null
  onColorChange: (color: string | null) => void
  selectedSize: string | null
  onSizeChange: (size: string | null) => void
  minPrice: number
  maxPrice: number
  onMinPriceChange: (val: number) => void
  onMaxPriceChange: (val: number) => void
  onClearAll: () => void
}

const CATEGORIES = ['Jackets', 'Shirts', 'Trousers', 'Shoes', 'Accessories']

const COLORS = [
  { name: 'Camel', hex: '#C19A6B' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'White', hex: '#FFFFFF', border: true },
  { name: 'Indigo', hex: '#4B0082' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Tortoise', hex: '#5c4033' },
  { name: 'Steel', hex: '#778899' },
  { name: 'Burgundy', hex: '#800020' },
  { name: 'Red', hex: '#D0312D' },
  { name: 'Beige', hex: '#F5F5DC' },
]

const SIZES = [
  'S', 'M', 'L', 'XL',
  '30', '32', '34', '36', '38',
  '44', '46', '48', '50', '52',
  '7', '8', '9', '10', '11', '12',
  'One Size',
]

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  selectedColor,
  onColorChange,
  selectedSize,
  onSizeChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onClearAll,
}: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    color: true,
    size: false,
    price: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedColor !== null ||
    selectedSize !== null ||
    minPrice > 0 ||
    maxPrice < 3000

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <h3 className="text-[10px] font-semibold uppercase tracking-luxe text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1 text-[9px] uppercase tracking-luxe text-muted-foreground hover:text-accent transition-colors"
          >
            <RotateCcw className="size-2.5" />
            Reset
          </button>
        )}
      </div>

      {/* Category Section */}
      <div className="border-b border-border/60 pb-3">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="flex w-full items-center justify-between text-[10px] uppercase tracking-luxe text-foreground font-medium py-0.5"
        >
          Category
          {openSections.category ? <ChevronUp className="size-2.5" /> : <ChevronDown className="size-2.5" />}
        </button>

        {openSections.category && (
          <div className="mt-2 flex flex-wrap gap-1.5 animate-fade-in">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategoryChange(active ? null : cat)}
                  className={cn(
                    'border px-2 py-1 text-[9px] uppercase tracking-luxe transition-all duration-300',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground',
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Color Section */}
      <div className="border-b border-border/60 pb-3">
        <button
          type="button"
          onClick={() => toggleSection('color')}
          className="flex w-full items-center justify-between text-[10px] uppercase tracking-luxe text-foreground font-medium py-0.5"
        >
          Color
          {openSections.color ? <ChevronUp className="size-2.5" /> : <ChevronDown className="size-2.5" />}
        </button>

        {openSections.color && (
          <div className="mt-2 flex flex-wrap gap-2 animate-fade-in">
            {COLORS.map((col) => {
              const active = selectedColor === col.name
              return (
                <button
                  key={col.name}
                  type="button"
                  title={col.name}
                  onClick={() => onColorChange(active ? null : col.name)}
                  className={cn(
                    'group relative flex size-5.5 items-center justify-center rounded-full border transition-all duration-300',
                    active ? 'border-primary scale-110 ring-2 ring-primary/25' : 'border-border hover:scale-105',
                  )}
                >
                  <span
                    className={cn(
                      'size-3.5 rounded-full shadow-inner transition-transform',
                      col.border && 'border border-border',
                    )}
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 scale-0 rounded bg-foreground px-1 py-0.5 text-[7px] uppercase tracking-luxe text-background opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap z-10">
                    {col.name}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Size Section */}
      <div className="border-b border-border/60 pb-3">
        <button
          type="button"
          onClick={() => toggleSection('size')}
          className="flex w-full items-center justify-between text-[10px] uppercase tracking-luxe text-foreground font-medium py-0.5"
        >
          Size
          {openSections.size ? <ChevronUp className="size-2.5" /> : <ChevronDown className="size-2.5" />}
        </button>

        {openSections.size && (
          <div className="mt-2 grid grid-cols-4 gap-1 max-h-32 overflow-y-auto pr-1 scrollbar-thin animate-fade-in">
            {SIZES.map((sz) => {
              const active = selectedSize === sz
              return (
                <button
                  key={sz}
                  type="button"
                  onClick={() => onSizeChange(active ? null : sz)}
                  className={cn(
                    'border py-1.5 text-[9px] text-center uppercase transition-all duration-300',
                    active
                      ? 'border-primary bg-primary text-primary-foreground font-semibold'
                      : 'border-border bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground',
                  )}
                >
                  {sz}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="pb-1.5">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="flex w-full items-center justify-between text-[10px] uppercase tracking-luxe text-foreground font-medium py-0.5"
        >
          Price Range
          {openSections.price ? <ChevronUp className="size-2.5" /> : <ChevronDown className="size-2.5" />}
        </button>

        {openSections.price && (
          <div className="mt-2 space-y-2.5 animate-fade-in">
            <div className="flex items-center gap-1.5">
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground">$</span>
                <input
                  type="number"
                  min={0}
                  max={3000}
                  value={minPrice}
                  onChange={(e) => onMinPriceChange(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Min"
                  className="w-full border border-border bg-transparent py-1 pl-4.5 pr-1 text-[10px] outline-none focus:border-foreground"
                />
              </div>
              <span className="text-muted-foreground text-[10px]">—</span>
              <div className="relative flex-1">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-muted-foreground">$</span>
                <input
                  type="number"
                  min={0}
                  max={3000}
                  value={maxPrice}
                  onChange={(e) => onMaxPriceChange(Math.min(3000, parseInt(e.target.value) || 3000))}
                  placeholder="Max"
                  className="w-full border border-border bg-transparent py-1 pl-4.5 pr-1 text-[10px] outline-none focus:border-foreground"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {[
                { label: 'Under $250', min: 0, max: 250 },
                { label: '$250 - $500', min: 250, max: 500 },
                { label: '$500 - $1000', min: 500, max: 1000 },
                { label: '$1000+', min: 1000, max: 3000 },
              ].map((preset) => {
                const active = minPrice === preset.min && maxPrice === preset.max
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      onMinPriceChange(preset.min)
                      onMaxPriceChange(preset.max)
                    }}
                    className={cn(
                      'border px-1.5 py-0.5 text-[8px] uppercase tracking-luxe transition-all duration-300',
                      active
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground',
                    )}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
