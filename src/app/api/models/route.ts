import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GATEWAYZ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters according to OpenAPI spec
    const provider = searchParams.get('provider');
    const limit = searchParams.get('limit') || '50';
    const offset = searchParams.get('offset') || '0';
    const include_huggingface = searchParams.get('include_huggingface') === 'true';
    const gateway = searchParams.get('gateway') || 'openrouter';

    // Build URL with query parameters
    const url = new URL('https://api.gatewayz.ai/v1/models');
    if (provider) url.searchParams.set('provider', provider);
    url.searchParams.set('limit', limit);
    url.searchParams.set('offset', offset);
    url.searchParams.set('include_huggingface', include_huggingface.toString());
    url.searchParams.set('gateway', gateway);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gatewayz API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch models', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Models API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
