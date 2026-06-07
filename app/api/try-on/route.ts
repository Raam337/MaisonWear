import { GoogleGenAI } from '@google/genai'

export const maxDuration = 120

export async function POST(req: Request) {
  try {
    const { userImage, prompt } = await req.json()

    if (!userImage) {
      return Response.json({ error: 'Please upload a photo of yourself first.' }, { status: 400 })
    }
    if (!prompt) {
      return Response.json({ error: 'Select at least one item to try on.' }, { status: 400 })
    }

    // Parse data URI to extract base64 bytes and mimeType
    const match = userImage.match(/^data:(.+?);base64,(.*)$/)
    if (!match) {
      return Response.json({ error: 'Invalid user image format.' }, { status: 400 })
    }
    const mimeType = match[1]
    const base64Data = match[2]

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: 'GEMINI_API_KEY is not configured in environment variables.' },
        { status: 500 },
      )
    }

    const ai = new GoogleGenAI({ apiKey })

    // Build multimodal prompt as requested: { text: ... } and inlineData
    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType,
          data: base64Data,
        },
      },
    ]

    console.log('[POST /api/try-on] Generating try-on content with prompt:', prompt)

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image',
      contents,
    })

    let generatedImageBase64 = ''
    let responseMimeType = 'image/png'

    // Extract inlineData part containing the generated image
    const candidate = response.candidates?.[0]
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
      // If we got text but no image, return it as an error or log it
      console.warn('[POST /api/try-on] Response did not contain inlineData. Text response:', response.text)
      return Response.json(
        { error: response.text || 'The try-on model did not return a generated image. Please try again.' },
        { status: 502 },
      )
    }

    const dataUrl = `data:${responseMimeType};base64,${generatedImageBase64}`
    return Response.json({ image: dataUrl })

  } catch (error) {
    console.error('[POST /api/try-on] Error:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'An error occurred during try-on generation.' },
      { status: 500 },
    )
  }
}
