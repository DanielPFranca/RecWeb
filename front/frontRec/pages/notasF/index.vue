<script setup lang="ts">


definePageMeta({
    layout: 'login',
    middleware: 'auth'
})

</script>


<template>
    <div class="div">
        <div class="column-search">
            <h1>Invoices</h1>
        </div>
    <div>
        <FloatLabel class="column-search">
            <InputText id="number"/>
            <label>Note number</label>
        </FloatLabel>
    </div>
    <div>
        <FloatLabel class="column-search">
            <InputText id="date"/>
            <label>Start Date</label>
        </FloatLabel>
    </div>
    <div>
        <FloatLabel class="column-search">
            <InputText id="date"/>
            <label>End Date</label>
        </FloatLabel>
    </div>
    </div>

</template>


<style scoped lang="scss">

    .flex{
        text-align: center;
    }
    .column-search{
        margin: 2.5rem 0 1rem 0;
        .p-inputtext{
            height: 50px;
            width: 250px;
        }
    }

</style>

