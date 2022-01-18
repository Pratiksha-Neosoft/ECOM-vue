<template>
<div class="container">
    <div class="row">
        <Sidebar />
        <div class="col-sm-9 padding-right">
            <div class="features_items">
                <!--features_items-->
                <h2 class="title text-center">Features Items</h2>
                <div class="col-sm-4" v-for="(i, index) in arr" :key="index">
                    <div class="product-image-wrapper">
                        <div class="single-products">
                            <div class="productinfo text-center">
                                <router-link :to="`/productdetails/${i.pid}`">
                                    <img :src="i.images" alt="" class="img-fluid" height="200px" width="500px" />
                                </router-link>
                                <div class="text-center">
                                    <h2><b>&#8377;{{ i.price }}</b></h2>
                                    <h3><span class="text-primary">{{ i.name }}</span></h3>
                                    <a href="#" @click="addCartBtn(i.pid,i.name,i.price,i.images)" class="btn btn-default add-to-cart">
                                        <i class="fa fa-shopping-cart"></i>Add to cart
                                    </a>
                                    <a href="#" @click="postWish(i)" class="btn add-to-cart">
                                        <i class="fa fa-plus-square"></i>Add to wishlist
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import {
    userWish
} from "@/common/Service";
import Sidebar from "./includes/Sidebar.vue";
import {
    categorybyid
} from "@/common/Service";

export default {
    name: "Category",
    components: {
        Sidebar,
    },
    data() {
        return {
            arr: [],
            paramm: undefined,
            uid: localStorage.getItem('userid')

        };
    },
    computed: {

    },
    methods: {
        addCartBtn(id, name, price, image) {
            this.$store.dispatch("addTocart", {
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
            this.$store.commit('change')
            this.$store.commit('cnt')
            this.$swal("Added", '', 'success');
        },
        postWish(pro) {
            if (localStorage.getItem('uid')) {
                let obj = {
                    userid: this.uid,
                    product_id: pro.pid,
                    product_price: pro.price,
                    product_name: pro.name,
                    product_image: pro.images,
                };
                console.log(obj);
                userWish(obj)
                    .then((res) => {
                        if (res.data.message == "error") {
                            this.$swal("Already added!", "Go and Grab it...", "info");
                        } else {
                            this.$swal("Added to wishlist!", "", "success");
                        }
                    })
                    .catch((err) => {
                        console.log("SOmething Wrong " + err);
                    });
            } else {
                this.$router.push('/login');
            }
        },

    },
    watch: {
        $route(to) {
            this.paramm = to.params.id;
            categorybyid(this.paramm).then((res) => {
                this.arr = res.data.categorybyid;
                console.log(res.data);
            });
        },
    },
    created() {
        this.paramm = this.$route.params.id;
    },
    mounted() {
        categorybyid(this.paramm)
            .then((res) => {
                this.arr = res.data.categorybyid;
                console.log(res);
            })
            .catch((error) => {
                console.log("Something Wrong " + error);
            });
    }
};
</script>

<style>
</style>
