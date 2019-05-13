<template>
    <div>
        <headtop></headtop>
          <div class="show">
              <div class="talkTop">
                  <div class="left">
                    <div class="tip">
                        <h3>留下点什么吧...</h3>
                    </div>
                    <hr> 
                    <textarea placeholder="请输入最多1000个字符" v-focus v-model="comment.content"></textarea>
                   <el-button class="btn" type="primary" @click="publish">内容发表</el-button>
                  </div>

                  <div class="right">
                      <img :src="user_avatar" alt="头像" class="touxiang">
                      <h2>{{user_name}}</h2>
                  </div>
                 
              </div>
               <tPanel v-for="(item,index) in commentList" :key="index" :comment="item"></tPanel>
               <paginator 
               :pagination_page = pagination.page
               :pagination_size = pagination.size
               :pagination_total = pagination.total
               @jump="jump">
               </paginator>
          </div>
        <foot></foot>
    </div>
</template>

<script>
import headtop from './head'
import foot from './footer'
import tPanel from './talkPanel'
import paginator from './paginator'
export default {
    data() {
      return {
        commentList: [],
        comment:{
          username: '',
          content: '',
          like: [],
          mComment: []
        },
        pagination:{
            page: 1,
            size: 5,
            total: 0
        }
      }
    },
    created() {
      this.getComment();
    },
    computed: {
      user_name(){
        return this.$store.state.user.user_name;
      },
      user_avatar(){
            return this.$store.state.user.avatar;
      }
    },
    components:{headtop,foot,tPanel,paginator},

    methods: {
        async publish(){
              this.comment.username = this.$store.state.user.user_name;
              if(this.comment.content == ''){
                alert('内容不能为空');
                return;
              }
              if(this.comment.content.length >= 1000){
                alert('输入字符过长，请简要描述您的问题');
                return;
              }
              let res = await this.$http.api_publish(this.comment);
              let {code,msg} = res.data;
              alert(msg);
              if(code == 200){
                this.comment.content = '';
                this.getComment();
              }
          },
        async getComment(){
              let res = await this.$http.api_get_comment(this.pagination);
              let {code, total, msg, data=[]} = res.data;
              this.pagination.total = data.total;
              this.commentList = data.list;
              console.log(this.commentList);
        },
       
         jump(num){
            this.pagination.page = Number(num);
            
            this.getComment();
        }
      }

}
</script>
<style scoped>
  .show{
    width: 1263px;
    margin: 30px auto;
  }
 .show .talkTop{
   width: 100%;
   height: 350px;
   border: 1px solid #ccc;
   margin-bottom: 20px;
   border-radius: 2px;
   box-shadow: 0 3px 3px rgba(31,45,61,.15);
   border-radius: 13px;
 }
 .show .talkTop h2{
   text-align: center;
 }
 .show .talkTop .left{
   width: 1000px;
   height: 350px;
   border: 1px solid #ccc;
   border-top-left-radius: 13px;
   border-bottom-left-radius: 13px;
   border-left: 0;
   float: left;
 }
 .show .talkTop .tip{
   width: 750px;
   height: 50px;
   line-height: 50px;
   font-family: Tahoma,Arial,"宋体";
 }
 .show .talkTop .tip h3{
   margin-left: 20px;
 }
 .show .talkTop .left textarea{
   width: 800px;
   height: 250px;
   margin: 20px;
   padding: 5px;
   float: left;
   font-size: 18px;
   border: 1px solid #111;
   outline: none;
 }
 .show .talkTop .left .btn{
   margin: 240px 25px;
   float: left;
   display: block;
 }
  .show .talkTop .right{
    width: 260px;
    height: 352px;
    float: left;
  }
  .show .talkTop .touxiang{
    width: 128px;
    height: 128px;
    display: block;
    margin: 50px auto;
    background-size: 128px 128px;
    border-radius: 50%;
    background-image: url('../../assets/images/touxiang.jpg');
  }
</style>
