<template>
  <div>首页
    <button @click="get">点击发送get请求</button>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      
    }
  },
  methods:{
    get(){
      /* this.$axios.get('user/all').then(res => {
			console.log(res.data)
		}) */
    }
  },
  mounted(){
   /*  this.$axios.get('user/all').then(res => {
			console.log(res.data)
      console.log(this)
		}) */
  }
}
</script>

<style>

</style>