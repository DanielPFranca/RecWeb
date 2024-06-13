<script setup lang="ts">
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
// import { useAuth } from '#imports';
// import { type DefineNuxtConfig } from 'nuxt/config';



definePageMeta({
    layout: 'login',
    middleware: 'auth'
});




const code = ref('');
const emissionDate = ref('');

const searchInvoices = async () => {
    try {
        //const token = computed<Array<DefineNuxtConfig>>(()=>auth.provider.token)
        let url = `http://localhost:8000/api/auth/invoice?code=${code.value}&&emissionDate=${emissionDate.value}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // mudar o token para acessar as notas dos outros usuarios
                'Authorization': 'Token' + '603e6403457f55556040b567a17d5ef976743d6b'
                
            },
        });
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        console.log('Notas fiscais encontradas:', data);
        navigateTo('/Invoices');

    } catch (error) {
        console.error('Erro ao buscar notas fiscais:', error);
    }
};




</script>

<template>
    <div class="container">
        <div class="column-search">
            <h1>Invoices</h1>
        </div>

        <div class="column-search flex flex-column gap-2">
            <label>Note number</label>
            <InputText id="note"/>
        </div>
        <div class="column-search flex flex-column gap-2">
            <label for="username">Start Date</label>
            <InputText id="date"/>
            <small id="username-help">Ex. yyyy-mm-dd</small>
        </div>
        <div class="column-search">
            <Button label="Advance" @click="searchInvoices"/>
        </div>
    </div>

    <div>
        <label></label>
    </div>

</template>

<style scoped lang="scss">
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
    .p-calendar{
        height: 50px;
        width: 250px;       
    }
    .p-button{
        height: 50px;
        width: 200px; 
    }
}
</style>

