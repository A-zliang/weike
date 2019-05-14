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
                            <li><a @click="jump('a1')">1.课程简介</a></li>
                            <li><a  @click="jump('a2')">2.关于数字逻辑</a></li>
                            <li><a  @click="jump('a3')">3.基本内容</a></li>
                            <li><a  @click="jump('a4')">4.研究内容</a></li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="19">
                    <div class="right">
                        <el-card class="box-card">
                            <div class="text item">
                                <a name="1"></a>
                                <h3 id="a1">课程简介</h3>
                                <p>  数字电路与逻辑设计是计算机科学与技术类各专业必修的一门重要专业技术基础课程，也是信息学科各专业的平台课程。 
   该课程在介绍有关数字系统基本知识、基本理论、基本电路的基础上，重点讨论数字系统中各种逻辑电路分析与设计的基本方法，以及该领域的发展现状及最新的技术。设置本课程的主要目的是使学生了解组成数字计算机和其它数字系统的各种基本逻辑电路；能熟练地运用有关知识和理论对各类逻辑电路进行分析；能针对客观提出的各种设计要求，综合运用多种方法和技术完成逻辑部件的设计与验证。通过本课程的学习，加强对学生逻辑思维能力、逻辑抽象能力、解决实际问题能力和创新能力的培养，使学生真正掌握对数字系统硬件进行分析、设计和开发的基本技能，为信息学科培养高素质人才奠定扎实宽厚的学科基础。</p>
                                <a name="2"></a>
                                <h3 id="a2">关于数字逻辑</h3>
                                <p>数字逻辑是数字电路逻辑设计的简称，其内容是应用数字电路进行数字系统逻辑设计。电子数字计算机是由具有各种逻辑功能的逻辑部件组成的，这些逻辑部件按其结构可分为组合逻辑电路和时序逻辑电路。组合逻辑电路是由与门、或门和非门等门电路组合形成的逻辑电路；时序逻辑电路是由触发器和门电路组成的具有记忆能力的逻辑电路。有了组合逻辑电路和时序逻辑电路，再进行合理的设计和安排，就可以表示和实现布尔代数的基本运算。</p>
                                <a name="3"></a>
                                <h3 id="a3">基本内容</h3>
                                <p>数制和编码</p>  
                                <p>逻辑代数基础</p>
                                <p>组合逻辑电路的分析与设计</p>
                                <p>同步时序逻辑电路分析</p>
                                <p>异步时序逻辑电路的分析与设计</p>
                                <p>可编程逻辑器件PLD</p>
                                <p>数字系统设计</p>
                                <a name="4"></a>
                                <h3 id="a4">研究内容</h3>
                                <p>主要用以研究有两个离散状态的开关器件所构成的数字电路。能对电路的输入与输出之间的关系提供理想描述,研究这种描述的特性和电路的实现,并探讨将数字电路或数字模块互连起来完成特定逻辑功能的理论和方法。具有两个或多个离散状态的开关器件或单元是：可断开和闭合的开关或继电器的触点；能正偏和反偏的整流二极管;能饱和和截止的开关电子管或开关晶体管;能在两个饱和方向中任意一个方向上磁化的磁心。具有二个离散状态的开关器件是最常见的。数字逻辑不考虑特殊条件下动作或稳定的物理现象和从一个状态过渡到另一个状态的细节。</p>
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
        background-color: #eee;
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
    .active{
        background-color: #ddd;
    }
    .el-row{
        margin: 50px auto;
    }
    .el-card{
        width: 900px;
    }
</style>
