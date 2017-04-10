<template>
  <div id="app">
       <keep-alive>  <!-- 缓存插件 -->
          <router-view></router-view>
       </keep-alive>   
       <!-- <router-link to="/apple">to apple </router-link>
       <br>
       <router-link to="/banana">to banana </router-link> -->
  </div>
</template>


<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
     Hello:Hello
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
