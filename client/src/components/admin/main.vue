<template>
    <div>
        <div class="top">
            <div class="left">
                <h3>ADMIN</h3>
            </div>
            <div class="right">
                <el-dropdown>
                    <i class="el-icon-setting">管理员</i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                         <span @click="changePassword">修改信息</span>
                    </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
               
            </div>
        </div>
        <el-container style="min-height: 900px; border: 1px solid #eee" class="content">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router>
                    <el-menu-item index="/main/adminWebsite"><i class="iconfont el-icon-dzwangzhan"></i>    网站管理</el-menu-item>
                    <el-menu-item index="/main/user"><i class="iconfont el-icon-dzfangqiuzhiyepeiyangzhuanhuan"></i>    用户管理</el-menu-item>
                    <el-menu-item index="/main/classAdmin"><i class="iconfont el-icon-dzbanji1"></i>    班级管理</el-menu-item>
                    <el-menu-item index="/main/fileAdmin"><i class="iconfont el-icon-dzwenjianguanli"></i>  资源管理</el-menu-item>
                    <el-menu-item @click="loginOut"><i class="iconfont el-icon-dztuichudenglu"></i> 退出登录</el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main style="padding:0; background-color: #f2f2f2;">
                <router-view></router-view>
                </el-main>
            </el-container>
    </el-container>


    <el-dialog title="修改管理员信息" :visible.sync="passwordPanel">
         <el-form label-width="80px">
        <el-form-item label="账号">
          <el-input type="text" v-model="admin.account" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password"  v-model="admin.password" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="passwordPanel = false">取消</el-button>
        <el-button type="primary" @click="submit()">提交</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            passwordPanel:false,
            admin:{
                account:'',
                password:''
            }
        }
    },
    methods: {
        changePassword(){
            this.passwordPanel = true;
        },
       async submit(){
           let res = await this.$http.api_change_adminMsg(this.admin);
           console.log(res);
           if(res.data.code == 200){
               this.passwordPanel = false;
               alert('修改成功');
               this.$store.commit("removeAdmin");
               this.$router.push('/adminLogin');
           }else{
               alert('修改失败');
           }
        },
        loginOut(){
            if(confirm('确定退出管理界面？')){
               this.$store.commit("removeAdmin");
               this.$router.push('/adminLogin');
            }
        }
    },
}
</script>

<style scoped>
.top{
    width: 100%;
    height: 70px;
    background-color: #20a0ff;
}
.top .left{
    width: 200px;
    height: 70px;
    border-right: 1px solid rgb(192, 192, 192);
    float: left;
}
.top .left h3{
    font-size: 25px;
    color: #fff;
    line-height: 70px;
    text-align: center;
}
.top .right{
    width: 100px;
    height: 70px;
    float: right;
    line-height: 70px;
}
</style>
