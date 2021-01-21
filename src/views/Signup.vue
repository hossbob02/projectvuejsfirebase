<template>
    <div class="container">
        <br>
        <br>
            <form @submit.prevent="registerUser">
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control"  aria-describedby="emailHelp" v-model="user.name">

  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="user.email">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password">
  </div>
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>


    </div>

</template>



<script>
import firebase from '../Firebase'
import router from '../router'
export default {
    name:'Signup',
    data(){
      return {
        user:{
          name:'',
          email:'',
          password:'',
          uid:''
        },
      ref:firebase.firestore().collection('users')
      }
    },
    methods:{
      registerUser(){
        firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password).then((dataUser)=>{
          this.ref.add({
            name:this.user.name,
            email:this.user.email,
            uid:dataUser.user.uid
          })
          router.push({
            name:'Home'
          })


        })
      }
    }

}
</script>