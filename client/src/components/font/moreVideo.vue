<template>
  <div class="main">
    <headtop></headtop>
    <div class="videos">
      <el-row>
        <el-col :span="7" v-for="(o, index) in videoList" :key="index">
          <el-card :body-style="{ padding: '0px'}">
            <router-link :to="{path: '/video', query:o}">
              <img
                src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=9fc39de227f5e0feee188e07645b5395/a8014c086e061d9565a7a5c371f40ad163d9ca6c.jpg"
                class="image"
              >
            </router-link>
            <div class="desc">
              <router-link :to="{path: '/video', query:o}">
                <h3>{{o.topic}}</h3>
              </router-link>
              <router-link :to="{path: '/video', query:o}">
                <p>{{o.content}}</p>
              </router-link>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <paginator
       class="page"
      :pagination_page="pagination.page"
      :pagination_size="pagination.size"
      :pagination_total="pagination.total"
      @jump="jump"
    ></paginator>
    <foot></foot>
  </div>
</template>
<script>
import headtop from "./head";
import foot from "./footer";
import videos from "./video";
import paginator from "./paginator";

export default {
  data() {
    return {
      videoList: [],
      pagination: {
        page: 1,
        size: 9,
        total: 0
      }
    };
  },
  created() {
    this.getVideoMsg();
  },
  components: { headtop, foot, videos, paginator },
  methods: {
    async getVideoMsg() {
      let res = await this.$http.api_get_VideoMsg(this.pagination);
      let {code, total, data=[]} = res.data;
      if (code == 200) {
        this.videoList = res.data.res;
        this.pagination.total = total;
        console.log(this.pagination.total);
      }
    },
    jump(num){
        this.pagination.page = Number(num);
        this.getVideoMsg();
    }
  }
};
</script>
<style scoped>
.main{
    background-color: #999;
}
.image {
  width: 100%;
  height: 200px;
  display: block;
}
.image:hover {
  opacity: 0.6;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-col {
  margin: 25px 25px;
  cursor: pointer;
}
.videos {
  width: 1263px;
  min-height: 800px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 10px;
}
.videos .desc {
  padding: 14px;
}
.videos .desc h3 {
  font-size: 16px;
  color: #333;
  padding: 5px;
}
.videos .desc h3:hover {
  color: red;
}
.videos .desc h3:hover {
  color: red;
}
.videos .desc p {
  padding: 5px;
  font-size: 14px;
  color: #93999f;
}
.videos .desc p:hover {
  color: red;
}
.page{
    width: 100px;
    background-color: #fff;
    margin:  10px auto; 
    border-radius: 5px;
}
</style>
