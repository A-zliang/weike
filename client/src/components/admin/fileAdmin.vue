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
                                :auto-upload="true"
                                :http-request="uploadVideo"
                                ref="uploadVideo"
                                accept=".mp4,avi"
                                multiple>
                                <i class="el-icon-upload" v-show="videoFlag == false"></i>
                                <p v-show="videoFlag == true"  >{{percent}}%</p>
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

            <el-row>
                <el-col :span="12">
                    <div class="left">
                        <h3 class="file-h3">文件上传</h3>
                         <el-form label-width="80px" class="form-center">
                            <el-form-item label="相关内容">
                                <el-input v-model="file.topic"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-upload
                            class="upload-demo"
                            drag
                            action="#"
                            :auto-upload="false"
                            :http-request="uploadFile"
                            ref="uploadFile"
                            multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                        <el-button type="primary" class="btn" @click="uploadFile">添加</el-button>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="right">
                        <h3>文件总数：{{fileList.length}}</h3>
                       <el-table  :data="fileList"  height="400" border  style="width: 100%" :default-sort = "{prop: 'create_time', order: 'descending'}" >
                            <el-table-column  label="主题" width="200">
                                   <template slot-scope="scope">
                                       <i v-if="'pptx'==scope.row.ext" class="iconfont el-icon-dzppt"></i>
                                       <i v-else-if="'xlsx'==scope.row.ext||'xls'==scope.row.ext" class="iconfont el-icon-dzExcel"></i>
                                       <i  v-else-if="'doc'==scope.row.ext||'docx'==scope.row.ext" class="iconfont el-icon-dzword"></i>
                                       <i  v-else-if="'zip'==scope.row.ext" class="iconfont el-icon-dzzip"></i>
                                       <i  v-else-if="'pdf'==scope.row.ext" class="iconfont el-icon-dzpdf"></i>
                                       <i  v-else-if="'txt'==scope.row.ext" class="iconfont el-icon-dztxt"></i>
                                       <i  v-else-if="'jpg'==scope.row.ext||'png'==scope.row.ext" class="iconfont el-icon-dztupian"></i>
                                       <i  v-else class="iconfont el-icon-dzweizhiwenjian"></i>
                                      <span style="margin-left: 10px" @click="downloadFiles(scope.row)">{{ scope.row.topic }}</span>
                                    </template>
                            </el-table-column>
                            <el-table-column prop="username" label="上传者"> </el-table-column>

                            <el-table-column prop="create_time" label="添加时间"  :formatter="dateFormat"> </el-table-column>

                             <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="deleteFile(scope.$index, scope.row)" type="danger">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>   
  
           

            <!-- 视频播放页面 -->
            <el-dialog :title="videoInfo.topic" :visible.sync="videoPlayPanel" @close='closeDialog'>
                <video-player  class="video-player-box video-player vjs-custom-skin "
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
                videoFlag:false,
                videoUploadPercent:0, 
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
                file:{
                    topic:'',
                    username:""
                },
                fileList:[]
			}
        },
        created() {
            this.getVideos();
            this.getFiles();
        },
        computed: {
            percent(){
                return Math.ceil(this.videoUploadPercent);
            }
        },
		methods: {
            //关闭弹框的事件
            closeDialog(){
                this.$refs.videoPlayer.player.pause();
            },
            async uploadFile(){
                if(this.file.topic==''){
                    alert('请填写主题');
                    return;
                }
                this.file.username = 'admin';
                const  formData = new FormData();
                const file = this.$refs.uploadFile.uploadFiles;
                const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' }};
                 if (!file) {
                    alert('请选择文件');
                    return;
                }
                for(let i=0; i<file.length; i++){
                     formData.append('file', file[i].raw);
                }
                console.log(file);
                formData.append('length', file.length);
                formData.append('topic', this.file.topic);
                formData.append('username', this.file.username);
                let res = await this.$http.api_upload_file(formData,headerConfig);
                console.log(res);
                if(res.data.code == 200){
                    this.getFiles();
                    alert(res.data.msg);
                    this.$refs.uploadFile.clearFiles();
                    this.file.topic = '';
                }
            },
            async getFiles(){
                this.fileList =[];
                let res = await this.$http.api_get_files();
                let temp = {
                    create_time:'',
                    ext:'',
                    filePath:'',
                    username:'',
                    _id:''
                }
                if(res.data.code == 200){
                    for(let i=0; i<res.data.res.length; i++){
                            temp.create_time = res.data.res[i].create_time;
                            temp.filePath = res.data.res[i].filePath;
                            temp.topic = res.data.res[i].topic;
                            temp.username = res.data.res[i].username;
                            temp._id = res.data.res[i]._id;
                            let index = res.data.res[i].filePath.lastIndexOf(".");
                            temp.ext = res.data.res[i].filePath.substring(index+1);
                            this.fileList.push(temp);
                             temp = {
                                create_time:'',
                                filePath:'',
                                username:'',
                                _id:'',
                                ext:''
                            }
                    }
                }
            },
           async downloadFiles(data){
               console.log(data);   
               let _id = data._id;
               window.open(`/api/getfile?id=${_id}`,'_self'); 
            },
           async deleteFile(index, row){
               let res = await this.$http.api_delete_file(row._id);
               if(res.data.code == 200){
                   this.getFiles();
                   alert('删除成功');
               }else{
                   alert('删除失败');
               }
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
                 this.videoFlag = true;
                const  formData = new FormData();
                const file = this.$refs.uploadVideo.uploadFiles[0];
                const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: progressEvent => {
                    //progressEvent.loaded:已上传文件大小
                    //progressEvent.total:被上传文件的总大小
                    let complete = (progressEvent.loaded / progressEvent.total ) * 100 ;
                    this.videoUploadPercent = complete;
                    //console.log(this.videoUploadPercent);
                    if (this.videoUploadPercent >= 100){
                        this.videoFlag = false;
                    }
              },
                };
                if (!file) {
                    alert('请选择文件');
                    return;
                } 
                formData.append('file', file.raw);
                formData.append('topic', this.video.topic);
                formData.append('content', this.video.content);
                let res = await this.$http.api_upload_video(formData,headerConfig)
                 this.videoUploadPercent = 100;  
                if(res.data.code = 200){
                    this.getVideos();
                    this.video.topic = '';
                    this.video.content = '';
                     alert("添加成功");
                     this.videoUploadPercent = 0;  
                    this.$refs.uploadVideo.clearFiles();
                }else{
                    alert("添加失败");
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
     .file-h3{
        width: 100px;
        margin-left: 100px;
     }
     .btn{
         width: 100px;
         left: 50%;
         margin: 50px -100px;
     }
</style>