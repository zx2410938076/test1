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
              <p>姓名:{{ username }}</p>
              <el-button style="float: right; padding: 3px 0" type="text"
                >操作按钮</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              <div style="display: flex; flex: 10">{{ "列表内容 " + o }}</div>
            </div>
          </el-card>
          <!-- 投诉信息 -->
          <el-card style="height: 315px; margin-top: 20px">
            <div slot="header" class="clearfix">
              <span>投诉/反馈</span>
              <el-dropdown>
                <span class="el-dropdown-link"
                  ><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="processed()"
                    >已处理</el-dropdown-item
                  >
                  <el-dropdown-item @click.native="unprocessed()"
                    >未处理</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div
              v-for="item in complaintform"
              :key="item.complaintId"
              class="text item"
            >
              <div style="display: flex; flex: 10" @click="toComplaint(item)">
                {{
                  item.complaintDepartment + "：" + item.complaintDescription
                }}
              </div>
            </div>
          </el-card>
        </div></el-col
      >
      <el-col :span="16">
        <div class="grid-content bg-purple-light">
          <!-- 活动信息 -->
          <el-card
            style="height: 350px"
            v-if="this.$store.state.role.role == 'community'"
          >
            <div slot="header" class="clearfix">
              <p style="display: flex">公告</p>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="addActivity()"
                >新增</el-button
              >
            </div>
            <el-dialog title="添加用户" :visible.sync="announcementMenu">
              <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.activityName"
                    autocomplete="off"
                    v-show="choose == 0"
                  ></el-input>
                  <div v-show="choose == 1">{{ form.activityName }}</div>
                </el-form-item>
                <el-form-item label="活动时间" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.activityTime"
                    autocomplete="off"
                    v-show="choose == 0"
                  ></el-input>
                  <div v-show="choose == 1">{{ form.activityTime }}</div>
                </el-form-item>
                <el-form-item label="活动地点" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.activityLocation"
                    autocomplete="off"
                    v-show="choose == 0"
                  ></el-input>
                  <div v-show="choose == 1">{{ form.activityLocation }}</div>
                </el-form-item>
                <el-form-item label="活动负责人" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.responsiblePerson"
                    autocomplete="off"
                    v-show="choose == 0"
                  ></el-input>
                  <div v-show="choose == 1">{{ form.responsiblePerson }}</div>
                </el-form-item>
                <el-form-item label="活动备注" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.activityProfile"
                    autocomplete="off"
                    v-show="choose == 0"
                  ></el-input>
                  <div v-show="choose == 1">{{ form.activityProfile }}</div>
                </el-form-item>
                <el-form-item label="活动图片" :label-width="formLabelWidth">
                  <el-upload
                  ref="upload"
                  action="http://localhost:9999/file/upLoad"
                  :limit="1"
                  :on-success="handleUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过2M
                  </div>
                </el-upload>
                </el-form-item>
                
              </el-form>
              <div slot="footer" class="dialog-footer">
                <div v-show="choose == 1">
                  <el-button @click="announcementMenu = false">关闭</el-button>
                </div>
                <div v-show="choose == 0">
                  <el-button @click="announcementMenu = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="insert()"
                    v-show="announcementMenuType == 0"
                    >添加用户</el-button
                  >
                  <el-button
                    type="primary"
                    @click="determine()"
                    v-show="announcementMenuType == 1"
                    >修改信息</el-button
                  >
                </div>
              </div>
            </el-dialog>
            <div v-for="item in activityForm" :key="item.activityId">
              <div>
                <p>活动名称:{{ item.activityName }}</p>
                <p>活动时间:{{ item.activityTime }}</p>
              </div>
              <div>
                <el-button @click="handleClick(item)" type="text" size="small"
                  >查看</el-button
                >
                <el-button type="text" @click="edit(item)" size="small"
                  >编辑</el-button
                >
                <template>
                  <el-popconfirm
                    confirm-button-text="好的"
                    cancel-button-text="不用了"
                    @confirm="confirm(item)"
                    icon="el-icon-info"
                    icon-color="red"
                    title="这是一段内容确定删除吗？"
                  >
                    <el-button
                      slot="reference"
                      type="text"
                      size="small"
                      style="margin-left: 10px"
                      >删除</el-button
                    >
                  </el-popconfirm>
                </template>
              </div>
            </div>
            <div class="block" style="margin-top: 10px">
              <el-pagination
                @current-change="handleCurrentChange"
                :page-size="FormSize"
                layout="total,prev, pager, next"
                :total="FormTotal"
              >
              </el-pagination>
            </div>
          </el-card>
          <!-- //预约信息 -->
          <el-card
            style="height: 250px; margin-top: 20px"
            v-if="this.$store.state.role.role == 'doctor'"
          >
            <div
              slot="header"
              class="clearfix"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <p style="display: flex">预约信息</p>
              <div style="display: flex">
                <div>
                  <el-date-picker
                    v-model="day"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    @change="searchDay()"
                  >
                  </el-date-picker>
                </div>
                <el-button type="primary" style="margin-left: 30px" @click="set"
                  >预约设置</el-button
                >
              </div>
            </div>
            <div>
              <div v-for="item in Appointment" :key="item.appointmentId">
                {{ item.appointmentTime.split(",")[1] }}
                {{ item.userId }}
                {{ item.reservationRemarks }}
              </div>
            </div>
          </el-card>
          <!-- 预约信息展示修改 -->
          <el-dialog title="预约信息" :visible.sync="ReservationSetting">
            <div>
              <div>
                预约时间
                <el-time-select
                  v-model="starTime"
                  :picker-options="{
                    start: '08:00',
                    step: '00:15',
                    end: '18:30',
                  }"
                  placeholder="选择开始时间"
                >
                </el-time-select>
                ——
                <el-time-select
                  v-model="endTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                  }"
                  placeholder="选择结束时间"
                >
                </el-time-select>
              </div>
              <div>
                预约数量
                <input
                  type="text"
                  placeholder="请输入预约数量"
                  v-model="hospitalAppointmentForm.hospitalAppointmentNumber"
                />
              </div>
              <el-button @click="addHospitalAppointment">添 加</el-button>
            </div>
            <div
              v-for="item in hospitalAppointment"
              :key="item.hospitalAppointmentId"
            >
              <div style="display: flex">
                <div style="display: flex">
                  <div>预约时间：{{ item.hospitalAppointmentTime }}</div>
                  <div>预约数量：{{ item.hospitalAppointmentNumber }}</div>
                  <div @click="deleteHospitalAppointment(item)">删除</div>
                </div>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="ReservationSetting = false">关 闭</el-button>
            </span>
          </el-dialog>
          <!-- 健康统计 -->
          <el-card style="height: 250px; margin-top: 20px">
            <div slot="header" class="clearfix">
              <p style="display: flex">健康统计</p>
            </div>
            <div ref="echarts" style="height: 220px; width: 500px"></div>
          </el-card></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  activityUpdate,
  activityInsert,
  activityPaging,
  activityDelet,
} from "@/http/activity";
import { complaintSearch } from "@/http/complaint";
import {
  hospitalAppointmentPaging,
  hospitalAppointmentDelet,
  hospitalAppointmentInsert,
} from "@/http/hospitalAppointment";
import { makeAppointmentSearch } from "@/http/MakeAppointment";
export default {
  name: "Index",
  data() {
    return {
      username: null,
      activityForm: {},
      state: 0,
      form: {
        activityId: null,
        activityName: null,
        activityTime: null,
        activityLocation: null,
        responsiblePerson: null,
        activityProfile: null,
        activityPic:null
      },
      complaintform: {},
      choose: 0, //0为输入模式，1为展示
      formLabelWidth: "120px",
      FormSize: 0,
      currentPage4: 4,
      FormTotal: 0,
      current: 1,
      size: 3,
      announcementMenu: false,
      ReservationSetting: false,
      announcementMenuType: 0, //0为添加1 为修改
      hospitalAppointment: {},
      hospitalAppointmentForm: {
        hospitalAppointmentTime: null,
        hospitalAppointmentNumber: null,
      },
      starTime: "",
      endTime: "",
      day: new Date(),
      Appointment: {},
    };
  },
  methods: {
    //获取后端返回的图片url
    handleUploadSuccess(res){
      console.log(res)
      this.form.activityPic = res.data
      console.log(this.form.activityPic)
    },
    //图片上传时限制大小
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    toComplaint(res) {
      this.$router.push({
        name: "Complaint",
        params: { state: this.state, target: res.userId },
      });
    },
    //打开新建页面
    addActivity() {
      console.log("添加");
      this.choose = 0;
      this.form = {
        activityName: null,
        activityTime: null,
        activityLocation: null,
        responsiblePerson: null,
        activityProfile: null,
      };
      // this.$refs['upload'].clearFiles(); //清除历史文件列表
      this.announcementMenu = true;
      this.announcementMenuType = 0;
    },
    //查看详细信息
    handleClick(row) {
      this.announcementMenu = true;
      this.form = row;

      this.choose = 1;
      console.log(row);
    },
    //编辑信息
    edit(row) {
      this.announcementMenu = true;
      this.announcementMenuType = 1;
      this.form = row;

      this.choose = 0;
      console.log(row);
    },
    //跳转页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.NewForm(val, this.size);
    },
    NewForm(current, size) {
      let params = {
        current: current,
        size: size,
      };
      activityPaging(params).then(
        (res) => {
          this.activityForm = res.data.data.records;
          this.FormSize = res.data.data.size;
          this.FormTotal = res.data.data.total;
          console.log(this.activityForm);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //新建用户
    insert() {
      console.log(this.form);
      activityInsert(this.form).then(
        (res) => {
          this.NewForm(this.current, this.size);
          this.announcementMenu = false;
          this.$alert("添加成功");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //删除用户
    confirm(row) {
      console.log(row);
      let params = {
        activityId: row.activityId,
      };

      activityDelet(params).then(
        (res) => {
          this.visible = false;
          this.$alert("删除成功");
          this.NewForm(this.current, this.size);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //确定修改
    determine() {
      console.log(this.form);
      let data = {
        activityId: this.form.activityId,
        activityName: this.form.activityName,
        activityTime: this.form.activityTime,
        activityLocation: this.form.activityLocation,
        responsiblePerson: this.form.responsiblePerson,
        activityProfile: this.form.activityProfile,
      };
      activityUpdate(data).then(
        (res) => {
          this.NewForm(this.current, this.size);
          this.announcementMenu = false;
          this.$alert("修改成功");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //打开预约设置界面
    set() {
      this.ReservationSetting = true;
      this.HospitalAppointmentPaging();
    },
    //新增预约设置信息
    addHospitalAppointment() {
      let data = {
        hospitalAppointmentTime: this.starTime + " - " + this.endTime,
        hospitalAppointmentNumber:
          this.hospitalAppointmentForm.hospitalAppointmentNumber,
      };
      hospitalAppointmentInsert(data).then(
        (res) => {
          this.HospitalAppointmentPaging();
          this.$alert("添加成功");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //删除预约设置
    deleteHospitalAppointment(item) {
      let data = {
        hospitalAppointmentId: item.hospitalAppointmentId,
      };
      hospitalAppointmentDelet(data).then(
        (res) => {
          this.HospitalAppointmentPaging();
          this.$alert("删除成功");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    searchDay() {
      this.AppointmentSearch();
    },
    //查找预约成功的信息
    AppointmentSearch() {
      let params = {
        current: 1,
        size: 5,
        target: "",
        state: 1,
        day: this.day,
      };
      makeAppointmentSearch(params).then(
        (res) => {
          console.log(res.data);
          this.FormSize = res.data.data.size;
          this.FormTotal = res.data.data.total;
          this.Appointment = res.data.data.records;
          console.log("预约信息");
          console.log(this.Appointment);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    processed() {
      this.state = 1;
      this.onSubmit();
    },
    unprocessed() {
      console.log("未处理");
      this.state = 0;
      this.onSubmit();
    },
    //投诉
    onSubmit() {
      let params = {
        current: 1,
        size: 5,
        target: "",
        state: this.state,
        authority: this.$store.state.role.role,
      };
      complaintSearch(params).then(
        (res) => {
          console.log(res.data);
          this.complaintform = res.data.data.records;
          console.log("这是投诉数据");
          console.log(this.complaintform);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //预约数据
    HospitalAppointmentPaging() {
      let params = {};
      hospitalAppointmentPaging(params).then(
        (res) => {
          console.log("这是设置预约数据");
          console.log(res.data);
          this.hospitalAppointment = res.data.data;
          console.log("这是设置预约信息数据");
          console.log(this.hospitalAppointment);
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    this.username = this.$store.state.role.userName;
    console.log("用户名");
    console.log(this.$store.state.role.userName);
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
    myecharts.setOption(option);
    this.NewForm(this.current, this.size);
    this.onSubmit();
    console.log(this.day);
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