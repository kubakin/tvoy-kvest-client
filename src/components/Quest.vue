<template>
  <div class="data">
 <p>Добро пожаловать, {{$store.state.user.username}}</p>
 <div v-if='$store.state.user'>
 <p>{{isAccess}}</p>

 <div v-if='isAccess2'>
 <p>Текущее задание: {{$store.getters.getProgress}}</p>
 <router-link  to='/quest'>Начать квест</router-link>
 </div>
 </div>
  </div>
</template>

<script>
export default {
  name: 'quest',
  props: ['test','name'],
  computed: {
    isAccess2(){
      if (this.$store.state.user.user_is_active.active == true)
      return true
      return false
    },
    isAccess() {
      if (this.$store.state.user.user_is_active.active == true)
      return 'Ваш аккаунт подтвержден'
      else 
      return 'Дождитесь пока администратор подтвердит ваш аккаунт'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data {
    display: flex;
    justify-content: center;
    flex-direction: column;
        background: #4a1517;
    opacity: 0.5;
    color: white;

}
a {
  background: white;
  width: 100px;
  align-self:center;
  text-decoration: none;
  color: black;
  padding: 5px 10px 5px 10px;
}

</style>
