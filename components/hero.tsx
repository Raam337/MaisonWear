'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { resolveAsset } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/config'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const [heroImage, setHeroImage] = useState<string>(resolveAsset('/hero-main.png'))

  useEffect(() => {
    try {
      const storedImage = localStorage.getItem(`${SITE_CONFIG.slug}-last-generated-image`)
      if (storedImage) {
        setHeroImage(storedImage)
      }
    } catch (e) {
      console.warn('Failed to load last generated image from localStorage:', e)
    }
  }, [])

  return (
    <section className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image side */}
        <div className="relative order-1 aspect-[4/5] overflow-hidden bg-secondary lg:order-2 lg:aspect-auto lg:min-h-[640px]">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease }}
            className="absolute inset-0 flex items-center justify-center bg-secondary"
          >
            {/* If it's a custom/generated image, render a blurred background underlay */}
            {heroImage !== resolveAsset('/hero-main.png') && (
              <div className="absolute inset-0 select-none pointer-events-none">
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  className="object-cover blur-2xl opacity-45 scale-110"
                />
              </div>
            )}
            <Image
              src={heroImage}
              alt="Model wearing a camel wool overcoat"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={heroImage === resolveAsset('/hero-main.png') ? 'object-cover' : 'object-contain relative z-10'}
            />
          </motion.div>
        </div>

        {/* Text side */}
        <div className="order-2 flex items-center bg-background px-6 py-16 lg:order-1 lg:px-16 lg:py-24">
          <div className="max-w-md">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="text-xs uppercase tracking-luxe text-accent"
            >
              The Autumn Edit
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-balance lg:text-6xl"
            >
              Considered tailoring for the modern man
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-6 text-pretty leading-relaxed text-muted-foreground"
            >
              A curated selection of seasonal essentials, crafted from the finest
              materials by leading ateliers across Europe.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link
                href="#shop"
                className="bg-primary px-8 py-4 text-xs uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop the Edit
              </Link>
              <Link
                href="/?category=Coats"
                className="border border-foreground px-8 py-4 text-xs uppercase tracking-luxe text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                New In Coats
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Editorial strip */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <EditorialTile
          image="/hero-secondary.png"
          eyebrow="Tailoring"
          title="The Sharp Suit"
          href="/?category=Trousers"
        />
        <EditorialTile
          image="/editorial-1.png"
          eyebrow="Lifestyle"
          title="Off-Duty Linen"
          href="/?category=Shirts"
        />
      </div>
    </section>
  )
}

function EditorialTile({
  image,
  eyebrow,
  title,
  href,
}: {
  image: string
  eyebrow: string
  title: string
  href: string
}) {
  return (
    <Link href={href} className="group relative block aspect-[16/10] overflow-hidden bg-secondary">
      <Image
        src={resolveAsset(image || '/placeholder.svg')}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 text-background">
        <p className="text-xs uppercase tracking-luxe opacity-80">{eyebrow}</p>
        <h3 className="mt-2 font-serif text-3xl">{title}</h3>
        <span className="mt-3 inline-block border-b border-background pb-1 text-xs uppercase tracking-luxe">
          Discover
        </span>
      </div>
    </Link>
  )
}
