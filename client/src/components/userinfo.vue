<template>
    <div>
        <headtop></headtop>
                <el-container style="min-height: 900px; border: 1px solid #eee" class="content">
                      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                            <el-menu router>
                               <el-menu-item index="/userinfo/userinfoMy"><i class="iconfont el-icon-dzgerenzhongxinxuanzhong"></i>我的信息</el-menu-item>
                               <el-menu-item index="/userinfo/userinfoMsg"><i class="iconfont el-icon-dzShape"></i>消息</el-menu-item>
                               <el-menu-item index="/userinfo/userinfoClass"><i class="iconfont el-icon-dzbanji"></i>我的班级</el-menu-item>
                               <el-menu-item @click="logout"><i class="iconfont el-icon-dztuichudenglu"></i>退出登录</el-menu-item>
                            </el-menu>
                      </el-aside>
                      
                      <el-container>
                          <el-main style="padding:0">
                            <router-view></router-view>
                          </el-main>
                      </el-container>
              </el-container>
        <foot></foot>
    </div>
</template>

<script>
import headtop from './head'
import foot from './footer'

export default {
    data() {
      return{
        
      }
    },
    components:{headtop,foot},
    methods: {
      logout(){
          if(confirm("你真的要退出登录吗？")){
            this.$store.commit("remove");
            this.$router.push('/login');
        }
      }
    },
}
</script>
<style scoped>
  .content{
    width: 100%;
    min-width: 1263px;
  }
  i{
    padding-right: 10px;
  }
   .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
