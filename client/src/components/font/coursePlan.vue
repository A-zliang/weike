<template>
  <div class="course">
    <headtop></headtop>
    <el-row>
      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content book">
          <el-card class="box-card">
            <el-row>
              <el-col :span="8">
                <div class="grid-content left">
                  <h3>数字逻辑第四版</h3>
                  <ul v-for="(item, index) in formData.left" :key="index">
                    <li>
                      <label>{{item.title}}</label>
                      <span>{{item.detail}}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content mid">
                  <h3>书籍展示</h3>
                  <img :src="formData.pic" alt="书籍图片">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content right">
                  <h3>作者简介</h3>
                  <ul v-for="(item, index) in formData.right" :key="index">
                    <li>
                      <label>{{item.title}}</label>
                      {{item.detail}}
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"></div>
      </el-col>
    </el-row>

    <el-row class="plan">
      <el-col :span="5">
        <div class="plan-left">
          <a
            href="javascript:;"
            @click="tab(index)"
            v-for="(item,index) in book"
            :class="{active : index===curId}"
          >{{item.topic}}</a>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="plan-right">
          <el-card class="box-card plan-card">
            <pre v-show="index===curId" v-for="(item, index) in book">{{item.content}}</pre>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <foot></foot>
  </div>
</template>
<script>
import headtop from "./head";
import foot from "./footer";
export default {
  data() {
    return {
      tabPosition: "left",
      formData: {
        _id: "", //用于标记是否为第一次提交
        pic: "",
        left: [
          {
            title: "",
            detail: ""
          }
        ],
        right: [
          {
            key: "",
            value: ""
          }
        ],
        
      },
      book:[],
      curId: 0,
    };
  },
  components: { headtop, foot },
  created() {
    this.getbookMsg();
  },
  methods: {
    async getbookMsg() {
      let res = await this.$http.api_get_bookMsg();
      console.log(res);
      if (res.data.code == 200) {
        this.formData._id = res.data.res[0]._id;
        this.formData.pic = res.data.res[0].pic;
        this.formData.left = res.data.res[0].left;
        this.formData.right = res.data.res[0].right;
        this.book = res.data.res[0].bookContent;
      }
    },
    tab(index) {
      this.curId = index;
      console.log(this.curId);
    }
  }
};
</script>
<style scoped>
.course {
  width: 100%;
  min-width: 1263px;
}
.book {
  background-color: #ccc;
}
.book .box-card {
  width: 100%;
  height: 370px;
  margin: 30px 0;
}
.book .left {
  background-color: #fff;
  height: 334px;
  box-shadow: 5px 6px 25px #a19a9a;
}
.book h3 {
  text-align: center;
  font-weight: normal;
}
.book .left h3 {
  text-align: center;
  margin: 0 0 10px 0;
}
.book .mid img {
  width: 300px;
  height: 300px;
  margin: 5px 0 0 18px;
  display: block;
  text-align: center;
}
.book .mid {
  box-shadow: 6px 6px 25px #a19a9a;
  background-color: #fff;
  height: 334px;
  margin: 0 15px;
  padding: 0 0 5px 0;
}
.book ul li {
  list-style: none;
  margin: 20px 0;
}
.book ul li label {
  width: 70px;
  display: inline-block;
  background-color: #ccc;
  border-top-right-radius: 15px;
}
.book ul li span {
  line-height: 1.5;
}
.book .right {
  background-color: #fff;
  box-shadow: 5px 6px 25px #a19a9a;
  height: 334px;
}
.book .right ul li {
  list-style: none;
  margin: 20px 0;
}
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple-light {
  background: #e5e9f2;
}

.plan {
  margin: 50px auto;
}
.plan-card {
  height: 385px;
  padding: 20px;
}
.plan-left {
  margin: 0 0 0 15px;

}
.plan-left a {
  float: right;
  width: 280px;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  color: #000;
  text-align: left;
}
.plan-right {
  margin: 0 30px;
  background-color: #fff;
}
.plan-right h3 {
  margin: 0 0 10px 0;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  font-size: 18px;
}
.plan-right p {
  line-height: 2;
  font-size: 15px;
}
.plan-left .active {
  background-color: #0099ff;
}
</style>
