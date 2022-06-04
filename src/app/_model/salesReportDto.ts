export interface SalesReportDto {
    orderId: string;
    dateCreated: Date;
    amountPayable: number;
    orderStatus: string;
    businessOrderStatus: string;
    deliveryDate: Date;
    discount: number;
    deliveryAddress: string;
    businessId: string;
    businessName: string;
    paymentReference: string;
    paymentDate: Date;
    phone: string;
    productDetail: string;
}