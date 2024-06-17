


// export class Invoice {
//     id: number = 0;
//     code: number = 0;
//     customerName: string = '';
//     customerCNPJ: number = 0;
//     sellerName: string = '';
//     totalValue: number = 0;
//     emissionDate?: string = '';
//     uploadDate?: string = '';
// }

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


