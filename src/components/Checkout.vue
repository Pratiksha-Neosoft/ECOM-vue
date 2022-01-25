<template>
<section id="cart_items">
    <div class="container">
        <div class="breadcrumbs">
            <ol class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li class="active">Check out</li>
            </ol>
        </div>
        <!--/breadcrums-->
        <div class="shopper-informations">
            <div class="row">
                <div class="col-sm-6 clearfix">
                    <div class="bill-to">
                        <h2>My Addresses</h2>
                        <hr>
                        <table v-if="add.length>0">
                            <div v-for="(i,index) in add" :key="index">
                                <tr>
                                    <td class="col-sm-10">
                                        <h4><input type="radio" :value="i.id" v-model="address_id"> &nbsp;{{i.fullName}}</h4>
                                    </td>
                                    <td class="col-sm-2"><button @click="delAdd(i.id)" class="btn">&times;</button></td>
                                </tr>
                                <tr>
                                    <td>{{i.email}}</td>
                                </tr>
                                <tr>
                                    <td>
                                        {{i.mobile_no}}
                                        {{i.address}},{{ i.state}},{{i.city}},{{i.pincode}}</td>
                                </tr>
                                <hr>
                            </div>
                        </table>
                        <div v-else>
                            No address found!<br>
                            Please add your address.
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form" id="checkForm">
                        <form @submit.prevent="handleSubmit" id="myForm">
                            <h2>Add New Address</h2>
                            <div class="form-group">
                                <input type="text" placeholder="Full Name" v-model="user.name" class="form-control" :class="{'is-invalid': submitted && $v.user.name.$error,}" />
                                <div v-if="submitted && $v.user.name.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.name.required">Name is required</span>
                                    <span v-if="!$v.user.name.minLength">Name minimum legth should be atleast 2</span>
                                    <span v-if="!$v.user.name.maxLength">Name maximum length should not be more than 10</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="Email" v-model="user.email" class="form-control" :class="{'is-invalid': submitted && $v.user.email.$error,}" />
                                <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.email.email">Please enter valid email</span>
                                    <span v-if="!$v.user.email.required">Email is required</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="number" placeholder="Mobile Phone" v-model="user.mobile" class="form-control" :class="{'is-invalid': submitted && $v.user.mobile.$error,}" />
                                <div v-if="submitted && $v.user.mobile.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.mobile.required">Mobile No. is required</span>
                                    <span v-if="!$v.user.mobile.minLength">Must be 10 digit</span>
                                    <span v-if="!$v.user.mobile.maxLength">Must be 10 digit</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="Address" v-model="user.address" class="form-control" :class="{'is-invalid': submitted && $v.user.address.$error,}" />
                                <div v-if="submitted && $v.user.address.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.address.required">Address is required</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="State" v-model="user.state" class="form-control" :class="{'is-invalid': submitted && $v.user.state.$error,}" />
                                <div v-if="submitted && $v.user.state.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.state.required">State is required</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="City" v-model="user.city" class="form-control" :class="{'is-invalid': submitted && $v.user.city.$error,}" />
                                <div v-if="submitted && $v.user.city.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.city.required">City is required</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="number" placeholder="Zip / Postal Code" v-model="user.postal" class="form-control" :class="{'is-invalid': submitted && $v.user.postal.$error,}" />
                                <div v-if="submitted && $v.user.postal.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.postal.required">Postal code is required</span>
                                    <span v-if="!$v.user.postal.minLength">Must be 6 digit</span>
                                    <span v-if="!$v.user.postal.maxLength">Must be 6 digit</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <select v-model="user.addtype" :class="{'is-invalid': submitted && $v.user.name.$error,}">
                                    <option value="">Select address type</option>
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                </select>
                                <div v-if="submitted && $v.user.addtype.$error" class="invalid-feedback">
                                    <span v-if="!$v.user.addtype.required">Address type is required</span>
                                </div>

                            </div>
                            <button class="btn btn-primary">Add Address</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="review-payment">
            <h2>Review & Payment</h2>
        </div>

        <div class="table-responsive cart_info">
            <table class="table table-condensed">
                <thead>
                    <tr class="cart_menu">
                        <td class="text-center">Name</td>
                        <td class="image">Item</td>
                        <td class="price">Price</td>
                        <td class="quantity">Quantity</td>
                        <td class="total">Total</td>
                    </tr>
                </thead>
                <tbody v-for="(item, i) in carts" :key="i">
                    <tr>
                        <td class="text-center">
                            {{item.name}}
                        </td>
                        <td class="cart_product">
                            <img :src="item.image" width="200" height="150" alt="Card image cap" />
                        </td>
                        <td class="cart_price">
                            <p>{{ item.price }}</p>
                        </td>
                        <td class="cart_quantity">
                            <div class="cart_quantity_button">
                                <input class="cart_quantity_input" type="text" name="quantity" :value="item.quantity" autocomplete="off" size="2" disabled />
                            </div>
                        </td>
                        <td class="cart_total">
                            <p class="cart_total_price">
                                {{ item.price * item.quantity }}
                            </p>
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
                                    <td><span>{{carttotal>=500?'Free':50}}</span></td>
                                </tr>
                                <hr>
                                <tr>
                                    <td>Total</td>
                                    <td><span>{{carttotal}}</span></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="row">
            <div class="payment-options col-sm-6">
                <h2>Payment Methods:</h2>
                <span>
                    <label><input type="radio" value="0" v-model="mode" checked /> Cash On Delivery</label>
                </span>
                <div ref="paypal"></div>
            </div>
            <div class="col-sm-6">
                <h2>Coupon Code</h2>
                <div class="jumbotron">
                    <input class="form-control" type="text" v-model="code">
                    <button class="btn btn-info" style="width:100%" @click="check">Apply</button><br>
                </div>
            </div>
        </div>
        <div class="text-right ">
            <a href="javascript:void(0)" class="btn  btn-primary" style="margin-bottom:10px;margin-top:0px" @click="placeOrder()">CheckOut</a>
        </div>
    </div>
