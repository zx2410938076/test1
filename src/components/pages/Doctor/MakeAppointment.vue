<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="formInline.user"
          placeholder="请输入搜索内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-dropdown>
          <span class="el-dropdown-link"
            >{{ state ? "已同意" : "未同意"
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="processed()"
              >已同意</el-dropdown-item
            >
            <el-dropdown-item @click.native="unprocessed()"
              >未同意</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userId" label="用户id" width="180">
      </el-table-column>
      <el-table-column prop="appointmentTime" label="预约时间" width="200">
      </el-table-column>
      <el-table-column prop="reservationRemarks" label="预约备注" width="200">
      </el-table-column>
      <el-table-column prop="processingRemarks" label="处理备注" width="250">
      </el-table-column>

      <!-- 处理操作 -->
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)" size="small"
            >查看</el-button
          >
          <el-button type="text" @click="edit(scope.row)" size="small"
            >处理预约</el-button
          >
          <template>
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              @confirm="confirm(scope.row)"
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

          <el-dialog :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <div v-show="choose == 0">
                <el-form-item label="用户id" :label-width="formLabelWidth">
                  <div>{{ form.userId }}</div>
                </el-form-item>
                <el-form-item label="预约时间" :label-width="formLabelWidth">
                  <div>{{ form.appointmentTime }}</div>
                </el-form-item>
                <el-form-item label="预约备注" :label-width="formLabelWidth">
                  <div>{{ form.reservationRemarks }}</div>
                </el-form-item>
                <el-form-item
                  label="预约发起时间"
                  :label-width="formLabelWidth"
                >
                  <div>{{ form.initiationTime }}</div>
                </el-form-item>
                <el-form-item label="医生id" :label-width="formLabelWidth">
                  <div>{{ form.doctorId }}</div>
                </el-form-item>
                <el-form-item label="处理时间" :label-width="formLabelWidth">
                  <div>{{ form.processingTime }}</div>
                </el-form-item>
              </div>
              <el-form-item label="处理结果" :label-width="formLabelWidth">
                <div v-show="choose == 1">
                  <el-input
                    v-model="form.processingResult"
                    autocomplete="off"
                  ></el-input>
                </div>
                <div v-show="choose == 0">{{ form.processingResult }}</div>
              </el-form-item>
              <el-form-item label="处理备注" :label-width="formLabelWidth">
                <div v-show="choose == 1">
                  <el-input
                    v-model="form.processingRemarks"
                    autocomplete="off"
                  ></el-input>
                </div>
                <div v-show="choose == 0">{{ form.processingRemarks }}</div>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <div v-show="choose == 0">
                <el-button @click="dialogFormVisible = false">关 闭</el-button>
              </div>
              <div v-show="choose == 1">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="determine()">确 定</el-button>
              </div>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[3, 4, 5, 6, 7, 8, 9, 10]"
        :page-size="FormSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="FormTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>
  
  <script>
import {
  makeAppointmentUpdate,
  makeAppointmentSearch,
  makeAppointmentDelet,
} from "@/http/MakeAppointment";
export default {
  name: "Request",
  data() {
    return {
      dialogFormVisible: false,
      //所更新数据
      form: {
        appointmentId: "",
        appointmentTime: "",
        doctorId: "",
        processingResult: "",
        initiationTime: "",
        reservationRemarks: "",
        userId: "",
        processingRemarks:""
      },
      formLabelWidth: "120px",
      choose: 0,
      FormSize: 0,
      FormTotal: 0,
      currentPage4: 4,
      current: 1,
      size: 5,
      formInline: {
        user: "",
      },
      tableData: [],
      state:0
    };
  },
  methods: {
    processed() {
      this.state = 1;
      this.NewForm();
    },
    unprocessed() {
      console.log("未处理");
      this.state = 0;
      this.NewForm();
    },
    //删除用户
    confirm(row) {
      console.log(row);
      let params = {
        AppointmentId: row.appointmentId,
      };

      makeAppointmentDelet(params).then(
        (res) => {
          this.visible = false;
          this.$alert("修改成功");
          this.NewForm(this.current, this.size);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //确定修改
    determine() {
      console.log("改前");
      console.log(this.form);
      let data = {
        appointmentId: this.form.appointmentId,
        processingResult: this.form.processingResult,
      };
      makeAppointmentUpdate(data).then(
        (res) => {
          console.log(res.data);
          this.NewForm(this.current, this.size);
          this.dialogFormVisible = false;
          this.$alert("修改成功");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //查看信息
    handleClick(row) {
      this.form = row;
      this.choose = 0;
      this.dialogFormVisible = true;
      console.log(row);
    },
    //编辑信息
    edit(row) {
      this.form = row;
      this.choose = 1;
      this.dialogFormVisible = true;
      console.log(row);
    },
    //更新表单
    NewForm() {
      let params = {
        current: this.current,
        size: this.size,
        target: this.formInline.user,
        state:this.state,
        day:""
      };
      makeAppointmentSearch(params).then(
        (res) => {
          console.log(res.data);
          console.log(this.state)
          this.FormSize = res.data.data.size;
          this.FormTotal = res.data.data.total;
          this.tableData = res.data.data.records;
          console.log(this.tableData);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //查询
    onSubmit() {
      console.log(this.formInline.user);
      let params = {
        current: this.current,
        size: this.size,
        target: this.formInline.user,
        state:this.state,
        day:""
      };
      makeAppointmentSearch(params).then(
        (res) => {
          console.log(res.data);
          this.FormSize = res.data.data.size;
          this.FormTotal = res.data.data.total;
          this.tableData = res.data.data.records;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //更改每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.NewForm();
    },
    //跳转页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.NewForm();
    },
  },
  //初始化数据
  mounted() {
    let params = {
      current: 1,
      size: 5,
      target: this.formInline.user,
      state:this.state,
      day:""
    };
    makeAppointmentSearch(params).then(
      (res) => {
        console.log(res.data);
        this.FormSize = res.data.data.size;
        this.FormTotal = res.data.data.total;
        this.tableData = res.data.data.records;
        console.log(this.tableData);
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>