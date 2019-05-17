<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div class="left">
                        <h3>课程简介导航</h3>
                        <el-form label-width="80px" class="form-center">
                            <el-form-item label="主题">
                                <el-input v-model="intro.nav" type="text"  maxlength="10" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="内容简介">
                                <el-input v-model="intro.content"  :rows="8"   type="textarea"></el-input>
                            </el-form-item>
                             <el-button type="primary" @click="add">添加</el-button>
                        </el-form> 
                </div>
            </el-col>
            <el-col :span="12">
                <div class="right">
                       <el-table  :data="navList" height="400" border  style="width: 100%">
                            <el-table-column prop="nav" label="导航主题" width="360"></el-table-column>
                             <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini"  type="primary" @click="editNav(scope.$index, scope.row)">编辑</el-button>
                                    <el-button size="mini"  type="danger" @click="deleteNav(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                </div>
            </el-col>
        </el-row>

         <el-row>
            <el-col :span="12">
                <div class="left">
                        <h3>教学大纲</h3>

                        <el-col :span="8">
                            <el-form label-width="80px" class="form-center" >
                                <el-form-item label="简介"  v-for="(domain, index) in formData.domains" :key="index">
                                    <el-input  type="text" v-model="domain.title"  maxlength="10" show-word-limit></el-input>
                                </el-form-item>
                            </el-form> 
                        </el-col>

                        <el-col :span="11">
                             <el-form label-width="80px" class="form-center">
                                <el-form-item label="简介"  v-for="(domain, index) in formData.domains" :key="index">
                                    <el-input  type="text"  v-model="domain.detail"  maxlength="10" show-word-limit></el-input>
                                </el-form-item>
                            </el-form> 
                        </el-col>

                        <el-col :span="5">
                             <el-form label-width="80px" class="form-center">
                               <el-button style="margin:0 0 0 10px;width:100px" type="primary" @click="addDomain">增加</el-button>
                            </el-form> 
                        </el-col>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="right">
                    
                </div>
            </el-col>
        </el-row>
        

           
         <el-dialog title="编辑页面" :visible.sync="editPanel">
                <el-form  label-width="80px">
                 <el-form-item label="主题">
                    <el-input  type="text" v-model="edit.nav"  maxlength="10" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="内容简介">
                    <el-input  :rows="8"  v-model="edit.content" type="textarea"></el-input>
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
            navList:[],
            editPanel:false,
            intro:{
                nav:"",
                content:""
            },
            edit:{
                _id:"",
                nav:"",
                content:""
            },
            formData:{
             domains: [{
                title: '',
                detail:''
              }],
            }

        }
    },
    created() {
        this.getNavData();
    },
    methods: {
       async add(){
           let res = await this.$http.api_set_nav(this.intro);
           if(res.data.code == 200){
               alert('添加成功');
               this.intro.nav = '';
               this.intro.content = '';
               this.getNavData();
           }else{
               alert('添加失败');
           }
           
        },
        async getNavData(){
            let res = await this.$http.api_get_navData();
            if(res.data.code == 200){
                 this.navList = res.data.res;
            }
           
        },
       async editNav(index, row){
           this.editPanel = true;
           this.edit._id = row._id;
           this.edit.nav = row.nav;
           this.edit.content = row.content;
       },
       async deleteNav(index,row){
           let id = row._id;
           let res = await this.$http.api_delete_nav(id);
           if(res.data.code == 200){
               alert('删除成功');
               this.getNavData();
           }
       },
       async submit(){
           let res = await this.$http.api_updata_navData(this.edit);
           if(res.data.code == 200){
               alert("修改成功");
               this.getNavData();
               this.editPanel = false;
           }
       },
        addDomain() {
          this.formData.domains.push({
            title: '',
            detail:''
          });
        },
    },
}
</script>
<style scoped>
.left{
        width: 600px;
        height: 370px;
        background-color: #fff;
        position: relative;
        box-shadow: 4px 4px 40px rgba(0,0,0,.2);
        margin:20px;
        padding: 15px;
    }
    .left .el-button{
        width: 120px;
        margin: 0 250px;
    }
    .left h3{
        text-align: center;
        font-weight: normal;
        padding: 15px;
    }
    .right{
         min-width: 618px;
         background-color: #fff;
         box-shadow: 4px 4px 40px rgba(0,0,0,.2);
         height: auto;
         margin: 20px;
     }
     .book{
         margin: 20px;
         padding: 20px;
         background-color: #fff;
         display: block;
     }
     .book .title{
         width: 150px;
     }
     .book .detail{
         width: 400px;
     }
      .book h3{
          text-align: center;
          font-weight: normal;
          font-size: 25px;
          padding: 15px;
      }
</style>
