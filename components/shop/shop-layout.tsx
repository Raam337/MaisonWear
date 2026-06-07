'use client'

import { useState, useMemo } from 'react'
import { products as allProducts } from '@/lib/products'
import { ProductSearch } from './product-search'
import { ProductFilters } from './product-filters'
import { ProductGrid } from './product-grid'
import { VirtualTryOnPreview } from './virtual-try-on-preview'
import { useTryOn } from '@/app/shop/try-on-context'

// Mapping categories from database to requested categories
const CATEGORY_MAP: Record<string, string[]> = {
  Jackets: ['Coats'],
  Shirts: ['Shirts', 'Knitwear'],
  Trousers: ['Trousers'],
  Shoes: ['Shoes'],
  Accessories: ['Accessories', 'Bags'],
}

export function ShopLayout() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(3000)

  // Filters logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const nameMatch = product.name.toLowerCase().includes(query)
        const brandMatch = product.brand.toLowerCase().includes(query)
        if (!nameMatch && !brandMatch) return false
      }

      // 2. Category Filter
      if (selectedCategory) {
        const targetCategories = CATEGORY_MAP[selectedCategory] || []
        if (!targetCategories.includes(product.category)) return false
      }

      // 3. Color Filter
      if (selectedColor) {
        const colLower = selectedColor.toLowerCase()
        const matchMain = product.color.toLowerCase() === colLower
        const matchColors = product.colors?.some((c) => c.toLowerCase() === colLower)
        if (!matchMain && !matchColors) return false
      }

      // 4. Size Filter
      if (selectedSize) {
        const sizeExists = product.sizes?.includes(selectedSize)
        if (!sizeExists) return false
      }

      // 5. Price Filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, selectedColor, selectedSize, minPrice, maxPrice])

  const handleClearAll = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedColor(null)
    setSelectedSize(null)
    setMinPrice(0)
    setMaxPrice(3000)
  }

  return (
    <div className="w-full min-h-[calc(100vh-120px)] bg-background">
      <div className="flex flex-col lg:flex-row items-stretch gap-0">
        
        {/* Left Panel: Filters + Product Browsing */}
        <section className="w-full lg:w-[50vw] order-2 lg:order-1 p-6 lg:p-10 xl:p-12 flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl tracking-luxe uppercase text-foreground lg:text-4xl">
              Browse Collection
            </h2>
            <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
              Select items to try them on in the virtual room
            </p>
          </div>

          <ProductSearch value={searchQuery} onChange={setSearchQuery} />

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Column of Left Section: Filters list */}
            <div className="w-full md:w-[220px] lg:w-[240px] shrink-0 bg-secondary/15 p-4 md:bg-transparent md:p-0 border md:border-0 border-border/40 md:sticky md:top-6">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                onClearAll={handleClearAll}
              />
            </div>
            
            {/* Right Column of Left Section: Items grid */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-luxe text-muted-foreground border-b border-border/40 pb-2">
                <span>Showing {filteredProducts.length} Pieces</span>
              </div>
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </section>

        {/* Right Panel: Virtual Try-On Preview (50vw) */}
        <section className="w-full lg:w-[50vw] order-1 lg:order-2 lg:sticky lg:top-[125px] h-fit lg:h-[calc(100vh-125px)] border-t lg:border-t-0 lg:border-l border-border/60 bg-secondary/5">
          <VirtualTryOnPreview />
        </section>

      </div>
    </div>
  )
}
