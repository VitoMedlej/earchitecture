"use client"
import { Container, Box, Typography, Divider } from '@mui/material'
import React from 'react'

const text = [
 `Welcome to E.Architecture, your go-to sportswear store in Lebanon. Our mission is to empower you to embrace the power of movement with our premium gym wear. We believe in combining style and comfort, offering you a collection that enhances your workout experience. Whether you're hitting the gym or enjoying outdoor activities, our sportswear is designed to keep you at your best.`,
 `Explore our range of colors and find the perfect fit for your active lifestyle.`,
 `At E.Architecture, we are committed to delivering quality and style to fitness enthusiasts across Lebanon.`
]
const Index = () => {
  return (
    <Container maxWidth='lg' className='auto' sx={{py:4}}>
           <Typography sx={{mb:1,mx:'auto',fontSize:'2.5em',fontWeight:'600'}} className=" center text-center">
            ABOUT US | E.Architecture
        </Typography>
        <Box sx={{width:'100%',height:'200px'}}>
            <img src="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG" alt="" className="img contain" />
        </Box>
    
        <Box sx={{my:4}}>
                {
                    text.map(i=>{
                            return <Typography key={i} 
                            sx={{maxWidth:'md',py:1}} className='auto text-center'>{i}</Typography>
                    })
                } 
        </Box>
        {/* <Divider></Divider>
        <Typography sx={{pt:4, mb:1,mx:'auto',fontSize:'2.5em',fontWeight:'600'}} className=" center text-center">
            Frequently Asked Questions
        </Typography>
            <FAQ/> */}
    </Container>
  )
}

export default Index