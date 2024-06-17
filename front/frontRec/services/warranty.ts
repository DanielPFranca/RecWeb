import type { Warranty } from "~/models/warranty";


// export const salvarWarranty = async (warryParaSalvar: Warranty):Promise<Warranty|null> => {
//     const { data, error } = await useFetch<Warranty>('http://localhost:8000/api/auth/warranty/',{
//         method: 'POST',
//         body: JSON.stringify(warryParaSalvar),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if(error.value){
//         console.error(error);
//         return Promise.reject(null);
//     }
//     return Promise.resolve(data.value);
// }


export const salvarWarranty = async (warranty: Warranty): Promise<Warranty | null> => {
    const {error, data} = await useFetch<Warranty>('http://localhost:8000/api/auth/warranty/', {
        method: 'POST',
        body: warranty
    })

    if(error.value){
        console.log("error useFetch", error.value);
        return Promise.reject(null);
    }
    return Promise.resolve(data.value);
};