<template>
    
<div class="container">
    <h1 style="text-align:center">My products</h1>
           <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add new product
</button>
    <div class="row">

                            <div class="card" style="width: 18rem;" v-for="item in Myproducts" :key="item.key">
                    <img :src="item.image" class="card-img-top" alt="../assets/logo.png">
                    <div class="card-body">
                        <h5 class="card-title">{{item.name}}</h5>
                        <h5 class="card-title">{{item.price}}</h5>
                        <p class="card-text">{{item.description}}</p>
                        <a href="#" class="btn btn-primary">Buy</a>
                        <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#update" v-on:click="getData(item.name,item.price,item.description,item.image,item.key)">Update</button>
                        <button class="btn btn-danger" v-on:click="deleteProduct(item.key)">Delete</button>
                    </div>
                    </div>
                    


    </div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- form start here -->
        <form @submit.prevent="addproduct">
            <input class="form-control" type="text" placeholder="name" aria-label="default input example" v-model="product.name">
             <input class="form-control" type="number" placeholder="Price" aria-label="default input example" v-model="product.price">
<input class="form-control" type="file" placeholder="Image" accept=".jpg,.png" @change="previewImage" aria-label="default input example">

 <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description" v-model="product.description"></textarea>
    
      <div class="alert alert-success" v-if="messageSuccess">{{messageSuccess}}</div>
      <progress id="js-progressbar" class="uk-progress" :value="uploadValue" max="100"></progress>
                          
    <button type="submit" class="btn btn-success">Add</button>




        </form>
        <!-- form end here -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- update form start here -->
  <form @submit.prevent="update">
    <input class="form-control" type="text" placeholder="name" aria-label="default input example" v-model="dataProduct.name">
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description" v-model="dataProduct.description" ></textarea>
    <input class="form-control" type="text" placeholder="image" aria-label="default input example"  v-model="dataProduct.image" >
    <input class="form-control" type="number" placeholder="price" aria-label="default input example" v-model="dataProduct.price">
    <div class="alert alert-success" v-if="messageUpdate">{{messageUpdate}}</div>
  <button class="btn btn-success" type="submit">Update now</button>

  </form>

        <!-- update form end here -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>

</div>



</template>



<script>
import firebase from '../Firebase'

export default {
    name:'Myproducts',
    data(){
      return{
        product:{
          name:'',
          price:0,
          image:'',
          description:'',
          uid:localStorage.getItem('uidUser')
        },
        dataProduct:{
          name:'',
          price:0,
          image:'',
          description:'',
          key:''
        },
        uploadValue:0,
      picture:null,
      imageData : null,
      imageName:'',

        messageUpdate:'',
        ref:firebase.firestore().collection('products'),
        messageSuccess:'',
        Myproducts:[],
        uid:localStorage.getItem('uidUser')
      }
    },
    methods:{
      addproduct(){
        //  upload image start here
          this.picture=null;
      const storageRef=firebase.storage().ref(`images/${this.imageName}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          console.log(url)
          this.product.image=url
           this.ref.add(this.product).then(()=>{
         this.messageSuccess='Added'
        }).then(()=>{
          this.product.name=''
          this.product.price=''
          this.product.image=''
          this.product.description=''
        })
        });
      }
      );

        //  upload image end here


       
      },
      getData(name,price,description,image,key){
        this.dataProduct.name=name
        this.dataProduct.price=price
        this.dataProduct.description=description
        this.dataProduct.image=image
        this.dataProduct.key=key
      },
      update(){
        console.log(this.dataProduct.key)
        this.ref.doc(this.dataProduct.key).update({
          name:this.dataProduct.name,
          price:this.dataProduct.price,
          description:this.dataProduct.description,
          image:this.dataProduct.image,
        }).then(()=>{
          this.messageUpdate='Updated'
        })
      },
     deleteProduct(key){
       this.ref.doc(key).delete()
     },
     previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
      this.imageName=event.target.files[0].name

    }, 
    },

    created(){
      this.ref.onSnapshot(query=>{
        this.Myproducts=[]
        query.forEach(doc=>{
          if(localStorage.getItem('uidUser')==doc.data().uid){
          this.Myproducts.push({
            key:doc.id,
            name:doc.data().name,
            description:doc.data().description,
            price:doc.data().price,
            image:doc.data().image
          })
        }
        })
      })
    }
}
</script>