<template>
  <div class="asideContianer">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="rgb(50, 65, 87)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{ isCollapse ? "社区养老" : "社区养老管理系统" }}</h3>
      <!-- <img v-show=isCollapse height="10px" width="100px" src="@/assets/logo.png"> -->
      <!--没有二级菜单-->
      <el-menu-item
        v-for="item in noChildren"
        :key="item.name"
        :index="item.name"
        @click="clickMenu(item)"
      >
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!--有二级菜单-->
      <el-submenu
        v-for="item in hasChildren"
        :key="item.name"
        :index="item.name"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>

        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.name"
        >
          <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{
            subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style lang="less" scoped>
.el-menu {
  height: 100vh;
  border-right: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 22px;
    font-weight: 400;
    padding: 0 20px;
  }
}
</style>

<script>
import{Reacquire}from "@/http/user"
export default {
  name: "Aside",
  data() {
    return {
      /* isCollapse: false, */
      role: null,
      menuData: [
        {
          path: "/",
          name: "main",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
          role: ["community","doctor","canteen"],
        },
        {
          path: "/OldMan",
          name: "OldMan",
          label: "用户中心",
          icon: "s-custom",
          url: "Home/OldMan",
          role: ["community", "doctor"],
        },
        {
          path: "/Dishes",
          name: "Dishes",
          label: "菜品公示",
          icon: "s-custom",
          url: "Home/Dishes",
          role: ["canteen"],
        },
        {
          label: "健康档案",
          icon: "user",
          name: "HealthRecord",
          role: ["doctor"],
          children: [
            {
              path: "/PhysicalExamination",
              name: "PhysicalExamination",
              label: "体检记录",
              icon: "setting",
              url: "doctors/PhysicalExamination",
            },
            {
              path: "/MedicalRecord",
              name: "MedicalRecord",
              label: "就诊记录",
              icon: "setting",
              url: "doctors/MedicalRecord",
            },
            {
              path: "/MakeAppointment",
              name: "MakeAppointment",
              label: "预约管理",
              icon: "setting",
              url: "doctors/MakeAppointment",
            },
            {
              path: "/Abnormal",
              name: "Abnormal",
              label: "异常数据监控",
              icon: "setting",
              url: "doctors/Abnormal",
            },
          ],
        },
        {
          path: "/Complaint",
          name: "Complaint",
          label: "投诉/意见",
          icon: "s-custom",
          url: "Home/Complaint",
          role: ["community","doctor","canteen"],
        },
        {
          path: "/Request",
          name: "Request",
          label: "请求列表",
          icon: "s-custom",
          url: "Home/Request",
          role: ["community","doctor"],
        },
      ],
    };
  },
  methods: {
    clickMenu(item) {
      if (
        this.$route.path != item.path &&
        !(this.$route.path === "/firstPage" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
      this.$store.commit("menuChange", item);
    },
  },
  computed: {
    hasChildren() {
      // 过滤获取所有的有二级菜单的数据
      return this.menuData.filter((item) => item.children);
    },
    noChildren() {
      // 过滤所有只有一级菜单的数据
      return this.menuData.filter((item) => !item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },

  mounted() {
    //console.log("权限" + this.role);
    if (this.role == null) {
      //console.log("role为空");
      let params = {
        userName:sessionStorage.getItem("username")
      }

      Reacquire(params).then(
        (res) => {
          console.log(res)
          this.$store.commit("newrole", res.data.data[0].authority);
          this.role = res.data.data[0].authority;
          //console.log("改后权限" + this.role);
          //console.log(this.menuData);
          this.menuData = this.menuData.filter((item, index, self) => {
            return item.role.indexOf(this.role) != -1;
          });
          //console.log("改变后" + this.menuData);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  },
};
</script>