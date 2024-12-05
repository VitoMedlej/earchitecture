"use client"
import { Box } from '@mui/material'
import React from 'react'
import Btn from '../Btn/Btn'

const Index = () => {
  return (
    <Box className='relative' sx={{}}>
        <Box sx={{width:'100%', height:'600px',display:{xs:'flex'}}}>
            <img src="https://audocph.com/cdn/shop/files/Audo_AfteroomCoatHangerLarge_21.jpg?v=1708508586&width=940" alt="Audo  Afteroom Coat Hanger Large" className="img" />
        </Box>
        <Box className='absolute center w100 auto flex' sx={{top:'90%',zIndeX:12}}>
          <Btn>
            Explore Collections Now
          </Btn>
        </Box>
       
    </Box>
  )
}

export default Index