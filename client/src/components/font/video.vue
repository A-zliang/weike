<template>
    <div class="video">
            <el-row>
              <el-col :span="19"> 
                <div class="grid-content bg-purple">
                  <div class="title">
                    <h3>{{this.$route.query.topic}}</h3>
                    <p>{{this.$route.query.content}}</p>
                  </div>
                   <video-player  class="video-player-box video-player vjs-custom-skin "
                            width="1000px"
                            height="500px"
                            ref="videoPlayer"
                            :options="playerOptions"
                            :playsinline="true"
                            
                            @play="($event)"
                            @pause="onPlayerPause($event)"
                            @ended="onPlayerEnded($event)"
                            @timeupdate="onPlayerTimeupdate($event)"
                            @waiting="onPlayerWaiting($event)"
                            @statechanged="playerStateChanged($event)"
                            @ready="playerReadied">
                    </video-player>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple-light">
                    <div class="top">
                        <h3>留言区</h3>
                    </div>
                    <div class="comment">
                        <div class="item" v-for="(item, index) in commentList" :key="index">
                            <span>{{item.username}}</span> <span>{{item.create_time}}</span>
                            <p>{{item.content}}</p>
                        </div>
                        <p v-show="commentList.length == 0" style="text-align:center">暂时没有人评论</p>
                    </div>
                </div>
              </el-col>
            </el-row>
           <el-row class="bottom">
              <el-col :span="19"> 
                  <el-input
                    class="textarea"
                    type="textarea"
                    placeholder="发表见解"
                    v-model="textarea"
                    :rows="2"
                    maxlength="30"
                    show-word-limit>
                  </el-input>
              </el-col>
              <el-col :span="5">
                <el-button class="btn" @click="pushComment" type="primary">发表</el-button>
              </el-col>
           </el-row>

    </div>
</template>

<script>

export default {
      data() {
      return {
        topic:'',
        textarea: '',
        commentList:[],
        playerOptions: {
          // videojs options
          // muted: true,
          language: 'zh-CN',
          autoplay: true, //如果true,浏览器准备好时开始回放
          controls:true,
          preload:'auto', // <video>加载元素后立即加载视频
          fluid: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: ""
          }],
          poster: "/static/images/author.jpg",
          width: "1200px",
          height: "622px",
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    created() {
     this.getSrc();
     this.getVideoComment();
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    beforeDestroy() {
      this.watchTime();
  },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
    },
    methods: {
      getSrc(){
         this.playerOptions.sources[0].src ='http://localhost:3000/'+this.$route.query.filePath;
         this.topic = this.$route.query.topic;
      },
      async pushComment(){
        let id = this.$route.query._id;
        let username = this.$store.state.user.user_name;;
        let info = {
          videoId: id,
          username,
          content: this.textarea
        }
        let res = await this.$http.api_push_videoComment(info);
        if(res.data.code == 200){
          alert('发表成功');
          this.textarea = '';
          this.getVideoComment();
        }else{
          alert('发表失败');
        }
      },
      async getVideoComment(){
        this.commentList = [];
        let id = this.$route.query._id;
        let res = await this.$http.api_get_videoComment(id);
        if(res.data.code == 200){
          console.log(res.data.res);
          let comment = {
            username:'',
            content:'',
            create_time:''
          }
          let len = res.data.res.length;
          for(let i=0; i<res.data.res.length; i++){
              comment.username = res.data.res[len-i-1].username;
              comment.content = res.data.res[len-i-1].content;
              comment.create_time = this.timeFormat(res.data.res[len-i-1].create_time);
              this.commentList.push(comment);
                comment = {
                  username:'',
                  content:'',
                  create_time:''
                }
          }
        }
      },
       timeFormat(data){    //对编辑页面中的时间格式化
            let now = new Date(Number(data));
            var year = now.getFullYear();
            var month = now.getMonth();
            if(month<10){
                month = "0"+month
            }
            let date = now.getDate();
             if(date<10){
                date = "0"+date
            }
            let hour = now.getHours();
             if(hour<10){
                hour = "0"+hour
            }
            let minu = now.getMinutes();
             if(minu<10){
                minu = "0"+minu
            }
            let sec = now.getSeconds();
             if(sec<10){
                sec = "0"+sec
            }
           let create_time = `${year}-${month}-${date} ${hour}:${minu}:${sec}`;
           return create_time;
        },
      //播放
      onPlayerPlay(player) {
         console.log('player play!', player)
      },
      //暂停
      onPlayerPause(player) {
         console.log('player pause!', player)
      },
      playerStateChanged(playerCurrentState) {
         //console.log('player current update state', playerCurrentState)
      },
      onPlayerTimeupdate(player) {
         console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerEnded(player) {
         console.log('player ended!', player);
      },
      playerReadied(player) {
        console.log('the player is readied', player)
      },
    async  watchTime(){
        let record = {
          username:this.$store.state.user.user_name,
          topic: this.topic,
          time: this.player.currentTime(),
          filePath:this.playerOptions.sources[0].src
        }
        console.log(record);
        let res = await this.$http.api_send_watchMsg(record)
        if(res.data.code==200){
          console.log('退出观看');
        }
      }
    }
}
</script>

<style scoped>
  .video{
    background-color: #f2f2f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
   .bg-purple {
    background: #d3dce6;
  }
   .bg-purple-light {
    background: #e5e9f2;
  }
  .title{
    width: 100%;
    height: 60px;
    background-color: #ccc;
  }
  .title h3{
    font-weight: normal;
    font-size: 18px;
    padding: 5px 0 0 15px;
  }
  .title p{
    font-size: 14px;
    padding: 5px 0 0 15px;
  }
  .top{
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #ddd;
    font-size: 20px;
  }
  .comment{
    width: 100%;
    height: 622px;
    background-color: #eee;
    overflow: auto;
  }
   .comment .item{
     background-color: #fff;
     width: 95%;
     height: 90px;
     padding: 8px;
     border-bottom: 1px solid red;
   }
    .comment .item span{
      display: inline-block;
      margin: 0 0 5px 0;
    }
     .comment .item span:nth-child(1){
       font-size: 18px;
       color: #000;
       font-family: sans-serif;
     }
    .comment .item span:nth-child(2){
      float: right;
      color: #999;
    }
    .comment .item p{
      font-size: 14px;
      color: #666;
      line-height: 25px;
    }
  .video .bottom{
    padding: 10px 16px 0 5px;
  }
   .video .bottom .btn{
     width: 100%;
     margin: 0 0 0 10px;
     height: 53.6px;
   }
</style>


