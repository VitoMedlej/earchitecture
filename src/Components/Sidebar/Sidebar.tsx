"use client";
import {useContext, useEffect, useState} from 'react';
import {Drawer,List,Divider,ListItem,ListItemButton,ListItemText,ListItemIcon,Box, Typography, Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
// import {IoShirtOutline,IoShirtSharp} from 'react-icons/io5';
import { IconButton } from '@mui/material';
// import {AiOutlineHeart} from 'react-icons/ai'

import { useRouter } from 'next/navigation';
import {AiOutlineArrowUp} from 'react-icons/ai';

import { DrawerContext, useCategoriesContext } from '@/context/Contexts';
import {GrFormClose} from 'react-icons/gr'
// import SMicons from '../SMicons/SMicons';


export default function TemporaryDrawer() {
  
  const {open, setOpen} = useContext(DrawerContext);
  // const [localUser,setLocalUser] = useState<{name?:string,email?:string} | null>(null)
  const {categories} = useCategoriesContext();

//   const fetchUserAndList = async () => {
//     const user = localStorage.getItem('GijVT341fxSFOjgio2j55')
//     if (user) {
//            let parsedUser = JSON.parse(user)
//            if (!parsedUser) {return}
//            setLocalUser(parsedUser)
//     }
// }
// useEffect(()=>{
//   fetchUserAndList()

// },[])
  const router = useRouter();
  const toggleDrawer =
    ( open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  const Lista = () => (
    <Box
      sx={{ width:  '300px',py:1 }}
      role="presentation"
      // onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer( false)}
    >
      <Box className='flex justify-between items-center '
      sx={{margin:'0 .5em',borderBottom:'1px solid #00000040',    justifyContent: 'flex-end'}}>
    

              <IconButton 
        
        onClick={toggleDrawer(false)}>
                        <GrFormClose
                                color='red'
                                />
                        </IconButton>
                     

                                </Box>
      <List>

      <ListItem
          sx={{fontWeight:400}}

          onClick={()=>{ setOpen(false);router.push(`/`);}}
           disablePadding>
            <ListItemButton>
            
                  <Typography className='' component='h1' sx={{fontWeight:300}}>
            Home
            </Typography>
            </ListItemButton>
  

          </ListItem>

      <ListItem
          sx={{fontWeight:400}}

          onClick={()=>{setOpen(false);router.push(`/about`);}}
           disablePadding>
            <ListItemButton>
            
                  <Typography   className=''  component='h1' sx={{fontWeight:300}}>
              About Us
            </Typography>
            </ListItemButton>
  

          </ListItem>
       
    
          {/* {
          categories && categories?.map((cate:{categoryName:string,subcategories:any})=>{
              return    <ListItem
              key={cate?.categoryName}
              sx={{fontWeight:400}}
    
              onClick={()=>{router.push(`/${cate?.categoryName?.toLocaleLowerCase()}/products`); toggleDrawer(false)}
            
            }
               disablePadding>
                <ListItemButton>
                
                      <Typography component='h1' sx={{fontWeight:300}}>
                     {cate?.categoryName?.toUpperCase()}
                </Typography>
                </ListItemButton>
      
    
              </ListItem>
             })
          } */}

{
            categories
            ?.sort((a: { categoryName: string }, b: { categoryName: string }) => 
              a.categoryName.localeCompare(b.categoryName))
            .map((cate: { categoryName: string; subcategories: any }) => {

              return <Accordion key={`${cate?.categoryName}`} sx={{border:'none',boxShadow:'none',}}>
            
            <AccordionSummary
    expandIcon={<AiOutlineArrowUp />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
 <Typography className='' component='h1' sx={{fontWeight:300}}>
 {cate?.categoryName?.toUpperCase()}

      </Typography>
  </AccordionSummary>
  <AccordionDetails>
  <List


  
     disablePadding>
<ListItem
              key={cate?.categoryName}
              sx={{fontWeight:400}}
    
              onClick={()=>{setOpen(false);router.push(`/${cate?.categoryName?.toLocaleLowerCase()}/products`); toggleDrawer(false)}}
               disablePadding>


<ListItemButton
  onClick={()=>{setOpen(false);
    router.push(`/${encodeURIComponent(cate?.categoryName)?.toLocaleLowerCase()}/products`); toggleDrawer(false)}
            
}
>

      <Typography sx={{fontWeight:300}}>
  View All
</Typography>
</ListItemButton>
</ListItem>

{cate?.subcategories?.map((a:any)=>{ 
 
    return  <ListItem sx={{padding:0,width:'100%'}}

onClick={()=>
{setOpen(false);
router.push(`/${cate?.categoryName?.toLocaleLowerCase()}/products?type=${encodeURIComponent(a?.name).toLocaleLowerCase()}`)}}

key={a?.name}>


<ListItemButton >
            <Typography sx={{fontWeight:300}}>
        {a?.name}
      </Typography>
      </ListItemButton>
</ListItem>
      
      })}
    </List>


  </AccordionDetails>
</Accordion>

})
}


                  {/* <Accordion sx={{border:'none',boxShadow:'none',}}>
            
                  <AccordionSummary
          expandIcon={<AiOutlineArrowUp />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
       <Typography sx={{fontWeight:400}}>
       Organic herbs
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <List
  

        
           disablePadding>
<ListItem sx={{padding:0,width:'100%'}}

onClick={()=>
{setOpen(false);
router.push(`/organic herbs/products`)}}

>


<ListItemButton >
            <Typography sx={{fontWeight:300}}>
        -View All
      </Typography>
      </ListItemButton>
</ListItem>

{[`MACA`,
     `Milk thistle`, `Sea moss`  ,`Yohimbe bark` ,'Water pill' , `Multi vitamins`,

`Bacopa Monnieri`,
`Passion Flower`,
'Tongkat-ali','Ashwagandha'].map(i=>{   return  <ListItem sx={{padding:0,width:'100%'}}

  onClick={()=>
    {setOpen(false);
    router.push(`/organic herbs/products?type=${encodeURIComponent(i).toLocaleLowerCase()}`)}}

key={i}>

  
  <ListItemButton >
                  <Typography sx={{fontWeight:300}}>
              -{i}
            </Typography>
            </ListItemButton>
</ListItem>
            
            })}
          </List>


        </AccordionDetails>
      </Accordion>



      <Accordion sx={{border:'none',boxShadow:'none',}}>
            
            <AccordionSummary
    expandIcon={<AiOutlineArrowUp />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
 <Typography sx={{fontWeight:400}}>
 natural supplements
      </Typography>
  </AccordionSummary>
  <AccordionDetails>
  <List


  
     disablePadding>

<ListItem sx={{padding:0,width:'100%'}}

onClick={()=>
{setOpen(false);
router.push(`/natural supplements/products`)}}

>


<ListItemButton >
            <Typography sx={{fontWeight:300}}>
        -View All
      </Typography>
      </ListItemButton>
</ListItem>
{[
     `GABA`,
     `Taurine`,
     `L arginine`,
     `L Lysine`,].map(i=>{   return  <ListItem sx={{padding:0,width:'100%'}}

onClick={()=>
{setOpen(false);
router.push(`/natural supplements/products?type=${encodeURIComponent(i).toLocaleLowerCase()}`)}}

key={i}>


<ListItemButton >
            <Typography sx={{fontWeight:300}}>
        -{i}
      </Typography>
      </ListItemButton>
</ListItem>
      
      })}
    </List>


  </AccordionDetails>
</Accordion>




<Accordion sx={{border:'none',boxShadow:'none',}}>
            
            <AccordionSummary
    expandIcon={<AiOutlineArrowUp />}
    aria-controls="panel1a-content"
    id="panel1a-header"
  >
 <Typography sx={{fontWeight:400}}>
 Mushrooms
      </Typography>
  </AccordionSummary>
  <AccordionDetails>
  <List


  
     disablePadding>
<ListItem sx={{padding:0,width:'100%'}}

onClick={()=>
{setOpen(false);
router.push(`/mushrooms/products`)}}

>


<ListItemButton >
            <Typography sx={{fontWeight:300}}>
        -View All
      </Typography>
      </ListItemButton>
</ListItem>

{[`Lions Mane`,


'Cordyceps'].map(i=>{   return  <ListItem sx={{padding:0,width:'100%'}}

onClick={()=>
{setOpen(false);
router.push(`/mushrooms/products?type=${encodeURIComponent(i).toLocaleLowerCase()}`)}}

key={i}>


<ListItemButton>
            <Typography sx={{fontWeight:300}}>
        -{i}
      </Typography>
      </ListItemButton>
</ListItem>
      
      })}
    </List>


  </AccordionDetails>
</Accordion> */}
    
      </List>
        {/* <SMicons/> */}
     
    
      <Divider />
      
    </Box>
  );

  return (
    <div>

          <Drawer
            anchor={'left'}
            open={open}
            onClose={toggleDrawer(false)}
          >

  <Lista/>

      
      

          </Drawer>
    </div>
  );
}