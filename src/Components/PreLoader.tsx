"use client"
import React, {useEffect} from 'react'
import {Box, Container, Divider, Grid, Typography} from "@mui/material"
import MainCarousel from './MainCarousel/MainCarousel'
import {useRouter} from 'next/navigation'
import Btn from './Btn/Btn'
// import ContactSection from './ContactSection/ContactSection'
// import CategoryItem from './HomeCateogryList/CategoryItem'
import {useCategoriesContext} from '@/context/Contexts'
import HomeProductCollection from './HomeProductCollection/HomeProductCollection'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Perks from './ContactSection/ContactSection'
import HomeProductsCarousel from './HomeProductsCarousel/HomeProductsCarousel'
import FullscreenPoster from './FullscreenPoster/FullscreenPoster'
// import HomeProductsCarousel from './HomeProductsCarousel/HomeProductsCarousel'
// import ContentBlock from './ContentBlock/ContentBlock'
// import HomeProductsCarousel from './HomeProductsCarousel/HomeProductsCarousel'

// function getCategorizedProducts(data : any, categories : any) {
//   // console.log('data: ', data);
//   if (!data || !categories) return;
//    return categories.map((category:any) => {
//       if (!category || !data) return;
//       const productsInCategory =data && data?.filter((product : any) => `${product?.category?.toLowerCase()}` === `${category?.categoryName?.toLowerCase()}`);
//       return productsInCategory.length ? { categoryName: category.categoryName, data: productsInCategory } : null;
//     })
//     .filter((categoryProducts:any) => categoryProducts !== null);
// }






