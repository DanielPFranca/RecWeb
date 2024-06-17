//import type { Invoice } from "~/models/invoices";
import type { InvoiceItem } from "~/models/invoiceitem";
import type { Invoice } from "~/models/invoices";

export type CarrinhoItem = {
    invoice: InvoiceItem;
    quantidade : number;
}

export type Carrinho = {
    invoices: Array<CarrinhoItem>;    
}


export const carrinho = defineStore('carrinhostore', {
    state: (): Carrinho => ({
        invoices: []
    }),
    actions: {
        adicionarNoCarrinho(novoInvoice: InvoiceItem){
            const invoiceJaExiste = this.getInvoiceDoCarrinho(novoInvoice);
            if(invoiceJaExiste){
                invoiceJaExiste.quantidade += 1;
                this.invoices = [
                    ...this.invoices.filter(item=>item.invoice.productFK.id !== invoiceJaExiste.invoice.productFK.id),
                    invoiceJaExiste
                ];
            }
            else {
                this.invoices.push({
                    quantidade: 1,
                    invoice: novoInvoice
                });
            }
        },
        removerDoCarrinho(carrinhoItem: CarrinhoItem){
            const posicaoNoCarrinho = this.getInvoiceDoCarrinhoIndex(carrinhoItem.invoice);
            this.invoices.splice(posicaoNoCarrinho,1);

            if(carrinhoItem.quantidade){
                this.invoices = [
                    ...this.invoices,
                    carrinhoItem
                ];
            }
        },
        esvaziarCarrinho(){
            this.invoices = [];
        }
    },
    getters: {
        estaNoCarrinho: (carrinho:Carrinho) => (invoiceParaEncontrar: InvoiceItem): boolean =>{
            return carrinho.invoices.findIndex(item=>item.invoice.productFK.id === invoiceParaEncontrar.productFK.id) !== -1;
        },
        getInvoiceDoCarrinho: (carrinho:Carrinho) => (invoiceParaEncontrar: InvoiceItem) =>{
            return carrinho.invoices.find(item=>item.invoice.productFK.id === invoiceParaEncontrar.productFK.id);
        },
        getInvoiceDoCarrinhoIndex: (carrinho:Carrinho) => (invoiceParaEncontrar: InvoiceItem)=>{
            return carrinho.invoices.findIndex(item=>item.invoice.productFK.id === invoiceParaEncontrar.productFK.id);
        },
        getCarrinho: (carrinho:Carrinho) => () : Array<CarrinhoItem> => {
            return carrinho.invoices;
        },
        getValorTotalDoCarrinho: (carrinho:Carrinho) => () : Number => {
            let soma = 0;
            carrinho.invoices.forEach(item=>{
                soma += (item.invoice.price * item.quantidade)
            })
            return soma;
        },
        getPesoTotalDoCarrinho: (carrinho:Carrinho) => () : Number => {
            let kg = 0;
            carrinho.invoices.forEach(item=>{
                kg += (item.invoice.productFK.weight * item.quantidade)
            })
            return kg;
        }
    }
})