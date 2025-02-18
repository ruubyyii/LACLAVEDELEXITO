import { createStore } from 'vuex'
import { auth, db } from '@/db/firebase'
import { doc, setDoc, getDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

export default createStore({
  state: {
    user: null,
    passwords: []
  },
  getters: {
  },
  mutations: {
    SET_USER_DATA(state, user){
      state.user = user
    }
  },
  actions: {
    async register({commit}, user){
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, user.email, user.password)
        commit('SET_USER_DATA', userCredentials.user)
        sendEmailVerification(userCredentials.user)
        return true
      } catch (error) {
        console.log(error);
        return false
      }
    },
    async login({commit}, user){
      try {
        const userCredentials = await signInWithEmailAndPassword(auth, user.email, user.password)
        commit('SET_USER_DATA', userCredentials.user)
        return true
      } catch (error) {
        console.log(error);
        return false
      }
    },
    async addPassword({state}, newPassword){
      if (!state.user) return
      console.log(state.passwords);

      try {
        state.passwords.push(newPassword)
        let newPasswords = {
          passwords: state.passwords
        }
        const docRef = doc ( db, "users", state.user.uid )
        await setDoc(docRef, newPasswords)
      } catch (error) {
        console.log('Problemas', error.message);
      }
    },
    async getPasswords({state}){
      if (!state.user) return
      try {
        const docRef = doc(db, 'users', state.user.uid)
        const docSnap = await getDoc(docRef)

        if(docSnap.data() == undefined){
          state.passwords = []
        }else{
          if(docSnap.exists){
            state.passwords = docSnap.data().passwords
          }else{
            console.log('Problemas');
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
})
