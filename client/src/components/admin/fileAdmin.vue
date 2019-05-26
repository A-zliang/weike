<template>
    <div class="container">
            <el-row>
                <el-col :span="12">
                    <div class="left">
                        <h3>添加视频</h3>
                        <el-form label-width="80px" class="form-center">
                            <el-form-item label="主题">
                                <el-input v-model="video.topic"></el-input>
                            </el-form-item>
                            <el-form-item label="内容简介">
                                <el-input v-model="video.content"></el-input>
                            </el-form-item>

                            <el-upload
                                class="upload-demo"
                                drag
                                action="#"
                                :auto-upload="false"
                                :before-upload="beforeUploadVideo"
                                :http-request="uploadVideo"
                                :on-progress="uploadVideoProcess"
                                ref="uploadVideo"
                                accept=".mp4,avi"
                                multiple>
                                <i class="el-icon-upload" v-show="videoFlag == false"></i>
                              <el-progress   v-show="videoFlag == true"   type="circle"   :percentage="videoUploadPercent"   style="margin-top:30px;"> </el-progress>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传mp4/avi文件</div>
                            </el-upload>


                             <el-button type="primary" @click="uploadVideo">添加</el-button>
                        </el-form> 
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="right">
                        <h3>视频总数：{{videosList.length}}</h3>
                       <el-table  :data="videosList"  height="400" border  style="width: 100%" :default-sort = "{prop: 'create_time', order: 'descending'}" >
                            <el-table-column  label="主题" width="260">
                                   <template slot-scope="scope">
                                        <i  @click="play(scope.$index, scope.row)" class="iconfont el-icon-dzshipin"></i> 
                                        <span @click="play(scope.$index, scope.row)" style="margin-left: 10px">{{ scope.row.topic }}</span>
                                    </template>
                            </el-table-column>

                            <!-- <el-table-column prop="content"  label="内容简介" width="200"> </el-table-column> -->

                            <el-table-column prop="create_time" label="添加时间"  :formatter="dateFormat"> </el-table-column>

                             <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="deleteVideo(scope.$index, scope.row)" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>     




            <!-- 视频播放页面 -->
            <el-dialog :title="videoInfo.topic" :visible.sync="videoPlayPanel">
                <video-player  class="video-player-box"
                            width="1000px"
                            height="500px"
                            ref="videoPlayer"
                            :options="playerOptions"
                            :playsinline="true"
                            customEventName="customstatechangedeventname"
                            @pause="onPlayerPause($event)"
                            @ended="onPlayerEnded($event)"
                            @waiting="onPlayerWaiting($event)"
                            @statechanged="playerStateChanged($event)">
                    </video-player>
		    </el-dialog>
    </div>
</template>

<script>
	export default {
		data() {
			return {
                 dialogImageUrl: '',
                dialogVisible: false,
                videoFlag:false,
                videoUploadPercent:0, //进度条的进度，功能尚未实现
                video:{
                    topic:'',
                    content:''
                },
                videosList:[],
                videoInfo:'',
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
                    width: "700px",
                    height: "500px"
                    },
                videoPlayPanel:false,
                file:"",
                fileList:[]
			}
        },
        created() {
            this.getVideos();
        },
		methods: {
             handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
		    async uploadVideo(){
                if(this.video.topic==''){
                    alert('请填写主题');
                    return;
                }
                if(this.video.content==''){
                    alert('请填写内容');
                    return;
                }
                const  formData = new FormData();
                const file = this.$refs.uploadVideo.uploadFiles[0];
                const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
                if (!file) {
                    alert('请选择文件');
                    return;
                } 
                formData.append('file', file.raw);
                formData.append('topic', this.video.topic);
                formData.append('content', this.video.content);
                let res = await this.$http.api_upload_video(formData,headerConfig)
                if(res.data.code = 200){
                    alert("添加成功");
                     this.getVideos();
                    this.videoFlag = false;
                    this.video.topic = '';
                    this.video.content = '';
                    this.$refs.uploadVideo.clearFiles();
                }else{
                    alert("添加失败");
                }
            },
            uploadVideoProcess(event, file, fileList){
                this.videoFlag = true;
                this.videoUploadPercent =  100;
            },
            beforeUploadVideo(file) {
                const isLt10M = file.size / 1024 / 1024  < 10;
                if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
                    this.$message.error('请上传正确的视频格式');
                    return false;
                }
                if (!isLt1000M) {
                    this.$message.error('上传视频大小不能超过1000MB哦!');
                    return false;
                }
            },
            async getVideos(){
                let res  = await this.$http.api_get_videos();
                if(res.data.code==200){
                    this.videosList = res.data.res;
                }else{
                    console.log(res.data.msg);
                }
            },
            async deleteVideo(index,row){
                let id = row._id;
                if(confirm("确定删除该视频")){
                let res = await this.$http.api_deleteVideo(id);
                if(res.data.code ==200){
                     alert(res.data.msg);
                     let p = this.videosList.indexOf(row);
                     this.videosList.splice(p,1);
                    }
                }
            },
     dateFormat(row, column, cellValue, index){    //此方法对表格中的时间进行格式化，容易拿到表格列出来循环的数据
          const daterc = row[column.property]
          if(daterc!=null){
          const dateMat= new Date(parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10));
          let year = dateMat.getFullYear();
          let month = dateMat.getMonth() + 1;
           if(month<10){
                month = "0"+month
          }
          let day = dateMat.getDate();
           if(day<10){
                day = "0"+day
          }
          const timeFormat= year + "-" + month + "-" + day;
          return timeFormat;
          }   
      },
      play(index,row){
          this.videoInfo = row;
          this.playerOptions.sources[0].src = `http://localhost:3000/${this.videoInfo.filePath}`;
          this.videoPlayPanel = true;
      },
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
      }

		}
	}

</script>
<style scoped>
    .container .left{
        min-width: 600px;
        height: 456px;
        background-color: #fff;
        position: relative;
        box-shadow: 4px 4px 40px rgba(0,0,0,.2);
        /* border-radius: 5px; */
        margin:20px;
    }
    .container .left h3{
        font-weight: normal;
        text-align: center;
        padding: 15px 0;
        font-size: 20px;
        color: #888;
        margin:20px;
    }
    .container .form-center{
         width:40%;
         min-width:600px;
         position: relative;
    }
    .container .upload-demo{
        width: 360px;
        height: 180px;
        margin: 0 0 0 80px;
    }
     .container .el-button{
         width: 100px;
         position: absolute;
         bottom: 0;
         right: 0;
     }
     .container .right{
         min-width: 618px;
         background-color: #fff;
        box-shadow: 4px 4px 40px rgba(0,0,0,.2);
         height: auto;
         margin: 20px;
     }
    .container .right h3{
    font-weight: normal;
    text-align: center;
    padding: 15px 0;
    font-size: 20px;
    color: #888;
    }
     .container .right span:hover{
         color: red;
         cursor: pointer;
     }
    .container .right i:hover{
         color: red;
         cursor: pointer;
     }
</style>
