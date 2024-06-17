<script setup lang="ts">
// import { type Product } from '~/models/products';
// import { type Invoice } from '~/models/invoices';
import { salvarWarranty } from '~/services/warranty';
// import { type Warranty } from '~/models/warranty';
import { type Usuario } from '~/models/usuarios';
const {data} = useAuth();

definePageMeta({
    layout: 'login',
    middleware: 'auth'
})

import { computed, type Ref } from "#imports";
import { carrinho, type CarrinhoItem } from '~/stores/carrinho';
import { WARRANTY_STATUS, type WarrantyBody } from '~/models/warranty';
const { getCarrinho, removerDoCarrinho, getValorTotalDoCarrinho, esvaziarCarrinho, getPesoTotalDoCarrinho } = carrinho();


const itensNoCarrinho = computed<Array<CarrinhoItem>>(()=>getCarrinho());
const valorTotal = computed(() => getValorTotalDoCarrinho().toPrecision(5));

const pesoTotal = computed(() => getPesoTotalDoCarrinho().toPrecision(5));

const mensagemErro = ref('');
const peso = Number(pesoTotal.value);


const carregando = ref(false);
//const salvo: Ref<boolean|null> = ref(null);


console.log("itens No carrinho.....", itensNoCarrinho);


const usuarioLogado = computed<Usuario | null>(() => {
  if (data.value) {
    return data.value?.results[0] ? data.value?.results[0] as Usuario : null;
  }
  return null;
});

const deletarDoCarrinho = (itemParaRemover: CarrinhoItem) => {
    removerDoCarrinho({
        invoice: itemParaRemover.invoice,
        quantidade: 0
    });
    }

definePageMeta({
  middleware: "auth",
});

// const salvarPedido = () => {
//     if (getCarrinho().length) {
//         carregando.value = true;
//         console.log("data", data.value)

//         salvarWarranty({
//             status: WARRANTY_STATUS.Pendent,
//             createdByFK: usuarioLogado.value ? `${usuarioLogado.value.id}` : ''
//         }).then(warrySalva => {
//             console.log("Warranty saved: ", warrySalva);
//             let payload: Array<WarrantyBody> = [];
//             getCarrinho().forEach(item => {
//                 payload.push({
//                     status: WARRANTY_STATUS.Pendent,
//                     description: item.invoice.
//                 })
//             })
//         })
//     }
// }


</script>


<template>
    <main class="carrinho-container flex flex-column align-items-center">
      <h2 class="mt-4 mb-4">ITENS</h2>
      <div class="card flex justify-content-center" v-if="carregando">
        <ProgressSpinner />
      </div>
      <table v-if="!carregando">
        <thead>
          <tr class="text-center">
            <td>Item</td>
            <td>Produto</td>
            <td>Descrição</td>
            <td>Categoria</td>
            <td>Preço Unitário</td>
            <td>Peso Unitário (Kg)</td>
            <td>Quantidade</td>
            <td>Subtotal</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(itemCarrinho, index) in itensNoCarrinho" :key="index" class="text-center">
            <td>{{ index + 1 }}</td>
            <td><img class="fotoProduto" :src="itemCarrinho.invoice.productFK.image" alt="foto produto" /></td>
            <td>{{ itemCarrinho.invoice.productFK.name }}</td>
            <td>{{ itemCarrinho.invoice.productFK.categoryFK.name}}</td>
            <td>R$ {{ itemCarrinho.invoice.price }}</td>
            <td>{{ itemCarrinho.invoice.productFK.weight }}</td>
            <td>{{ itemCarrinho.quantidade }}</td>
            <td>R$ {{ itemCarrinho.quantidade * itemCarrinho.invoice.price }}</td>
            <td>
              <Button @click="deletarDoCarrinho(itemCarrinho)" label=""><i class="pi pi-trash"></i></Button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-center">
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Peso Total(Kg): {{ pesoTotal }}</th>
            <th>Valor Total:</th>
            <th>R${{ valorTotal }}</th>
          </tr>
        </tfoot>
      </table>
      <div>
        <Button :disabled="peso > 15" class="bt mt-2 botao-pedido bg-primary" label="Fechar pedido" />
        <p v-if="peso > 15" class="alert">The maximum weight allowed is 15 kg.</p>
      </div>

  
  
    </main>
  </template>
  
  <style scoped lang="scss">
  $largura-tabela: 90vw;
  
  .carrinho-container {
    margin: 0;
    width: 100vw;
    min-height: calc(100vh - 80px);
    background-color: rgb(255, 255, 255);
    //background-image: url("background1.jpg");
    background-repeat: repeat;
    background-size: cover;
  }
  
  table {
    width: $largura-tabela;
    background-color: rgb(14, 218, 167);
    border-radius: 1rem;
  }
  
  thead {
    font-weight: bold;
  
    tr {
      border-bottom: 2px solid black
    }
  }
  
  td {
    padding: 1rem;
  }
  
  .fotoProduto {
    width: 50px;
    height: 50px;
  }
  
  Button {
    background-color: white;
    color: rgb(114, 15, 15);
    border: none;
  }
  
  .valor-total {
    font-weight: bold;
    width: 900px
  }
  
  .botao-pedido {
    width: $largura-tabela;
    height: 30px;
  
    &:hover {
      transform: scale(1.05);
      transition: 2s;
    }

  }

  </style>