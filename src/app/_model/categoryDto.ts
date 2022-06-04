import { CategoryTypeDto } from './categoryTypeDto';
import { CategoryPricingStyleDto } from './categoryPricingStyleDto';
import { OrderFlowDto } from './orderFlowDto';

export interface CategoryDto {
    id: string;
    userId: string;
    categoryName: string;
    ownerProduct: boolean;
    categoryDescription: string;
    categoryMarkUpFee: number;
    categoryOveridePrice: boolean;
    categoryProductPrice: number;
    orderFlowId: string;
    categoryTypeId: string;
    categoryPricingStyleId: string;
    minimumOrder: number;
    incrementNumber: number;
    IsActive: boolean;
    depotPrice?: number;
    vendorFee?: number;
    categoryTypeName: string;
    categoryPricingStyle: CategoryPricingStyleDto;
    orderFlowName: string;
    avatar: string;

}
