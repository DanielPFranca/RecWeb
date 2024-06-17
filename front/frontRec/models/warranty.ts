import { type Usuario } from "./usuarios";
import { type InvoiceItem } from "./invoiceitem";


export enum WARRANTY_STATUS {
    'P','Pendent',
    'A','Approved',
    'R', 'Refused'
}


export type Warranty = {
    id:number,
    status:  WARRANTY_STATUS;
    description: string;
    creationDate: string;
    createdByFK: Usuario;
    approverFK: Usuario;
    items: InvoiceItem;
}


export type WarrantyBody = {
    id:number,
    status:  WARRANTY_STATUS;
    description: string;
    creationDate: string;
    createdByFK: string;
    approverFK: string;
    items: string;
}