gsap.registerPlugin(ScrollTrigger);
const PreLoader = ({data, resImages, categories, secondSectionImage} : any) => {

    const {setCategories} = useCategoriesContext()
    const router = useRouter();
    // const collection = data?.slice(0, Number(data?.length / 2))
    const collection1 = data?.slice(0, 12)
    const collection2 = data?.slice(12, 100)
    // const carouselProducts = data?.slice(Number(data?.length / 2), 50)


    // const categorizedProducts = getCategorizedProducts(excludedProducts, categories);


    useEffect(() => {

        if (categories) {
            setCategories(categories)
        }
        gsap.utils.toArray('.animate-on-scroll').forEach((element: any)  => {
          gsap.fromTo(element,
            {
              opacity: 0,
              y:20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                  trigger: element,
                  start: 'top 70%',
                  markers:false,
              },
          });
      });
    }, [])

    return (

        <Box >

            <MainCarousel resImages={resImages}/> 

            {/* <Box
                className="flex justify-between col center text-center auto"
                sx={{
                px: 1,
                pt: 4,
                pb: 4,
                maxWidth: 'lg'
            }}>

                <Typography
                    component={'h1'}
                    className=' clr2 center text-center box animate-on-scroll'
                    sx={{
                    fontSize: {
                        xs: '1.5em',
                        sm: '2em'
                    },
                    padding: .5,
                    fontWeight: '700'
                }}>
                  New Arrivals
                </Typography>

                <Typography
                    component={'p'}
                    className='sectionTitle   center text-center box animate-on-scroll'
                    sx={{
                    fontWeight: '200'
                }}>
                    {
                      `Urban Gentleman is a Lebanese handbag line that creates unique and luxury hand crafted bags and accessories. Proudly crafted and produced in Lebanon, our pieces are manufactured with high quality materials, making each item a unique presentation.`
                    }
                </Typography>

            </Box> */}

            <HomeProductsCarousel
            text='Explore Our'
             delay={4000} Collectiontitle={'Latest Collections'}
              data={collection1}/>

              {/* <FullscreenPoster/> */}

                  {/* {
                    data && data.map((i:any)=> {
                      if (!i?.categoryName || !i?.data) return;
                      return <HomeProductCollection key={i?.categoryName} title={`${i?.categoryName}`} products={i?.data}/> 
                       
                    })
                  } */}
                 
            <Box
                className="w100 "
                sx={{
                my: 4,
            }}>

                <Grid
                    className='auto'
                    sx={{
                    maxWidth: '1200px',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    py: 8
                }}
                    container>
                    <Grid
                        sx={{
                        mt: {
                            xs: 4,
                            sm: 1
                        }
                    }}
                        maxWidth='lg'
                        item
                        xs={12}
                        md={6}>
                        <Box
                            sx={{
                            height: '100%',
                        }}
                            className='auto animate-on-scroll'>
                            <img
                                src="https://ucarecdn.com/60c53ecd-b275-4f71-825e-8a242097f60d/-/resize/600/"
                                alt="Modern Table Image"
                                className="img"/>
                        </Box>
                    </Grid>

                     <Grid item xs={12} md={6} >
                        <Container
                            className='wrap col  auto flex'
                            sx={{
                            py: 4,
                            alignItems: 'left',
                            display: 'flex'
                        }}>

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
                          Living Room Transformation
                            </Typography>
                            <Typography
                                sx={{
                                width: '100%',
                                flex: 1,
                                // maxWidth: '500px',
                                alignItems: 'left',
                                fontSize: {
                                    xs: '.8em',
                                    sm: '.9em'
                                },
                                fontWeight: 300,
                                color: '#4d555e',
                                mt: 1
                            }}
                                className='flex text-center left animate-on-scroll'>
                                {`Create a space that’s both inviting and functional. Our handcrafted metal furniture adds a touch of modern elegance, making your living room the perfect place to relax and entertain.`
}
                            </Typography>
                            <Btn
                                onClick={() => router.push('/about')}
                                className='flex center animate-on-scroll  '
                                sx={{
                                width: '150px',
                                color: 'black',
                                mt: 2,
                                mx:'auto',
                                px: 0
                            }}>
                                {'Learn More'}

                            </Btn>
                        </Container>

                    </Grid>

                </Grid>

            </Box> 





            <Box
                className="w100 "
                sx={{
                my: 4,
            }}>

                <Grid
                    className='auto'
                    sx={{
                        maxWidth:'lg',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    py: 8
                }}
                    container>
                    <Grid
                        sx={{

                                mt: {
                            xs: 4,
                            sm: 1
                        }
                    }}
                        item
                        xs={5.9}
                        md={2.9}
                        >
                        <Box
                            sx={{
                                height: {xs:'300px',sm:'400px'},

                        }}
                            className='auto animate-on-scroll'>
                            <img
                                src="https://ucarecdn.com/e1c621a8-eddb-446d-a25d-373fbe32953c/-/resize/600/"
                                alt="Bath Decor Image"
                                className="img"/>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{
                        mt: {
                            xs: 4,
                            sm: 1
                        },
                    }}
                        item
                        xs={5.9}
                        md={2.9}>
                        <Box
                            sx={{
                                height: {xs:'300px',sm:'400px'},

                        }}
                            className='auto animate-on-scroll'>
                            <img
                                src="https://ucarecdn.com/fe62511b-2890-48e2-a3ba-5f3eeae355fd/-/resize/600/"
                                alt="Modern Bath Image"
                                className="img"/>
                        </Box>
                    </Grid>

                     <Grid item xs={12} md={6} >
                        <Container
                            className='wrap col  auto flex'
                            sx={{
                            py: 4,
                            maxWidth:'600px',
                            alignItems: 'left',
                            display: 'flex'
                        }}>
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
                                Bathroom Bliss
                            </Typography>
                            <Typography
                                sx={{
                                flex: 1,
                                alignItems: 'left',
                                fontSize: {
                                    xs: '.8em',
                                    sm: '.9em'
                                },
                                fontWeight: 300,
                                color: '#4d555e',
                                mt: 1
                            }}
                                className='flex text-center left animate-on-scroll'>
                                {`Bring a touch of luxury to your bathroom with our custom metal shelves and accessories. Built to withstand moisture and wear, they add elegance to any bathroom.`
}
                            </Typography>
                            <Btn
                                onClick={() => router.push('/about')}
                                className='flex center animate-on-scroll  '
                                sx={{
                                width: '150px',
                                color: 'black',
                                mt: 2,
                                mx:'auto',
                                px: 0
                            }}>
                                {'Learn More'}

                            </Btn>
                        </Container>

                    </Grid>

                </Grid>
                  
            </Box> 


            <HomeProductsCarousel
            text='Browse Our'
             delay={4000} Collectiontitle={'Best Sellers'}
              data={collection2}/>


            <Box className='relative' sx={{mt:8,mb:12,height:{xs:'500px',sm:'500px'}}}>
            <Box sx={{position:'relative', height: '100%', width:'100%'}}>
                      <Box className='overlay'>
                
                </Box>
                          <img
                              className={`img cover`}
                              src={`${secondSectionImage && secondSectionImage?.length > 0
                                && secondSectionImage[0]?.img && `${secondSectionImage[0]?.img}`}`}
                            //   src={`${item?.img}/-/resize/${imageSize}/`}
                              alt="Main Carousel Image"
                          />
                      </Box>
                      <Box className='absolute  animate-on-scroll  w100 center auto flex col' sx={{
                           
                            top: {xs:'20%',sm:`20%`},
                            alignItems:{xs:'center',sm:'center'},
                            // width: 'fit-content',
                       zIndex:'1234'}}>
                            
                            <Typography 
                            component='h1'
                            sx={{
                                px:{xs:'.1em'},
                                maxWidth:'500px',
                                textAlign:{xs:'center',sm:'flex-end'},
                                pt:1,color:'white',fontSize:{xs:'1.5em',sm:'1.4em'},fontWeight:300}}>
                          Timeless Design, Modern Living
                            </Typography>
                            <Typography sx={{
    maxWidth: '650px',
    textAlign: { xs: 'center', sm: 'flex-end' },
    pt: 1,
    color: 'white',
    fontSize: { xs: '.8em', md: '.9em' },
    fontWeight: 300
  }}>
  {`Discover premium metal furniture in Lebanon with E.Architecture. Our designs blend modern aesthetics with industrial durability, offering pieces that elevate any space. Whether you're renovating your home or adding a distinctive touch to your living room, each handcrafted item is built to last while enhancing your home decor. Transform your space with furniture that stands out for its quality and design.`}
</Typography>

<Typography sx={{
    maxWidth: '650px',
    textAlign: { xs: 'center', sm: 'flex-end' },
    pt: 1,
    color: 'white',
    fontSize: { xs: '.8em', md: '.9em' },
    fontWeight: 300
  }}>
  {`E.Architecture brings handcrafted metal furniture to Lebanon, combining function and style. From statement pieces to practical additions for your office, our designs integrate seamlessly into any interior. Elevate your home with our carefully crafted, timeless furniture that makes every room feel unique. Shop today for distinctive, long-lasting pieces that add character to your space.`}
</Typography>
                            <Btn  
                            onClick={()=>router.push('/collection/products')}
                            v2 className='center ' sx={{mt:'1em',mx:''}}>
                               Redefine your space
                            </Btn>
                      </Box>
            </Box>



                 
        </Box>
    )
}

export default PreLoader