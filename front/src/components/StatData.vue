<template>
<v-card>
  <v-container>
    <v-progress-circular v-if="loading" indeterminate color="primary"/>
  </v-container>
</v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "stat-data",
  created: function () {
    axios.post("http://localhost:3000/stats", {uid: this.$store.getters.user.uid}).then(r => {
      console.log(r)
    })
  },
  data: function () {
    return {
      loading: true
    }
  }
}
</script>

<style scoped>

</style>
