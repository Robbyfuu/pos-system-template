export interface IProduct {
    productId: string;
    productName: string;
    productPrice: number;
    productImage: string;
    cartQuantity?: number;
    productUnit: string;
}