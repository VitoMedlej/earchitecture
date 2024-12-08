
"use client"

import {Box, Rating, Typography} from '@mui/material'
import React from 'react'

const TestimonialCard = ({title,reviewer,description}:{title:string,reviewer:string,description:string}) => {
    return (
        <Box
        className='auto flex center col '
            sx={{
                background: `#ffffff8a`,
                border: `1px solid #0000001a`,
                boxShadow:'1px 1px 3px #0000001',
                px:2,
                maxWidth:'500px',
                height:{xs:'150px'},
        }}>

            <Box className="flex">
            
            </Box>
<Box className='flex center' sx={{pt:2}}>
<Rating  sx={{mb:.25}} readOnly value={5}></Rating>

</Box>

            <Typography
            // className='clr'
                sx={{
                    // color:'#f8f8f8',
                    maxWidth:'500px',
                pt: 1.25,
                fontWeight:500,
                fontSize: 14
            }}
                component={'p'}>{description}</Typography>
                 <Typography
            className=''
                sx={{
                    // color:'#f8f8f8',
                    fontStyle:'italic',
                fontWeight: 600,
                    maxWidth:'300px',
                pb:4,
                pt:1,
                fontSize: 15
            }}
                component={'p'}>-{reviewer}</Typography>


        </Box>
    )
}

export default TestimonialCard