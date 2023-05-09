<template>
  <div class="hello">
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <span>姓名：{{ RequestData.userName }}</span>
      <span>类型：{{ requestType }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="RequestInsert()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <header></header>
          <Header></Header>
        </el-header>
        <common-tab></common-tab>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/common/Aside.vue";
import Header from "@/components/common/Header.vue";
import CommonTab from "@/components/common/CommonTab.vue";
import { Search } from "@/http/user";
import { requestInsert } from "@/http/request";
export default {
  name: "HelloWorld",
  data() {
    return {
      UUID: "community",
      RequestData: [],
      dialogTableVisible: false,
      requestType:"",
      state:0,
      time: "",

    };
  },
  components: {
    Aside,
    Header,
    CommonTab,
  },
  methods: {
    gettime(){
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				var seconds = date.getSeconds();
				if (month < 10) {
				    month = "0" + month;
				}
				if (day < 10) {
				    day = "0" + day;
				}
				var sqlTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
				console.log(date);
				console.log(sqlTime);
				this.time = sqlTime
			},
    RequestInsert(){
      this.gettime()
      let data = {
        userId: this.RequestData.userId,
        requestType: this.requestType,
        handlerId: this.$store.state.role.userId,
        handlerName:this.$store.state.role.userName,
        processingTime:this.time
      };
      requestInsert(data).then(
        (res) => {
          this.dialogTableVisible = false
          this.$alert("添加成功");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    connectWebsocket() {
      if (
        this.$store.state.role.role == "doctor" ||
        this.$store.state.role.role == "community"
      ) {
        let websocket;
        if (typeof WebSocket === "undefined") {
          console.log("您的浏览器不支持WebSocket");
          return;
        } else {
          // 打开一个websocket
          websocket = new WebSocket(
            "ws://localhost:9999/webSocket/" + this.UUID
          );
          console.log(websocket);
          // 建立连接
          websocket.onopen = () => {
            // 发送数据
            // websocket.send("发送数据");
            console.log("websocket发送数据中");
          };
          // 客户端接收服务端返回的数据
          websocket.onmessage = (evt) => {
            console.log("websocket返回的数据：", evt);
            console.log("获得异常");
            if(this.state == 0){
              this.onSubmit(evt.data);
            }
            else{
              this.requestType = evt.data
              this.dialogTableVisible = true;

            }
            this.state = !this.state
          };
          // 发生错误时
          websocket.onerror = (evt) => {
            console.log("websocket错误了：", evt);
          };
          // 关闭连接
          websocket.onclose = (evt) => {
            console.log("websocket关闭：", evt);
          };
        }
      }
    },
    getUUID() {
      //获取唯一的UUID
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    onSubmit(id) {
      let params = {
        current: 1,
        size: 1,
        target: id,
      };
      Search(params).then(
        (res) => {
          console.log(res.data);
          console.log("home里的search");
          this.RequestData = res.data.data.records[0];
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    this.connectWebsocket();
  },
};
</script>


<style scoped>
.el-header {
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
