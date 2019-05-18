<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="left">
          <h3>课程简介导航</h3>
          <el-form label-width="80px" class="form-center">
            <el-form-item label="主题">
              <el-input v-model="intro.nav" type="text" maxlength="10" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="内容简介">
              <el-input v-model="intro.content" :rows="8" type="textarea"></el-input>
            </el-form-item>
            <el-button type="primary" @click="add">添加</el-button>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <el-table :data="navList" height="400" border style="width: 100%">
            <el-table-column prop="nav" label="导航主题" width="360"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="editNav(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteNav(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>

    <el-card class="box-card" style="margin:20px">
      <div class="text item teach">
        <h3>教学大纲</h3>
        <el-row>
          <h4>书籍展示</h4>
          <div class="avatar-box">
            <img class="avatar-show" :src="formData.pic">
            <label class="upload-img-btn" for="upload-img">上传图片</label>
            <input id="upload-img" type="file" @change="upload_img">
          </div>
        </el-row>

        <el-row style="margin-top:30px">
          <h4>书籍名称</h4>
          <el-col :span="7">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="简介" v-for="(item, index) in formData.left" :key="index">
                <el-input type="text" v-model="item.title" maxlength="10" show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="13">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="详细内容" v-for="(item, index) in formData.left" :key="index">
                <el-input type="text" v-model="item.detail" style="width:400px" show-word-limit></el-input>
                <a class="remove-item" v-show="formData.left.length>1" @click.prevent="removeLeft(item)"><i class="el-icon-close"></i></a>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-form label-width="80px" class="form-center">
              <el-button
                style="margin:0 0 0 10px;width:100px"
                type="primary"
                @click="addDomainLeft"
              >增加</el-button>
            </el-form>
          </el-col>
          
        </el-row>

        <el-row style="margin:30px 0">
          <h4>作者简介</h4>
          <el-col :span="7">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="简介" v-for="(item, index) in formData.right" :key="index">
                <el-input type="text" v-model="item.title" maxlength="10" show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="13">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="详细内容" v-for="(item, index) in formData.right" :key="index">
                <el-input type="text" v-model="item.detail" style="width:400px" show-word-limit></el-input>
                <a class="remove-item" v-show="formData.right.length>1" @click.prevent="removeRight(item)"><i class="el-icon-close"></i></a>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="4">
            <el-form label-width="80px" class="form-center">
              <el-button
                style="margin:0 0 0 10px;width:100px"
                type="primary"
                @click="addDomainRight"
              >增加</el-button>
            </el-form>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
      <el-button class="submit-book" type="primary" @click="submitBookMsg">提交</el-button>
    </el-card>

    <el-dialog title="编辑页面" :visible.sync="editPanel">
      <el-form label-width="80px">
        <el-form-item label="主题">
          <el-input type="text" v-model="edit.nav" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="内容简介">
          <el-input :rows="8" v-model="edit.content" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editPanel = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </el-dialog>

    <div class="cropper-img-box" v-if="cropper_box_mark == true">
      <vueCropper
        ref="cropper"
        :img="cropperData.img"
        :autoCrop="cropperData.autoCrop"
        :autoCropWidth="cropperData.autoCropWidth"
        :autoCropHeight="cropperData.autoCropHeight"
        :fixedBox="cropperData.fixedBox"
      ></vueCropper>
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
      navList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      editPanel: false,
      intro: {
        nav: "",
        content: ""
      },
      edit: {
        _id: "",
        nav: "",
        content: ""
      },
      formData: {
        _id:"", //用于标记是否为第一次提交
        pic: "",
        left: [
          {
            title: "",
            detail: ""
          }
        ],
        right: [
          {
            key: "",
            value: ""
          }
        ]
      },
       cropper_box_mark: false,
             cropperData: {
            img: '',
            autoCrop: true,
            autoCropWidth: 200,
            autoCropHeight: 200,
            fixedBox: true
        },
    };
  },
  created() {
    this.getNavData();
    this.getbookMsg();
  },
  components:{VueCropper},
  methods: {
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    finish() {
      this.$refs.cropper.getCropData(data => {
        this.formData.pic = data;
        this.cropper_box_mark = false;
      });
    },
    //课程导航
    async add() {
      let res = await this.$http.api_set_nav(this.intro);
      if (res.data.code == 200) {
        alert("添加成功");
        this.intro.nav = "";
        this.intro.content = "";
        this.getNavData();
      } else {
        alert("添加失败");
      }
    },
    async getNavData() {
      let res = await this.$http.api_get_navData();
      if (res.data.code == 200) {
        this.navList = res.data.res;
      }
    },
    async editNav(index, row) {
      this.editPanel = true;
      this.edit._id = row._id;
      this.edit.nav = row.nav;
      this.edit.content = row.content;
    },
    async deleteNav(index, row) {
      let id = row._id;
      let res = await this.$http.api_delete_nav(id);
      if (res.data.code == 200) {
        alert("删除成功");
        this.getNavData();
      }
    },
    async submit() {
      let res = await this.$http.api_updata_navData(this.edit);
      if (res.data.code == 200) {
        alert("修改成功");
        this.getNavData();
        this.editPanel = false;
      }
    },

    //教学大纲
    addDomainLeft() {
      if (this.formData.left.length + 1 > 6) {
        alert("最多只能创建6个");
        return;
      }
      this.formData.left.push({
        title: "",
        detail: ""
      });
    },
    addDomainRight() {
      if (this.formData.right.length + 1 > 6) {
        alert("最多只能创建6个");
        return;
      }
      this.formData.right.push({
        key: "",
        value: ""
      });
    },
    removeLeft(item) {
          var index = this.formData.left.indexOf(item)
          if (index !== -1) {
            this.formData.left.splice(index, 1)
          }
      },
       removeRight(item) {
          var index = this.formData.right.indexOf(item)
          if (index !== -1) {
            this.formData.right.splice(index, 1)
          }
      },
    upload_img(e) {
      let obj = e.target;
      let file = obj.files[0];
      let temArr = file.name.split(".");
      let file_suffix = temArr[temArr.length - 1];
      if (
        file_suffix != "jpg" &&
        file_suffix != "png" &&
        file_suffix != "jpeg"
      ) {
        alert("上传图片失败，目前只支持jpg,png,jpeg的图片!");
        return;
      }
      let reader = new FileReader();
      let _self = this;
      reader.onload = function(ev) {
        _self.cropperData.img = ev.target.result;
        _self.cropper_box_mark = true;
      };
      reader.readAsDataURL(file);
    },
    async submitBookMsg(){
      console.log(this.formData);
      let res = await this.$http.api_set_bookMsg(this.formData);
      if(res.data.code == 200){
        alert('添加成功');
      }else{
        alert('添加失败');
      }
    },
    async getbookMsg(){
      let res = await this.$http.api_get_bookMsg();
      if(res.data.code == 200){
        this.formData._id = res.data.res[0]._id;
        console.log(this.formData._id);
         this.formData.pic = res.data.res[0].pic;
         this.formData.left = res.data.res[0].left;
         this.formData.right = res.data.res[0].right;
         console.log(this.formData.left);
      }
    }
  }
};
</script>
<style scoped>
.left {
  width: 600px;
  height: 370px;
  background-color: #fff;
  position: relative;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  margin: 20px;
  padding: 15px;
}
.left .el-button {
  width: 120px;
  margin: 0 250px;
}
.left h3 {
  text-align: center;
  font-weight: normal;
  padding: 15px;
}
.right {
  min-width: 618px;
  background-color: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  height: auto;
  margin: 20px;
}
.teach h3 {
  text-align: center;
  padding: 15px;
}
h4 {
  padding: 20px 20px 20px 0;
}
.avatar-box {
  flex: 1;
}
.avatar-show {
  margin: 0 auto;
  display: block;
  width: 300px;
  height: 300px;
  border: 1px solid #eee;
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
#upload-img {
  opacity: 0;
  display: none;
}
 .cropper-img-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
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
  .remove-item{
    color: red;
  }
  .el-card{
    position: relative;
  }
  .submit-book{
    position: absolute;
    bottom: 15px;
    width: 100px;
    left: 50%;
  }
</style>
