import { Metadata } from 'next'
import { TryOnProvider } from './try-on-context'
import { ShopLayout } from '@/components/shop/shop-layout'
import { SITE_CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: `AI Fitting Room — ${SITE_CONFIG.name} | Virtual Try-On Experience`,
  description:
    'Browse our luxury fashion collection, upload your photo, and generate a photorealistic outfit preview with our virtual AI try-on engine.',
}

export default function ShopPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-background flex flex-col">
      {/* Breadcrumb nav */}
      <nav className="w-full px-6 py-3 text-[10px] uppercase tracking-luxe text-muted-foreground border-b border-border/40 bg-background">
        <span className="text-muted-foreground/60">Home</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">AI Fitting Room</span>
      </nav>

      <TryOnProvider>
        <ShopLayout />
      </TryOnProvider>
    </main>
  )
}
