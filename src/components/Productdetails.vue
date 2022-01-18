<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 padding-right">
          <div class="product-details">
            <!--product-details-->
            <div class="col-sm-5">
              <div class="view-product">
                <img :src="details[0].image" alt="hello" />
              </div>
              <div
                id="similar-product"
                class="carousel slide"
                data-ride="carousel" 
                v-if="details[0].images[0]"
              >
                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                  <div class="item active ">
                     <a href=""  v-for="(img, index) in details[0].images"
                      v-bind:key="index"> <img
                        :src="img.image"
                        alt=""
                     width="50" height="50"
                    /></a>
                     
                  </div>
                </div>

                <!-- Controls -->
                <a
                  class="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                >
                  <i class="fa fa-angle-left"></i>
                </a>
                <a
                  class="right item-control"
                  href="#similar-product"
                  data-slide="next"
                >
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div class="col-sm-7"  v-for="(pro, index) in details"
                      v-bind:key="index">
              <div class="product-information">
                <!--/product-information-->
                <h1>{{ pro.name }}</h1>
                <span>
                  <span>&#8377; {{ pro.price }}</span>
                  <button type="button" class="btn btn-fefault cart" @click="addCartBtn(pid,pro.name,pro.price,pro.image)">
                    <i class="fa fa-shopping-cart"></i>
                    Add to cart
                  </button>
                </span>
                <p v-if="pro.description"><b>Description:</b> <br>{{ pro.description }}
                </p>
                <p v-if="pro.attributes">
                    <table class="table table-dark">
                        <tr v-if="pro.color">
                            <th>Color:</th>
                            <td>{{pro.color}}</td>
                        </tr>
                        <tr v-for="(i,index) in pro.attributes" :key="index">
                            <th>{{i.name}}:</th>
                            <td>{{i.value}}</td>
                        </tr>
                    </table>
                </p>
              </div>
              <!--/product-information-->
            </div>
          </div>
          <!--/product-details-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { productDetails } from "@/common/Service.js";
export default {
  name: "Productdetails",
  data() {
    return {
      pid: this.$route.params.id,
      details: null,
      images: null,
    };
  },
  methods:{
            addCartBtn(id, name, price, image) {
            this.$store.dispatch("addTocart", {
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
            this.$store.commit('change');
            this.$store.commit('cnt')
        },
  },
  mounted() {
    productDetails(this.pid).then((res) => {
      this.details = res.data.products;
      //this.images = res.data.products.images;
    });
  },
};
</script>

<style>
</style>