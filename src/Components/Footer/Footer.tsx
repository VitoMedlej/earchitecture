"use client"
import Link from 'next/link';
import {Typography , Box, Divider, Grid } from '@mui/material'
import './style.css'
import SMicons from '../SMicons/SMicons';
// import SMicons from './SMicons';
// // import Logo from '../../assets/icons/logo';


const Footer = () => (
      <Box component='footer'  className='bg'> 
          <Grid container className='auto' sx={{py:4,px:2,maxWidth:'md'}} >
            <Grid item xs={12} sm={6} lg={6}>
              <Box sx={{width:'50px'}}>
                <img src="https://ucarecdn.com/c9d6219c-d35c-4f91-a252-73ce3e75b5af/ealogo.PNG" alt="earchitecture Lb Brand Logo" className="img" />
              </Box>
              <Box>
                  <Typography sx={{maxWidth:'300px',fontSize:'.7em',color:'white'}}>
                  E.Architecture: Where modern design meets timeless quality. Transform your space with furniture and accessories that stand the test of time.
                  </Typography>
              </Box>
            </Grid>





            <Grid item xs={12} sm={3} md={3}>
        <Box sx={{pt:{xs:4,sm:0}}}>
          <Typography className='white' component={'h1'} sx={{fontSize:'.9em',pb:1}}>
              Site Links
          </Typography>
          <Box className="flex wrap col gap1">

          <Link href='/' className='white decor-' style={{fontSize:'.8em'}}>
              Home
          </Link>
          <Link href='/about' className='white decor-' style={{fontSize:'.8em'}}>
              About
          </Link>
          <Link href='/collection/products' className='white decor-' style={{fontSize:'.8em'}}>
              Collections
          </Link>
          </Box>

        </Box>
</Grid>



<Grid item xs={12} sm={3} md={3}>
<Box sx={{pt:{xs:4,sm:0}}}> 
          <Typography className='white' component={'h1'} sx={{fontSize:'.9em',pb:1}}>
              Contacts
          </Typography>
          <Box className="flex wrap col gap1">

          <a href={`${process.env.NEXT_PUBLIC_INSTA}`} target={'_blank'}  className='white decor-none' style={{fontSize:'.8em'}}>
          @E.architecturelb
          </a>
          <a href={`${process.env.NEXT_PUBLIC_WA}`} target={'_blank'}  className='white decor-none' style={{fontSize:'.8em'}}>
          +{process.env.NEXT_PUBLIC_WA}
          </a>
          
          </Box>

        </Box>
</Grid>
          </Grid>
          <Box className='flex  center auto' sx={{background:'#01242b',py:1,color:'white'}}>
            <Typography component='p' sx={{fontSize:'.8em'}}>
            Site Developed By <span><a target='_blank' href='https://onbeirut.com'>OnBeirut Agency</a></span>
            </Typography>
          </Box>
      </Box>
);


export default Footer

