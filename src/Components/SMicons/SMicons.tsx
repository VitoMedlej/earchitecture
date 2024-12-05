"use client"
import { Box } from '@mui/material';
import React from 'react'
// import {FaInstagram,FaWhatsapp} from 'react-icons/fa';
// import {BsTiktok} from 'react-icons/bs';


const sm = [
    {
        Icon:'https://www.svgrepo.com/show/452229/instagram-1.svg',
        alt:'Instagram Icon',
        href:`${process.env.NEXT_PUBLIC_INSTA}`
    },
    {Icon:'https://www.svgrepo.com/show/349563/whatsapp.svg',
      alt:'Whatsapp Icon',
      href:`https://wa.me/+${process.env.NEXT_PUBLIC_WA}`},
    // {Icon:'https://www.svgrepo.com/show/475647/facebook-color.svg',href:'https://www.facebook.com/profile.php?id=61562084735542'},
  
 ]
const SMicons = ({sx,color}:{color?:string,sx?:any}) => {
  return (
    <Box className='row flex' sx={{zIndex:1234567,...sx}}>

    {sm.map((item)=>{
      return <Box  key={item.href} className='relative   flex center items-center justify-center space-between' sx={{
        borderRadius:'50%',width:'40px',mx:.35,mt:1,height:'40px'}}>
      <a   style={{width:'80%',height:'80%'}} className='img absolute' href={`${item.href}`} target='_blank' rel={'noneferrer'}>
          
            <img src={item.Icon} alt={item.alt} className="img contain " />
         </a>
            </Box>
    })}
    </Box>
  )
}

export default SMicons