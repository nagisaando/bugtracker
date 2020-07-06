<template>
  <div id="app" class="bg-gray-100 font-sans leading-normal tracking-normal mt-12 min-h-full">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    
    <NavBar />
    <div class="pt-20 md:pt-0">
      <router-view v-if="!auth"></router-view>
    </div>
    
    <!-- <div class="h-full md:flex items-center justify-between mx-12" v-if="!auth">
      <Welcome></Welcome>
      <Signin></Signin>
    </div> -->
    
    

    <div v-if="auth" class="flex flex-col md:flex-row h-full">
      <LeftBar></LeftBar>
      <router-view/>
      <!-- <Home v-if="HomeIsActive"></Home> -->
      <!-- <component :is="HomeIsActive"></component> -->
      <!-- <home /> -->
      <!-- <button @click="HomeIsActive = !HomeIsActive">click</button> -->
    </div>
    

    

     <!-- <div class="text-black font-bold bg-red-200">hola</div> -->
  </div>
</template>

<script>
import NavBar from './components/Header/Navbar.vue';
import LeftBar from './components/Header/LeftBar.vue';
// import Home from './views/Home.vue'
export default {
  data: function(){
    return {
      HomeIsActive: true,
    }
  },
  computed: {
    auth() {
      return this.$store.getters.userToken
    }
  },
  created(){
    this.HomeIsActive = false;
    this.$store.dispatch('tryAutoLogin');
  },
  mounted(){
    
  },

  destroyed() {
    this.HomeIsActive;
  },
  components: {
    NavBar,
    LeftBar,
    // Home
  }
}
</script>

<style>
html, body{
height: 100%;

}

/* .main-content {
  height: 100%;
} */
/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
