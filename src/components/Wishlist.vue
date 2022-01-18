<template>
    <section id="cart_items">
      <div class="container" v-if="carts.length>0">
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td>Name</td>
                <td class="price">Price</td>
                <td></td>
              </tr>
            </thead>
            <tbody v-for="(item, i) in carts" :key="i">
              <tr>
                <td class="cart_product">
              <router-link :to="`/productdetails/${item.product_id}`">
                    <img
                      :src="item.image_path"
                      width="150"
                      height="150"
                      alt="Card image cap"
                  />
              </router-link>
                </td>
                <td>
                  {{item.product_name}}
                </td>
                <td>
                  <h4>
                    &#8377;{{ item.product_price }}
                  </h4>
                </td>
                <td class="cart_delete">
                  <a class="cart_quantity_delete" @click="removeWish(item.id)"
                    ><i class="fa fa-times"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          
          </table>
        </div>
      </div>
      <div class="container text-center" v-else>
        <i class="fa fa-heart fa-5x" style="color:gray"></i> 
        <h1>Wishlist is empty!</h1>
      </div>
    </section>
    <!--/#cart_items-->
</template>

<script>
import {userWishlist} from "@/common/Service";
import {deletewishlist} from "@/common/Service";
export default {
  name: "Wishlist",
  data() {
    return { carts: undefined, url: "http://localhost:8000/images/products/", 
    };
  },
  methods:{
    async removeWish(id){
      let result=await deletewishlist(id);
      if(result.status==200)
      this.loadData()
    },
    async loadData(){
      await userWishlist(localStorage.getItem('userid'))
      .then((res) => {
      this.carts = res.data;
        console.log(res.data);
      })
     .catch((error) => {
        console.log("Something went " + error);
      });

    }
    
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
</style>