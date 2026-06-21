import { Hero } from '@/components/hero'
import { products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

export default function HomePage() {
  // Curated select of first 4 items
  const curatedProducts = products.slice(0, 4)

  return (
    <main className="space-y-20 pb-20">
      <Hero />

      {/* Featured Pieces */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[11px] uppercase tracking-luxe text-accent font-semibold">The Curation</span>
          <h2 className="mt-2 font-serif text-3xl lg:text-4xl tracking-tight text-foreground">
            Featured Essentials
          </h2>
          <div className="mt-2.5 h-px w-10 bg-accent/60" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-6">
          {curatedProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 border border-foreground bg-foreground text-background px-8 py-4 text-xs uppercase tracking-luxe hover:bg-transparent hover:text-foreground transition-all duration-300"
          >
            Enter AI Fitting Room
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Brand Memos Section */}
      <section className="bg-secondary/15 py-20 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[11px] uppercase tracking-luxe text-accent font-semibold">The Journal</span>
            <h2 className="mt-2 font-serif text-3xl lg:text-4xl tracking-tight text-foreground">
              {SITE_CONFIG.name} Memos
            </h2>
            <p className="mt-3 text-xs uppercase tracking-luxe text-muted-foreground">
              Notes on style, materials, and craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
            {/* Memo 01 */}
            <article className="bg-background border border-border/60 p-8 lg:p-10 flex flex-col justify-between hover:shadow-lg hover:border-border transition-all duration-500 relative group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-3xl lg:text-4xl italic text-accent/30 group-hover:text-accent/60 transition-colors duration-500">01</span>
                  <FileText className="size-4.5 text-muted-foreground/30 group-hover:text-accent/50 transition-colors" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl tracking-tight text-foreground">
                    Sartorial Harmony
                  </h3>
                  <p className="text-[11px] uppercase tracking-luxe text-muted-foreground font-medium">Style / Silhouette</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                  A study in proportions and layering. Our Autumn Edit explores the interplay between structured tailored overcoats and soft, fluid cashmere knitwear. Each piece is designed to build a unified, clean silhouette that balances weight and texture seamlessly.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border/40 text-[10px] uppercase tracking-luxe text-muted-foreground font-medium">
                Released: Oct 2026
              </div>
            </article>

            {/* Memo 02 */}
            <article className="bg-background border border-border/60 p-8 lg:p-10 flex flex-col justify-between hover:shadow-lg hover:border-border transition-all duration-500 relative group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-3xl lg:text-4xl italic text-accent/30 group-hover:text-accent/60 transition-colors duration-500">02</span>
                  <FileText className="size-4.5 text-muted-foreground/30 group-hover:text-accent/50 transition-colors" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl tracking-tight text-foreground">
                    Noble Materials
                  </h3>
                  <p className="text-[11px] uppercase tracking-luxe text-muted-foreground font-medium">Provenance / Quality</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                  We believe that luxury begins with raw materials. From grade-A cashmere sourced from the Mongolian plains to hand-selected full-grain calf leathers from local Italian tanneries, every thread and hide is chosen for its longevity, texture, and natural hand-feel.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border/40 text-[10px] uppercase tracking-luxe text-muted-foreground font-medium">
                Released: Nov 2026
              </div>
            </article>

            {/* Memo 03 */}
            <article className="bg-background border border-border/60 p-8 lg:p-10 flex flex-col justify-between hover:shadow-lg hover:border-border transition-all duration-500 relative group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-3xl lg:text-4xl italic text-accent/30 group-hover:text-accent/60 transition-colors duration-500">03</span>
                  <FileText className="size-4.5 text-muted-foreground/30 group-hover:text-accent/50 transition-colors" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl tracking-tight text-foreground">
                    The European Atelier
                  </h3>
                  <p className="text-[11px] uppercase tracking-luxe text-muted-foreground font-medium">Craft / Heritage</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground font-light">
                  Partnering with family-run workshops in Italy, Scotland, and Portugal, we maintain a commitment to traditional tailoring techniques. Each garment represents hours of dedicated handwork, ensuring that every seam, drape, and buttonhole meets our standards.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border/40 text-[10px] uppercase tracking-luxe text-muted-foreground font-medium">
                Released: Dec 2026
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}
