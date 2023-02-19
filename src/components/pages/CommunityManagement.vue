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
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="phone" label="电话" width="180"> </el-table-column>
      <el-table-column prop="" label="地址">
        <img :src="tableData.avatar" style="width: 50px; height: 50px" />
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" @click="edit(scope.row)" size="small"
            >编辑</el-button
          >
          <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
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
export default {
  name: "CommunityManagement",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      //所更新数据
      form: {
        id: "",
        username: "",
        phone: "",
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
      tableData: [
        {
          date: "",
          name: "",
          address: "",
        },
      ],
    };
  },
  methods: {
    //确定修改
    determine() {
      this.$axios({
        method: "post",
        url: "/url",
        data: {
          id: this.form.id,
          username : this.username,
          phone : this.phone
        },
      }).then(
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //编辑信息
    edit(row) {
      this.dialogFormVisible = true;
      this.form.id = row.id;
      this.form.username = row.username;
      this.form.phone = row.phone;
      console.log(row);
    },
    //查看详细信息
    handleClick(row) {
      console.log(row);
    },
    //更新表单
    NewForm(current, size) {
      this.$axios({
        method: "get",
        url: "user/paging",
        params: {
          current: current,
          size: size,
        },
      }).then(
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
    //查询
    onSubmit() {
      console.log(this.formInline.user);
      this.$axios({
        method: "get",
        url: "user/serch",
        params: {
          current: this.current,
          size: this.size,
          target: this.formInline.user,
        },
      }).then(
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
    this.$axios({
      method: "get",
      url: "user/paging",
      params: {
        current: 1,
        size: 5,
      },
    }).then(
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
};
</script>