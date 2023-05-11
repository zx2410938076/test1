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
        <el-button type="primary" @click="onSubmit">查询菜品</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Oninsert">添加菜品</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="dishName" label="菜品名称" width="180">
      </el-table-column>
      <el-table-column prop="dishPic" label="菜品展示" width="180">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img
              :src="scope.row.dishPic"
              alt=""
              style="width: 200px; height: 200px"
            />
            <img
              slot="reference"
              :src="scope.row.dishPic"
              style="width: 60px; height: 60px"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="dishType" label="菜品类型" width="180">
      </el-table-column>
      <el-table-column prop="rawMaterial" label="主要原料" width="300">
      </el-table-column>
      <el-table-column prop="dishPrice" label="菜品价格" width="90">
      </el-table-column>
      <el-table-column prop="week" label="日期" width="180"> </el-table-column>

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
              <el-form-item label="菜品名称" :label-width="formLabelWidth">
                <el-input
                  v-model="form.dishName"
                  autocomplete="off"
                  v-show="choose == 0"
                ></el-input>
                <div v-show="choose == 1">{{ form.dishName }}</div>
              </el-form-item>
              <el-form-item label="菜品类型" :label-width="formLabelWidth">
                <!-- <el-input
                    v-model="form.dishType"
                    autocomplete="off"
                  ></el-input> -->
                <el-checkbox-group v-model="dishTypeList">
                  <el-checkbox label="早餐"></el-checkbox>
                  <el-checkbox label="午餐"></el-checkbox>
                  <el-checkbox label="晚餐"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="主要原料" :label-width="formLabelWidth">
                <el-input
                  v-model="form.rawMaterial"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="菜品价格" :label-width="formLabelWidth">
                <el-input
                  v-model="form.dishPrice"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-checkbox-group v-model="weekList">
                  <el-checkbox label="星期一"></el-checkbox>
                  <el-checkbox label="星期二"></el-checkbox>
                  <el-checkbox label="星期三"></el-checkbox>
                  <el-checkbox label="星期四"></el-checkbox>
                  <el-checkbox label="星期五"></el-checkbox>
                  <el-checkbox label="星期六"></el-checkbox>
                  <el-checkbox label="星期日"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="菜品展示" :label-width="formLabelWidth">
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
  dishUpdate,
  dishSearch,
  dishDelet,
  dishPaging,
  dishInsert,
} from "@/http/dish";
export default {
  name: "Request",
  data() {
    return {
      dialogFormVisible: false,
      //所更新数据
      form: {
        dishId: "",
        dishName: "",
        dishPrice: "",
        dishType: "",
        rawMaterial: "",
        dishPic: "",
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
      week: "",
      dishTypeList: [],
      weekList: [],
    };
  },
  methods: {
    //获取后端返回的图片url
    handleUploadSuccess(res) {
      console.log(res);
      this.form.dishPic = res.data;
      console.log(this.form.dishPic);
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
    //删除用户
    confirm(row) {
      console.log("这是row");
      console.log(row);
      let params = {
        dishId: row.dishId,
      };

      dishDelet(params).then(
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
      console.log(this.dishTypeList);
      console.log(this.weekList);
      this.form.dishType = "";
      for (let index = 0; index < this.dishTypeList.length - 1; index++) {
        this.form.dishType =
          this.form.dishType + this.dishTypeList[index+1] + ",";
      }
      this.form.dishType = this.form.dishType + this.dishTypeList[length];
      console.log(this.form.dishType);

      this.week = "";
      for (let index = 0; index < this.weekList.length; index++) {
        this.week = this.week + this.weekList[index] + ",";
      }
      this.week = this.week.slice(0, -1);
      console.log(this.week);
      let data = {
        dishId: this.form.dishId,
        dishName: this.form.dishName,
        dishPrice: this.form.dishPrice,
        dishType: this.form.dishType,
        rawMaterial: this.form.rawMaterial,
        dishPic: this.form.dishPic,
        week: this.week,
      };
      dishUpdate(data).then(
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
      console.log("改前");
      console.log(this.form);
      console.log(this.dishTypeList);
      console.log(this.weekList);
      this.form.dishType = "";
      for (let index = 0; index < this.dishTypeList.length; index++) {
        this.form.dishType =
          this.form.dishType + this.dishTypeList[index] + ",";
      }
      this.form.dishType = this.form.dishType.slice(0, -1);
      this.week = "";
      for (let index = 0; index < this.weekList.length; index++) {
        this.week = this.week + this.weekList[index] + ",";
      }
      this.week = this.week.slice(0, -1);
      console.log(this.week);
      let data = {
        dishName: this.form.dishName,
        dishPrice: this.form.dishPrice,
        dishType: this.form.dishType,
        rawMaterial: this.form.rawMaterial,
        dishPic: this.form.dishPic,
        week: this.week,
      };
      dishInsert(data).then(
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
      console.log("修改");
      this.form = row;
      this.choose = 1;
      this.dishTypeList = row.dishType.split(",");
      console.log(this.dishTypeList)
      this.weekList = row.week.split(",");
      this.dialogFormVisible = true;
      console.log(row);
    },
    Oninsert() {
      console.log("插入");
      this.choose = 0;
      console.log(this.choose);
      this.form = {
        doctorId: "",
        physicalExaminationId: "",
        physicalExaminationItems: "",
        physicalExaminationResult: "",
        physicalExaminationTime: "",
        userId: "",
      };
      this.dishTypeList = [];
      this.weekList = [];
      this.dialogFormVisible = true;
    },
    //更新表单
    NewForm(current, size) {
      let params = {
        current: current,
        size: size,
        authority: "canteen",
      };
      dishPaging(params).then(
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
        authority: "canteen",
      };
      dishSearch(params).then(
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
      authority: "canteen",
    };
    dishPaging(params).then(
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