<template>
  <div id="app">
  <button v-if='$store.state.isAuth && false' class='exit' @click='test'>Выход</button>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    test(slovo) {
      window.location.replace('/')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    },
  },
  beforeCreate() {
     if(localStorage.getItem('refresh') != undefined){
    axios.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401 && error.config.url != `${this.$store.state.baseURL}/auth/jwt/create/`) {
        console.log(error.config)
        console.log("401");
        return this.$store.dispatch("getRefresh").then((response) => {
          localStorage.setItem("access", response.data.access);
          this.$store.commit("setToken", response.data.access)
   
          error.config.__isRetryRequest = true;
          error.config.headers.Authorization = "JWT " + response.data.access;
          this.$store.state.authOptions = error.config
          console.log('w')
          return this.$store.dispatch("whoAmI", error.config)
        });
      }
      return Promise.reject(error.response);
    });
    // this.$store.dispatch('auth')
    this.$store.dispatch("whoAmI", this.$store.state.authOptions);
     }
  },
};
</script>
<style>
.exit {
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 0
}
body, #app, html{
  width: 100%;
  height: 100%;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}
#app {

font-family:'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
