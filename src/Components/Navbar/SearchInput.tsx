"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import {IoIosSearch} from 'react-icons/io'
import { useRouter } from 'next/navigation';
import { AnyAaaaRecord } from 'dns';
// import DirectionsIcon from '@mui/icons-material/Directions';
// 
export default function SearchInput({sx,mobileHidden,handleSubmit,newValue,handleClose}:{handleClose : any,newValue?:string,mobileHidden?:boolean,sx?:any,handleSubmit?:any}) {
  const router = useRouter()
  
  const [value,
    setValue] = React.useState(newValue ? newValue : '');
    const handleSearch = (e : React.FormEvent < HTMLFormElement >) => {
        e.preventDefault()
        // if (value.length > 2) {
          handleClose()
            router.push(`/collections/products?limit=80&search=${value}`)
        // }
    }
 
  return (
    <Paper
    onSubmit={(e)=>handleSubmit ? handleSubmit(true) : handleSearch(e)}
      component="form"
      className='searchinput '
      sx={{
        background:'transparent',
        py:'.25em',
        mx:2,
        // my:'.25em',
        mb: mobileHidden ? '.25em' : '0',
        px:'.5em',
        // mb:'.5em',
        // flex:1,
        // flexBasis:'100%',
        boxShadow:'none',
        border:'1px solid #00000036',
        borderRadius:'0px',
        
         display: mobileHidden ? {xs:'none',md:'flex'} :  {xs:'flex',md:'none'},
        //  display:'flex',
         alignItems: 'center',
         width:{xs:'100%',md:'300px',lg:'30%'}
         ,...sx
        }}
    >
   
      <InputBase
      className=''
      value={`${value}`}
      onChange={(e)=>{ 
        
        setValue && setValue(`${e.target.value as string}`)}}
        sx={{
          display: 'flex',
          ml: 1,w:'100%', flex: 1 }}
        placeholder="Search Anything"
        inputProps={{ 'aria-label': 'search products' }}
      />
      <IconButton
       
      type="submit" className='searchIcon   trans' sx={{borderRadius:0,p: '5px' }} aria-label="search">
        <IoIosSearch />
      </IconButton>
     
    </Paper>
  );
}