"use client"
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { loadState } from '@/Utils/LocalstorageFn';
import totalCal from '@/Utils/totalCal';
import useDiscount from '@/Hooks/useDiscount';


// const products = [
//   {
//     name: 'Product 1',
//     desc: 'A nice thing',
//     price: '$9.99',
//   },
//   {
//     name: 'Product 2',
//     desc: 'Another thing',
//     price: '$3.45',
//   },
//   {
//     name: 'Product 3',
//     desc: 'Something else',
//     price: '$6.51',
//   },
//   {
//     name: 'Product 4',
//     desc: 'Best thing of all',
//     price: '$14.11',
//   },
//   { name: 'Shipping', desc: '', price: '3.99$' },
// ];



      // return 0
// }  
export default function Review({setActiveStep}:{setActiveStep:any}) {

  const products = loadState('VZJo2p4j1op2cgfG221zGG')
 
  const info = loadState('Vjq2zFFF1Z')
  // const total = totalCal(products);
  const {totalPrice, deliveryCharge}= totalCal(products); 


  if (!info) {
    setActiveStep(0)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
      {products?.length > 0 && products.map((product:any) => {
  if (!product?._id) return;
  return (
    <ListItem key={product.title} sx={{ py: 1, px: 0 }}>
      <ListItemText 
        primary={`${product?.qty || '1'} x ${product?.productselectedColor ? `${product?.productselectedColor} - `: ''} ${product?.title || 'Product Name'} - ${product?.productselectedSize ? product?.productselectedSize : ''}`}  
      />
      <Typography variant="body2">
        ${product?.newPrice ? (Number(product?.newPrice) * Number(product?.qty || 1)).toFixed(2) : (product?.price * Number(product?.qty || 1)).toFixed(2)}
      </Typography>
    </ListItem>
  );
})}
        <Divider/>
        <ListItem sx={{px: 0 }}>

<ListItemText primary="Delivery" />
<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
  ${deliveryCharge}
</Typography>
</ListItem>
 {/* {Number(total) < 60 && <ListItem sx={{ px: 0 }}>

<ListItemText primary="Delivery Fees" />
<Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
  $4 (Free delivery for orders over $60)
</Typography>
</ListItem>} */}
            <ListItem sx={{ px: 0 }}>

{/* <ListItemText primary="Total + $4 Delivery" /> */}
<ListItemText primary="Total" />
<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
  {/* ${Number(total) >= 60 ? total : Number(total) + 4} */}
  ${Number(totalPrice + deliveryCharge).toFixed(2)}
  {/* ${Number(discountedPrice) + Number(4)} */}
</Typography>

</ListItem>
{/* <Typography variant="subtitle1" sx={{color:'green', fontWeight: 400 }}>
  {
    
    isFirstOrder ? `10% discount off your first order!` : ''
  }
  </Typography> */}

      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Order Summary
          </Typography>
                <Typography gutterBottom>{info.firstName}</Typography>
                <Typography gutterBottom>{info.lastName}</Typography>
                <Typography gutterBottom>{info.email}</Typography>
                <Typography gutterBottom>{info.phone}</Typography>
                <Typography gutterBottom>{info.address1}</Typography>
                <Typography gutterBottom>{info.address2}</Typography>
                <Typography gutterBottom>{info.city}</Typography>
        
        
        </Grid>
   
      </Grid>
    </React.Fragment>
  );
}