<template>
  <v-container>
    <v-row justify="center">Welcome to Wakadventure</v-row>
    <v-row justify="center">
      <v-btn color="primary" :href="getAuthUrl()">Click me lol</v-btn>
    </v-row>
    <v-row v-show="firstTime">
      <v-card>
        <v-form @submit.prevent="setUsername()">
          <v-text-field v-model="username" label="Username" />
          <v-btn type="submit" @click="setUsername()">Validate</v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  created: function() {
    console.log()
    const code = this.$route.query.code
    if (code !== undefined && code !== null) {

      axios.post("http://localhost:3000/authentication", {code: code}, {headers: {'Access-Control-Allow-Origin': '*'}})
          .then(r => {
            this.$store.commit('setUser', r.data)
            if (r.data.username === null) {
              this.firstTime = true
            }
          })
    }
  },
  methods: {
    getAuthUrl: () => {
      return "https://wakatime.com/oauth/authorize?client_id=fdDqMKJwn3Y614MM3MxAFTuK" +
          "&response_type=code&redirect_uri=http://localhost:8080&scope=read_logged_time"
    },
    setUsername: function () {
      const user = this.$store.getters.user
      axios.post("http://localhost:3000/users/username", {uid: user.uid, username: this.username})
            .then(r => {
              console.log(r)
            })
    }
  },
  data: function () {
    return {
      firstTime: false,
      username: ""
    }
  }
}
</script>

<style scoped>

</style>
