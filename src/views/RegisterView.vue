<template>
    <section>
        <h1>REGISTER</h1>
        <form @submit.prevent="registerUser" action="">
            <div>
                <label for="">Email:</label>
                <input v-model="email" placeholder="Introduce tu email..." type="email" name="">
            </div>
            <div>
                <label for="">Password:</label>
                <input v-model="password" placeholder="Introduce tu email..." type="password">
            </div>
            <button type="submit">Registrarse</button>
        </form>
        <p>Ya tienes cuenta? <router-link :to="{name: 'login'}">Inicia sesion</router-link></p>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
import { toast } from 'vue-sonner'
export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        ...mapActions(['register']),
        async registerUser(){
            const success = await this.register({email: this.email, password: this.password})
            if (success) {
                toast.success('Te has registrado con exito!!')
                this.$router.push('/passwords')
            }else{
                toast.error('Error al registrarte!')
            }
        }
    }
}
</script>

<style>

</style>