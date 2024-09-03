"use client"
import React from 'react'
import {Box, Container,  Pagination, Typography} from "@mui/material"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { server } from "@/Utils/Server"
import FilterSection from './CollectionPage/FilterSection/FilterSection'
import { IProduct } from '@/Types/Types'
import ProductCard from './ProductCard/ProductCard'
import { useCategoriesContext } from '@/context/Contexts'

const Preloader2 = ({ data, totalPages, categories }: any) => {
  console.log('data: ', data);
    const router = useRouter();
    const { setCategories } = useCategoriesContext();
  
    const [newValue, setNewValue] = useState<string>("");
    const [products, setProducts] = useState<any[]>(data);
    const { category } = useParams();
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const subCategory = searchParams.get("subCategory");
  
    useEffect(() => {
      if (categories) {
        setCategories(categories);
      }
    }, [categories, setCategories]);
  
    const fetchData = async (val: number) => {
      const url = `/api/get-cate?category=${category ?? "all"}&search=${
        newValue ? encodeURIComponent(newValue) : ""
      }&page=${Number(val) - 1 || 0}&type=${type ?? ""}`;
      const req = await fetch(`${server}${url}`, {
        cache: "no-store",
        next: { revalidate: 0 },
      });
      const res = await req.json();
  
      setProducts(res?.data?.products ?? []);

      totalPages = res?.data?.totalPages ?? 1;

      if (window) {
        window.scrollTo(0, 0);
      }
    };
  
    const [options, setOptions] = useState({
      price: [1, 100000],
      sort: "latest",
      type: "All",
      category: category ?? "Collection",
    });
  
    const handleSubmit = async (reset?: boolean, e?: any) => {
      if (e) {
        e.preventDefault();
      }
      if (reset) {
        setNewValue("");
        setOptions({
          price: [1, 100000],
          sort: "latest",
          type: "all",
          category: "collection",
        });
        const url = `/api/sort?min=${options.price[0]}&max=${options.price[1]}&type=all&category=collection`;
        const req = await fetch(`${server}${url}`, {
          cache: "no-store",
          next: { revalidate: 0 },
        });
        const res = await req.json();
        setProducts(res?.data?.products ?? []);
        return;
      }
      const url = `/api/sort?search=${encodeURIComponent(
        newValue
      )}&min=${options.price[0]}&max=${options.price[1]}&type=${
        options.type
      }&category=${encodeURIComponent(`${options?.category}`)?.replace(/ /g, '-').toLocaleLowerCase()}`;
      const req = await fetch(`${server}${url}`, {
        cache: "no-store",
        next: { revalidate: 0 },
      });
      const res = await req.json();
      setProducts(res?.data?.products ?? []);
    };
  
    return (
      <Container sx={{ mt: 0 }} disableGutters maxWidth="lg">
        <Box className="flex items-center wrap" sx={{background:'white', my: 2, width: "100%" }}>
          <FilterSection
            handleSubmit={handleSubmit}
            options={options}
            setOptions={setOptions}
            setProducts={setProducts}
          />
        </Box>
        <Box className="flex wrap" sx={{ px: 1 }}>
          {products && products.length > 0 ? (
            products.map((i: IProduct) => (
              <ProductCard
                key={i?._id}
                sizes={i?.sizes ?? null}
                width={{ xs: "98%", sm: "48%", md:'31%' }}
                inStock={i?.inStock}
                _id={i._id}
                title={i.title}
                newPrice={i?.newPrice}
                price={i.price}
                images={i.images}
                category={i.category}
              />
            ))
          ) : (
            <Typography sx={{py:20}} className='center auto'>No products found, try a different category...</Typography>
          )}
        </Box>
        <Pagination
          onChange={(e, val) => fetchData(val)}
          sx={{ my: 3 }}
          count={totalPages > 1 ? totalPages : 1}
          className="flex center"
        />
      </Container>
    );
  };
  
  export default Preloader2;