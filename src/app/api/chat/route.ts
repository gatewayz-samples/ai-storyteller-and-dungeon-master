import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: string;
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
  tools?: Record<string, unknown>[];
  provider?: string;
  portkey_provider?: string;
  portkey_virtual_key?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatCompletionRequest = await request.json();
    const {
      messages,
      model,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
      stream,
      tools,
      provider,
      portkey_provider,
      portkey_virtual_key
    } = body;

    const apiKey = process.env.GATEWAYZ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Build the request body according to the OpenAPI spec
    const requestBody: ChatCompletionRequest = {
      model: model || 'openai/gpt-4o-mini',
      messages,
      max_tokens: max_tokens ?? 950,
      temperature: temperature ?? 1,
      top_p: top_p ?? 1,
      frequency_penalty: frequency_penalty ?? 0,
      presence_penalty: presence_penalty ?? 0,
      stream: stream ?? false,
    };

    // Add optional fields if provided
    if (tools) requestBody.tools = tools;
    if (provider) requestBody.provider = provider;
    if (portkey_provider) requestBody.portkey_provider = portkey_provider;
    if (portkey_virtual_key) requestBody.portkey_virtual_key = portkey_virtual_key;

    const response = await fetch('https://api.gatewayz.ai/v1/chat/completions', {
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
        { error: 'Failed to generate response', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
