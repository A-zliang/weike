<template>
    <div :class="index == true ? 'main' : 'mmain'" >
<!--1. 左边头像和名字部分 -->
        <div :class="index == true ? 'left' : 'mleft'">
            
            <img :src="comment.avatar" alt="头像"  :class="index == true ? 'touxiang' : 'mtouxiang'">
            <h3>{{comment.username}}</h3>
        </div>

<!--2. 右边文字和点赞和评论图标 -->
        <div :class="index == true ? 'right' : 'mright'" ref="element">
            <!-- 2.1文章部分 -->
            <div :class="index == true ? 'text' : 'mtext'">
                <div :class="index == true ? 'textArea' : 'mtextArea'">
                    <span v-html="stext" v-if="index" v-show="comment.content.length >=200"></span>
                    <span v-html="comment.content" v-if="index" v-show="comment.content.length <=200"></span>
                    <span v-html="comment.content" v-if="!index"></span>
                    <button @click="showMore" v-if="index" v-show="comment.content.length >=200 ">
                    阅读全文
                    <i class="el-icon-caret-bottom"></i>
                    </button>

                     <button @click="hiddenSome" v-if="!index">
                    收起全文
                    <i class="el-icon-caret-top"></i>
                    </button>
                </div>
            </div>
            <p style="color:#ccc;margin: 0 0 0 10px">{{getData}}</p>
            <!-- 2.2图标部分 -->
           <div :class="index == true ? 'icon' : 'micon'">
               <span class="showLike">
                    <i :class="likeMark == false ? 'iconfont el-icon-dzdianzan' : 'iconfont el-icon-dzdianzan likeHover' "  @click="like">{{comment.like.length}}</i>
               </span>
               <span class="showP" @click="showMore">
                    <i class="iconfont el-icon-dzpinglun">{{comment.mComment.length}}</i> 
               </span>
           </div>
            <!--2.3. 隐藏的评论部分 -->
                <div class="pinglun" v-show="!index">
                    <div class="pcontent">
                       <p v-show="comment.mComment.length<=0">暂时还没有人留言</p>
                       <p v-for="(item,index) in comment.mComment" :key="index">
                        {{comment.mComment[comment.mComment.length-1-index].username}}:
                        {{comment.mComment[comment.mComment.length-1-index].content}}
                        {{comment.mComment[comment.mComment.length-1-index].time}}
                        </p>
                    </div>
                    <div>
                        <textarea  cols="100" rows="5" v-model="mComments.content"></textarea>
                        <el-button type="primary" size="small" @click="publish_leave">发表</el-button>
                    </div>
                </div>
        </div>


    </div>
</template>

<script>
export default {
    props:['comment'],
    data() {
        return {
            index: true,
            likeMark:false,
            mComments: {
                username: '',
                content: '',
                time:'',
                id: ''
            }
        }
    },
    created() {
        this.likeCss();
    },
    computed: {
        stext(){
            return this.comment.content.substring(0,210)+'...';
        },
        getData(){
            let now = new Date(Number(this.comment.create_time));
            var year = now.getFullYear();
            var month = now.getMonth();
            if(month<10){
                month = "0"+month
            }
            var date = now.getDate();
             if(date<10){
                date = "0"+date
            }
            var hour = now.getHours();
             if(hour<10){
                hour = "0"+hour
            }
            var minu = now.getMinutes();
             if(minu<10){
                minu = "0"+minu
            }
            var sec = now.getSeconds();
             if(sec<10){
                sec = "0"+sec
            }
            let create_time = `${year}-${month}-${date} ${hour}:${minu}:${sec}`;
            return create_time;
        },
    },
    methods: {
        showMore(){
            this.index = !this.index;
        },
        hiddenSome(){
            this.index = !this.index;
        },
        showP(){
            this.indexp = !this.indexp;
        },
        async publish_leave(ctx){
            if(this.mComments.content == ''){
                alert('内容不能为空');
                return;
            }
            this.mComments.username = this.$store.state.user.user_name;
            this.mComments.time =  this.CurentTime();
            this.mComments.id = this.comment._id;
            
            let res = await this.$http.api_publish_leave(this.mComments);
            if(res.data.code == 200){
                alert(res.data.msg);
                this.mComments.content = '';
                // location.reload();
                this.$parent.getComment();
            }
        },
        isExist(arr,val){    //判断是否点过赞
            for(var i=0; i<arr.length;i++){
                if(arr[i] == val)
                return true;
            }
                return false;
        },
        likeCss(){
            let lmark = this.isExist(this.comment.like,this.$store.state.user.user_name);
            if(lmark){
                this.likeMark = lmark;
            }
            
        },
        async like(){
           let mark = this.isExist(this.comment.like,this.$store.state.user.user_name);
            if(mark){
                alert('您已经点过赞了');
                return;
            }
            let user = this.$store.state.user.user_name;
            let id = this.comment._id;    //该id用于查询对应的评论
            let res = await this.$http.api_like({user,id});
           
            if(res.data.code == 200){
                this.likeMark = true;
                this.$parent.getComment();
            }
        },
        CurentTime(){
            var now = new Date();
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒
            
            var clock = year + "-";
            
            if(month < 10)
                clock += "0";
            clock += month + "-";
            if(day < 10)
                clock += "0";
            clock += day + " ";
            if(hh < 10)
                clock += "0";
            clock += hh + ":";
            if (mm < 10) clock += '0'; 
            clock += mm + ":"; 
            if (ss < 10) clock += '0'; 
            clock += ss; 
            return(clock); 
        }
    },
}
</script>


