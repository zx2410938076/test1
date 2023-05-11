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
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userName" label="用户" width="180">
      </el-table-column>
      <el-table-column prop="requestType" label="请求类型" width="180">
      </el-table-column>
      <el-table-column prop="handlerName" label="处理人" width="180">
      </el-table-column>
      <el-table-column prop="remarks" label="备注" width="360">
      </el-table-column>
      <el-table-column prop="processingTime" label="请求发起时间" width="180">
      </el-table-column>

      <!-- 处理操作 -->
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)" size="small"
            >备注</el-button
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
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="form.remarks" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="determine()">确 定</el-button>
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
  requestPaging,
  requestSearch,
  requestDelet,
  requestUpdate,
} from "@/http/request";
export default {
  name: "Request",
  data() {
    return {
      dialogFormVisible: false,
      //所更新数据
      form: {
        requestId: "",
        userId: "",
        handlerId: "",
        processingTime: "",
        remarks: "",
        requestType: "",
      },
      formLabelWidth: "120px",

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
      console.log(row);
      let params = {
        requestId: row.requestId,
      };

      requestDelet(params).then(
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
      console.log("改前")
      console.log(this.form)
      let data = {
        requestId: this.form.requestId,
        remarks: this.form.remarks,
      };
      requestUpdate(data).then(
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
    //编辑信息
    edit(row) {
      this.form.requestId = row.requestId
      this.form.remarks = row.remarks
      this.dialogFormVisible = true
      console.log(row);
    },
    //更新表单
    NewForm(current, size) {
      let params = {
        current: current,
        size: size,
        target: this.formInline.user,
      };
      requestSearch(params).then(
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
      requestSearch(params).then(
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
      target: this.formInline.user,
    };
    requestSearch(params).then(
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