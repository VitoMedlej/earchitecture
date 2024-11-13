"use client";

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
        weight?: number,
    ) => {
        const state = loadState('VZJo2p4j1op2cgfG221zGG') || [];
        let foundIndex = state.findIndex(
            (value: ICartItem) => 
                value._id === _id && value.productselectedColor === productselectedColor
        );
        let selectedItem = state[foundIndex];

        if (foundIndex !== -1 && selectedItem) {
            // Update quantity based on newValue or increment by 1 if newValue isn't provided
            selectedItem.qty = newValue !== undefined ? newValue : selectedItem.qty + 1;

            if (productselectedSize) selectedItem.productselectedSize = productselectedSize;
            if (weight !== undefined) selectedItem.weight = weight;
            if (newPrice !== undefined) selectedItem.price = newPrice;

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
        open = true
    ) => {
        // Check if item with the same color exists and increment its quantity, else add as a new item
        const increased = incrementQty(
            _id,
            selectedQuantity,
            product?.productselectedSize,
            product?.productselectedColor,
            product.price,
            product?.weight
        );

        if (!increased) {
            // If no existing item with same color, add as new item
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
        }

        if (open) setCartOpen(true);
    };

    return { addToCart, incrementQty };
};

export default useCart;