<style scoped>
    .main{
        width: 100%;
        height: 150px;
        background-color: #fff;
        border: 1px solid #ccc;
        margin-top: 15px;
        box-shadow: 0 3px 3px rgba(31,45,61,.15);
        overflow: auto;
    }
    .main .left{
        width: 150px;
        height: 150px;
        float: left;
        border-right: 1px solid red;
    }
   .touxiang{
        margin: 10px auto;
        width: 80px;
        height: 80px;
        display: block;
        border-radius: 50%;
        background-image: url('../../assets/images/q4.jpg');
        background-size: 80px 80px;
        border: 1px solid #ccc;
    }
    h3{
          text-align: center;
          font-weight: none;
    }
    .main .right{
        width: 1100px;
        height: 150px;
        float: left;
        position: relative;
    }
    .main .right .text{
        letter-spacing: 3px;
        line-height: 30px;
    }
    .main .right .text .textArea{
        overflow: hidden;
        width: 100%; 
        padding: 5px;
        height: 112px;
    }
    .right .text button{
        color: blue;
        border: 0;
        cursor: pointer;
        background-color: transparent;
        outline: none;
    }
     .mright .mtext button{
        color: blue;
        border: 0;
        cursor: pointer;
        background-color: transparent;
        outline: none;
    }
     .main .right .icon {
         position: absolute;
         bottom: 6px;
         right: 8px;
     }
    .main .right .icon i{
          margin: 0 10px; 
    }
    .mmain{
        width: 100%;
        min-height: 300px; 
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 2px 2px #eee;
        margin: 30px 0;
        overflow: auto;
    }
    .mleft{
        width: 150px;
        height: 220px;
        float: left;
    }
    .mright{
        width: 1063px;
        min-height: 300px;
        float: left;
        position: relative;
    }
    .mtouxiang{
        margin: 100px auto 10px;
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-image: url('../../assets/images/q4.jpg');
        background-size: 80px 80px;
        border: 1px solid #ccc;
    }
   .mtext{
        padding: 8px 0 0 15px; 
        min-height:100px;
        letter-spacing: 3px;
        line-height: 30px;
        border-left: 2px solid red;
    }
   .mtextArea{
        width: 100%;
    }
    .micon {
    position: absolute;
    bottom: 6px;
    right: 8px;
    }
     .micon i{
         margin: 0 10px 
     }
     .showLike{
         cursor: pointer;
     } 
     .likeHover{
        color: red;
     }
      .showLike :hover{
         color: red;
      }
      .showP{
         cursor: pointer;
     } 
      .showP :hover{
         color: red;
      }
      .pinglun{
          width: 900px;
          min-height: 125px;
          border-left: 3px solid #eee;
          margin: 20px 30px;
          padding: 0 0 0 10px;
      }
     .pcontent {
         width: 100%;
         min-height: 50px;
         border-bottom: 1px solid #eee;
     }
      .pcontent p{
          margin: 15px 0 15px 5px ;
          min-height: 20px;
          color: #999;
          font-size: 16px;
      }
       .pinglun textarea{
           width: 600px;
           height: 60px;
           margin: 10px 10px 10px 0;
           float: left;
       }
        .pinglun button{
            float: left;
            margin: 40px 0 0 0;
        }
</style>

