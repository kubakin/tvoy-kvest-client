import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
var baseURL = "http://localhost:8000"
//baseURL = ""

const Quest = {
  state: {
    missions: "",
    lenOfQuest: 0,
  },
  mutations: {},
};
export default new Vuex.Store({
  state: {
    isAuth: false,
    baseURL: baseURL,
    progressData: "",
    authOptions: {
      method: "GET",
      url: `${baseURL}/auth/users/me/`,
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    user: {
      username: "",
      groups: "",
      user_is_active: { id: "", active: "", progress: "", key: "" },
    },
    status: "",
    regstatus: "",
  },
  mutations: {
    registr(state, payload) {
      axios
      .post(`${state.baseURL}/data/no-detail-user/`, payload)
      .then(response => {
        console.log('good')
        state.regstatus = [['Аккаунт создан, можете войти']]
        // axios(`${state.baseURL}data/active/`, {
        //   method: "POST",
        //   data: ,
        //   url: `${baseURL}/data/active/`,
        //   headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        // }
        // .post(response =>{

        // }))

      })
      .catch(error=>{
        state.regstatus = [['Заполните все поля']]
      })
    },
    setAuth(state, data) {
      state.user = data;
      state.isAuth = true;
    },
    getQuest(state) {
      axios.get(`${state.baseURL}/data/quest/`).then((response) => {
        state.q.missions = response.data;
        state.q.lenOfQuest = state.q.missions.length;
      });
    },
    inc(state) {
      state.user.user_is_active.progress += 1;
    },
    incScore(state) {
      state.user.user_is_active.score += state.q.missions[state.user.user_is_active.progress-1].cost;
    },
    incAns(state) {
      state.user.user_is_active.progressAnswer += 1;
    },
    decScore(state) {
      state.user.user_is_active.score = state.user.user_is_active.score - state.q.missions[state.user.user_is_active.progress].answer_for_quest[state.user.user_is_active.progressAnswer-1].cost
    },
    setToken(state, response) {
      localStorage.setItem("access", response);
      state.authOption = {
        method: "GET",
        url: `${state.baseURL}/auth/users/me/`,
        headers: {
          Authorization: `JWT ${response.access}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      return true;
    },
    auth(state, payload) {
      console.log(payload);
      axios
        .post(`${state.baseURL}/auth/jwt/create/`, payload)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          axios({
            method: "GET",
            url: `${state.baseURL}/auth/users/me/`,
            headers: {
              Authorization: `JWT ${localStorage.getItem("access")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }).then((response) => {
            state.isAuth = true;
            state.user = response.data;
          });
        })
        .catch(error =>{
          state.isAuth= false
        })
    },
  },
  actions: {
    authAndGo({ commit, dispatch, state }, payload) {
      commit("auth", payload);
    },
    whoAmI({ state, commit }, someData) {
      return axios(someData)
        .then((response) => {
          try {
            if (response.data.username == undefined) {
              state.progressData = response.data;
              console.log("test1");
            } else {
              state.user = response.data;
              console.log(state.user);
              console.log("test2");
              console.log(response.data);
              commit("setAuth", response.data);
            }
          } catch (e) {}
        })
        .catch((error) => {
          console.log("test3");
        });
    },
    getRefresh({ state }) {
      return axios.post(`${state.baseURL}/auth/jwt/refresh/`, {
        refresh: localStorage.getItem("refresh"),
      });
    },
  },
  getters: {
    getActive(state) {
      if (state.user.user_is_active.active !=undefined || state.user.user_is_active.active != false) return false;
      else return "Дождитесь пока администратор подтвердит ваш аккаунт";
    },
    getProgress(state) {
      if (state.user.user_is_active.progress != undefined)
        return state.user.user_is_active.progress;
      else return 0;
    },
  },
  modules: {
    q: Quest,
  },
});
