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
      <el-form-item>
        <el-button
          type="primary"
          @click="AddUser()"
          style="display: inline-block"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.userPhone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insert()">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userNumber" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="userPhone" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="userAddress" label="住址" width="180">
      </el-table-column>

      <el-table-column prop="avatar" label="头像">
        <img :src="tableData.avatar" style="width: 50px; height: 50px" />
      </el-table-column>

      <!-- 处理操作 -->
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" @click="edit(scope.row)" size="small"
            >编辑</el-button
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
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input
                  v-model="form.userPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>

            <el-form :model="form" v-show="choose == 1">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                {{ form.userName }}
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                {{ form.userPhone }}
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
import { Search, Paging, Update, Insert, Delet } from "@/http/user";
export default {
  name: "CommunityManagement",
  data() {
    return {
      visible: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      adddialogFormVisible: false,
      choose: 0,
      //所更新数据
      form: {
        userName: "",
        userPhone: "",
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
    //添加用户
    AddUser() {
      console.log("添加");
      this.form = {
        userId: "",
        userName: "",
        userPhone: "",
      };
      this.adddialogFormVisible = true;
    },
    //新建用户
    insert() {
      console.log(this.form);
      let data = {
        userName: this.form.userName,
        userPhone: this.form.userPhone,
      };
      Insert(data).then(
        (res) => {
          console.log(this.form);
          console.log(res.data);
          this.NewForm(this.current, this.size);
          this.adddialogFormVisible = false;
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
        userId: row.userId,
      };

      Delet(params).then(
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
      console.log(this.form);
      let data = {
        userId: this.form.userId,
        userName: this.form.userName,
        userPhone: this.form.userPhone,
      };
      Update(data).then(
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
      this.dialogFormVisible = true;
      this.form.userId = row.userId;
      this.form.userName = row.userName;
      this.form.userPhone = row.userPhone;
      this.choose = 0;
      console.log(row);
    },
    //查看详细信息
    handleClick(row) {
      this.dialogFormVisible = true;
      this.form.userId = row.userId;
      this.form.userName = row.userName;
      this.form.userPhone = row.userPhone;
      this.choose = 1;
      console.log(row);
    },
    //更新表单
    NewForm(current, size) {
      let params = {
        current: current,
        size: size,
      };
      Paging(params).then(
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
      Search(params).then(
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
    Paging(params).then(
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