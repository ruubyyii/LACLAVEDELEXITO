<template>
    <section>
        <h1>LOGIN</h1>
        <form @submit.prevent="loginUser" action="">
            <div>
                <label for="">Email:</label>
                <input v-model="email" placeholder="Introduce tu email..." type="email" name="">
            </div>
            <div>
                <label for="">Password:</label>
                <input v-model="password" placeholder="Introduce tu email..." type="password">
            </div>
            <button type="submit">Iniciar sesion</button>
        </form>
        <p>Aun no tienes cuenta? <router-link :to="{name: 'register'}"> Registrate</router-link></p>
    </section>
</template>

<script>
import { toast } from 'vue-sonner'
import { mapActions } from 'vuex';
export default {
    data(){
        return{
            email: '',
            password: ''
        }
    },
    methods:{
        ...mapActions(['login']),
        async loginUser(){
            const success = await this.login({email: this.email, password: this.password})
            if (success) {
                toast.success('Te has registrado con exito!!')
                this.$router.push('/passwords')
            }else{
                toast.error('Error al registrarte!!')
            }
        }
    }
}
</script>