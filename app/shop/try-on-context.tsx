'use client'

import React, { createContext, useContext, useState } from 'react'
import type { Product } from '@/lib/products'
import { resolveAsset } from '@/lib/utils'

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

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured in environment variables.')
      }

      const match = userImage.match(/^data:(.+?);base64,(.*)$/)
      if (!match) {
        throw new Error('Invalid user image format.')
      }
      const mimeType = match[1]
      const base64Data = match[2]

      const model = 'gemini-3.1-flash-image'
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  {
                    inlineData: {
                      mimeType,
                      data: base64Data,
                    },
                  },
                ],
              },
            ],
          }),
        }
      )

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        const errMsg = errData.error?.message || 'Failed to generate try-on outfit via Gemini API.'
        throw new Error(errMsg)
      }

      const data = await response.json()

      let generatedImageBase64 = ''
      let responseMimeType = 'image/png'

      const candidate = data.candidates?.[0]
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            generatedImageBase64 = part.inlineData.data
            if (part.inlineData.mimeType) {
              responseMimeType = part.inlineData.mimeType
            }
            break
          }
        }
      }

      if (!generatedImageBase64) {
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
        throw new Error(
          textResponse || 'The try-on model did not return a generated image. Please try again.'
        )
      }

      const dataUrl = `data:${responseMimeType};base64,${generatedImageBase64}`
      setGeneratedImageState(dataUrl)
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
