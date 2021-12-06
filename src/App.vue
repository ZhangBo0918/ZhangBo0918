<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Pos</router-link>
    </div> -->
    <left-nav></left-nav>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>
<script>
import LeftNav from './components/LeftNav.vue'
export default {
  name:"App",
  components:{
    LeftNav
  }
}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  #app{
    height: 100vh;
    user-select: none;
  }
  .main{
    float: left;
    width: 95%;
    background-color: #eff2f7;
    height: 100%;
    overflow: hidden;
  }
</style>
