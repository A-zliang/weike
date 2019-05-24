<template>
    <div class="login">
        <h3 style="text-align: center">欢迎登录</h3>
        <div style="margin-top: 50px">
            <el-input placeholder="请输入用户名" v-model="user.username" type="text">
                <template slot="prepend">用户</template>
            </el-input>
        </div>
         <div style="margin-top: 35px">
            <el-input placeholder="请输入密码" v-model="user.password" type="password"  @keyup.enter.native="login">
                <template slot="prepend">密码</template>
            </el-input>
        </div>
       <el-button round  style="margin: 35px 0 0 160px" @click="login">登录</el-button>
      <router-link to="/register" class="re-link">去注册</router-link>
      <router-link to="/adminLogin" class="admin-link">我是管理员</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                 username: '',
                 password: ''
            }
        }
    },
    methods: {
      async login() {
        let res = await this.$http.api_login_user(this.user);
        let {code, msg, data = {}} = res.data;
         if(code == 200) {
                this.$store.commit('save', {
                     _id:data._id,
                     token: data.token,
                     user_name: data.username,
                     email: data.useremail,
                     identity: data.useridentity,
                     avatar:data.avatar,
                     classNum:data.classNum
                })
                alert('登录成功');
                this.$router.push('/home');
            }else{
                alert('登录失败');
            }
        }
    }
}
</script>

<style scoped>
    .login{
        background-color: #fff;
        width: 400px;
        height: 300px;
        margin: 200px auto;
        border: 1px solid #ccc;
        border-radius: 15px;
        box-shadow: 4px 4px 15px rgba(0,0,0,.2);
        padding: 25px;
        position: relative;
    }
    .re-link{
        position: absolute;
        color: #ccc;
        bottom: 5px;
        right: 5px;
    }
    .admin-link{
        position: absolute;
        color: #ccc;
        bottom: 5px;
        left: 5px;
    }
</style>
