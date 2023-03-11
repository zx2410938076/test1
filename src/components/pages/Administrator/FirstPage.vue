<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <img
                src="@/assets/user.png"
                alt=""
                style="width: 100px; height: 100px; border-radius: 50%"
              />
              <p>姓名</p>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              <div style="display: flex; flex: 10">{{ "列表内容 " + o }}</div>
            </div>
          </el-card>
          <el-card style="height: 315px; margin-top: 20px">
            <div slot="header" class="clearfix">
              <span>投诉/反馈</span>
              <el-dropdown>
                <span class="el-dropdown-link"
                  ><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>已处理</el-dropdown-item>
                  <el-dropdown-item>未处理</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              <div style="display: flex; flex: 10">{{ "列表内容 " + o }}</div>
            </div>
          </el-card>
        </div></el-col
      >
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <el-card style="height: 350px">
            <div slot="header" class="clearfix">
              <p style="display: flex">公告</p>
              <el-button style="float: right; padding: 3px 0" type="text"
                >新增</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
          <el-card style="height: 250px;margin-top: 20px;">
            <div slot="header" class="clearfix">
              <p style="display: flex">健康统计</p>
            </div>
            <div ref="echarts" style="height: 220px;
            width: 500px;"></div>
          </el-card></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    get() {
      /* this.$axios.get('user/all').then(res => {
			console.log(res.data)
		}) */
    },
  },
  mounted() {
    var myecharts = echarts.init(this.$refs.echarts);
    var option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };
    myecharts.setOption(option)
  },
};
</script>

<style lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
  margin-left: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>