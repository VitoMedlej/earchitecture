import DynamicProductClient from '@/Components/DynamicProductClient/DynamicProductClient';
import { ResolvingMetadata, Metadata } from 'next';
import React from 'react'


export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const productId = params.productId;


  const response = await fetch(`https://www.earchitecture-lb.com/api/get-by-id?id=${productId}`, {
    next: { revalidate: 200 },
  });

  if (!response.ok) {
    return {
      title: 'Product Page - Earchitecture-lb',
    };
  }

  const data = await response.json();
  const productTitle = data?.product?.title ? `${data?.product?.title} - Earchitecture-lb`:  'Product Page - Earchitecture-lb';

  return {
    title: productTitle,
    description: `Transform your Lebanese home with E.Architecture's bespoke metal furniture and modern decor. Crafted for style and durability, our designs elevate any space.`,
    icons: {
      icon: `https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG`,
    },
  };
}


const page = async (ctx : any) => {
  const {productId} = ctx?.params

  const response = await fetch(`https://www.earchitecture-lb.com/api/get-by-id?id=${productId}`, {next:{revalidate: 0}});
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  
  const data = await response.json();
  return (
    <>
    {data && <DynamicProductClient data={data} />}
    </>
  )
}

export default page