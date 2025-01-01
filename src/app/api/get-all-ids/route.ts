// File: `app/api/get-all-ids/route.ts`
import client from '@/database/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ProductsCollection = await client.db('EA').collection('Products');
    const productIds = await ProductsCollection
      .find({}, { projection: { _id: 1 } }) // Fetch only `_id`
      .toArray();

    const ids = productIds.map((doc : any) => doc._id.toString()); // Convert ObjectId to string

    return NextResponse.json({ success: true, ids });
  } catch (error) {
    console.error('Error fetching product IDs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch product IDs' });
  }
}
