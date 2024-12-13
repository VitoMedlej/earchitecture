"use client";
import { ICartItem } from "@/Types/Types";

function totalCal(cartItems: ICartItem[]) {
    if (!cartItems) return { totalPrice: 0, deliveryCharge: 0 };
    let totalPrice = 0;
    let totalWeight = 0;

    for (const item of cartItems) {
        if (item?._id && Number(item?.price)) {
            
            totalPrice += item?.qty * Number(item?.price);
            
            const itemWeight = item?.weight ? Number(item?.weight)  : 0; // Convert grams to kilograms
            
            totalWeight += item?.qty * itemWeight;

        }
    }

    let deliveryCharge = 4; // Base delivery charge for up to 10KG
    console.log('totalWeight less: ', totalWeight);
    if (totalWeight > 10) {
    console.log('totalWeight more: ', totalWeight);

        deliveryCharge += (totalWeight - 10) * 0.5; // Additional charge for weight over 10KG
    }

    return { totalPrice: Number(totalPrice), deliveryCharge };
}

export default totalCal;
