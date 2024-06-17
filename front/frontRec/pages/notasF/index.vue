<script setup lang="ts">
import { ref, computed } from 'vue';
import { type Invoice } from '~/models/invoices';

definePageMeta({
    layout: 'login',
    middleware: 'auth'
})

const code = ref('');
const emissionDate = ref('');
const mensagemErro = ref('');
const data = ref<{ results: Invoice[] }>({ results: [] });

const searchInvoices = async () => {
    if (!code.value.trim() && !emissionDate.value.trim()) {
        mensagemErro.value = 'Please fill in all required fields.';
        return;
    }
    try {
        const url = `http://localhost:8000/api/auth/invoice?code=${code.value}&emissionDate_before=${emissionDate.value}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 603e6403457f55556040b567a17d5ef976743d6b'
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
        mensagemErro.value = 'Unable to search for invoices!';
    }
};
const invc = computed(() => data.value.results);




</script>

<template>
    <div class="container">
        <div class="column-search">
            <h1>Invoices</h1>
        </div>

        <div class="column-search flex flex-column gap-2">
            <label>Note number</label>
            <InputText v-model="code" id="note"/>
        </div>
        <div class="column-search flex flex-column gap-2">
            <label for="username">Start Date</label>
            <InputText v-model="emissionDate" id="date"/>
            <small id="username-help">Ex. yyyy-mm-dd</small>
        </div>
        <div class="column-search">
            <Button label="Search" @click="searchInvoices"/>
        </div>
        <div class="row-login" v-if="mensagemErro !== ''">
            <p id="erro">{{ mensagemErro }}</p>
        </div>

        <div v-if="invc.length > 0" class="results">
            <div class="invoice" >
                <Panel header="Invoice">
                    <p class="m-0">
                        <p><strong>Code:</strong> {{ invc[0].code }}</p>
                        <p><strong>Emission Date:</strong> {{ invc[0].emissionDate }}</p>
                        <p><strong>Customer CNPJ:</strong> {{ invc[0].customerCNPJ }}</p>
                        <p><strong>Customer Name:</strong> {{ invc[0].customerName }}</p>
                        <p><strong>Seller Name:</strong> {{ invc[0].sellerName }}</p>
                        <p><strong>Total Value:</strong> {{ invc[0].totalValue }}</p>
                        <p><strong>Upload Date:</strong> {{ invc[0].uploadDate }}</p>

                    </p>
                </Panel>
            </div>
            <div class="column-search">
                <NuxtLink :to="`/notasF/${invc[0].id}`">
                    <Button label="See products"/>
                </NuxtLink>
                
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.results{
    .p-panel{
        width: 700px;

    }
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.column-search {
    margin: 1.5rem 0 1rem 0;
    .p-inputtext {
        height: 50px;
        width: 250px;
    }
    .p-calendar {
        height: 50px;
        width: 250px;
    }
    .p-button {
        height: 50px;
        width: 200px;
        color: black;
    }
}

#erro{
    color:red;
}
</style>
