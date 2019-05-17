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
                                        <h3>书籍展示</h3>
                                        <img src="https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/TB14XGtLpXXXXbFaXXXXXXXXXXX_!!0-item_pic.jpg_580x580Q90.jpg_.webp" alt="书籍图片">
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


              <el-row class="plan">
                <el-col :span="5">
                    <div class="plan-left">
                        <ul>
                            <li><a>1.基本知识（4学时）</a></li>
                            <li><a>2.逻辑代数基础（8学时） </a></li>
                            <li><a>3.集成门电路与触发器（8学时）</a></li>
                            <li><a>4.组合逻辑电路（6学时）</a></li>
                            <li><a>5.同步时序逻辑电路（10学时） </a></li>
                            <li><a>6.异步时序逻辑电路（10学时） </a></li>
                            <li><a>7.中规模通用集成电路及应用（8学时） </a></li>
                            <li><a>8.可编程逻辑器件（10学时）</a></li>
                            <li><a>9.综合应用设计讨论（自学）</a></li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="19">
                    <div class="plan-right">
                        <el-card class="box-card plan-card">
                            <div class="text item">
                                1
                            </div>
                            <div class="text item">
                                2
                            </div>
                            <div class="text item">
                                3
                            </div>
                            <div class="text item">
                                4
                            </div>
                            <div class="text item">
                                5
                            </div>
                            <div class="text item">
                                6
                            </div>
                            <div class="text item">
                                7
                            </div>
                            <div class="text item">
                                8
                            </div>
                            <div class="text item">
                                9
                            </div>
                        </el-card>
                    </div>
                </el-col>
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
         tabs(){
             
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
    margin: 30px 0;
   }
   .book .left{
     background-color: #fff;
     height: 334px;
     box-shadow: 5px 6px 25px #a19a9a;     
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
     box-shadow: 6px 6px 25px #a19a9a;
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
    .book  ul li span{
        line-height: 1.5;
    }
  .book .right{
     background-color: #fff;
     box-shadow: 5px 6px 25px #a19a9a;
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




    .plan{
        margin: 50px auto;
    }
    .plan-card{
        height: 385px;
    }
   .plan-left{
       margin: 0 0 0 15px;
    }
    .plan-left ul li{
        float: right;
        width: 280px;
        list-style: none;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }
    
    .plan-left ul li:hover{
           background-color: #ddd;
    }
    .plan-right{
        margin: 0 30px;
        background-color: #fff;
    }
    .plan-right h3{
        margin: 0 0 10px 0;
        padding: 20px 0;
        border-bottom: 1px solid #eee;	
        font-size: 18px;
    }
    .plan-right p{
        line-height: 2;
	    font-size: 15px;
    }
</style>
