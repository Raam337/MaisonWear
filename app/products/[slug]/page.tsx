import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getRelated, products } from '@/lib/products'
import { ProductDetail } from '@/components/product-detail'
import { ProductCard } from '@/components/product-card'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: 'Product Not Found — Maison' }
  return {
    title: `${product.name} — ${product.brand} | Maison`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const related = getRelated(product)

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-4 py-4 text-xs uppercase tracking-luxe text-muted-foreground lg:px-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/?category=${encodeURIComponent(product.category)}`}
          className="hover:text-foreground"
        >
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <h2 className="text-center font-serif text-3xl tracking-tight lg:text-4xl">
            You May Also Like
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
