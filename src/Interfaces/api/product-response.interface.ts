export interface IProduct {
    id: string;
    productName: string;
    productPrice: number;
    productImage: string;
    productInventory: number;
    productCategory: string;
    cartQuantity?: number;
    productUnit: string;
}