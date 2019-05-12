<template>
    <div class="video">
            <el-row>
              <el-col :span="19"> 
                <div class="grid-content bg-purple">
                  <div class="title">
                    <h3>{{this.$route.query.topic}}</h3>
                    <p>{{this.$route.query.content}}</p>
                  </div>
                   <video-player  class="video-player-box"
                            width="1000px"
                            height="500px"
                            ref="videoPlayer"
                            :options="playerOptions"
                            :playsinline="true"
                            customEventName="customstatechangedeventname"
                            @play="onPlayerPlay($event)"
                            @pause="onPlayerPause($event)"
                            @ended="onPlayerEnded($event)"
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
                        <div class="item">
                            <span>张三</span> <span>2019-05-05</span>
                            <p>这是张三的留言，这是张三的留言这是张三的留言这是张三的留言这这是张三的留言张三的留言这是张三的留言这是张三的留言</p>
                        </div>
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
                <el-button class="btn"  type="primary">发表</el-button>
              </el-col>
           </el-row>
    </div>
</template>

<script>

export default {
      data() {
      return {
        textarea: '',
        playerOptions: {
          // videojs options
          // muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: ""
          }],
          poster: "/static/images/author.jpg",
          width: "1200px",
          height: "622px"
        }
      }
    },
    created() {
     this.getSrc();
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      getSrc(){
         this.playerOptions.sources[0].src ='http://localhost:3000/'+this.$route.query.filePath;
         console.log(this.playerOptions.sources[0].src);
      },
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
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


