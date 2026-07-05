// AI Service for Figure Generation
// Uses OpenAI API to generate scientific figures from text descriptions

interface GenerationRequest {
  description: string
  discipline: string
  template?: string
  style?: 'professional' | 'academic' | 'modern'
  colorScheme?: string
}

interface GenerationResponse {
  success: boolean
  figureData?: FigureData
  error?: string
  generationTime: number
}

interface FigureData {
  type: 'flowchart' | 'diagram' | 'graph' | 'process' | 'hierarchy'
  nodes?: FigureNode[]
  links?: FigureLink[]
  elements?: FigureElement[]
  chartData?: ChartDataPoint[]
  svg?: string
  latex?: string[]
}

interface FigureNode {
  id: string
  label: string
  x?: number
  y?: number
}

interface FigureLink {
  source: number
  target: number
  label?: string
}

interface FigureElement {
  id: string
  shape: 'circle' | 'rect' | 'line' | 'arrow'
  x?: number
  y?: number
  width?: number
  height?: number
  radius?: number
  label?: string
  fill?: string
  stroke?: string
}

interface ChartDataPoint {
  label: string
  value: number
}

class AIService {
  private apiKey: string
  private model: string
  private baseUrl: string = 'https://api.openai.com/v1'

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || ''
    this.model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4'
  }

  async generate(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now()

    if (!this.apiKey) {
      // Return mock data for demo
      return {
        success: true,
        figureData: this.getMockFigureData(request),
        generationTime: Date.now() - startTime
      }
    }

    try {
      const prompt = this.buildPrompt(request)

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are an expert scientific figure generator. Based on the user's description, generate a structured figure definition that can be rendered by D3.js.
Return JSON in this exact format:
{
  "type": "flowchart|diagram|graph|process|hierarchy",
  "nodes": [{"id": "n1", "label": "Step 1"}, ...],
  "links": [{"source": 0, "target": 1}, ...],
  "elements": [{"shape": "circle|rect", "x": 100, "y": 100, "radius": 40, "label": "A"}, ...],
  "chartData": [{"label": "Jan", "value": 100}, ...]
}`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content

      if (!content) {
        throw new Error('No content in response')
      }

      // Parse the JSON response
      const figureData = JSON.parse(content) as FigureData

      return {
        success: true,
        figureData,
        generationTime: Date.now() - startTime
      }
    } catch (error) {
      console.error('Generation error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        generationTime: Date.now() - startTime
      }
    }
  }

  private buildPrompt(request: GenerationRequest): string {
    return `Create a scientific figure for ${request.discipline} with the following description:

"${request.description}"

Requirements:
- Figure type: ${request.template || 'auto-detect from description'}
- Style: ${request.style || 'professional academic'}
- Color scheme: ${request.colorScheme || 'default'}
- The figure should be suitable for publication in a scientific journal
- Include clear labels and proper sizing`
  }

  private getMockFigureData(request: GenerationRequest): FigureData {
    // Return mock data for demo purposes
    if (request.description.toLowerCase().includes('crispr') || request.description.toLowerCase().includes('flow')) {
      return {
        type: 'flowchart',
        nodes: [
          { id: 'n1', label: 'Guide RNA Design' },
          { id: 'n2', label: 'Cas9 Binding' },
          { id: 'n3', label: 'DNA Cleavage' },
          { id: 'n4', label: 'Gene Editing' }
        ],
        links: [
          { source: 0, target: 1 },
          { source: 1, target: 2 },
          { source: 2, target: 3 }
        ]
      }
    }

    if (request.description.toLowerCase().includes('graph') || request.description.toLowerCase().includes('data')) {
      return {
        type: 'graph',
        chartData: [
          { label: 'Jan', value: 30 },
          { label: 'Feb', value: 45 },
          { label: 'Mar', value: 60 },
          { label: 'Apr', value: 55 },
          { label: 'May', value: 70 },
          { label: 'Jun', value: 85 }
        ]
      }
    }

    return {
      type: 'diagram',
      elements: [
        { id: 'e1', shape: 'circle', x: 100, y: 100, radius: 50, label: 'A', fill: '#e0f2fe' },
        { id: 'e2', shape: 'circle', x: 250, y: 100, radius: 50, label: 'B', fill: '#dcfce7' },
        { id: 'e3', shape: 'rect', x: 175, y: 200, width: 100, height: 60, label: 'C', fill: '#fef3c7' }
      ]
    }
  }

  async enhanceDescription(description: string): Promise<string> {
    if (!this.apiKey) {
      return description
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are a scientific writing assistant. Enhance the following figure description to be more precise and detailed for AI generation. Keep it concise but add relevant scientific details.'
            },
            {
              role: 'user',
              content: description
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      })

      const data = await response.json()
      return data.choices[0]?.message?.content || description
    } catch {
      return description
    }
  }
}

export const aiService = new AIService()
export type { GenerationRequest, GenerationResponse, FigureData }