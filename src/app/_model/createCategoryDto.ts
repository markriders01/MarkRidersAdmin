export interface CreateCategoryDto {
    id: string;
    avatar: string;
    categoryDescription: string;
    categoryMarkUpFee: number;
    categoryName: string;
    categoryOveridePrice: boolean;
    categoryPricingStyleId: string;
    categoryTypeId: string;
    depotPrice: number;
    incrementNumber: number;
    minimumOrder: number;
    orderFlowId: string;
    ownerProduct: boolean;
    userId: string;
    vendorFee: number;
    macupfeetype: string;
    quantity: number;
    productPrice: number;
}
