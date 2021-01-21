<template>
    <div>
     <nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
 
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="user==null">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
         <li class="nav-item" v-if="user==null">
          <router-link class="nav-link" to="/signin">Signin</router-link>
        </li>
         <li class="nav-item" v-if="user==null">
          <router-link class="nav-link" to="/signup">Signup</router-link>
        </li>
         <li class="nav-item" v-if="user">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
         <li class="nav-item" v-if="user">
          <router-link class="nav-link" to="/myproducts">My Products</router-link>
        </li>
         <li class="nav-item" v-if="user">
          <a class="nav-link" v-on:click="logout" style="cursor:pointer;">Logout</a>
        </li>
       
       
        
      </ul>
      
    </div>
  </div>
</nav>
    </div>
</template>
<script>
import firebase from '../Firebase'
import router from '../router'
export default {
  name:'Navbar',
  data(){
    return {
      user:null
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(userAuth=>{
      if(userAuth){
        this.user=userAuth
      }else{
        this.user=null
      }
    })
  },
  methods:{
    logout(){

      firebase.auth().signOut().then(()=>{
        localStorage.removeItem("uidUser")
        router.push({
          name:'Signin'
        })
      })
    }
  }
}
</script>
<style>
nav{
    background: #58be60;
}
</style>