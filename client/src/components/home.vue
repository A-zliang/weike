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
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                          </router-link>
                        <div class="desc">
                          <router-link to='video'>
                              <h3>{{o.topic}}</h3>
                          </router-link>
                          <router-link to='video'>
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
  h1{
        margin: 0;
        padding: 0;
        font-family: 'Times New Roman', Times, serif;
  }
  .show{
    width: 1263px;
    min-height: 800px;
    margin: 20px auto;
    background-color: #ddd;
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
  .videos{
    background-color: #ccc;
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
</style>
