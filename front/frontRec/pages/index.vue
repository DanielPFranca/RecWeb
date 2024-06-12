<script setup lang="ts">
import { reactive, ref } from 'vue';

const mensagemErro = ref('');

definePageMeta({
    layout: 'login',
    //middleware: 'auth'
})

const { signIn } = useAuth();

const credenciais = reactive({
    email: '',
    password: ''
});

const fazerLogin = () => {
    console.log("login: ", credenciais);
    signIn(credenciais, { redirect: false })
        .then(() => {
            console.log("logado com sucesso....");
            navigateTo('/notasF');
        })
        .catch((error) => {
            console.error("error: ", error);
            mensagemErro.value = 'Não foi possível fazer o login!';
            setTimeout(() => {
                mensagemErro.value = '';
                credenciais.email = '';
                credenciais.password = '';
            }, 3000);
        })
}

</script>




<template>

    <main class="login-main flex align-items-center justify-content-center">
        <section
            class="login-container flex flex-column align-items-center justify-content-center">
            <h2 class="">Invoices Complaints</h2>

            <div class="row-login">
                <FloatLabel>
                    <InputText v-model="credenciais.email" class="input-text" id="email-input" type="email" />
                    <label for="email-input">Email</label>
                </FloatLabel>

            </div>
            <div class="row-login">
                <FloatLabel>
                    <InputText v-model="credenciais.password" class="input-text" id="senha-input" type="password" />
                    <label for="senha-input">Senha</label>
                </FloatLabel>
            </div>

            <div class="row-login" v-if="mensagemErro !== ''">
                <p id="erro">{{ mensagemErro }}</p>
            </div>

            <div class="row-login">
                <Button @click="fazerLogin" id="login-button" label="Entrar">Entrar</Button>
            </div>

            



        </section>
    </main>
</template>



<style scoped lang="scss">

    .login-main{
        width: 120vw;
        height: 100vh;
        background-color: white;
        background-repeat: repeat;
        background-size: cover;


        .login-container{
            width: 25vw;
            height: 70vh;
            background-color: rgba(221, 221, 221, 0.726);
            border-radius: 30px;
        }

        .row-login{
            margin: 0.2rem 0 1rem 0;

            .input-text{
                height: 2.3rem;
                width: 200px;
            }

            #login-button{
                width: 170px;
                height: 35px;
                font-family: Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif';
                background-color: rgb(0, 127, 177);
                border-color: rgb(165, 165, 165);
                color: white;
                border-radius: 10px;
            }

            #erro {
                color: tomato;
                font-size: 0.8rem;
            }
        }

        
    }

</style>