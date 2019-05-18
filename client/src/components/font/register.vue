<template>
    <div class="register">
        <h3 style="text-align: center">用户注册</h3>

        <div class="avatar-box">
          <img class="avatar-show" :src="user.avatar" alt="头像" :onerror="errorImg01">
          <label class="upload-img-btn" for="upload-img">上传头像</label>
          <input id="upload-img" type="file" @change="upload_img">
        </div>

        <div class="rads">
            <el-radio v-model="user.identity" label="学生">学生</el-radio>
            <el-radio v-model="user.identity" label="教师">教师</el-radio>
        </div>
        <el-input autofocus v-model="user.username" placeholder="用户名" style="margin-top:30px"></el-input>

        <el-input v-model="user.password" placeholder="密码" type="password" style="margin-top:30px"></el-input>

        <el-input v-model="user.password2" placeholder="确认密码" type="password" style="margin-top:30px" @keyup.enter.native="register"></el-input>

        <el-input v-model="user.email" placeholder="邮箱" style="margin-top:30px"></el-input>

        <el-row>
            <el-col :span="18">
                <el-input v-model="code" placeholder="验证码（发往邮箱）" style="margin-top:30px;width=30%"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button plain style="margin: 30px 0 0 10px" v-html="btn" @click="getCode"></el-button>
            </el-col>
        </el-row>
       
    
        <el-button plain style="margin: 30px 0 0 195px" @click="register">提交信息</el-button>

          <div class="cropper-img-box" v-if="cropper_box_mark == true">
            <vueCropper
            ref="cropper"
            :img="cropperData.img"
            :autoCrop="cropperData.autoCrop"
            :autoCropWidth="cropperData.autoCropWidth"
            :autoCropHeight="cropperData.autoCropHeight"
            :fixedBox="cropperData.fixedBox">
            </vueCropper>
            <div class="cropper-img-tool">
            <button class="cropper-img-tool-btn" @click="rotateRight">顺时针90°</button>
            <button class="cropper-img-tool-btn" @click="finish">确认</button>
            <button class="cropper-img-tool-btn" @click="cropper_box_mark = false">取消</button>
            <button class="cropper-img-tool-btn" @click="rotateLeft">逆时针90°</button>
            </div>
         </div>
    </div>
</template>

<script>
import { VueCropper }  from 'vue-cropper'
export default {
    components: { VueCropper},
    data(){
        return{
            errorImg01: 'this.src="' + require('../../assets/images/touxiang.jpg') + '"',
            code:'',
            btn:'获取验证码',
            user:{
                username: '',
                password: '',
                password2: '',
                email: '',
                identity: '学生',
                code:'',
                avatar: ''
            },
             cropper_box_mark: false,
             cropperData: {
				img: '',
				autoCrop: true,
				autoCropWidth: 300,
				autoCropHeight: 300,
				fixedBox: true
            },
        }
    },
    methods:{
    rotateRight(){
      this.$refs.cropper.rotateRight();
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    finish () {
      this.$refs.cropper.getCropData((data) => {
        this.user.avatar = data;
        this.cropper_box_mark  = false;
      })
    },
       async register(){
           var regusername = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;  //用户名验证
           var regpassword = /^[a-zA-Z]\w{5,17}$/;
           var regeamil = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
           if(!regusername.test(this.user.username)){
               alert('用户名不符合要求');
               this.user.username = '';
           }else if(!regpassword.test(this.user.password)){
                alert('密码要以字母开头且长度在6个字符以上');
           } else if(!regeamil.test(this.user.email)){
               alert('邮箱格式不符合');
           }else if(this.code != this.user.code){
               alert('验证码错误');
           }
           else if(this.user.identity == ''){
               alert('请选择您的用户身份');
           }else if(this.user.password == this.user.password2) {
                let res = await this.$http.api_register_user(this.user);
                if(res.data.code == 200) {
                    alert(res.data.msg);
                    this.$router.push('/login');
                } else{
                    alert(res.data.msg);
                }
           } else {
               alert('注册失败');
           }
        },
      async getCode(){
            if(this.user.email == ''){
                alert('请输入邮箱');
                return;
            }
            let Sendemail = {
                email: this.user.email
            }
            console.log(this.user.email);
            let res = await this.$http.api_get_emailCode(Sendemail);
            if(res.data.code == 200){
                this.user.code = res.data.data.ecode
            }

            this.btn = "<p style='color:red'>重新发送</p>";
           
        },
        upload_img(e){
            let obj = e.target;
            let file = obj.files[0];
            let temArr = file.name.split(".");
            let file_suffix = temArr[temArr.length-1];
            if(file_suffix != 'jpg' && file_suffix != 'png' && file_suffix != 'jpeg'){
                alert("上传图片失败，目前只支持jpg,png,jpeg的图片!");
                return;
            }
            let reader = new FileReader();
            let _self = this;
            reader.onload = function (ev) {
                _self.cropperData.img = ev.target.result;		      
                _self.cropper_box_mark = true;
            }
            reader.readAsDataURL(file);
        },
    }
}
</script>

<style scoped>
.register{
    width: 500px;
    height: 650px;
    background-color: #fff;
    margin: 20px auto;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 4px 4px 15px rgba(0,0,0,.2);    
}
.register  el-input{
    margin-top:30px;
}
.register .rads{
    text-align: center;
    margin: 30px 0 0 10px;
}
.avatar-box {
    flex: 1;
}
.avatar-show {
    margin: 0 auto;
    display: block;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
   .upload-img-btn {
    width: 80px;
    text-align: center;
    border: 1px solid #ccc;
    display: block;
    padding: 5px 15px;
    transform: translateY(40%);
    margin: 5px auto;
    cursor: pointer;
  }
   .cropper-img-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  #upload-img{
    opacity: 0;
    display: none;
  }
  .cropper-img-tool {
    position: absolute;
    z-index: 2;
    bottom: 20px;
    left: 0;
    text-align: center;
    width: 100%;
  }
  .cropper-img-tool-btn {
      width: 140px;
      height: 50px;
      font-size: 18px;
      cursor: pointer;
  }
</style>
