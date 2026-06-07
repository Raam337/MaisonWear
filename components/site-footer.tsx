'use client'

import Link from 'next/link'
import { categories } from '@/lib/products'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-2xl tracking-[0.3em] uppercase">
              Maison
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A curated edit of the world&apos;s finest menswear, delivered with
              uncompromising service.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-luxe text-muted-foreground">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/?category=${encodeURIComponent(c)}`}
                    className="text-sm text-foreground transition-colors hover:text-accent"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-luxe text-muted-foreground">
              Client Care
            </h3>
            <ul className="mt-4 space-y-3">
              {['Contact Us', 'Shipping & Returns', 'Order Tracking', 'Size Guide', 'FAQ'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-foreground transition-colors hover:text-accent"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-luxe text-muted-foreground">
              The House
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Subscribe for private previews and new arrivals.
            </p>
            <form
              className="mt-4 flex border-b border-foreground"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-luxe text-foreground transition-colors hover:text-accent"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Maison. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-accent">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
