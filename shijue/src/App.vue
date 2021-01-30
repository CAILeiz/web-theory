<template>
  <div id="app">
    <common-header></common-header>
    <div class="container-min container-max wrap">
      <router-view></router-view>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
require('./assets/css/reset.css')
require('./assets/css/flex.css')
require('./assets/css/common.css')
require('./assets/css/font.css')
import commonHeader from './components/commonHeader'
import commonFooter from './components/commonFooter'
export default {
  name: 'App',
  components: {
    commonHeader,
    commonFooter
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  /* border: 1px solid black; */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
