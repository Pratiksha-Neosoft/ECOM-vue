<template>
<div class="container">
<h1 class="text-info text-center">{{arr.title}}</h1><hr>
<div class="jumbotron" v-if="arr.image">
    <center><img :src="arr.image" class="img-fluid "  height="200px" width="500px" id="main"/></center>
</div>
<div v-html="arr.body" class="text-center"></div>
</div>
</template>

<script>
import {cmsDetails} from '@/common/Service'
export default {
name:'Cmsdetails',
data(){
    return {id:undefined,
    arr:[]
    }
},
   watch: {
    $route(to) {
      this.id = to.params.id;
      cmsDetails( this.id).then((res) => {
        console.log(res.data)
        this.arr = res.data;
      });
    },
  },
created(){
    this.id=this.$route.params.id;
},
mounted(){
    cmsDetails(this.id).then(res=>{
        this.arr=res.data;
    })
}
}
</script>

<style >
</style>
