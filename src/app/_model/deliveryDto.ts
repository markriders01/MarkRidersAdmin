import { Identifiers } from '@angular/compiler';
import { AbstractFormGroupDirective } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { BusinessAccountResponseDto } from './businessAccountResponseDto';
import { CategoryDto } from './categoryDto';


export interface DeliveryDto {
    id: string;
    dateCreated: string;
    deliveryNo: string;
    deliveryStatus: string;
    email: string;
    totalAmount: number;
    transactionId: string;
}
