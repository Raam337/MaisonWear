import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function POST(req: Request) {
  try {
    const { selectedProducts } = await req.json()
    
    // Log the request to demonstrate activity
    console.log(
      '[POST /api/generate-outfit] Simulating try-on generation for: ',
      selectedProducts?.map((p: any) => `${p.brand} - ${p.name}`).join(', '),
    )

    // Simulate 3 second AI generation latency
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Read the mock premium result image
    const filePath = path.join(process.cwd(), 'public', 'try-on', 'result.png')
    const fileBuffer = await readFile(filePath)
    const base64Image = fileBuffer.toString('base64')
    const generatedImage = `data:image/png;base64,${base64Image}`

    return Response.json({ generatedImage })
  } catch (error) {
    console.error('[POST /api/generate-outfit] Error:', error)
    return Response.json(
      { error: 'An error occurred while simulating outfit try-on.' },
      { status: 500 },
    )
  }
}
