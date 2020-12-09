<template>
  <div class="auto">
 <div class='logo'>
        <img src="@/assets/logo.png" alt="" height="100px">
    </div>
              <Registr v-if='regWindow'></Registr>

      <Auth v-if='isAuth==false && !regWindow'></Auth>
      <button @click='regWindow = !regWindow' v-if='!regWindow && !$store.state.isAuth'>Регистрация</button>
            <button @click='regWindow = !regWindow' v-if='regWindow'>Вернуться</button>


            <Quest v-if='isAuth==true' :name='qwer'></Quest>


  </div>
</template>

<script>
// @ is an alias to /src
import Auth from '@/components/Auth.vue'
import Quest from '@/components/Quest.vue'
import Registr from '@/components/Registr.vue'

export default {
  name: 'AutoQuest',
  components:{
    Auth,
    Quest,
    Registr,
  },
  data(){
    return {
      qwe:'qwe',
      regWindow: false
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuth
    },
    qwer() {
      return this.$store.state.user.username
    }
  }
}
</script>
<style>

.auto button {
  width: 10%;
  max-width: 200px;
  min-width: 200px;
}
html {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #474242;
}
@media screen and (max-width: 500px) {
  html {
      width: 100%;
      height: 100%;
        background: url('../assets/Fon.png') no-repeat center center;
        background-size: cover;
        background-attachment: fixed;
}
    
    }
    .logo{
        display: flex;
        justify-content: center;
        
      
}

.logo img{
    margin-top: 15%;
}
</style>
