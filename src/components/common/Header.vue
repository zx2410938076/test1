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
      <el-dropdown>
        <span class="el-dropdown-link">
          <img  class="HeadPicture" src="@/assets/user.png"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
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