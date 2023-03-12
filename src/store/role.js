export default{
    state:{
        role:null,
       
    },
    mutations:{
        newrole(state,val){
            console.log("vuex里传过来的role是"+val)
            state.role = val
        },

    },

}