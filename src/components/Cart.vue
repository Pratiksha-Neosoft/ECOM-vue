<template>
<section id="cart_items">
    <div class="container" v-if="carts.length>0">
        <div class="table-responsive cart_info">
            <table class="table table-condensed">
                <thead>
                    <tr class="cart_menu">
                        <td class="text-center">Name</td>
                        <td class="image">Item</td>
                        <td class="price">Price</td>
                        <td class="quantity">Quantity</td>
                        <td class="total">Total</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody v-for="(item, i) in carts" :key="i">
                    <tr>
                        <td class="text-center">
                          {{item.name}}
                        </td>
                        <td class="cart_product">
                            <router-link :to="`/productdetails/${item.id}`">
                            <img :src="item.image" width="200" height="150" alt="Card image cap" />
                            </router-link>
                        </td>
                        <td class="cart_price">
                            <p>&#8377;{{ item.price }}</p>
                        </td>
                        <td class="cart_quantity">
                            <div class="cart_quantity_button">
                                <a class="cart_quantity_up" href="javascript:void(0)" @click="addItem(item)">
                                    +
                                </a>
                                <input class="cart_quantity_input" type="text" name="quantity" v-model="item.quantity" autocomplete="off" size="2" />
                                <a class="cart_quantity_down" href="javascript:void(0)" @click="subItem(item)">
                                    -
                                </a>
                            </div>
                        </td>
                        <td class="cart_total">
                            <p class="cart_total_price">
                                &#8377;{{ item.price * item.quantity }}
                            </p>
                        </td>
                        <td class="cart_delete">
                            <a class="cart_quantity_delete" href="javascript:void(0)" @click="removeCart(item)"><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">&nbsp;</td>
                        <td colspan="2">
                            <table class="table table-condensed total-result">
                                <tr>
                                    <td>Shipping Charge</td>
                                    <td><span>{{check()>=500?'Free':50}}</span></td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td><span>&#8377;{{check()}}</span></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="text-right ">
            <router-link to="/checkout"><a href="javascript:void(0)" class="btn  btn-primary" style="margin-bottom:10px">CheckOut</a></router-link>
        </div>
    </div>
    <div class="container text-center" v-else>
        <i class="fa fa-shopping-cart fa-5x" style="color:#326647"></i>
        <h1>Your Cart is empty!</h1>
        <br>
    </div>
</section>
<!--/#cart_items-->
</template>

<script>
export default {
    name: "Cart",
    data() {
        return {
            carts: [],
            total: 0
        };
    },
    created() {
        this.viewCart();
    },
    methods: {
        viewCart() {
            if (localStorage.getItem("cart")) {
                this.carts = JSON.parse(localStorage.getItem("cart"));
            }
        },
        check() {
            const items = JSON.parse(localStorage.getItem("cart"));
            var sum = 0;

            var shipping_cost = 50;
            items.forEach((item) => {
                sum = sum + item.price * item.quantity;
            });
            var total = sum;
            if (items.length > 0) {
                total = sum >=500 ? total : total + shipping_cost;
            } else {
                total = 0;
            }
            localStorage.setItem("total", JSON.stringify(total))
            return total;
        },
        addItem(carts) {
            Object.assign(carts, {
                quantity: parseInt(carts.quantity) + 1,
            });
            localStorage.setItem("cart", JSON.stringify(this.carts));
        },  
        subItem(carts) {
            Object.assign(carts, {
                quantity: parseInt(carts.quantity) - 1,
            });
            if(carts.quantity>0){
            localStorage.setItem("cart", JSON.stringify(this.carts));
            }else{
                this.removeCart(carts);
            }
        },
        removeCart(item) {
            var del = this.carts.indexOf(item);
            this.carts.splice(del, 1);
            localStorage.setItem("cart", JSON.stringify(this.carts));
            localStorage.setItem('cnt',this.carts.length)
            this.$store.commit('change');
            this.$store.commit('cnt');
        },
    },
};
</script>

<style>
</style>
