"use client"
import Btn from '@/Components/Btn/Btn';
import ProductImageCarousel from '@/Components/ProductImageCarousel/ProductImageCarousel'
import SelectColor from '@/Components/SelectColor/SelectColor';
import SelectWeight from '@/Components/SelectWeight/SelectWeight';
import useCart from '@/Hooks/useCart';
import { Box, Typography } from '@mui/material'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Product {
  images: string[];
  title: string;
  price: number;
  description: string;
  weight : string;
  category: string;
  size?: string;
  newPrice?: number;
  sizes?: { size: string; price: string; weight?: any }[];
  colors ?: string[];
  // multisize not mutli lol
  mutlisize ?: boolean;
}

const Page = () => {
  const [product, setProduct] = useState<Product | null>(null);
  console.log('product: ', product);
 


  const [error, setError] = useState<string | null>(null);
  const { productId } = useParams();
  const { addToCart } = useCart();

  const [currentPrice, setPrice] = useState<number>(0);
  const [selectedColor, setColor] = useState<string | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<number>(0);
  console.log('selectedWeight: ', selectedWeight);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const productHasWeight = selectedWeight || product?.weight
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/get-by-id?id=${productId}`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        
        const data = await response.json();
        setProduct(data?.product);
      } catch (err: any) {
        setError(err?.message || 'An unexpected error occurred');
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      setPrice(typeof product.newPrice === 'number' && 
        Number(product.newPrice) >= 0 ? Number(product.newPrice) :  sizes && 
        sizes?.length > 0 ?
        Number(sizes[0]?.price) : 
        Number(product.price));

        setSelectedSize(sizes ? `${sizes[0]?.size}` : size || '');
        setColor(colors? colors[0] : null);
    }
  }, [product]);

  if (error) return <Box sx={{height:'70vh',alignItems:'center'}} className='flex auto center text-center '>Something went wrong! {' '}  <span>  <Link href='/'>Go Home</Link></span></Box>;
  if (!product) return <Box sx={{height:'70vh',alignItems:'center'}} className=' flex auto center text-center '>Loading Product Details</Box>;

  const {colors, size, weight, images, description, title, sizes, category } = product;

  const handleCart = () => {
    const itemToAdd = {
      title,
      category,
      img: images?.length > 0 ? images[0] : '',
      _id: `${productId}`,
      price: currentPrice,
      productselectedSize:selectedSize && selectedSize != 'undefined' ? selectedSize : size || '',
      productselectedColor: selectedColor,
      weight: 
      product?.mutlisize === true ? Number(selectedWeight ? selectedWeight : weight) : Number(weight) || 0
    };
  
    addToCart(1, `${productId}`, itemToAdd);
  };

  return (
    <Box sx={{ maxWidth: 'lg', pt: 2 }} className='lg auto'>
      <Box sx={{ px: 1 }} className='flex row space-evenly wrap'>
        <Box sx={{ width: { xs: '100%', md: '600px' } }}>
          <ProductImageCarousel images={images} />
        </Box>

        <Box sx={{ mt: 4, width: { xs: '100%', md: 'auto' } }}>
          <Typography sx={{ fontSize: { xs: '.8em', sm: '1em' } }} component='h1'>
            {category}
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.3em', sm: '1.6em' } }} component='h1'>
            {title}
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.2em', sm: '1.2em', pt: 1 } }} component='p'>
            ${currentPrice}
          </Typography>

          <Box>
          {sizes && sizes[0]?.size?.length > 0 &&  <SelectWeight 
          
          setSelectedWeight={setSelectedWeight}
          selectedSize={selectedSize} setSelectedSize={setSelectedSize} setPrice={setPrice} sizes={sizes} />}
            <SelectColor setColor={setColor} colors={colors} />
          </Box>
          <Box>
            
            <Btn 
            onClick={()=>handleCart()}
            sx={{width:'100%',my:1,border:'1px solid'}}>
              ADD TO CART
            </Btn>

     {size &&       <Box className='flex gap1' sx={{mt:4,borderBottom:'1px solid #00000025',px:1,py:.5}}>
      <Typography component='h1'>
      Dimensions:
      </Typography>
   <Typography 
    className='gray' 
    sx={{maxWidth:'100%'}}
    component='h2'
  >
    {size}
  </Typography>
   </Box>}

   { productHasWeight
   
   
   &&       <Box className='flex gap1' sx={{mt:4,borderBottom:'1px solid #00000025',px:1,py:.5}}>
      <Typography component='h1'>
      Weight:
      </Typography>
   <Typography 
    className='gray' 
    sx={{maxWidth:'100%'}}
    component='h2'
  >
    {product?.mutlisize === true ? Number(selectedWeight ? selectedWeight : weight) : Number(weight) || 0 / 1000}kg
  </Typography>

   </Box>}

            <Box sx={{px:1,pt:4,maxWidth:'600px'}}>
      {/* <Typography component='h1'>
        Description:
      </Typography> */}
   <Typography 
    className='gray' 
    sx={{whiteSpace:'pre-wrap',maxWidth:'100%'}}
    dangerouslySetInnerHTML={{ __html: description }}
  />
   </Box>


            
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Page;