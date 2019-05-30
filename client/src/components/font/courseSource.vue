<template>
  <div>
    <headtop></headtop>
    <div class="main">
      <div class="jumbotron">
        <div class="container">
          <hgroup>
            <h1>数字逻辑</h1>
            <h4>课程的资源下载...</h4>
          </hgroup>
        </div>
      </div>
      <el-row :gutter="20" style="margin:20px 0">
        <el-col :span="2">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">

            <el-col :span="12">
              <div class="grid-content bg-purple-dark">
                <h3 class="file-title">视频文件：{{videosList.length}}</h3>
                <el-table :data="videosList" style="width: 100%">
               <el-table-column label="主题">
                    <template slot-scope="scope">
                        <i  class="iconfont el-icon-dzshipin"></i> 
                        <span style="margin-left: 10px">{{scope.row.content}}</span>
                    </template>
               </el-table-column>
               
                  <el-table-column :formatter="dateFormat" prop="create_time" label="时间" width="180"></el-table-column>
                  <el-table-column prop="username" label="下载">
                  <template slot-scope="scope">
                    <i class="iconfont el-icon-dzxiazai"  @click="downloadVideos(scope.row)"></i>
                  </template>
                </el-table-column>
                </el-table>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <h3 class="file-title">文档文件：{{fileList.length}}</h3>
        <el-table :data="fileList" style="width: 100%" :default-sort = "{prop: 'create_time', order: 'descending'}">
            <el-table-column label="文件名" width="200">
              <template slot-scope="scope">
                <i v-if="'pptx'==scope.row.ext" class="iconfont el-icon-dzppt"></i>
                <i
                  v-else-if="'xlsx'==scope.row.ext||'xls'==scope.row.ext"
                  class="iconfont el-icon-dzExcel"
                ></i>
                <i
                  v-else-if="'doc'==scope.row.ext||'docx'==scope.row.ext"
                  class="iconfont el-icon-dzword"
                ></i>
                <i v-else-if="'zip'==scope.row.ext" class="iconfont el-icon-dzzip"></i>
                <i v-else-if="'pdf'==scope.row.ext" class="iconfont el-icon-dzpdf"></i>
                <i v-else-if="'txt'==scope.row.ext" class="iconfont el-icon-dztxt"></i>
                <i
                  v-else-if="'jpg'==scope.row.ext||'png'==scope.row.ext"
                  class="iconfont el-icon-dztupian"
                ></i>
                <i v-else class="iconfont el-icon-dzweizhiwenjian"></i>
                <span
                  style="margin-left: 10px"
                  @click="downloadFiles(scope.row)"
                >{{ scope.row.topic }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="create_time" label="上传时间" :formatter="dateFormat" width="180"></el-table-column>
            <el-table-column prop="username" label="上传者"></el-table-column>
            <el-table-column prop="username" label="下载">
              <template slot-scope="scope">
                <i class="iconfont el-icon-dzxiazai" @click="downloadFiles(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
              </div>
            </el-col>

          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import headtop from "./head";
import foot from "./footer";
export default {
  data() {
    return {
      videosList: [],
      fileList: [],
    };
  },
  created() {
    this.getVideos();
    this.getFiles();
  },
  components: { headtop, foot },
  methods: {
    async downloadFiles(data) {
      let _id = data._id;
      window.open(`/api/getfile?id=${_id}`, "_self");
    }, 
    async downloadVideos(data) {
      let filePath = data.filePath;
      console.log(filePath);
      window.open(`/api/download/videos?id=${filePath}`, "_self");
    },
    async getVideos() {
      let res = await this.$http.api_get_videos();
      if (res.data.code == 200) {
        this.videosList = res.data.res;
        // console.log(this.videosList);
      } else {
        console.log(res.data.msg);
      }
    },
    async getFiles() {
      this.fileList = [];
      let res = await this.$http.api_get_files();
      let temp = {
        create_time: "",
        ext: "",
        filePath: "",
        username: "",
        _id: ""
      };
      if (res.data.code == 200) {
        for (let i = 0; i < res.data.res.length; i++) {
          temp.create_time = res.data.res[i].create_time;
          temp.filePath = res.data.res[i].filePath;
          temp.topic = res.data.res[i].topic;
          temp.username = res.data.res[i].username;
          temp._id = res.data.res[i]._id;
          let index = res.data.res[i].filePath.lastIndexOf(".");
          temp.ext = res.data.res[i].filePath.substring(index + 1);
          this.fileList.push(temp);
          temp = {
            create_time: "",
            filePath: "",
            username: "",
            _id: "",
            ext: ""
          };
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
  }
};
</script>
<style scoped>
.main {
  width: 100%;
  min-width: 1263px;
}
.jumbotron {
  margin: 0 0 30px 0;
  padding: 60px 0;
  background: #ccc url("../../assets/images/bg.jpg");
  background-size: 100% 100%;
  color: #ccc;
}
.jumbotron .container {
  width: 200px;
  height: 70px;
  margin: 0 150px;
}
h1 {
  font-size: 26px;
  padding: 0 0 0 20px;
}
.jumbotron h4 {
  font-size: 16px;
  padding: 0 0 0 20px;
  font-weight: normal;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.file-title{
  padding: 20px 0;
  color: #888;
}
</style>
