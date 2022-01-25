import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        token:'',
        uname:localStorage.getItem('uname')?localStorage.getItem('uname'):'',
       emailid:localStorage.getItem('uid')?localStorage.getItem('uid'):'',
       cart:JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [],
       cnt:localStorage.getItem('cnt')?localStorage.getItem('cnt'):0,
    },
    getters:{
        inCart: state => state.cart,
        count:state=>state.cnt,
        email:state=>state.emailid,
        uname:state=>state.uname
     },
    mutations:{
        tokenemail(state,payload){
            return state.token=payload.id,state.emailid=payload.uid;
        },
        change(state){
            return state.cart=JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
        },
        changeMail(state){
            return state.emailid=localStorage.getItem('uid') ? localStorage.getItem('uid') : '';
        },
        changeUser(state){
            return state.uname=localStorage.getItem('uname') ? localStorage.getItem('uname') : '';
        },
        cnt(state){
            return state.cnt=JSON.parse(localStorage.getItem('cnt')) ? JSON.parse(localStorage.getItem('cnt')) : 0;
        },
        SET_CART(state,data){
            console.log(data);
            let flag = true;
            state.cart.forEach((element,index) => {
                if(element.id == data.id)
                {
                    state.cart[index].quantity = state.cart[index].quantity+1;
                    flag=false;
                }
            });
            if(flag)
            {   
                state.cart.push(data);
                state.cnt=state.cart.length;
            }
            localStorage.setItem('cart',JSON.stringify(state.cart));
            localStorage.setItem('cnt',state.cart.length);

        },
    },
    actions:{
        token(context,payload){
            context.commit('tokenemail',payload)
        },
        addTocart(context,data){
            context.commit('SET_CART',data);
        },
    }
})