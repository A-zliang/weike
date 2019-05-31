<template>
  <div>
    <headtop></headtop>
    <div class="home">
      <div class="show">
        <div class="tip">
          <span class="left">微课视频</span>
          <router-link to="/moreVideo">
            <span class="right">
              更多
              <i class="iconfont el-icon-dzgengduo"></i>
            </span>
          </router-link>
          <hr>
        </div>
        <div class="videos">
          <el-row>
            <el-col :span="7" v-for="(o, index) in videoList" :key="index">
              <el-card :body-style="{ padding: '0px'}">
                <router-link :to="{path: '/video', query:o}">
                  <img
                    src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=9fc39de227f5e0feee188e07645b5395/a8014c086e061d9565a7a5c371f40ad163d9ca6c.jpg"
                    class="image"
                  >
                </router-link>
                <div class="desc">
                  <router-link :to="{path: '/video', query:o}">
                    <h3>{{o.topic}}</h3>
                  </router-link>
                  <router-link :to="{path: '/video', query:o}">
                    <p>{{o.content}}</p>
                  </router-link>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>

        <div class="tip more-file">
          <span class="left">课程文件</span>
          <router-link to="/courseSource">
            <span class="right">
              更多
              <i class="iconfont el-icon-dzgengduo"></i>
            </span>
          </router-link>
          <hr>
        </div>
        <div class="file">
          <el-table :data="fileList" style="width: 100%">
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
          <div class="btn">
            <el-button @click="filePanel=true">分享我的文件</el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="分享你的文件" :visible.sync="filePanel">
       <el-form label-width="80px">
          <el-form-item label="内容介绍">
              <el-input v-model="file.topic"></el-input>
          </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        style="margin-left:80px"
        drag
        name="file"
        action="#"
        :auto-upload="false"
        :http-request="uploadFile"
        ref="uploadFile"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="filePanel = false">取 消</el-button>
        <el-button type="primary" @click="uploadFile">确 定</el-button>
      </div>
    </el-dialog>
    <foot></foot>
  </div>
</template>

<script>
import headtop from "./head";
import foot from "./footer";
import videos from "./video";
import paginator from "./paginator";

export default {
  data() {
    return {
      filePanel: false,
      videoList: [],
      fileList: [],
      total: 0,
      pagination: {
        page: 1,
        size: 6,
        total: 0
      },
      file:{
        topic:'',
        username:""
    },
    };
  },
  created() {
    this.getVideoMsg();
    this.getFiles();
  },
  components: { headtop, foot, videos, paginator },
  methods: {
          async uploadFile(){
                if(this.file.topic==''){
                    alert('请填写主题');
                    return;
                }
                this.file.username =  this.$store.state.user.user_name;
                console.log(this.file);
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
                    this.filePanel =false;
                    this.$refs.uploadFile.clearFiles();
                    this.file.topic = '';
                }
            },
    async getVideoMsg() {
      let res = await this.$http.api_get_VideoMsg(this.pagination);
      if (res.data.code == 200) {
        this.videoList = res.data.res;
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
        for (let i = 0; i < 10; i++) {
          temp.create_time = res.data.res[res.data.res.length-1-i].create_time;
          temp.filePath = res.data.res[res.data.res.length-1-i].filePath;
          temp.topic = res.data.res[res.data.res.length-1-i].topic;
          temp.username = res.data.res[res.data.res.length-1-i].username;
          temp._id = res.data.res[res.data.res.length-1-i]._id;
          let index = res.data.res[res.data.res.length-1-i].filePath.lastIndexOf(".");
          temp.ext = res.data.res[res.data.res.length-1-i].filePath.substring(index + 1);
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
    async downloadFiles(data) {
      let _id = data._id;
      window.open(`/api/getfile?id=${_id}`, "_self");
    },
    dateFormat(row, column, cellValue, index) {
      //此方法对表格中的时间进行格式化，容易拿到表格列出来循环的数据
      const daterc = row[column.property];
      if (daterc != null) {
        const dateMat = new Date(
          parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10)
        );
        let year = dateMat.getFullYear();
        let month = dateMat.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = dateMat.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        let hh = dateMat.getHours();
        if (hh < 10) {
          hh = "0" + hh;
        }
        let mm = dateMat.getMinutes();
        if (mm < 10) {
          mm = "0" + mm;
        }
        let ss = dateMat.getSeconds();
        if (ss < 10) {
          ss = "0" + ss;
        }
        const timeFormat =
          year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
        return timeFormat;
      }
    }
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  min-width: 1263px;
}
h1 {
  margin: 0;
  padding: 0;
  font-family: "Times New Roman", Times, serif;
}
.show {
  width: 1263px;
  min-height: 800px;
  margin: 20px auto;
}
.show .tip {
  width: 1263px;
  position: relative;
}
.show .tip hr {
  box-shadow: 2px 2px 2px #333;
}
.show .tip .left {
  font-size: 25px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.show .tip .right {
  position: absolute;
  color: #333;
  bottom: 5px;
  right: 0;
}
.show .tip .right:hover {
  color: red;
}
.image {
  width: 100%;
  height: 200px;
  display: block;
}
.image:hover {
  opacity: 0.6;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-col {
  margin: 25px 25px;
  cursor: pointer;
}
.videos {
  background-color: #fff;
}
.videos .desc {
  padding: 14px;
}
.videos .desc h3 {
  font-size: 16px;
  color: #333;
  padding: 5px;
}
.videos .desc h3:hover {
  color: red;
}
.videos .desc p {
  padding: 5px;
  font-size: 14px;
  color: #93999f;
}
.videos .desc p:hover {
  color: red;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.more-file {
  margin: 30px 0 0 0;
}
.file {
  padding: 25px;
  background-color: #fff;
}
.el-icon-dzxiazai:hover {
  color: red;
}
.file .btn {
  margin: 10px 0;
  right: 0;
}
</style>

