<script setup lang="ts">

definePageMeta({
    layout: 'login',
    middleware: 'auth'
})

const route = useRoute();
import { ref, computed } from 'vue'; 
import { type InvoiceItem } from '~/models/invoiceitem';
const mensagemErro = ref('');
const data = ref<{ results: InvoiceItem[] }>({ results: [] });

import { type Product } from '~/models/products';
import { type Carrinho } from '~/stores/carrinho';
const { adicionarNoCarrinho, getCarrinho, estaNoCarrinho } = carrinho();

const emit = defineEmits(['eventoAdicionado']);

const adicionarItem = (inv: InvoiceItem) => {
  adicionarNoCarrinho(inv);
  emit('eventoAdicionado');
  console.log("CARRINHO ATUAL: ", getCarrinho());
}

const searchProducts = async () => {
    // if (!code.value.trim() || !emissionDate.value.trim()) {
    //     mensagemErro.value = 'Please fill in all required fields.';
    //     return;
    // }
    try {
        const url = `http://localhost:8000/api/auth/invoice-item?invoiceFK=${route.params.id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const responseData = await response.json();
        console.log('Notas fiscais encontradas:', responseData);
        data.value.results = responseData.results;
        mensagemErro.value = ''; 
        
    } catch (error) {
        console.error('Erro ao buscar notas fiscais:', error);
        mensagemErro.value = 'Unable to search for products!';
    }
};
const itens = computed(() => data.value.results);

searchProducts();

</script>



<template>

  <h1 class="title">Itens da Nota</h1>
        <div class="button">
          <NuxtLink :to="`/carrinho`">
              <Button label="Cart"/>
          </NuxtLink>
        </div>

        <div class="div" v-for="(prod, index) in itens">
          

        <section class="cartao flex flex-column align-items-center justify-content-center">

          <div class="check text-right">      
            <Checkbox :binary="true" :readonly="true"/>
          </div>
          <div>
            <h4 class="product-nome">{{ prod.productFK.name }}</h4>
          </div>
          <div class="product-imagem">
            <img :src="prod.productFK.image" />
          </div>
          <div class="flex flex-row">
            <span>Wight:{{ prod.productFK.weight }}</span>
          </div>
          <div class="flex ml-2">
            <span>{{ prod.productFK.description }} </span>
          </div>
          <Button class="botao-emprestar" label=" Select" @click="adicionarItem(prod)" />
        </section>
      </div>
</template>


<style scoped lang="scss">

.title{
  width: 1800px;
  height: 50px;
  text-align: center;
  background-color: rgb(19, 179, 125);
  border-radius: 1.5rem;
  margin: 1.5rem;
}
.button{
  .p-button {
    height: 50px;
    width: 200px;
    color: black;
}
}
.div{

.cartao {
  width: 300px;
  max-width: 300px;
  height: 350px;
  max-height: 350px;
  background-color: rgba(78, 76, 76, 0.301);
  border-radius: 1.5rem;
  margin: 1.5rem;
  cursor: pointer;


  &:hover {
    transform: scale(1.1);
    transition: 2s;
  }

  .product-imagem {
    width: 90%;
    height: 55%;
    max-width: 200px;
    max-height: 230px;
    

    img {
      width: 100%;
      height: 100%;
    }
  }
  .flex{
    color: rgb(0, 0, 0);
  }

  .product-nome{
    margin: 0.5rem;
    color: rgb(0, 0, 0);
  }

  .botao-emprestar {
    width: 80%;
    height: 2rem;
    margin: 1rem;
    color: rgb(0, 0, 0);
  }

  .check{
    width: 95%;
    
  }
}
}
</style>