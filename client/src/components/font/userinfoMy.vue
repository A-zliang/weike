<template>
    <div class="myinfo">
        <div class="top">
            <!-- 头像 -->
            <img :src="user_avatar" alt="头像" :onerror="errorImg01" class="touxiang">
             <label class="upload-img-btn" for="upload-img">更改头像</label>
            <input id="upload-img" type="file" @change="upload_img">
        </div>
        <div class="bottom">
            <label><span>姓名</span><el-input class="inputInfo"  v-model="user_name" :disabled="true"></el-input></label>
            <label><span>身份</span><el-input class="inputInfo" v-model="user_identify" :disabled="true"></el-input></label>
            <label><span>邮箱</span><el-input class="inputInfo" v-model="user_email" :disabled="true"></el-input></label>
            <label class="xiugai"><i  class="el-icon-arrow-down el-icon--right" @click="showMore1">修改密码</i>        <i class="el-icon-arrow-down el-icon--right" @click="showMore2">修改邮箱</i></label>
            
            <label v-show="showMark1"><span>密码</span><el-input class="inputInfo" type="password" v-model="user.password1"></el-input></label>
            <label v-show="showMark1"><span>确认密码</span><el-input class="inputInfo"  type="password" v-model="user.password2"></el-input></label>

            <label v-show="showMark2"><span>新邮箱</span><el-input class="inputInfo" v-model="user.email"></el-input></label>
            <label v-show="showMark2"><span>验证码</span><el-input class="inputInfo input-code" v-model="code"></el-input><el-button plain @click="getCode">发送验证码</el-button></label>
            <label><el-button class="btn" type="primary" @click="change" @keyup="change">保存设置</el-button></label>
        </div>
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
    data() {
        return {
            errorImg01: 'this.src="' + require('../../assets/images/touxiang.jpg') + '"',
            showMark1: false,
            showMark2: false,
            code: '',
            user: {
                username :'',
                password1: '',
                password2: '',
                email: '',
                backCode: '',
                avatar:''
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
    computed: {
        user_name(){
            return this.$store.state.user.user_name;
        },
        user_identify(){
            return this.$store.state.user.identity;
        },
        user_email(){
            return this.$store.state.user.email;
        },
        user_avatar(){
            return this.$store.state.user.avatar;
        }
    },
    components: { VueCropper},
    methods: {
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
        showMore1(){
            this.showMark1 = !this.showMark1;
        },
         showMore2(){
            this.showMark2 = !this.showMark2;            
        },
        async change(){
            var regpassword = /^[a-zA-Z]\w{5,17}$/;
            var regeamil = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            this.user.username = this.$store.state.user.user_name;
            if(this.user.email == ''){                                              //改密码
               if(!regpassword.test(this.user.password1)){
                    alert('密码要以字母开头且长度在6个字符以上111');
                    return;
                }else if(this.user.password1 != this.user.password2){
                    alert('两次输入的密码不一致');
                    return;
                }
             let res =await this.$http.api_change_userData(this.user);
             let {code,msg} = res.data;
                alert(msg);
                if(code == 200){
                    this.$store.commit("remove");
                    this.$router.push('/login');
                }
                return;
            }else if((this.user.password1 == '')&&(this.user.password1 == '')){       //改邮箱
                if(this.code != this.user.backCode){        
                    alert('验证码错误');
                    return;
                }else if(!regeamil.test(this.user.email)){
                    alert('邮箱格式不正确');
                    return;
                }
                let res =await this.$http.api_change_userData(this.user);
                let {code,msg,data} = res.data;
                    if(code == 200){
                        this.$store.commit('save', {
                         _id:data._id,
                        token: data.token,
                        user_name: data.username,
                        email: data.useremail,
                        identity: data.useridentity,
                        avatar:data.avatar
                    })
                    alert(msg);
                    this.showMark1 = false;
                    this.showMark2 = false;
                }
                return;
            }else{                                                                 //都修改
                if(!regpassword.test(this.user.password1)){
                    alert('密码要以字母开头且长度在6个字符以上');
                    return;
                }else if(this.user.password1 != this.user.password2){
                    alert('两次输入的密码不一致');
                    return;
                }else if(this.code != this.user.backCode){        
                    alert('验证码错误');
                    return;
                }else if(!regeamil.test(this.user.email)){
                    alert('邮箱格式不正确');
                    return;
                }
                let res =await this.$http.api_change_userData(this.user);
                let {code,msg,data} = res.data;
                if(code == 200){
                    this.$store.commit('save', {
                     _id:data._id,
                     token: data.token,
                     user_name: data.username,
                     email: data.useremail,
                     identity: data.useridentity,
                     avatar:data.avatar
                })
                    alert(msg);
                    this.$store.commit("remove");
                    this.$router.push('/login');
                    this.showMark1 = false;
                    this.showMark2 = false;
                }
            }
        },
        async getCode(){
            if(this.user.email == ''){
                alert('请输入验证码');
                return;
            }
            var Sendemail = {
                email: this.user.email
            }

            let res = await this.$http.api_get_emailCode(Sendemail);
            if(res.data.code == 200){
                this.user.backCode = res.data.data.ecode
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
    },

}
</script>

<style scoped>
    .myinfo{
        width: 100%;
        min-width: 800px;
        height: 398px;
        box-sizing: border-box;
    }
    .myinfo .top{
        width: 1010px;
        height: 208px;
        background-color: #fff;
        border-right: 2px solid #dddddd;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        margin: 10px auto;
        border-radius: 15px;
        position: relative;
    }
    .myinfo .top h2{
       position: absolute;
       text-align: center;
       top: 80%;
       left: 48%;
    }
    .myinfo .touxiang{
        position: absolute;
        width: 128px;
        height: 128px;
        background-size: 128px 128px;
        left: 50%;
        top: 40%;
        margin: -64px 0 0 -64px;
        border-radius: 50%;
        background-image: url('../../assets/images/touxiang.jpg');
    }
    .myinfo .touxiang:hover{
        opacity: 0.5;
    }
    .myinfo .bottom{
        width: 1010px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 15px;
        margin: 0 auto;
        background-color: #fff;
    }
     .myinfo .bottom label{
         font-size: 20px;
         color: #ccc;
         padding: 20px;
         display: block;
         text-align: center;
     }
      .myinfo .bottom label span{
          display: inline-block;
          width: 100px;
          line-height: 30px;
          text-align: center;
          height: 30px;
          color: #777;
      }
    .myinfo .bottom .xiugai {
        padding: 0;
    }
   
    .myinfo .bottom .inputInfo{
        width: 400px;
    }
    .myinfo .bottom  .input-code{
        width: 280px;
        margin-right: 10px;
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
    position: absolute;
    text-align: center;
    top: 70%;
    left: 45%;
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
