<template>
    <div>
        <headtop></headtop>
        <div class="home">
           <div class="show">
            <div class="tip">
                <h1>视频教程</h1> 
                <p>课程同步、名师讲解、课前预习、课后复习</p>
            </div>
              <div class="videos">
                 <el-row>
                    <el-col :span="7" v-for="(o, index) in videoList" :key="index">
                      <el-card :body-style="{ padding: '0px'}">
                          <router-link :to="{path: '/video', query:o}">
                            <img src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=9fc39de227f5e0feee188e07645b5395/a8014c086e061d9565a7a5c371f40ad163d9ca6c.jpg" class="image">
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
          </div>
        </div>
         
        <foot></foot>
    </div>
</template>

<script>
import headtop from './head'
import foot from './footer'
import videos from './video'
  export default{
    data() {
      return {
        videoList:[],
        total:0,
        pagination:{
            page: 1,
            size: 6,
            total: 0
        }
      }
    },
    created() {
      this.getVideoMsg();
    },
    components: {headtop,foot,videos},
    methods: {
     async getVideoMsg(){
        let res = await this.$http.api_get_VideoMsg(this.pagination);
        if(res.data.code == 200){
          this.videoList = res.data.res;
        }
      }
    },
  }

</script>

<style scoped>
 .home{
    width: 100%;
    min-width: 1263px;
 }
  h1{
        margin: 0;
        padding: 0;
        font-family: 'Times New Roman', Times, serif;
  }
  .show{
    width: 1263px;
    min-height: 800px;
    margin: 20px auto;
    /* background-color: #ddd; */
  }
  .show .tip{
    width: 1263px;
    height: 70px;
    text-align: center;
  }
  .show .tip h1{
   margin: 20px 0 5px 0;
  }
  .image {
    width: 100%;
    height: 200px;
    display: block;
  }
  .image:hover{
    opacity: 0.6;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .el-col{
    margin: 25px 25px;
    cursor: pointer;
  }
   .videos .desc{
     padding: 14px;
     
   }
   .videos .desc h3{
     
     font-size: 16px;
     color: #333;
     padding: 5px;
   }
  .videos .desc h3:hover{
       color: red;
  }
   .videos .desc p{
     padding: 5px;
     font-size: 14px;
     color: #93999f;
   } 
  .videos .desc p:hover{
       color: red;
  }
   .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
</style>

