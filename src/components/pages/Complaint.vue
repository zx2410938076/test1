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
            >{{ state ? "已处理" : "未处理"
            }}<i class="el-icon-arrow-down el-icon--right"></i>
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
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userName" label="投诉人" width="180">
      </el-table-column>
      <el-table-column prop="complaintDepartment" label="投诉部门" width="180">
      </el-table-column>
      <el-table-column prop="complaintDescription" label="描述" width="180">
      </el-table-column>
      <el-table-column prop="complaintFeedback" label="反馈" width="360">
      </el-table-column>
      <el-table-column prop="handlerId" label="处理人id" width="180">
      </el-table-column>

      <!-- 处理操作 -->
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleClick(scope.row)" size="small"
            >查看</el-button
          >
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
            <el-form :model="form" v-show="choose == 0">
              <el-form-item label="反馈信息" :label-width="formLabelWidth">
                <el-input
                  v-model="form.complaintFeedback"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>

            <el-form :model="form" v-show="choose == 1">
              <el-form-item label="反馈信息" :label-width="formLabelWidth">
                {{ form.complaintFeedback }}
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" v-show="choose == 0">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="determine()">确 定</el-button>
            </div>
            <div slot="footer" class="dialog-footer" v-show="choose == 1">
              <el-button @click="dialogFormVisible = false">关闭</el-button>
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
  complaintSearch,
  complaintDelet,
  complaintUpdate,
} from "@/http/complaint";
export default {
  name: "Request",
  data() {
    return {
      dialogFormVisible: false,
      choose: 0,
      state: 0,
      //所更新数据
      form: {
        complaintDepartment: "",
        complaintDescription: "",
        complaintFeedback: "",
        complaintId: "",
        complaintObject: "",
        handlerId: "",
        initiationTime: "",
        processingTime: "",
        userId: "",
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
    processed() {
      this.state = 1;
      this.onSubmit();
    },
    unprocessed() {
      console.log("未处理");
      this.state = 0;
      this.onSubmit();
    },
    //删除用户
    confirm(row) {
      console.log(row);
      let params = {
        complaintId: row.complaintId,
      };

      complaintDelet(params).then(
        (res) => {
          this.visible = false;
          this.$alert("修改成功");
          this.onSubmit();
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
        complaintId: this.form.complaintId,
        complaintFeedback: this.form.complaintFeedback,
      };
      complaintUpdate(data).then(
        (res) => {
          console.log(res.data);
          this.onSubmit(this.current, this.size);
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
      this.form = row;
      this.choose = 0;
      this.dialogFormVisible = true;
      console.log("row");
      console.log(row);
    },
    //查看详细信息
    handleClick(row) {
      this.form = row;
      this.choose = 1;
      this.dialogFormVisible = true;
      console.log("row");
      console.log(row);
    },
    //查询
    onSubmit() {
      let params = {
        current: this.current,
        size: this.size,
        target: this.formInline.user,
        state: this.state,
        authority: this.$store.state.role.role,
      };
      complaintSearch(params).then(
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
      this.onSubmit();
    },
    //跳转页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.onSubmit();
    },
  },
  //初始化数据
  mounted() {
    console.log(this.$store.state.role.role);
    console.log(this.$route.params.state)
    if (this.$route.params.state != undefined) {
      console.log("路由传过来的");
      console.log(this.$route.params.state);
      console.log(this.$route.params.target);
      this.state = this.$route.params.state;
      this.formInline.user = this.$route.params.target;
    }
    this.onSubmit();
  },
};
</script>