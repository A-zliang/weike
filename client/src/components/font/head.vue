<template>
    <div class="top">
      <div class="center">
          <div class="title">
                  <h1>数字逻辑微课网</h1>
          </div>
          <div class="nav">
              <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" background-color="#e1e5eb" text-color="#475669" active-text-color="#475669">
                  <el-menu-item index="/">首页</el-menu-item>
                  <el-submenu index="2">
                      <template slot="title">课程概况</template>
                      <el-menu-item index="/course">课程简介</el-menu-item>
                      <el-menu-item index="/coursePlan">教学大纲</el-menu-item>
                      <el-menu-item index="/courseSource">课程资源</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="/talk">交流讨论</el-menu-item>      
                  <el-menu-item index="/userinfo">个人中心</el-menu-item>
              </el-menu> 
          </div>
      </div>
       
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      
    }
  }
</script>

<style scoped>
    .top{
        width: 100%;
        min-width: 1263px;
        height: 60px;
        background-color: #e1e5eb;
        border-bottom: 2px solid #ccc;
    }
    .top .center{
      width: 1263px;
      height: 60px;
      margin: 0 auto;
    }
    .top .center .title{
        line-height: 60px;
        float: left;
    }
    .top .title h1{
       font-family:"Times New Roman",Times,serif;
       font-weight: normal;
       font-style:italic;
    }
   .top .center .nav{
        width: 600px;
        height: 60px;
        float: right;
    }
</style>
