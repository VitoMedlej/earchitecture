"use client"
import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const Perks = () => {
  const items = [
    {
        title: "THE BRIGHEST COLORS",
        icon: "https://www.diamondartclub.com/cdn/shop/files/feature-a.png?v=1686268797&width=328",
        text: "100% natural honey from Lebanon, carefully harvested for the best quality and taste."
    },
    {
        title: "THE SOFTEST CANVASES",
        icon: "https://www.diamondartclub.com/cdn/shop/files/feature-b.png?v=1686268797&width=328",
        text: "We ensure swift and reliable delivery to bring the goodness of Lebanese honey to your doorstep."
    },
    {
        title: "EXCLUSIVELY LICENSED",
        icon: "https://www.diamondartclub.com/cdn/shop/files/feature-c.png?v=1686268797&width=328",
        text: "If you're not satisfied with our honey, reach out to us. Your satisfaction is our priority."
    }
];
  return (
    <Box sx={{py:4,mx:{xs:1,sm:1.5,md:2}}}>
       {/* <Divider/> */}
        <Box  className='flex wrap gap auto row justify-between'>

        {
           items.map(i=>{
                return <Box key={i.title} className='center items-center auto flex row' sx={{
                    py:2,
                    width:{xs:'47%',sm:'30%',md:'22%'}}}>
                    <Box sx={{width:'150px'}}>
                        <img src={i.icon} alt={`Perks Icon`} className="img contain" />
                    </Box>
                    <Box sx={{ml:.7}} className="flex col">

                    <Typography className='' sx={{fontSize:{xs:'.89em',sm:'1.1em'},fontWeight:500}}  component={'h1'}>{i.title}</Typography>
                    </Box>
                </Box>
            })
        }
        </Box>

    </Box>
  )
}

export default Perks