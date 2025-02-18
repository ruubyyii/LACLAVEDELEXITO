<template>
    <section>
        <h1>PASSWORDS</h1>
        <form @submit.prevent="agregarPassword" action="">
            <div>
                <label for="">Servicio</label>
                <input v-model="nameService" type="text">
            </div>
            <div>
                <label for="">Password</label>
                <input v-model="passwordService" type="text">
            </div>
            <button type="submit">Guardar</button>
        </form>
        <button @click="logout">Cerrar session</button>
        <div class="w-[50%] p-5 flex content-start flex-wrap gap-2">
        <div class="p-5 w-[30%] h-30 flex flex-col justify-center bg-white shadow-md rounded-md cursor-pointer" v-for="(password, index) in passwords" :key="index">
            <h3 class="font-bold text-xl ">{{ password.servicio }}</h3>
            <p>{{ "*".repeat(password.password.length)  }}</p>
        </div>
    </div>
    </section>
</template>

<script>
import { toast } from 'vue-sonner'
import { auth } from '@/db/firebase'
import { signOut } from 'firebase/auth';
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return{
            nameService: '',
            passwordService: ''
        }
    },
    computed:{
        ...mapState(['passwords'])
    },
    methods:{
        ...mapActions(['addPassword', 'getPasswords']),
        agregarPassword(){
            this.addPassword({servicio: this.nameService, password: this.passwordService})
        },
        async logout(){
            try {
                await signOut(auth)
                toast.success('Has cerrado session !')
                this.$router.push('/')
            } catch (error) {
                console.log(error.message);
            }
        }
    },
    mounted(){
        this.getPasswords()
    }
}
</script>

<style>

</style>