<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './views/Navbar'
export default {
  components:{
    Navbar
  }
}
</script>