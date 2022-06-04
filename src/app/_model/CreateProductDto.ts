export interface CreateProductDto {
    id: string;
    productName: string;
    categoryId: string;
    categoryName: string;
    description: string;
    amount: number;
    businessName: string;
    businessId: number;
    inStock: boolean;
    userId: string;
    quantity: number;
    depotPrice: number;
    vendorFee: number;
    categoryProductPrice: number;
}
