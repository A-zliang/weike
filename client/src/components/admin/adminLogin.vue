<template>
  <el-form
    :model="ruleForm2"
    :rules="rules2"
    ref="ruleForm2"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm2.checkPass"
        auto-complete="off"
        @keyup.enter.native="handleSubmit2"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        _id: "",
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
   mounted() {
        this.getCookie();
    },
  methods: {
    async handleSubmit2() {
      const self = this;
      if (this.ruleForm2.account == "" || this.ruleForm2.checkPass == "") {
        alert("请输入账号密码");
        return;
      }
      if(self.checked == true){
         self.setCookie(self.ruleForm2.account, self.ruleForm2.checkPass, 7);
      }else {
            self.clearCookie();
      }
     

      let res = await this.$http.api_admin_login(this.ruleForm2);
      console.log(res);
      let { code, data = [] } = res.data;
      if (code == 200) {
        this.$store.commit("saveAdmin", {
          _id: data._id,
          token: data.token,
          admin_user: data.account
        });
        this.$router.push("/main");
      } else {
        alert("登录失败");
      }
    },

    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm2.account = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm2.checkPass = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>

<style  scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>