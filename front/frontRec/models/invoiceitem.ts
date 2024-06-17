
import type { Product } from "./products";
import type { Invoice } from "./invoices";


export type InvoiceItem = {
    id: number;
    productFK: Product;
    invoiceFK: Invoice;
    price: number;
    quantity: number;
}