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
        <el-button type="primary" @click="Oninsert">添加记录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="MedicalHistory">用户病史</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="suggestion">医生建议</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userId" label="用户id" width="180">
      </el-table-column>
      <el-table-column
        prop="physicalExaminationItems"
        label="体检项目"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="physicalExaminationResult"
        label="体检结果"
        width="360"
      >
      </el-table-column>
      <el-table-column prop="doctorId" label="医生id" width="180">
      </el-table-column>
      <el-table-column
        prop="physicalExaminationTime"
        label="体检时间"
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
            <!-- 体检 -->
            <div v-show="choose == 0 || choose == 1">
              <el-form :model="form">
                <div v-show="choose == 0">
                  <el-form-item label="用户id" :label-width="formLabelWidth">
                    <el-input
                      v-model="form.userId"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                </div>
                <el-form-item label="体检项目" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.physicalExaminationItems"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="体检结果" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.physicalExaminationResult"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- 用户病史 -->
            <div v-show="choose == 2">
              <el-form :model="form">
                <el-form-item label="用户id" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.physicalExaminationItems"
                    autocomplete="off"
                  ></el-input>
                  <el-button>查询</el-button>
                </el-form-item>
                <el-form-item label="病史" :label-width="formLabelWidth">
                </el-form-item>
              </el-form>
            </div>
            <!-- 医生建议 -->
            <div v-show="choose == 3">
              <el-form :model="form">
                <el-form-item label="用户id" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.physicalExaminationItems"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="医生建议" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.physicalExaminationItems"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>

            <div slot="footer" class="dialog-footer">
              <div v-show="choose == 1">
                <el-button type="primary" @click="determine()"
                  >确 定 修 改</el-button
                ><el-button @click="dialogFormVisible = false">取 消</el-button>
              </div>
              <div v-show="choose == 0">
                <el-button type="primary" @click="insert()"
                  >确 定 添 加</el-button
                >
                <el-button @click="dialogFormVisible = false">取 消</el-button>
              </div>
              <div v-show="choose == 2">
                <el-button type="primary" @click="insert()"
                  >添 加 病 史</el-button
                ><el-button @click="dialogFormVisible = false">关 闭</el-button>
              </div>
              <div v-show="choose == 3">
                <el-button type="primary" @click="insert()">确 定 </el-button
                ><el-button @click="dialogFormVisible = false">取 消</el-button>
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
  physicalExaminationPaging,
  physicalExaminationSearch,
  physicalExaminationDelet,
  physicalExaminationUpdate,
  physicalExaminationInsert,
} from "@/http/PhysicalExamination";
export default {
  name: "Request",
  data() {
    return {
      dialogFormVisible: false,
      //所更新数据
      form: {
        doctorId: "",
        physicalExaminationId: "",
        physicalExaminationItems: "",
        physicalExaminationResult: "",
        physicalExaminationTime: "",
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
      console.log(row);
      let params = {
        PhysicalExaminationId: row.physicalExaminationId,
      };

      physicalExaminationDelet(params).then(
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
        physicalExaminationId: this.form.physicalExaminationId,
        physicalExaminationItems: this.form.physicalExaminationItems,
        physicalExaminationResult: this.form.physicalExaminationResult,
      };
      physicalExaminationUpdate(data).then(
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
        userId: this.userId,
        physicalExaminationItems: this.form.physicalExaminationItems,
        physicalExaminationResult: this.form.physicalExaminationResult,
      };
      physicalExaminationInsert(data).then(
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
      this.dialogFormVisible = true;
      console.log(row);
    },
    //新建信息
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
      this.dialogFormVisible = true;
    },
    //用户病史
    MedicalHistory() {
      console.log("用户病史");
      this.choose = 2;
      this.dialogFormVisible = true;
    },
    //医生建议
    suggestion() {
      console.log("医生建议");
      this.choose = 3;
      this.dialogFormVisible = true;
    },
    //更新表单
    NewForm(current, size) {
      let params = {
        current: current,
        size: size,
      };
      physicalExaminationPaging(params).then(
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
      physicalExaminationSearch(params).then(
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
    physicalExaminationPaging(params).then(
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