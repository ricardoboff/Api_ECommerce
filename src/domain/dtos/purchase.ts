interface PurchaseItemDto{
    productId: string;
    qtd: number;
}

export interface PurchaseDto {
    id: string;
    userId: string;
    items: PurchaseItemDto[];
}