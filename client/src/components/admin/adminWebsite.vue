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
          <el-col :span="24">
              <div class="pic">
                    <el-upload
                    action="#"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
              </div>
          </el-col>
        </el-row>

        <el-row style="margin-top:30px">
          <h4>书籍名称</h4>
          <el-col :span="5">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="简介" v-for="(item, index) in formData.left" :key="index">
                <el-input type="text" v-model="item.title" maxlength="10" show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="详细内容" v-for="(item, index) in formData.left" :key="index">
                <el-input type="text" v-model="item.detail" show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3">
            <el-form label-width="80px" class="form-center">
              <el-button style="margin:0 0 0 10px;width:100px" type="primary" @click="addDomainLeft">增加</el-button>
            </el-form>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>

       <el-row style="margin-top:30px">
          <h4>作者简介</h4>
          <el-col :span="5">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="简介" v-for="(item, index) in formData.right" :key="index">
                <el-input type="text" v-model="item.title" maxlength="10" show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <el-form label-width="80px" class="form-center">
              <el-form-item label="详细内容" v-for="(item, index) in formData.right" :key="index">
                <el-input type="text" v-model="item.detail" show-word-limit></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3">
            <el-form label-width="80px" class="form-center">
              <el-button style="margin:0 0 0 10px;width:100px" type="primary" @click="addDomainRight">增加</el-button>
            </el-form>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [],
      dialogImageUrl: '',
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
        left: [
          {
            title: "",
            detail: ""
          }
        ],
        right:[
          {
            key:"",
            value:""
          }
        ]
      }
    };
  },
  created() {
    this.getNavData();
  },
  methods: {
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
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
h4{
  padding: 20px 20px 20px 0;
}
</style>
