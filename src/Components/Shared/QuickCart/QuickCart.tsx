"use client"
import {useContext, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import {IconButton, Typography} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { ICartItem } from '@/Types/Types';
import { useCartContext } from '@/context/Contexts';
import { loadState, saveState } from '@/Utils/LocalstorageFn';
import Btn from '@/Components/Btn/Btn';
import CartProduct from '../CartProduct/CartProduct';
import {GrFormClose} from 'react-icons/gr'

export default function TemporaryDrawer() {
    const router = useRouter()
    const {cartOpen,
        setCartOpen} = useCartContext();
        const [cartItems,setCartItems] = useState<ICartItem[]>([])

        useEffect(() =>{
            let localCart : ICartItem[] = loadState('VZJo2p4j1op2cgfG221zGG') || []
            if (localCart) {
                
                setCartItems(localCart)
        }
    },[cartOpen])

    const toggleDrawer = (open : boolean) => (event : React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        setCartOpen(open);
    };
    const remove = (_id:string) => {
       let state = cartItems.filter(x => `${x._id}` !== _id);
        saveState('VZJo2p4j1op2cgfG221zGG', state);
        setCartItems(state);
    }
  const {category} = useParams()

    const route = () => {
        const cate = category ? `${encodeURIComponent(`${category}`)?.toLocaleLowerCase()}` : 'collections' 
        setCartOpen(false);
        router.push(`/${cate}/products`);
    }  

    return (
        <div>
            <Drawer  anchor={'top'} open={cartOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                    // maxWidth: '500px',
                    width: '99%',

                    margin: '0 auto'
                }}>
                    <Box
                        sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mx: '1em',
                        justifyContent: 'space-between'
                    }}>
                        <h2 
                        onClick={()=>{setCartOpen(false),router.push('/cart')}}
                            style={{
                            cursor:'pointer',
                            fontWeight: '500',
                        }}>
                             Your Cart
                        </h2>
                        <IconButton onClick={toggleDrawer(false)}>
                            <GrFormClose
                                color='red'
                                />
                        </IconButton>
                    </Box>
                    <Divider></Divider>
                    <Box
                        sx={{
                        maxHeight: '450px',
                        overflowY: 'scroll'
                        
                    }}>
                        {
                           cartItems && cartItems.length > 0 ? cartItems.map((item:ICartItem, index) =>{
                        if (!item?._id) return;
                        return <CartProduct
                        weight={Number(item?.weight)}
                        productselectedColor={item?.productselectedColor}
                        productselectedSize={item?.productselectedSize} 
                        _id={item._id} qty={item.qty} price={item.price} img={item.img}
                        remove={remove}
                        title={item.title} key={index}/>
                            })
                        : <Box className='auto center col flex items-center ' sx={{py:5}}>

                        <Box sx={{width:'60px'}}>
                            <img src="https://cdn-icons-png.flaticon.com/128/10837/10837821.png" alt="Empty Cart Image" className="img" />
                        </Box>
                        <Typography sx={{fontSize:'.98em',width:'80%',py:1,textAlign:'center'}}> 
                          You have not added any products.
                        </Typography>
                        </Box> 
                        }
                        
                    </Box>
                    <Divider></Divider>
                    <Box
                        sx={{
                        margin: '1em auto !important',
                       flexWrap:'wrap',
                        display:'flex',
                        width:{xs:'99%',sm:'400px'},
                    }}>
                       <Btn 
                       sx={{width:'100%',mx:1
                    ,borderRadius:0,
                    }}
                       onClick={()=>{setCartOpen(false),router.push('/checkout')}}
                       disabled={cartItems.length < 1}>
                            Checkout
                       </Btn>
                        <Btn
                         
                        sx={{
                            width:'100%',
                            mx:1
                    ,borderRadius:0,
                        color:'black',
                        border:'1px solid black',
                    background:'none',
                          my:1,
                            }}
                        onClick={()=>route()}
                         >
                        Continue Shopping
                        </Btn>
                        <Btn
                        className='text-center auto'
                        sx={{mx:1,color:'black',border:'none',':hover':{background:'white',color:'black'}}} 
                        onClick={()=>{setCartOpen(false),router.push('/cart')}}
                        v2={true} >
                        View Cart Page
                        </Btn>
                    </Box>

                </Box>
            </Drawer>
        </div>
    );
}