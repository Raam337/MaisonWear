'use client'

import React, { createContext, useContext, useState } from 'react'
import type { Product } from '@/lib/products'

export interface TryOnState {
  userImage: string | null
  uploadedImages: string[]
  selectedProducts: Product[]
  generatedImage: string | null
  generating: boolean
}

interface TryOnContextType extends TryOnState {
  toggleProductSelection: (product: Product) => void
  setUserImage: (image: string | null) => void
  addUploadedImage: (image: string) => void
  setGeneratedImage: (image: string | null) => void
  triggerTryOnGeneration: () => Promise<void>
  resetTryOn: () => void
  clearSelections: () => void
}

const TryOnContext = createContext<TryOnContextType | undefined>(undefined)

export function TryOnProvider({ children }: { children: React.ReactNode }) {
  const [userImage, setUserImageState] = useState<string | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [generatedImage, setGeneratedImageState] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const setUserImage = (image: string | null) => {
    setUserImageState(image)
    // Clear any previous generation when photo changes
    setGeneratedImageState(null)
  }

  const addUploadedImage = (image: string) => {
    setUploadedImages((prev) => {
      if (prev.includes(image)) return prev
      return [...prev, image]
    })
    setUserImageState(image)
    setGeneratedImageState(null)
  }

  const setGeneratedImage = (image: string | null) => {
    setGeneratedImageState(image)
  }

  const resetTryOn = () => {
    setGeneratedImageState(null)
    setGenerating(false)
  }

  const clearSelections = () => {
    setSelectedProducts([])
    setGeneratedImageState(null)
  }

  const triggerTryOnGeneration = async () => {
    if (!userImage || selectedProducts.length === 0 || generating) return

    setGenerating(true)
    setGeneratedImageState(null)

    try {
      const prompt = `Generate a photorealistic fashion photo of me wearing the following outfit: ${selectedProducts.map((p) => `${p.name} by ${p.brand} (${p.color})`).join(', ')}. Keep my face, body, posture, and the background identical. Output only the final image.`

      let response: Response | null = null
      let isStaticDemo = false

      try {
        response = await fetch('/api/try-on', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userImage,
            prompt,
          }),
        })

        if (response.status === 404) {
          isStaticDemo = true
        }
      } catch (e) {
        isStaticDemo = true
      }

      if (isStaticDemo) {
        // Fallback for static hosts (GitHub Pages) - simulate network latency for the scanner
        await new Promise((resolve) => setTimeout(resolve, 2500))
        setGeneratedImageState('/try-on/result.png')
        return
      }

      if (!response || !response.ok) {
        const errData = response ? await response.json().catch(() => ({})) : {}
        throw new Error(errData.error || 'Failed to generate try-on outfit.')
      }

      const data = await response.json()
      if (data.image) {
        setGeneratedImageState(data.image)
      } else {
        throw new Error('No image returned from the server.')
      }
    } catch (error) {
      console.error('Try-on error:', error)
      alert(error instanceof Error ? error.message : 'An error occurred during generation.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <TryOnContext.Provider
      value={{
        userImage,
        uploadedImages,
        selectedProducts,
        generatedImage,
        generating,
        toggleProductSelection,
        setUserImage,
        addUploadedImage,
        setGeneratedImage,
        triggerTryOnGeneration,
        resetTryOn,
        clearSelections,
      }}
    >
      {children}
    </TryOnContext.Provider>
  )
}

export function useTryOn() {
  const context = useContext(TryOnContext)
  if (context === undefined) {
    throw new Error('useTryOn must be used within a TryOnProvider')
  }
  return context
}
