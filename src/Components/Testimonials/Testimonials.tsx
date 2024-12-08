"use client"

import { Box, Typography } from '@mui/material'
import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import TestimonialCard from './TestimonialCard';
import { Autoplay } from 'swiper';
import useLanguage from '@/Hooks/useLanguage';
// import { Autoplay, Pagination } from 'swiper/modules';
// import {FreeMode, Autoplay, Pagination} from "swiper";



// const Clients = [
//     {id:1,
//         description:``,
//         name:'Zekra Advertising Specialist',img:'https://res.cloudinary.com/dwxm8f25f/image/upload/v1675713948/logo_sktnut_1_jwy2hk.png'},
//         {id:2,
//             description:``,
//             name:'',img:'https://ucarecdn.com/6e360177-750f-4671-8b74-edbc38f20c90/337875439_610147264297606_3941855933110310434_nremovebgpreview.png'},
//         {id:3,
//             description:``,
//             name:`Powerhouse’s Owner `,img:'https://ucarecdn.com/3b40bedc-0aa3-4247-a196-fd05de4d4f87/003011.jpg'}

// ]
const testimonials = [
  {
    title: "Very satisfied!",
    reviewer: "Nathalie",
    description: "Just received the tray. Very satisfied!",
  },
  {
    title: "Top-notch quality!",
    reviewer: "Mailo",
    description: "The quality is top! I'm so satisfied.",
  },
  {
    title: "Lebanese craftsmanship at its best!",
    reviewer: "Rana",
    description: "Can't believe that these products are made in Lebanon. Thank you so much! I loved each item I ordered.",
  },
  {
    title: "High-end quality products",
    reviewer: "John",
    description: "Just wanted to thank you for the high-end quality.",
  },
  {
    title: "Superb quality!",
    reviewer: "Michele",
    description: "Suuuuperbe!",
  },
  {
    title: "Beautiful wall art",
    reviewer: "Gracia",
    description: "The wall art is amazing and the craftsmanship is very clean. Thank you so much!",
  },
  {
    title: "Delighted with the bathroom shelf",
    reviewer: "Aziz",
    description: "I am delighted to have received the bathroom shelf from the creative @e.architecturelb.",
  },
  {
    title: "Superb bathroom accessories",
    reviewer: "Jessica",
    description: "The bathroom accessories I ordered are superb. Thank you, thank you!",
  },
  {
    title: "Perfectly delivered items",
    reviewer: "Pascale",
    description: "I would like to thank E.architecture for the items you sent. I received my order yesterday, and everything was in order. Merci beaucoup!",
  },
  {
    title: "Amazed by the wall clock",
    reviewer: "Dalal",
    description: "I just want to tell you how much I am amazed! The wall clock is such a piece of art. I love it so much. Thank you!",
  },
];


const Testimonial = () => {


 
    
    
  return (
    <Box className=' flex col ' sx={{width:'100%',height:'100%'}}>
 <Box className='flex col'  sx={{flex:1,width:'100%',pt:'6em'}}>
 <Typography
                                sx={{
                                width: '100%',
                                pt: {
                                    xs: 0,
                                    sm: 0
                                },
                                fontSize: {
                                    xs: '1.4em',
                                    sm: '2em'
                                },
                                fontWeight: 300
                            }}
                                component='h1'
                                className='color text-center auto w100 black animate-on-scroll '>
              {`Authentic Testimonials`}

            </Typography>
            </Box>
       <Box
            sx={{
            
         
            margin: '0em auto',
            width: '100%',
            maxWidth: 'lg',
            mb:'6em',
            display: {
                xs: 'flex'
            },
            // height: '100%'
        }}>

            <Swiper
                pagination={{
                clickable: true
            }}
                autoplay={{
                delay: 3000,
                disableOnInteraction: true
            }}
            
                // navigation={true}
                spaceBetween={10}
                slidesPerView={1.1}
                breakpoints={
 {// when window width is >= 320px
 320: {
    slidesPerView:1.1,
    spaceBetween: 20
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 1.1,
    spaceBetween: 20
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 2.1,
    spaceBetween: 20
  },
  940: {
    slidesPerView: 3.1,
    spaceBetween: 20
  }

}

                }
                modules={[ Autoplay]}
              >

                {testimonials.map((item) => {
                    if (!item.description) 
                        return
                    return <SwiperSlide
                        style={{
                        padding:'2em 0',
                        marginRight: '0 !important'
                    }}
                        key={item.description}>
                         <TestimonialCard title={item.title} reviewer={item.reviewer} description={item.description}/>

                    </SwiperSlide>
                    // return <SwiperSlide className='swiper-wrapper1'
                    // style={{width:'100%',height:'100%'}} key={item._id}>     {/* <HouseCard
                    //   img={property.images[0] || property.images[1]}         width='95%'
                    // id={property.id}         isFeatured={isFeatured !== undefined ? isFeatured :
                    // true}         propertySize={property.propertySize}
                    // type={property.type}         baths={property.bathrooms}
                    // rooms={property.rooms}         currency={property.currency}
                    // price={property.price}         title={property.title}
                    // location={property.location}/> */}          <ProductCard
                    // handleQuickView={handleQuickView}          title={item.title}
                    // images={item.images}          price={item.price}          _id={item._id}
                    //     category={item.category}          /> </SwiperSlide>

                })
}

            </Swiper>
        </Box>
    </Box>
  )
}

export default Testimonial