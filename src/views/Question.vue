<template>
<div class="questMain">
<div v-if='isEnd' class="congr">
<h1>Поздравляем с окончанием квеста</h1>
<h3>Мы с вами свяжемся для подведения итогов</h3>
<button class='exit' @click='test'>Выход</button>

</div>
  <div v-if='!isEnd' class="quest">
  <div class="imgtextblock">
    <img v-if='haveImg' :src="$store.state.q.missions[$store.state.user.user_is_active.progress].image" alt="" />
    <p
      v-if="$store.state.q.missions[$store.state.user.user_is_active.progress]"
    >
      {{
        $store.state.q.missions[$store.state.user.user_is_active.progress].text
      }}
    </p>
    </div>
    <input type="text" v-model="code" />

    <button @click="checkCode">Отправить ответ</button>
    <button @click="help">Взять подсказку</button>

    <div class="itog">
      <p>{{ $store.state.user.username }}</p>
      <p>Кол-во баллов: {{ $store.state.user.user_is_active.score }}</p>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth from "@/components/Auth.vue";
import Mission from "@/components/mission.vue";
export default {
  name: "AutoQuest",
  components: {
    Auth,
  },
  
  created() {
    if(localStorage.getItem('refresh') == undefined)
          window.location.replace('/')

    this.$store.commit("getQuest");
  },
  data() {
    return {
      code: "",
      tek: 0,
      someTime: 0,
      lstHlp: this.lastHelp,
    };
  },
  methods: {
     test(slovo) {
      window.location.replace('/')
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    },
    time() {
      let d = new Date();
      let a = d.getHours();
      let b = d.getMinutes();
      return a * 60 + b;
    },
    help() {
       if (this.$store.state.q.missions[this.$store.state.user.user_is_active.progress] != undefined) {
      let tm = this.time()
      // console.log('here')
      
      //     console.log(this.$store.state.q.missions[this.$store.state.user.user_is_active.progress].answer_for_quest.length)
      //     console.log(this.$store.state.user.user_is_active.progressAnswer)
      // console.log('here')
      // if (this.$store.state.q.missions[this.$store.state.user.user_is_active.progress].answer_for_quest.length == this.$store.state.user.user_is_active.progress)
      this.$store.dispatch("whoAmI", {
        method: "GET",
        url: `${this.$store.state.baseURL}/auth/users/me/`,
        headers: {
          Authorization: `JWT ${localStorage.getItem("access")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(response =>{
        if(this.$store.state.q.missions[this.$store.state.user.user_is_active.progress].answer_for_quest.length == this.$store.state.user.user_is_active.progressAnswer) {
      alert('Подсказок больше нет')
      return
      }
      console.log(this.$store.state.q.missions[this.$store.state.user.user_is_active.progress].answer_for_quest[this.$store.state.user.user_is_active.progressAnswer].reload_time)
         if (Math.abs(tm - this.lastHelpTime) < this.$store.state.q.missions[this.$store.state.user.user_is_active.progress].answer_for_quest[this.$store.state.user.user_is_active.progressAnswer].reload_time)
        alert(
          `Вы сможете взять подсказку через ${this.$store.state.q.missions[this.$store.state.user.user_is_active.progress].answer_for_quest[this.$store.state.user.user_is_active.progressAnswer].reload_time -
            Number(Math.abs(tm - this.lastHelpTime))} мин`
        );
      else {
        this.$store.state.user.user_is_active.lastHelp = `${(tm -
          (tm % 60)) /
          60}:${tm % 60}`; 
         // alert(this.$store.state.q.missions.answer_for_quest)
        this.someTime = `${(tm - (tm % 60)) / 60}:${tm %
          60}`;
          alert(this.$store.state.q.missions[this.$store.state.user.user_is_active.progress].answer_for_quest[this.$store.state.user.user_is_active.progressAnswer].ans)
          this.$store.commit("incAns");
          this.$store.commit('decScore')
        this.$store.dispatch("whoAmI", {
          method: "PATCH",

          url: `${this.$store.state.baseURL}/data/active/${this.$store.state.user.user_is_active.id}/`,
          data: {
            active: true,
            key: this.$store.state.user.id,
            progress: this.$store.state.user.user_is_active.progress,
            lastHelp: `${(tm - (tm % 60)) / 60}:${tm %
              60}`,
              progressAnswer: this.$store.state.user.user_is_active.progressAnswer,
              score: this.$store.state.user.user_is_active.score
          },

          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        });
      }
      });
      console.log("qwe");
     }
    },
    checkCode() {
      let tm = this.time()
      if (this.$store.state.q.missions[this.$store.state.user.user_is_active.progress] != undefined) {
      // console.log(this.$store.getters.getProgress)

      // console.log(this.progress)
      if (
        this.code.toLowerCase() ==
        this.$store.state.q.missions[
          this.$store.state.user.user_is_active.progress
        ].code.toLowerCase()
        //  || this.$store.state.q.missions[
        //   this.$store.state.user.user_is_active.progress
        // ].code.toLowerCase().search(this.code.toLowerCase())
        
      ) {
        if (
          this.$store.state.q.lenOfQuest >=
          this.$store.state.user.user_is_active.progress 
        ) {
          this.$store.commit("inc");
                    this.$store.commit("incScore");
}
       
         
        this.$store.dispatch("whoAmI", {
          method: "PATCH",

          url: `${this.$store.state.baseURL}/data/active/${this.$store.state.user.user_is_active.id}/`,
          data: {
            active: true,
            key: this.$store.state.user.id,
            progress: this.$store.state.user.user_is_active.progress,
            progressAnswer: 0,
            score: this.$store.state.user.user_is_active.score,
            lastHelp: `${(tm - (tm % 60)) / 60}:${tm %
              60}`,
          },
          headers: {
            Authorization: `JWT ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        });
      }
      else(alert('Неправильный ответ'))
    }
  },
  },
  computed: {
    isEnd() {
      if (this.$store.state.q.missions[this.$store.state.user.user_is_active.progress] == undefined)
      return true
    },
    haveImg() {
      if (this.$store.state.q.missions[this.$store.state.user.user_is_active.progress] == undefined)
      return false
      return true
    },
    progress() {
      return this.$store.state.user.user_is_active.progress;
    },
    
    lastHelpTime() {
      let d = this.$store.state.user.user_is_active.lastHelp.split(":");
      // let a = d.getHours()
      // let b = d.getMinutes()
      // let d = this.$store.state.user.user_is_active.lastHelp
      return d[0] * 60 + Number(d[1]);
    },
  },
};
</script>
<style>
.congr button {
  width: 100%;  
}
.congr {
  padding-top: 20%
}
.imgtextblock {
  background: rgba(0, 0, 0, 0.3);;
  width: 80%;
  align-self: center;
  padding: 5% 0 0 0;
  margin-bottom: 5%;
  
}
.imgtextblock p {
  background: rgba(0, 0, 0, 0.4);
  margin-left: 5%;
  margin-right: 5%;
  padding: 3% 3% 3% 3%;
  word-wrap: break-word;
}
.quest img {
  width: 80%;
  max-width: 700px;
  align-self: center;
}

.quest {
  
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button {
  border: 0;
  color: white;
  padding: 20px 20px 20px 20px;
  margin-top: 5%;
background: #4a1517;
  border-radius: 5px;
  opacity: 0.6;
  font-size: 18px;
  font-family: "Times New Roman", Times, serif;
  font-weight: bold;
  margin: 5% 15% 0 15%;
    max-width: 600px;
    min-width: 400px;
    align-self: center;

}
input {
  margin: 0 10% 0 10%;
  max-width: 600px;
  width: 20%;
  height: 30px;
  align-self: center;
      min-width: 300px;

}

p {
  color: white !important;
  text-align: center;
}
</style>
