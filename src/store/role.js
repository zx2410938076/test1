export default{
    state:{
        userName:null,
        role:null,
        userId:null,
        picture:null,
        userNumber:null,
       
    },
    mutations:{
        newrole(state,val){
            console.log("vuex里传过来的role是"+val)
            state.role = val
        },
        newUserName(state,val){
            console.log("vuex里传过来的userName是"+val)
            state.userName = val
        },
        newUser(state,val){
            console.log("vuex里传过来的User是")
            console.log(val)
            state.userName = val.userName
            state.role = val.authority
            state.userId = val.userId
            state.picture = val.picture
            state.userNumber = val.userNumber
        }

    },

}