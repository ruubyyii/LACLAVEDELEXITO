<template>
  <div>
    <Toaster richColors position="top-right"/>
    <router-view/>
  </div>
</template>

<script>
import { auth } from '@/db/firebase'
import { mapMutations } from 'vuex';
import { Toaster } from 'vue-sonner'
export default{
  components:{
    Toaster
  },
  methods:{
    ...mapMutations(['SET_USER_DATA']),
    asignarUsuario(){
      auth.onAuthStateChanged( (user)=> {
        if (user){
          this.SET_USER_DATA(user)
        }else{
          this.$router.push({name: 'login'})
        }
      })
    }
  },
  mounted(){
    this.asignarUsuario()
  }
}
</script>
