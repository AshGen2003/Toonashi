import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const episodeId = searchParams.get('episodeId');
  const server = searchParams.get('serverName');
  const proxyUrl = searchParams.get('proxyUrl');
  const referer = searchParams.get('referer');

  // Proxy logic for video streams and downloads
  if (proxyUrl) {
    try {
      const headers = new Headers();
      if (referer) {
        headers.set('Referer', referer);
      }
      // Forward Range header for seeking
      if (request.headers.has('Range')) {
        headers.set('Range', request.headers.get('Range')!);
      }

      const response = await fetch(proxyUrl, {
        headers: headers,
      });

      // Create a streaming response
      const responseHeaders = new Headers(response.headers);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return NextResponse.json({ error: 'Failed to proxy stream' }, { status: 500 });
    }
  }

  // Metadata logic
  if (episodeId && server) {
    try {
      const apiBase = 'https://api.consumet.org';
      const apiUrl = `${apiBase}/anime/gogoanime/watch/${episodeId}?server=${server}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Animexus/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error('Stream API error:', error);
      return NextResponse.json({ error: 'Failed to fetch stream data' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
}