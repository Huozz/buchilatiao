<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',

  created(){
    this.$store.dispatch("Init")
    // this.$store.dispatch("GetInfo")
    this.$router.push('/')
  },

  computed:{
    ...mapGetters([
      'githubUsername',
      'avatarUrl'
    ])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
