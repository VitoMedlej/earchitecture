import { NextResponse } from 'next/server';

const BASE_URL = 'https://www.earchitecture-lb.com/';

export async function GET() {
  try {
    // Fetch all product IDs from the get-all-ids API
    const response = await fetch(`${BASE_URL}/api/get-all-ids`);
    if (!response.ok) {
      throw new Error(`Failed to fetch IDs: ${response.statusText}`);
    }
    const { ids } = await response.json();

    if (!ids || ids.length === 0) {
      throw new Error('No product IDs found.');
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.earchitecture-lb.com/about</loc>
    <lastmod>2024-12-05T10:02:12+00:00</lastmod>
    <priority>0.99</priority>
  </url>
  <url>

    <loc>https://www.earchitecture-lb.com/collection/products</loc>
    <lastmod>2024-12-05T10:02:12+00:00</lastmod>
    <priority>0.95</priority>
  </url>
  <url>
  <loc>https://www.earchitecture-lb.com/aluminum%20trays/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/bathroom%20accessories/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/bookends/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/christmas%20collection/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/coat%20hangers/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/firewood%20storage/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/key%20racks/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/kitchen%20accessories/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/metal%20furniture/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/plant%20boxes/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/shelves/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/tables/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/umbrella%20stands/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/wall%20art/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/wall%20clocks/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
<url>
  <loc>https://www.earchitecture-lb.com/wine%20storage/products</loc>
  <lastmod>2024-12-05T10:02:12+00:00</lastmod>
  <priority>0.90</priority>
</url>
  ${ids
    .map(
      (id: string) => `
  <url>
    <loc>${BASE_URL}product/${id}</loc>
    <priority>0.75</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    return new Response(sitemap.trim(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Failed to generate sitemap', { status: 500 });
  }
}
