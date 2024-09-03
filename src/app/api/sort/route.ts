import client from '@/database/mongodb';
import { NextResponse } from 'next/server';
import type { NextApiResponse } from 'next';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
    try {
        const { nextUrl } = req;
        const category = nextUrl.searchParams.get('category');
        const search = nextUrl.searchParams.get('search');
        const sort = nextUrl.searchParams.get('sort') || 'latest';
        const type = nextUrl.searchParams.get('type');

        let sortCriteria;
        switch (sort) {
            case 'latest':
                sortCriteria = { _id: -1 };
                break;
            case 'highestPrice':
                sortCriteria = { convertedPrice: -1 };
                break;
            case 'lowestPrice':
                sortCriteria = { convertedPrice: 1 };
                break;
            default:
                sortCriteria = { _id: -1 };
        }

        let filterByCate = !category || ['collections', 'all', 'category'].includes(category.toLocaleLowerCase()) ? null : category.toLocaleLowerCase();
        let filterByType = !type || ['all', 'null', 'collections'].includes(type.toLocaleLowerCase()) ? null : decodeURIComponent(type).toLocaleLowerCase();

        const ProductsCollection = await client.db("EA").collection("Products");

        let ProductsQuery = search && search.length > 1 ?  
            await ProductsCollection.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { type: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } }
                ]
            }) :
            await ProductsCollection.aggregate([
                {
                    $match: filterByType && filterByCate ? { category: filterByCate, type: filterByType } :
                            filterByCate ? { category: filterByCate } :
                            filterByType ? { type: filterByType } : {}
                },
                {
                    $addFields: {
                        convertedPrice: {
                            $convert: {
                                input: '$price',
                                to: 'double',
                                onError: 0,
                                onNull: 0
                            }
                        }
                    }
                },
                { $sort: sortCriteria },
                { $limit: 50 }
            ]);

        let products : any = [];
        await ProductsQuery.forEach((doc: any) => products.push(doc));

        if (!products.length) {
            return NextResponse.json({ success: false });
        }
        return NextResponse.json({
            success: true,
            data: { products }
        });
    } catch (e) {
        console.log('e sort function: ', e);
        return NextResponse.json({ success: false, data: { products: null } });
    }
}

export const dynamic = 'force-dynamic';
