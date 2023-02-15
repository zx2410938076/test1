import Vue from "vue";
import Router from 'vue-router'
import Customer from '../views/Customer'
import Order from '../views/Order'

Vue.use(Router)

export default new Router({
    routes:[
    {
        path:'/Customer',
        name:'Customer',
        component:Customer
    },
    {
        path:'/Order',
        name:'Order',
        component:Order
    }
]
})