// File: `app/sitemap.xml/route.ts`
import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.earchitecture-lb.com/';

export async function GET() {
  try {
    // Fetch all product IDs from the get-all-ids API
    const response = await fetch(`${BASE_URL}/api/get-all-ids`);
    const { ids } = await response.json();

    if (!ids || ids.length === 0) {
      throw new Error('No product IDs found.');
    }

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${BASE_URL}</loc>
          <priority>1.0</priority>
        </url>

<url>
  <loc>https://www.earchitecture-lb.com/about</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/collection/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.80</priority>
</url>
        ${ids
          .map(
            (id: string) => `
        <url>
          <loc>${BASE_URL}/product/${id}</loc>
          <priority>0.8</priority>
        </url>
        `
          )
          .join('')}
      </urlset>
    `;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Failed to generate sitemap', { status: 500 });
  }
}
