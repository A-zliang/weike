<template>
    <div class="course">
        <headtop></headtop>
        <div class="jumbotron">
            <div class="container">
                <hgroup>
                    <h1>关于</h1>
                    <h4>数字逻辑课程的介绍...</h4>
                </hgroup>
            </div>
        </div>
            <el-row>
                <el-col :span="5">
                    <div class="left">
                        <ul>
                            <li v-for="(item, index) in navList"><a @click="jump('a'+index)">{{item.nav}}</a></li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="19">
                    <div class="right">
                        <el-card class="box-card">
                            <div v-for="(item, index) in navList" class="text item">
                                <h3 :id="'a'+index">{{item.nav}}</h3>
                                <p>{{item.content}}</p>
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
            tabPosition: 'left',
            navList:[]
        }
    },
    created() {
        this.getNavData();
    },
    components:{headtop,foot},
    methods: {
         jump:function(ele){
            let id = "#"+ele;
            document.querySelector(id).scrollIntoView(true);
        },
          async getNavData(){
            let res = await this.$http.api_get_navData();
            if(res.data.code == 200){
                 this.navList = res.data.res;
            }
           
        },
    },
}
</script>
<style scoped>
.course{
    width: 100%;
    min-width: 1263px;
}
.el-tabs{
    margin: 0 auto;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 780px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .jumbotron{
    margin: 0 0 30px 0;
	padding: 60px 0;
	background: #ccc url('../../assets/images/bg.jpg');
    background-size: 100% 100%;
	color: #ccc;
  }
  .jumbotron .container{
      width: 200px;
      height: 70px;
      margin: 0 150px;
  }
   h1 {
	font-size: 26px;
	padding: 0 0 0 20px;
    }
    .jumbotron h4 {
        font-size: 16px;
        padding: 0 0 0 20px;
        font-weight: normal;
    }
    .left{
        background-color: #ccc;
    }
    .left ul li{
        float: right;
        width: 190px;
        list-style: none;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 10px;
    }
    .left ul li a{
        color: #000;
        display: block;
    }
    .left ul li:hover{
           background-color: #ddd;
    }
    .right{
        margin: 0 30px;
    }
    .right h3{
        margin: 0 0 10px 0;
        padding: 20px 0;
        border-bottom: 1px solid #eee;	
        font-size: 18px;
    }
    .right p{
        line-height: 2;
	    font-size: 15px;
    }
    .el-row{
        margin: 50px auto;
    }
    .el-card{
        width: 900px;
    }
</style>
