<template>
  <div class="Header">
    <div class="">
      <el-button
        icon="el-icon-menu"
        size="medium"
        style="margin-left: 20px,margin-left: 0;"
        @click="handleMenu"
      ></el-button>
      <el-breadcrumb  separator="/" style="padding-left:20px; display: inline-block;">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
          {{item.label}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img  class="HeadPicture" :src="this.$store.state.role.picture"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="a" >个人信息</el-dropdown-item> -->
          <el-dropdown-item command="b" >退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'Header',
    data(){
        return {} 
    },
    methods:{
        handleMenu(){
            this.$store.commit("collapeChang")
        },handleCommand(commond){
      if('b' === commond){
        this.$confirm('是否确认注销登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           // 表示处理的是 注销操作
          sessionStorage.clear(); // 清空存储的Token信息
          // 然后跳转到登录页
          this.$router.push("/Login")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });          
        });
        
      }
    }
    },
    computed:{
    ...mapState({
      tags:state => state.tab.tabsList
    })
  }
};
</script>

<style lang="less" scoped>
.Header {
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
}
.title {
  display: inline-block;
  margin-left: 20px;
  font-weight: 700;
}
.menu {
  width: 30px;
  height: 25px;
  background-color: #fff;
  padding: 5px 5px 0 5px;
  text-align: center;
  border-radius: 5px;
}
.HeadPicture{
    height: 40px;
    width: 40px;
    margin-top: 10px;
    border-radius: 10px;
}
</style>