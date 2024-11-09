"use client"
import {Box, Divider, Typography} from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import { IProduct } from '@/Types/Types'
import Btn from '../Btn/Btn'
import SwiperCarousel from './SwiperCarousel/SwiperCarousel'
import { useRouter } from 'next/navigation'



const ProductCollection = ({sx,delay,text,Collectiontitle,data,setQuickView} : {
    Collectiontitle: string,
    delay : number,
    text : string,
    data?: IProduct[],
    sx ?: any;
    setQuickView ?: Dispatch<SetStateAction<{
        isOpen: boolean;
        productId: null | string;
    }>>
}) => {

    const router = useRouter()

    return (
        <Box
        id='shop'
            sx={{
            maxWidth: '1200px',
            // width :'99%',
            margin: '0 auto',
            // my: '3em',
            mt:'3em',
            mb:'3em',
            ...sx,
        }}>
             <Box className="flex center auto justify-between col   "
              sx={{pb:0,maxWidth:'lg'}}>

<Typography sx={{
  
  
  maxWidth:'1200px',
  pb:0,
  px:1,
  fontWeight:'300',
  fontSize:{xs:'.8em',sm:'1em'},
  }} component='h2' className='black animate-on-scroll text-center  '>
     EXPLORE OUR
  </Typography>
<Typography sx={{
  
  
    maxWidth:'1200px',
    pb:0,
    px:1,
    fontWeight:'300',
    fontSize:{xs:'1.5em',sm:'1.8em'},
    }} component='h1' className='animate-on-scroll text-center  '>
       {Collectiontitle}
    </Typography>




</Box>
            
            <Box
                sx={{
            width: '100%',
                display: {
                    xs: "flex",
                 
                }
            }}>
                <SwiperCarousel
                delay={delay}
                
                data={data && data.length > 0 
                && data?.slice(0,25) || []}/>
            </Box>
            <Btn 
            className='animate-on-scroll'
sx={{width:'fit-content',mt:1,mx:'auto'}}
onClick={()=>router.push('/collections/products')}
>
   View More
</Btn>
   
{/* <Divider  light /> */}
        
                </Box>
                
                )
                
            }

export default ProductCollection