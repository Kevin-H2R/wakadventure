<template>
<v-container>
  <v-row justify="center">Welcome to Wakadventure</v-row>
  <v-row justify="center">
    <v-btn color="primary" :href="getAuthUrl()">Click me lol</v-btn>
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
      axios.post("http://localhost:3000/authentication", {code: code}, {headers: {'Access-Control-Allow-Origin': '*'}}).then(r => {
        console.log(r)
      })
    }
  },
  methods: {
    getAuthUrl: () => {
      return "https://wakatime.com/oauth/authorize?client_id=fdDqMKJwn3Y614MM3MxAFTuK" +
          "&response_type=code&redirect_uri=http://localhost:8080&scope=read_logged_time"
    }
  }
}
</script>

<style scoped>

</style>
