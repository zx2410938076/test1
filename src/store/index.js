import Vue  from "vue"
import Vuex from 'vuex'
import tab from "./tab"
import role from "./role"

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        role
    }
})
