import { DeliveryDto } from './deliveryDto';
import { BusinessAccountResponseDto } from './businessAccountResponseDto';

export interface OtherProductDto {
    id: string;
    userId: string;
    productId: string;
    product: DeliveryDto;
    businessId: string;
    businessAccountResponseDto: BusinessAccountResponseDto;
}
