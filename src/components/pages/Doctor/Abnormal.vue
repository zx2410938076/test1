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
          <el-button type="primary" @click="onSubmit">异常查询</el-button>
        </el-form-item>
      </el-form>
  
      <el-table :data="tableData">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="userId" label="用户id" width="180">
        </el-table-column>
        <el-table-column
          prop="abnormalItem"
          label="异常项目"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="abnormalValue"
          label="异常数据"
          width="360"
        >
        </el-table-column>
        <el-table-column
          prop="abnormalTime"
          label="生成时间"
          width="180"
        >
        </el-table-column>
  
        <!-- 处理操作 -->
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)" size="small"
              >修改</el-button
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
                <el-form-item v-show="choose == 0" label="用户" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.userId"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="症状" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.symptom"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="诊断结果" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.diagnosticResult"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                
                <div v-show="choose == 1">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="determine()"
                    >确 定 修 改</el-button
                  >
                </div>
                <div v-show="choose == 0">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="insert()"
                    >确 定 添 加</el-button
                  >
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
    abnormalUpdate,
    abnormalInsert,
    abnormalSearch,
    abnormalPaging,
    abnormalDelet,
  } from "@/http/abnormal";
  export default {
    name: "Request",
    data() {
      return {
        dialogFormVisible: false,
        //所更新数据
        form: {
          diagnosticResult: "",
          doctorId: "",
          seeDoctorId: "",
          seeDoctorTime: "",
          symptom: "",
          userId: "",
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
      };
    },
    methods: {
      //删除用户
      confirm(row) {
        console.log("这是row")
        console.log(row);
        let params = {
          SeeDoctorId: row.seeDoctorId,
        };
  
        seeDoctorDelet(params).then(
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
          seeDoctorId:this.form.seeDoctorId,
          symptom: this.form.symptom,
          diagnosticResult: this.form.diagnosticResult,
        };
        seeDoctorUpdate(data).then(
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
      //新建用户
      insert() {
        console.log(this.form);
        let data = {
          seeDoctorId:this.form.seeDoctorId,
          symptom: this.form.symptom,
          diagnosticResult: this.form.diagnosticResult,
        };
        seeDoctorInsert(data).then(
          (res) => {
            console.log(this.form);
            console.log(res.data);
            this.NewForm(this.current, this.size);
            this.dialogFormVisible = false;
            this.$alert("添加成功");
          },
          (err) => {
            console.log(err);
          }
        );
      },
      //编辑信息
      edit(row) {
        console.log("修改")
        this.form = row;
        this.choose = 1;
        this.dialogFormVisible = true;
        console.log(row);
      },
      //更新表单
      NewForm(current, size) {
        let params = {
          current: current,
          size: size,
        };
        abnormalPaging(params).then(
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
      //查询
      onSubmit() {
        console.log(this.formInline.user);
        let params = {
          current: this.current,
          size: this.size,
          target: this.formInline.user,
        };
        abnormalSearch(params).then(
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
        this.NewForm(this.current, val);
      },
      //跳转页数
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.current = val;
        this.NewForm(val, this.size);
      },
    },
    //初始化数据 
    mounted() {
      let params = {
        current: 1,
        size: 5,
      };
      abnormalPaging(params).then(
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