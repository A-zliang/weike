<template>
    <div class="course">
        <headtop></headtop>
            <el-row>
            <el-col :span="3"><div class="grid-content"></div></el-col>
            <el-col :span="18">
                <div class="grid-content book">
                    <el-card class="box-card">
                           <el-row>
                                <el-col :span="8">
                                     <div class="grid-content  left">
                                        <h3>数字逻辑第四版</h3>
                                            <ul>
                                                <li> <label>作者</label> <span>欧阳星明 主编；于俊清 副主编</span> </li>
                                                <li> <label>出版社</label> <span>华中科技大学出版社</span> </li>
                                                <li> <label>出版时间</label> <span>2009-02</span> </li>
                                                <li> <label>版次</label> <span>4</span> </li>
                                                <li> <label>正文语种</label> <span>简体中文</span> </li>
                                                <li> <label>丛书</label> <span>普通高等教育“十一五”国家级规划教材；国家级精品课程主教材</span> </li>
                                            </ul>
                                    </div>

                                </el-col>
                                <el-col :span="8">
                                 
                                      <div class="grid-content mid">
                                        <h3>课程书籍</h3>
                                        <img src="http://booklibimg.kfzimg.com//data/book_lib_img_v2/isbn/0/d264/d264fc1b14c210ccbf9a9b37ebc73531_0_0_0_0.jpg" alt="">
                                    </div>

                                </el-col>
                                <el-col :span="8" >
                                    <div class="grid-content right">
                                            <h3>作者简介</h3>
                                            <ul>
                                                <li><label>姓名</label> 欧阳星明</li>
                                                <li><label>代表作品</label>《数字逻辑》、《微型机算计接口技术及应用》《逻辑设计》、《微型计算机及其应用》</li>
                                            </ul>
                                    </div>
                                </el-col>
                            </el-row>
                    </el-card>
                </div>
                </el-col>
            <el-col :span="3"><div class="grid-content"></div></el-col>
            </el-row>
        <foot></foot>
    </div>
</template>
<script>
import headtop from './head'
import foot from './footer'
export default {
    data() {
        return {
            tabPosition: 'left'
        }
    },
    components:{headtop,foot},
    methods: {
         jump:function(ele){
             console.log(ele);
             let id = "#"+ele;
            document.querySelector(id).scrollIntoView(true);
        }
    },
}
</script>
<style scoped>
.course{
    width: 100%;
    min-width: 1263px;
}
  .book{
      background-color: #ccc;
  }
 .book .box-card{
    width: 100%;
    height: 370px;
    margin: 50px 0;
    background-color: #f2f2f2;
   }
   .book .left{
     background-color: #fff;
     height: 334px;
     box-shadow: 12px 12px 38px #f2f2f2;
   }
   .book  h3{
     text-align: center;
     font-weight: normal;
   }
    .book .left h3{
     text-align: center;
     margin: 0 0 10px 0;
   }
  .book .mid img{
      width: 300px;
      height: 300px;
      margin: 5px 0 0 18px;
      display: block;
      text-align: center;
  }
  .book .mid{
     box-shadow: 4px 4px 20px #a19a9a;
     background-color: #fff;
     height: 334px;
     margin: 0 15px;
     padding: 0 0 5px 0;
  }
  .book  ul li{
      list-style: none;
      margin: 20px 0;
  }
   .book  ul li label{
       width: 70px;
       display: inline-block;
       background-color: #ccc;
       border-top-right-radius: 15px;
   }
  .book .right{
     background-color: #fff;
     box-shadow: 4px 4px 25px #f2f2f2;
     height: 334px;
  }
  .book .right ul li{
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
</style>
