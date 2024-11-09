'use client'
import React, { useEffect, useState } from 'react'
import {Box, Divider, Typography} from '@mui/material'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/ai';

import { useRouter } from 'next/navigation'
import Btn from '@/Components/Btn/Btn';
import CartProduct from '@/Components/Shared/CartProduct/CartProduct';
import { ICartItem } from '@/Types/Types';
import { loadState, saveState } from '@/Utils/LocalstorageFn';
import totalCal from '@/Utils/totalCal';
import useDiscount from '@/Hooks/useDiscount';

const titleStyle = {
    fontSize: '1.3em',
    fontWeight: '600 !Important',
    
}
const textStyle = {
    color: '#000000b8'
}
const EmptyCartAlert = () => {
    return (
        <Box sx={{
            pb: 10,
            pt: 15
        }}>
            <Box
                className='flexed'
                sx={{
                flexDirection: 'column',
                textAlign: 'center',
                margin: '0 auto'
            }}>
                  <Box className='auto flex' sx={{
                    width: '60px',

                }}>
                    <img
                        src="data:image/jpeg;base64,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"
                        alt="Empty Cart Image"
                        className="img"/>
                </Box>
                <Typography fontSize='1.5em' component='h3' sx={{pb:1}} fontWeight='300'>
                    Empty, add some items!
                </Typography>
              
                <Link className='flex auto decor-none gap'  href='/collections/products'>
                    <Btn v2 className='flex auto ' sx={{
                        border:'none',
                        mt: 3,
                        color:'black'
                    }}>
                      Browse collections
                        <AiOutlineShoppingCart/>
                    </Btn>
                </Link>
            </Box>
        </Box>
    )
}


const Cart = () => {

    
    const [cartItems,setCartItems] = useState<ICartItem[]>([])
    const {totalPrice, deliveryCharge}= totalCal(cartItems); 
    const {discountedPrice,isFirstOrder} = useDiscount(totalPrice)


    let localCart : ICartItem[] = loadState('VZJo2p4j1op2cgfG221zGG') || []
    useEffect(() => {
        if (localCart) {
            
            setCartItems(localCart)
    }
      
    }, [])
    const refetchState = () => {

        setCartItems(loadState('VZJo2p4j1op2cgfG221zGG'))
        
    }
    const remove = (id:string) => {
        let state = cartItems.filter(x => `${x._id}` !== id);
         saveState('VZJo2p4j1op2cgfG221zGG', state);
         setCartItems(state);
     }
     
    return (
        <Box sx={{
            pt: 5,
            pb:12,
            maxWidth:'xl',
            margin:'0 auto',
            px: 1
        }}>
      {cartItems?.length >0 &&      <Typography
      component='h2'
                sx={{
                fontSize: '1.5em',
                padding: 1,
                fontWeight: '600'
            }}>My Cart</Typography>}
            <Box  sx={{
                display: 'flex',
               flexWrap: 'wrap'
            }}>
                <Box
                    sx={{
                    width: {
                        xs: '100%',
                        md: '70%'
                    }
                }}>
                    {cartItems && cartItems.length > 0 ?
                    cartItems.map(item=>{
                        if (!item?._id) return;
                        return <CartProduct 
                            productselectedSize={item?.productselectedSize}
                            productselectedColor={item?.productselectedColor}
                            onChange={refetchState}
                            key={item._id}
                            img={item.img} qty={item.qty} remove={remove}
                             title={item.title} _id={item._id} price={item.price}
                              weight={Number(item?.weight)}/>
                    }) :
                    <EmptyCartAlert/>     
                }
                </Box>
               
                <Box
                    sx={{
                    padding: '1em',
                    mt:{xs:'2em',sm:0},
                    height: 'fit-content',
                    width: {
                        xs: '100%',
                        md: '25%'
                    },
                    // boxShadow:'1px 1px 3px #0000002b'
                }}>
                  
                    <Typography component='h2' sx={{
                        ...titleStyle
                    }}>Order Summary</Typography>
                  
                
                    <Divider></Divider>
                    <Box 
                    sx={{
                      mt:1,
                      justifyContent: 'space-between'
                  }}
                    className='flexed'> 
{/* {isFirstOrder &&     <Typography sx={{
            color:'green',
            pb:1,
                        fontWeight: '600'
                    }}>
                        Get 10% off your first order!
                        </Typography>} */}


                        { discountedPrice &&    Number(discountedPrice) > 0 && <Typography sx={{
            color:'black',
                        fontWeight: '400'
                    }}>
                         {`Price`}:{' '}
                         ${cartItems?.length > 0  && Number(discountedPrice) > 0 ? discountedPrice : 0}                     
                        </Typography>}        
                        {<Typography sx={{
                            pb:.5,
            color:'black',
                        fontWeight: '400'
                    }}>
                         {`Delivery`}:{' '}
                         ${deliveryCharge}                     
                        </Typography>}


                    <Typography sx={{
                        fontWeight: '600',
                        pt:.5,
                        borderTop:'1px solid',
                 }}>
                    {`Total`}:{' '}
                        <span style={{color:'black'}}>
                        ${Number(totalPrice + deliveryCharge).toFixed(2)}
                        
                    </span>
                        </Typography>

                        
                    </Box>
                    <Link href='/checkout'
                    
                    className='decor-none '>

                    <Btn
                    sx={{width:'100%',mt:2.5, border:'1px solid black'}}>Checkout Now</Btn>
                    </Link>

                    <Link href='/collections/products' className='decor-none'>

                    <Btn
                    v2
                     sx={{mx:0,':hover':{background:'white',color:'black'},
                    //  background:'white',color:'black',
                    borderRadius:'0',width:'100%',mt:1}}>Continue Shopping</Btn>
                    </Link>
                
                </Box>
                
            </Box>
        </Box>
    )
}

const Index = () => {
    return ( <>
    {
        false
            ? <EmptyCartAlert/>
            : <Cart/>

    } 
    
    </>
  )
}

export default Index