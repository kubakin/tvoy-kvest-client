<template>
  <div class="registr">
        <input type="text" v-model='payload.people' placeholder='Количество человек'>
                <input type="text" v-model='payload.number' placeholder='Контактный телефон'>

        <input type="text" v-model='payload.team_name' placeholder='Название команды'>

     <input class='firstinp' v-model='payload.username' name='username' placeholder='Логин' type="text">
        <input type="password" v-model='payload.password' placeholder='Пароль' name='password'>
        <button @click='registr()'>Создать аккаунт</button>
        <div v-for="(i, index) in $store.state.regstatus" :key="index">
        <p v-for="(j, index) in i" :key="index">{{j}}</p>
        </div>

  </div>
</template>

<script>
export default {
  name: 'auth',
  // props: {
  //   msg: String
  // }
  data() {
    return {
      payload: {
        username: '',
        password: '',
        people: '',
        number: '',
        team_name: '',
      }
      ,regWindow:false,
    }
  },
  methods: {
    registr() {
      this.$store.commit('registr', this.payload)
    },
    auth() {
      // e.preventDefault();
      console.log(this.payload)
      this.$store.commit('auth', this.payload)
     
      

      
      console.log(this.$store.state.user)

      // this.$store.dispatch('authAndGo', this.payload)
     
      // this.$store.dispatch('whoAmI',this.$store.state.authOptions)
      
      // this.$store.commit('setAuth', this.$store.state.user)
      // alert("test")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registr {
  align-self: center;
  margin: auto;
  padding: 30px 0 30px 0;
  background: gray;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
}

.buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
button {
  width: 30%;
  font-size: 10px;
  padding: 0 0 0 0;
}
.auth {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
input {
  border: 0px;
    margin-top: 3%;
    opacity: 0.5;
    margin-left: 10%;
    margin-right: 10%;
    background: white;
    height: 40px;
}
button{
    border: 0px;
    margin-top: 5%;
    opacity: 0.9;
    font-size: 15px;
    margin-left: 10%;
    margin-right: 10%;
    background: #4a1517;
    height: 40px;
    color: white;
}


.firstinp {
    margin-top: 3%;
}
.lastinp{
    background: white;
    color: black;
}
</style>
