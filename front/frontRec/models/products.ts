


export type ProductCategory = {
    name: string;
}

export type Product = {
    name: string;
    categoryFK: ProductCategory;
    weight: number;
    description: string;
    creationDate?: string;
    barCode: string;
    image: string;
}