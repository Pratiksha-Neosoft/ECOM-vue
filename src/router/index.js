import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.all.min.js'
Vue.use(VueSweetalert2)
import Main from '../components/Main.vue'
import Contact from '../components/Contact.vue';
import Login from '../components/Login.vue';
import Profile from '../components/Profile.vue';
import Cart from '../components/Cart.vue';
import Checkout from '../components/Checkout.vue';
import Product from '../components/Product.vue';
import Wishlist from '../components/Wishlist.vue'
import Register from '../components/Register.vue';
import Category from '../components/Category.vue'
import Productdetails from '../components/Productdetails.vue';
import Cmsdetails from '../components/Cmsdetails.vue';
import Updateprofile from '../components/UpdateProfile.vue'
import Changepassword from '../components/Changepassword.vue'
import Order from '../components/Order.vue'
function myGuard(to, from, next) {
    let isAuthenticated = false;
    if (localStorage.getItem('uid') != undefined) {
        isAuthenticated = true;
    }
    else {
        isAuthenticated = false;
    }
    if (isAuthenticated) {
        next();
    }
    else {
        next('/login');
    }
}

export default new Router({
    mode:"history",
    routes:[
        {
            path:'/',
            name:'Main',
            component:Main
        },
        {
            path:'/categorybyid/:id',
            name:'Category',
            component:Category
        },
        {
            path:'/productdetails/:id',
            name:'Productdetails',
            component:Productdetails
        },
        {
            path:'/cmsdetails/:id',
            name:'Cmsdetails',
            component:Cmsdetails
        },
        {
            path:'/contact',
            name:'Contact',
            component:Contact
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },
        {   beforeEnter:myGuard,
            path:'/profile',
            name:'Profile',
            component:Profile
        },
        {   beforeEnter:myGuard,
            path:'/orders',
            name:'Order',
            component:Order
        },
        {   beforeEnter:myGuard,
            path:'/editprofile',
            name:'Updateprofile',
            component:Updateprofile
        },
        {  beforeEnter:myGuard,
            path:'/changepass',
            name:'Changepassword',
            component:Changepassword
        },
        {  
            path:'/cart',
            name:'Cart',
            component:Cart
        },
        {   beforeEnter:myGuard,
            path:'/checkout',
            name:'Checkout',
            component:Checkout
        },
        {   
            path:'/product',
            name:'Product',
            component:Product
        },
        {   beforeEnter:myGuard,
            path:'/wishlist',
            name:'Wishlist',
            component:Wishlist
        },

        {
            path:'/register',
            name:'Register',
            component:Register
        },
    ]
})