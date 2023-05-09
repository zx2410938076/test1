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
    <el-dialog
      title="添加用户（初始密码为123456）"
      :visible.sync="adddialogFormVisible"
    >
      <el-form :model="form" :inline="true" label-width="auto">
        <el-form-item label="账号">
          <el-input v-model="form.userNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.userPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="form.userAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="form.userHobby" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="爱吃">
          <el-input v-model="form.userFood" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="忌口">
          <el-input
            v-model="form.userForbiddenFood"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
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
        <el-divider></el-divider>
        <div style="display: flex; margin-bottom: 10px">紧急联系人</div>
        <el-form-item label="姓名">
          <el-input
            v-model="form.userRelativesName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="关系">
          <el-input v-model="form.relationship" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="form.userRelativesPhone"
            autocomplete="off"
          ></el-input>
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
      <el-table-column prop="picture" label="头像">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img
              :src="scope.row.picture"
              alt=""
              style="width: 200px; height: 200px"
            />
            <img
              slot="reference"
              :src="scope.row.picture"
              style="width: 60px; height: 60px"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="userPhone" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="userAddress" label="住址" width="180">
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
            <el-form
              :model="form"
              v-show="choose == 0"
              :inline="true"
              label-width="auto"
            >
              <el-form-item label="姓名">
                <el-input v-model="form.userName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="form.userPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="住址">
                <el-input
                  v-model="form.userAddress"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="爱好">
                <el-input
                  v-model="form.userHobby"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="爱吃">
                <el-input v-model="form.userFood" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="忌口">
                <el-input
                  v-model="form.userForbiddenFood"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="头像" :label-width="formLabelWidth">
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
              <el-divider></el-divider>
              <div style="display: flex; margin-bottom: 10px">紧急联系人</div>
              <el-form-item label="姓名">
                <el-input
                  v-model="form.userRelativesName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="关系">
                <el-input
                  v-model="form.relationship"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="form.userRelativesPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>

            <el-form
              :model="form"
              v-show="choose == 1"
              :inline="true"
              label-width="200px"
            >
              <el-form-item label="姓名">
                {{form.userName}}
              </el-form-item>
              <el-form-item label="电话">
                {{form.userPhone}}
              </el-form-item>
              <el-form-item label="住址">
                {{form.userAddress}}
              </el-form-item>
              <el-form-item label="爱好">
                {{ form.userHobby }}
              </el-form-item>
              <el-form-item label="爱吃">
                {{ form.userFood }}
              </el-form-item>
              <el-form-item label="忌口">
                {{ form.userForbiddenFood }}
              </el-form-item>
              <el-form-item label="头像" :label-width="formLabelWidth">
                <img
              :src="form.picture"
              style="width: 200px; height: 200px"
            />
              </el-form-item>
              <el-divider></el-divider>
              <div style="display: flex; margin-bottom: 10px">紧急联系人</div>
              <el-form-item label="姓名">
                {{ form.userRelativesName }}
              </el-form-item>
              <el-form-item label="关系">
                {{ form.relationship }}
              </el-form-item>
              <el-form-item label="电话">
                {{ form.userRelativesPhone }}
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
        userNumber: "",
        picture: "",
        relationship: "",
        userAddress: "",
        userFood: "",
        userForbiddenFood: "",
        userHobby: "",
        userPhone: "",
        userRelativesName: "",
        userRelativesPhone: "",
        authority: "",
        userPassword: "",
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
    //获取后端返回的图片url
    handleUploadSuccess(res) {
      console.log(res);
      this.form.picture = res.data;
      console.log(this.form.picture);
    },
    //图片上传时限制大小
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
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
      Insert(this.form).then(
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
      Update(this.form).then(
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
      this.form = row;
      this.choose = 0;
      console.log(row);
    },
    //查看详细信息
    handleClick(row) {
      this.dialogFormVisible = true;
      this.form = row;
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