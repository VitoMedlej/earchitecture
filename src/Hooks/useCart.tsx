"use client"

// import { useContext } from "react";
import { loadState, saveState, pushState } from "../Utils/LocalstorageFn";
import { ICartItem } from "../Types/Types";
import { useCartContext } from "@/context/Contexts";

const useCart = () => {
    const { cartOpen, setCartOpen } = useCartContext();

    const incrementQty = (
        _id: string,
        newValue?: number,
        productselectedSize?: string,
        productselectedColor?: any,
        newPrice?: number,
        weight ?: number,
    ) => {
        const state = loadState('VZJo2p4j1op2cgfG221zGG') || [];
        let foundIndex = state.findIndex((value: ICartItem) => value._id === _id);
        let selectedItem = state[foundIndex];

        if (foundIndex !== -1 && selectedItem) {
            if (newValue) {
                selectedItem.qty = newValue;
            } else {
                selectedItem.qty += 1;
            }

            if (productselectedSize) {
                selectedItem.productselectedSize = productselectedSize;
            }

            if (productselectedColor) {
                selectedItem.productselectedColor = productselectedColor;
            }
            if (weight) {
                selectedItem.weight = weight;
            }

            // Update the price if a new price is provided
            if (newPrice !== undefined) {
                selectedItem.price = newPrice;
            }

            state[foundIndex] = selectedItem;

            saveState('VZJo2p4j1op2cgfG221zGG', state);
            return true;
        }
        return false;
    };

    const addToCart = (
        selectedQuantity = 1,
        _id: string,
        product: {
            title: string,
            category?: string,
            img: string,
            _id: string,
            price: number,
            productselectedSize?: string,
            productselectedColor?: any,
            weight: number
        },
        open = true,
        replaceOld = false
    ) => {
        // 1- Get the cart from local storage
        const increased = incrementQty(
            _id,
            selectedQuantity,
            product?.productselectedSize,
            product?.productselectedColor,
            product.price,
            product?.weight
        );

        if (increased) {
            setCartOpen(open ? true : false);
            return;
        }

        // If we do not have the item in cart, insert it
        pushState('VZJo2p4j1op2cgfG221zGG', {
            qty: selectedQuantity || 1,
            img: product.img,
            category: product?.category || 'Collection',
            title: product.title,
            _id: product._id,
            price: product.price,
            productselectedSize: product?.productselectedSize || '',
            productselectedColor: product?.productselectedColor,
            weight: product?.weight || 0
        });

        if (open) {
            setCartOpen(true);
        }
    };

    return { addToCart, incrementQty };
};

export default useCart;