</section>
<!--/#cart_items-->
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script><script>
import {
    checkCoupon
} from '@/common/Service'
import {
    userAddress
} from "@/common/Service.js";
import {
    address
} from "@/common/Service";
import {
    deladdress
} from "@/common/Service";

import {
    order
} from "@/common/Service.js";
import {
    orderProduct
} from "@/common/Service.js";
import {
    usedCoupon
} from "@/common/Service.js";
import {
    required,
    minLength,
    maxLength,
    numeric,
    email
} from 'vuelidate/lib/validators'
export default {
    name: "Checkout",

    data() {
        return {
            add: [],
            code: '',
            err: '',
            carts: [],
            details: null,
            carttotal: localStorage.getItem('total'),
            coupon_used: 0,
            products: JSON.parse(localStorage.getItem("cart")),
            product_id: 0,
            address_id: 0,
            coupon_id: 0,
            quantity: 0,
            order_id: 0,
            mode: 0,
            user_id: localStorage.getItem("userid"),
            user: {
                name: '',
                email: '',
                mobile: '',
                state: '',
                city: '',
                postal: '',
                addtype: '',
                address: ''
            },
            cod: 0,
            online: 1,
            original: 0,
            discount: 0,
            submitted: false,
            loaded: false,
            paidFor: false,
            product: {
                price: localStorage.getItem('total'),
                description: "E-Shopper",
            },

        }
    },
    validations: {
        user: {
            name: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(30)
            },
            email: {
                required,
                email
            },
            mobile: {
                required,
                numeric,
                minLength: minLength(10),
                maxLength: maxLength(10)

            },
            state: {
                required
            },
            city: {
                required
            },
            postal: {
                required,
                numeric,
                minLength: minLength(6),
                maxLength: maxLength(6)
            },
            addtype: {
                required
            },
            address: {
                required
            }

        },
    },
    mounted() {
        this.loadData();
        const script = document.createElement("script");
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AdT26udSH_xrSqrQzij6jwPuyOeHLalMEwJ1XA-lVgUvTXB5tBSuUoe6xu6iHaHIlyACFco__r-_FTkl";
        script.addEventListener("load", this.setLoaded);
        document.body.appendChild(script);
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
        loadData() {
            address(this.user_id).then((res) => {
                this.add = res.data.addr;
            })
        },
        check() {
            if (this.coupon_used == 0) {
                let formData = {
                    code: this.code
                };
                checkCoupon(formData).then((res) => {
                    if (res.data.status == "error") {
                        this.$swal(res.data.msg, "", "error");
                    }
                    if (res.data.status == "success") {
                        this.details = res.data.coupon;
                        if (this.details.min_order_amt <= this.carttotal) {
                            if (this.details.amount_type == 'Fixed') {
                                this.original = this.carttotal;
                                this.carttotal = this.carttotal - this.details.amount;
                                this.discount = this.original - this.carttotal;
                                this.coupon_used = 1;
                                this.$swal("Coupon applied successfully", "", "success");
                            } else {
                                this.original = this.carttotal;
                                this.carttotal = (this.details.amount / 100) * this.carttotal;
                                this.carttotal = Math.round(this.carttotal);
                                this.discount = this.original - this.carttotal;
                                this.$swal("Coupon applied successfully", "", "success");
                                this.coupon_used = 1;
                            }
                        } else {
                            this.$swal("Please Enter valid Coupon", "", "error");
                        }

                    }
                })
            } else {
                this.$swal("Coupon Already Applied!!", '', "info");
            }
        },
        handleSubmit() {
            this.submitted = true;
            let data = {
                user_id: this.user_id,
                name: this.user.name,
                address: this.user.address,
                mobile: this.user.mobile,
                city: this.user.city,
                state: this.user.state,
                addtype: this.user.addtype,
                email: this.user.email,
                postal: this.user.postal
            };
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            userAddress(data).then((res) => {
                if (res.data.error == 0) {
                    this.$swal("Address Added");
                    this.user = {}
                    this.$v.$reset();
                    //document.getElementById("myForm").reset();
                }
            })
            this.loadData();
        },
        delAdd(id) {
            deladdress(id)
            this.loadData()
        },
        placeOrder() {
            if (this.address_id) {
                let orderdata = {
                    user_id: this.user_id,
                    address_id: this.address_id,
                    amount: this.carttotal,
                    coupon_used: this.coupon_used,
                    mode: this.mode
                };
                if (this.address_id != undefined) {
                    order(orderdata).then((res) => {
                        this.order_id = res.data.order_id;
                        if (this.order_id) {
                            for (var a in this.products) {
                                //console.log(a, " = ", this.products[a].id);
                                let orderproduct = {
                                    order_id: this.order_id,
                                    product_id: this.products[a].id,
                                    quantity: this.products[a].quantity,
                                    total_price: this.products[a].quantity*this.products[a].price,
                                };
                                orderProduct(orderproduct)
                            }
                            if (this.coupon_used) {

                                let coupondata = {
                                    coupon_id: this.details.id,
                                    user_id: this.user_id,
                                    order_id: this.order_id,
                                    discounted_price: this.discount
                                };
                                usedCoupon(coupondata).then((res) => {
                                    console.log(res.data.coupondata);

                                });
                            }
                        }
                    });
                }
                this.$swal({
                    title: "order placed successfully",
                    text: "Redirecting...",
                    icon: "success",
                    timer: 2000,
                    buttons: false,
                }).then(() => {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('cnt');
                    this.$store.commit('change')
                    this.$store.commit('cnt')
                    this.$router.push("/");
                });
            } else {
                this.$swal("please select or enter add");
            }
        },
        setLoaded: function () {
            this.loaded = true;
            window.paypal
                .Buttons({
                    createOrder: (data, actions) => {
                        if (this.address_id) {
                            return actions.order.create({
                                purchase_units: [{
                                    description: this.product.description,
                                    amount: {
                                        currency_code: "USD",
                                        value: this.product.price,
                                    },
                                }, ],
                            });
                        } else
                            this.$swal("Enter or select address.")
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();

                        this.data;

                        this.paidFor = true;
                        let orderdata = {
                            user_id: this.user_id,
                            address_id: this.address_id,
                            amount: this.carttotal,
                            coupon_used: this.coupon_used,
                            mode: '1'
                        };

                        order(orderdata).then((res) => {
                            this.order_id = res.data.order_id;
                            if (this.order_id) {
                                for (var a in this.products) {
                                    console.log(a, " = ", this.products[a].id);
                                    let orderproduct = {
                                        order_id: this.order_id,
                                        product_id: this.products[a].id,
                                        quantity: this.products[a].quantity,
                                        total_price: this.carttotal,
                                    };
                                    orderProduct(orderproduct)
                                }
                                if (this.coupon_used) {

                                    let coupondata = {
                                        coupon_id: this.details.id,
                                        user_id: this.user_id,
                                        order_id: this.order_id,
                                        discounted_price: this.discount
                                    };
                                    usedCoupon(coupondata).then((res) => {
                                        console.log(res.data.coupondata);

                                    });
                                }
                            }
                        });

                    },
                    onError: (err) => {
                        console.log(err);
                    },
                })
                .render(this.$refs.paypal);
        },

    }
};
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
