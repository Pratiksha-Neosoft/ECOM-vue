<template>
<section id="cart_items">
    <div class="container" v-if="orders.length>0">
        <div class="table-responsive cart_info">
            <table class="table table-condensed">
                <thead>
                    <tr class="cart_menu">
                        <td class="text-center">Name</td>
                        <td class="image">Item</td>
                        <td class="quantity">Quantity</td>
                        <td class="price">Price</td>
                        <td class="total">Status</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody v-for="(item, i) in orders" :key="i">
                    <tr>
                        <td class="text-center">
                          {{item.product_name}}
                        </td>
                        <td class="cart_product">
                            <router-link :to="`/productdetails/${item.id}`">
                            <img :src="url+item.image" width="200" height="150" alt="Card image cap" />
                            </router-link>
                        </td>
                        <td class="cart_quantity">
                            <p>{{item.quantity}}</p>
                        </td>
                        <td class="cart_price">
                            <p>{{ item.price }}*{{ item.quantity }}</p>
                            <p>=&#8377;{{ item.price*item.quantity }}</p>
                        </td>
                        <td class="cart_total">
                            <p class="cart_total_price">
                                {{item.status}}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="container text-center" v-else>
        <i class="fa fa-shopping-cart fa-5x" style="color:#326647"></i>
        <h1>History Not Found!</h1>
        <br>
    </div>
</section>
<!--/#cart_items-->
</template>

<script>
import {viewOrder} from '@/common/Service'
export default {
    name: "Cart",
    data() {
        return {
            orders: [],
            id:localStorage.getItem('userid'),
            url:"http://127.0.0.1:8000/images/products/"
        };
    },
    created() {
        this.viewOrder();
    },
    methods: {
        viewOrder() {
            viewOrder(this.id).then((res)=>{
                this.orders = res.data.orders;
            })
        },
    },
};
</script>

<style>
</style>
