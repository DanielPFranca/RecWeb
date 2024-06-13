import type { Product } from "./products";


export type Invoice = {
    id: number;
    code: number;
    customerName: string;
    customerCNPJ: number;
    sellerName: string;
    totalValue: number;
    emissionDate?: string;
    uploadDate?: string;
}


export type InvoiceItem = {
    productFK: Product;
    invoiceFK: Invoice;
    price: number;
    quantity: number;
}