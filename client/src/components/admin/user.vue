<template>
    <div class="contaner">
        <div class="search">
            <el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
                <el-input v-model="serachContent"  :spans="10" placeholder="姓名"></el-input>
            </el-col>
            <el-col :span="5">
                <el-button style="margin-left:10px" type="primary" @click="search">查询</el-button>
            </el-col>
        </div>
        <div class="table">
            <h3>用户名单</h3>
              <el-table :data="userList" style="width: 100%" >
                    <el-table-column  label="班级"  width="150" prop="classNum"></el-table-column>
                    
                    <el-table-column label="姓名" width="150"  prop="username"></el-table-column>

                    <el-table-column label="邮箱"  width="180" prop="email"></el-table-column>

                    <el-table-column label="用户身份" width="150" prop="identity"></el-table-column>

                    <el-table-column  label="注册日期" width="180" prop="create_time"  :formatter="dateFormat" ></el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" @click="deleteUser(scope.$index, scope.row)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
        
            <paginator 
                class="page"
               :pagination_page = pagination.page
               :pagination_size = pagination.size
               :pagination_total = pagination.total
               @jump="jump">
            </paginator>
       

        <!-- 编辑界面 -->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
                <img class="avatar" :src="this.editForm.avatar" alt="用户头像">

            <el-form  label-width="80px">
                <el-form-item label="班级">
					<el-input v-model="this.editForm.classNum"></el-input>
				</el-form-item>

				<el-form-item label="姓名">
					<el-input  auto-complete="off" v-model="this.editForm.username"></el-input>
				</el-form-item>

                <el-form-item label="邮箱">
					<el-input  auto-complete="off" v-model="this.editForm.email"></el-input>
				</el-form-item>

				 <el-form-item label="用户身份">
					<el-input  auto-complete="off" v-model="this.editForm.identity"></el-input>
				</el-form-item>

                <el-form-item label="注册时间">
					<el-input :disabled="true"  auto-complete="off" v-model="this.editForm.create_time"></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="submit">提交</el-button>
			</div>
		</el-dialog>


    </div>
</template>

<script>
import paginator from '../paginator'
export default {
    data() {
        return{
            serachContent:'',
            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            userList:[],
            //编辑界面数据
				editForm: {
                    _id:'',
                    img:'',
					classNum: '',
					username: '',
					email: '',
					identity: '',
					create_time: '',
            },
             pagination:{
                page: 1,
                size: 20,
                total: 0
            }
        }
    },
    created() {
        this.getAllUser();
    },
    components:{paginator},
    methods: {
       async getAllUser(){
           let res = await this.$http.api_get_allUser(this.pagination);
           if(res.data.code == 200){
               this.userList = res.data.res;
               this.pagination.total = res.data.total;
           }
       },
       async search(){
           console.log(this.serachContent);
           let res = await this.$http.api_search(this.serachContent);
           console.log(res);
           if(res.data.code = 200){
                this.userList = res.data.res;
                this.pagination.total = 1;
           }else{
               alert(res.data.msg);
           }
       },
       jump(num){
            this.pagination.page = Number(num);
            console.log(this.pagination);
            this.getAllUser();
        },
       async deleteUser(index, row){
           if(confirm("确定删除该用户")){
                let id = row._id;
                let res =await this.$http.api_delete_user(id);
                let {code,msg} = res.data;
                if(code == 200){
                    alert(msg);
                    let p = this.userList.indexOf(row);
                    this.userList.splice(p,1);
                }else{
                    alert(msg);
                }
           }
       },
       async submit(){
           console.log(this.editForm);
           let res = await this.$http.api_submit_user(this.editForm);
            console.log(res);
            if(res.data.code = 200){
                alert('提交成功');
            }else{
                alert('提交失败');
            }
       },
       //显示编辑界面
       handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm._id = row._id;
            this.editForm.avatar = row.avatar;
            this.editForm.username = row.username;
            this.editForm.classNum = row.classNum;
            this.editForm.email = row.email;
            this.editForm.identity = row.identity;
            let create_time = this.timeFormat(row.create_time);
            this.editForm.create_time = create_time;
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
          let hh = dateMat.getHours();
           if(hh<10){
                hh = "0"+hh
          }
          let mm = dateMat.getMinutes();
           if(mm<10){
                mm = "0"+mm
          }
          let ss = dateMat.getSeconds();
          if(ss<10){
                ss = "0"+ss
          }
          const timeFormat= year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
          return timeFormat;
          }   
      }
    },
}
</script>

<style scoped>
.contaner{
    margin: 20px;
}
.search{
    float: right;
}
.table h3{
    color: #666;
    font-weight: normal;
}
.page{
    margin: 20px;
    float: right;
}
.avatar{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 20px;
    display: block;
}
</style>
