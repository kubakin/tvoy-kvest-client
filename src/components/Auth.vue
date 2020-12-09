<template>
  <div class="auth">
    <input
      class="firstinp"
      v-model="payload.username"
      name="username"
      placeholder="Логин"
      type="text"
    />
    <input
      type="password"
      v-model="payload.password"
      placeholder="Пароль"
      name="password"
    />
    <div v-for="(i, index) in $store.state.status" :key="index">
      <p v-for="(j, index) in i" :key="index">{{ j }}</p>
    </div>
    <div class="regWindow"></div>
      <button @click="auth()">Вход</button>
  </div>
</template>

<script>
export default {
  name: "auth",

  // props: {
  //   msg: String
  // }
  data() {
    return {
      payload: {
        username: "",
        password: "",
      },
      regWindow: false,
    };
  },
  methods: {
    registr() {
      this.$store.commit("registr", this.payload);
    },
    auth() {
      // e.preventDefault();
      console.log(this.payload);
      this.$store.commit("auth", this.payload);

      console.log(this.$store.state.user);

      // this.$store.dispatch('authAndGo', this.payload)

      // this.$store.dispatch('whoAmI',this.$store.state.authOptions)

      // this.$store.commit('setAuth', this.$store.state.user)
      // alert("test")
    },
  },
};
</script>
<style>
.registr {
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.buttons button {
  width: 100%;
  font-size: 30px;
  padding: 2% 0 2% 0;
}
.auth {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
input,
button {
  border: 0px;
  margin-top: 3%;
  opacity: 0.5;
  margin-left: 10%;
  margin-right: 10%;
  background: #4a1517;
  color: white;
  align-self: center;
  max-width: 500px;
  width: 30%;
  min-width: 200px;
}
input {
  height: 40px;
}
button {
  width: 20%;
}

.firstinp {
  margin-top: 15%;
}
.lastinp {
  background: white;
  color: black;
}
</style>
