<template>
  <v-container>
    <v-row justify="center" class="mb-12">
      <h1>Welcome to Wakadventure</h1>
    </v-row>
    <v-row justify="center" v-show="!$store.getters.user">
      <v-btn color="primary" :href="getAuthUrl()">Authorize connexion to your Wakatime</v-btn>
    </v-row>
    <v-row v-if="firstTime === true">
      <v-card>
        <v-form @submit.prevent="setUsername()">
          <v-text-field v-model="username" label="Username" />
          <v-btn type="submit" @click="setUsername()">Validate</v-btn>
        </v-form>
      </v-card>
    </v-row>
    <v-row v-else-if="firstTime === false">
      Coucou {{ $store.getters.user.username }}
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
      axios.post("http://localhost:3000/authentication", {code: code})
          .then(r => {
            this.$store.commit('setUser', r.data)
            this.firstTime = r.data.username === null
            window.history.pushState({}, document.title, window.location.pathname)
          })
    }
  },
  methods: {
    getAuthUrl: () => {
      return "https://wakatime.com/oauth/authorize?client_id=fdDqMKJwn3Y614MM3MxAFTuK" +
          "&response_type=code&redirect_uri=http://localhost:8080&scope=read_logged_time,read_stats"
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
      firstTime: null,
      username: ""
    }
  }
}
</script>

<style scoped>

</style>
