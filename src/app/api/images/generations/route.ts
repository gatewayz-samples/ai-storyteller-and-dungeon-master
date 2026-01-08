import { NextRequest, NextResponse } from 'next/server';

interface ImageGenerationRequest {
  prompt: string;
  model?: string;
  size?: string;
  n?: number;
  quality?: 'standard' | 'hd';
  style?: 'natural' | 'vivid';
  provider?: string;
  portkey_provider?: string;
  portkey_virtual_key?: string;
  google_project_id?: string;
  google_location?: string;
  google_endpoint_id?: string;
}

interface ImageData {
  url: string;
  b64_json?: string;
}

interface ImageGenerationResponse {
  created: number;
  data: ImageData[];
  provider?: string;
  model?: string;
  gateway_usage?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ImageGenerationRequest = await request.json();
    const {
      prompt,
      model,
      size,
      n,
      quality,
      style,
      provider,
      portkey_provider,
      portkey_virtual_key,
      google_project_id,
      google_location,
      google_endpoint_id
    } = body;

    const apiKey = process.env.GATEWAYZ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Build the request body according to the OpenAPI spec
    const requestBody: ImageGenerationRequest = {
      prompt,
      model: model || 'stabilityai/sd3.5',
      size: size || '1024x1024',
      n: n ?? 1,
      quality: quality || 'standard',
      style: style || 'natural',
      provider: provider || 'deepinfra',
    };

    // Add optional fields if provided
    if (portkey_provider) requestBody.portkey_provider = portkey_provider;
    if (portkey_virtual_key) requestBody.portkey_virtual_key = portkey_virtual_key;
    if (google_project_id) requestBody.google_project_id = google_project_id;
    if (google_location) requestBody.google_location = google_location;
    if (google_endpoint_id) requestBody.google_endpoint_id = google_endpoint_id;

    const response = await fetch('https://api.gatewayz.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gatewayz API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate image', details: errorData },
        { status: response.status }
      );
    }

    const data: ImageGenerationResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Image Generation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
