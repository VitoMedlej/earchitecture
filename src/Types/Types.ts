export interface IProduct {
    title: string;
    price: number;
    _id: string;
    newPrice?:number;
    inStock ?: boolean;
    description: string;
    sizes ?: {
        size: number;
        price: number;
      }[] | null;
    images: string[] | [];
    attributes ?: [] | 
        {
            name : string,
            value : string | number
        }[]
    ;
    category : string;
    isFeatured?: boolean;
}
export interface ICartItem {
    title: string;
    _id: string;
    price: number;
    img : string;
    qty : number;
    weight: number;
    onChange ?: () => void;
    category ?: string;
    remove: (id:string) => void;
    shortdesc ?: string;
    productselectedSize ?: string;
    productselectedColor?: any;
}