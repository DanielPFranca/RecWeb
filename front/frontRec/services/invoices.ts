
import type { Invoice } from "~/models/invoices";


export const getInvoice = async ():Promise<Array<Invoice>> => {
    const { data, error } = await useFetch<Array<Invoice>>('http://localhost:8000/api/auth/invoice');

    if(error.value){
        console.error(error);
        return Promise.reject([]);
    }
    //const teste = data.value ?? [];
    //const teste2 = data.value;

    return Promise.resolve(data.value ?? []);
}