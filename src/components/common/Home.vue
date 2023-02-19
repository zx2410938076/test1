<template>
  <div class="hello">
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <header></header>
          <Header></Header>
        </el-header>
        <common-tab></common-tab>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/common/Aside.vue";
import Header from "@/components/common/Header.vue";
import CommonTab from '@/components/common/CommonTab.vue';
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  components: {
    Aside,
    Header,
    CommonTab
  },
};
</script>


<style scoped>
.el-header {
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
