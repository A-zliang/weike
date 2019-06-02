<template>
    <div class="box" >
        <el-tabs  v-model="activeName">
            <el-tab-pane label="创建/加入班级" name="third">
                    <div class="create-class"  v-show="user_identity=='教师'&&user_class=='' ">
                        <h2>创建班级</h2>
                        <label><span>班级</span><el-input class="inputInfo" v-model="classInfo.classNum" type="text"></el-input></label>            
                        <label><span>加入密码</span><el-input class="inputInfo" v-model="classInfo.classpassword" type="password"></el-input></label>
                        <el-button type="primary" @click="createClass">创建</el-button>            
                    </div>
                    <el-card class="box-card"  v-show="user_identity=='教师'&&user_class!='' ">
                        <div slot="header" class="clearfix">
                            <span>{{backClass.classNum}}班</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="deleteClass">删除班级</el-button>
                        </div>
                        <div class="text item">
                           <span>{{backClass.teacher}}</span>老师,您已经创建 <span>{{backClass.classNum}}</span>班，创建于 <span>{{dataChange}}</span>，一共{{backClass.student.length}}名学生
                        </div>
                    </el-card>
                    <div class="create-class"  v-show="user_identity=='学生'&&user_class==''">
                        <h2>加入班级</h2>
                        <label><span>班级</span><el-input class="inputInfo" v-model="classInfo.classNum" type="text"></el-input></label>            
                        <label><span>加入密码</span><el-input class="inputInfo" v-model="classInfo.classpassword" type="password"></el-input></label>
                        <el-button type="primary" @click="join">加入</el-button>            
                    </div>
                     <el-card class="box-card"  v-show="user_identity=='学生'&&user_class!='' ">
                        <div slot="header" class="clearfix">
                            <span>{{backClass.classNum}}班</span>
                        </div>
                        <div class="text item">
                            您已经加入 <span>{{backClass.classNum}}</span>班，创建于 <span>{{dataChange}}</span> ，一共{{backClass.student.length}}名学生，创建者<span>{{backClass.teacher}}</span>老师
                        </div>
                    </el-card>
            </el-tab-pane>
            <el-tab-pane label="学生名单" name="first">
                    <div class="top"  v-show="user_class!='' ">
                    <h2>班级学生</h2>
                    <el-table :data="studentList">
                        <el-table-column label="班级" width="140" prop="classNum"></el-table-column>
                        <el-table-column label="姓名" width="120" prop="username"></el-table-column>
                        <el-table-column label="邮箱" prop="email"></el-table-column>
                        <el-table-column v-if="user_identity=='教师'" label="视频观看时长">
                            <template slot-scope="scope">
                               <span>{{scope.row.stuTime}} min</span>
                            </template>
                        </el-table-column>

                        <el-table-column  width="120">
                            <template slot-scope="scope">
                                 <el-button type="primary" v-show="user_identity=='教师'" @click="deleteStu(scope.$index, scope.row)">删除</el-button>                               
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="作业发布" name="second">
                    <div class="bottom" v-show="user_class!=''&&user_identity=='教师'">
                        <h2>作业发布</h2>
                        <div class="left">
                                <label><span>主题</span><el-input class="topic" type="textarea" autosize placeholder="请输入内容" v-model="topic"></el-input></label>  
                                <div style="margin: 20px 0;"></div>
                                <label><span>内容</span><el-input class="content" type="textarea"  :rows="6"  placeholder="请输入内容" v-model="content">
                                </el-input>
                            </label>
                        </div>
                        <div class="right">
                            <el-upload class="upload-demo" drag  name="file" action="#" :auto-upload="false"  :http-request="upload" ref="upload" multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                            
                        </div>
                        <el-button type="primary" @click="upload">提交</el-button>
                    </div>
                    <p v-show="homeworkList.length == 0 " class="show-null">暂时还没有发布作业</p>


                    <el-card class="box-card" v-for="(item,index) in homeworkList" :key="index">
                        <div slot="header" class="clearfix">
                            <span>{{homeworkList[homeworkList.length-index-1].topic}}</span>
                         <el-button type="text"  style="float: right; padding: 3px 0" v-show="user_identity=='学生'" @click=sendValue(homeworkList[homeworkList.length-index-1]._id)>提交作业</el-button>
                         <el-button type="text"  style="float: right; padding: 3px 0" v-show="user_identity=='教师'" @click=deleteHomework(homeworkList[homeworkList.length-index-1]._id)>删除作业</el-button>
                        </div>
                        <div class="text item">
                            <p>{{homeworkList[homeworkList.length-index-1].content}}</p>
                            <span class="file" @click="getFile(homeworkList[homeworkList.length-index-1]._id)"><i class="iconfont el-icon-dzfujian"></i>附件</span>
                            <div   v-show="user_identity=='教师'" style="margin:20px 0 0 0">
                                <el-collapse>
                                    <el-collapse-item title="提交学生名单" name="1">
                                        <ol v-for="item in homeworkList[homeworkList.length-index-1].submit">
                                            <li>{{item}}</li>
                                        </ol>
                                       <span>共{{homeworkList[homeworkList.length-index-1].submit.length}}人</span>
                                    </el-collapse-item>
                                    <el-collapse-item title="未提交学生名单" name="2">
                                        <ol v-for="item in not_submit">
                                            <li>{{item[not_submit.length-index-1]}}</li>
                                        </ol>
                                    </el-collapse-item>
                                </el-collapse>
                                <span class="file" @click="getStudentFile(homeworkList[homeworkList.length-index-1]._id)"><i class="iconfont el-icon-dzzip"></i>导出文件</span>
                            </div>
                        </div>
                        <div class="tip" v-show="user_identity=='学生'&& homeworkList[homeworkList.length-index-1].submit.find(item=>{ return item==user_name})">
                           <span>已提交</span>
                        </div>
                    </el-card>

                    <el-dialog title="提交作业" :visible.sync="dialogFormVisible">
                      <el-upload  class="upload-demo" drag  name="file" action="#" :auto-upload="false"  :http-request="sendHomework" ref="sendHomework" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                      </el-upload>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click=sendHomework>确 定</el-button>
                    </div>
                    </el-dialog>   
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
  export default {
    data() { 
      return {
        text_id:'',
        dialogFormVisible: false,
        activeName: 'third',
        topic: '',
        content: '',
        studentList: [],
        homeworkList: [],
        not_submit:[],
        sendMsg:{
            topic:'',
            content: ''
        },
        classInfo:{
            classNum: '',
            classpassword: '',
            student:[],
            teacher: '',
            homework:[]
        },
        backClass:{
            classNum: '',
            teacher: '',
            student:[],
            create_time: ''
        }
      };
    },
    created() {
        this.getStudentData();
        this.getClassData();
        this.getUserData();
        this.getHomeWorkList();
        this.getstuList();
    },
    computed: {
        user_identity(){
             return this.$store.state.user.identity;
        },
       user_class(){
             return this.$store.state.user.classNum;
       },
       user_name(){
          return this.$store.state.user.user_name;
       },
       dataChange(){
           let unixTimestamp = new Date(Number(this.backClass.create_time));
           let  commonTime = unixTimestamp.toLocaleString();
           return commonTime;
       }
    },
    methods: {
        async getStudentData(){
            let classNumber = {
                classNum: this.$store.state.user.classNum
            }
            let res = await this.$http.api_get_student(classNumber);
            let {code,data={}} = res.data;
            if(code == 200){
                //this.studentList = data.res[0].student;
                //console.log(this.studentList);
                let stuInfo = {
                    classNum:'',
                    username:'',
                    email:'',
                    stuTime:'',
                }
                for(let i=0; i<data.res[0].student.length; i++){
                    stuInfo.classNum = data.res[0].student[i].classNum;
                    stuInfo.username = data.res[0].student[i].username;
                    stuInfo.email = data.res[0].student[i].email;
                    let res2 = await this.$http.api_get_stuTime(data.res[0].student[i].username);
                    stuInfo.stuTime = (res2.data.stuTime/60).toFixed(2);
                    this.studentList.push(stuInfo);
                        stuInfo = {
                        classNum:'',
                        username:'',
                        email:'',
                        stuTime:'',
                    }
                }
                console.log(this.studentList);
            }
        },
        async getClassData(){
            let class_num = this.$store.state.user.classNum
            let res = await this.$http.api_get_class(class_num);
            let {code ,data={}} = res.data
            if(code == 200){
                this.backClass.classNum = data.classNum;
                this.backClass.teacher = data.teacher;
                this.backClass.student = data.student;
                this.backClass.create_time = data.create_time;
            }
        },
       async createClass(){
           this.classInfo.teacher = this.$store.state.user.user_name;
           let res = await this.$http.api_add_class(this.classInfo);
        
           if(res.data.code == 200){
               this.$store.commit('updateClassNum',this.classInfo.classNum);
               this.getClassData();
           }
          
        },
        async join(){
           let joinMsg = {
               username: this.$store.state.user.user_name,
               classNum: this.classInfo.classNum,
               classpassword: this.classInfo.classpassword
           }
           let res =await this.$http.api_join_class(joinMsg);
           
           if(res.data.code == 200){
               alert(res.data.msg);
               this.$store.commit('updateClassNum',this.classInfo.classNum);
               this.getStudentData();
               this.getClassData();
              this.getHomeWorkList();
           }else{
               alert(res.data.msg);
           }
           
        },
       async upload(){
            if(this.topic == ''){
                alert('请输入主题');
                return;
            }else if(this.content ==''){
                alert('请输入内容');
                return;
            }
            const formData = new FormData();
            const file = this.$refs.upload.uploadFiles;
            
            const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
            if (!file) {
                alert('请选择文件');
                return;
            }
            
            for(let i=0; i<file.length; i++){
                formData.append('file', file[i].raw);
            }
            formData.append('length', file.length);
            formData.append('topic', this.topic);
            formData.append('content', this.content);
            formData.append('classNum', this.$store.state.user.classNum);
            formData.append('username', this.$store.state.user.user_name);
            formData.append('user_identity', this.$store.state.user.identity);
           
         let res = await  this.$http.api_upload(formData, headerConfig);
         if(res.data.code == 200){
             alert(res.data.msg);
             this.topic ='';
             this.content ='';
             this.$refs.upload.clearFiles();
             this.getHomeWorkList();
         }
        },
       async deleteClass(){
           let num ='';
           if(confirm("确定删除该班级")){
               let res = await this.$http.api_delete_class(this.backClass.classNum)
               if(res.data.code == 200){
                   alert(res.data.msg);
                   this.$store.commit('updateClassNum',num);                   
               }
           }
        },
       async  getUserData(){
                let user = this.$store.state.user.user_name;
                let res = await this.$http.api_get_userData(user);
                let {code, msg, data = {}} = res.data;
                if(code == 200) {
                        this.$store.commit('save', {
                            token: data.token,
                            user_name: data.username,
                            email: data.useremail,
                            identity: data.useridentity,
                            classNum:data.classNum,
                            avatar:data.avatar
                        })
                    }
        },
        async getHomeWorkList(){
            let classNum = this.$store.state.user.classNum;
            let res = await this.$http.api_get_homework(classNum);
            if(res.data.code == 200){
                this.homeworkList = res.data.res;
            }
            
        },
        async getFile(data){
            window.open(`/api/download/file?id=${data}`,'_self');
        },
        sendValue(data){
          this.dialogFormVisible = true;
          this.text_id = data;
       },
       async sendHomework(){
            const formData = new FormData();
            const file = this.$refs.sendHomework.uploadFiles;
            const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
            this.dialogFormVisible = false;
            if (!file) {
                alert('请选择文件');
                return;
            }
              for(let i=0; i<file.length; i++){
                formData.append('file', file[i].raw);
            }
            formData.append('length', file.length);
            formData.append('id', this.text_id);
            formData.append('classNum', this.$store.state.user.classNum);
            formData.append('username', this.$store.state.user.user_name);
            formData.append('user_identity', this.$store.state.user.identity);
            let res =await this.$http.api_send_stuHomework(formData,headerConfig);
            alert(res.data.msg);
            this.$refs.sendHomework.clearFiles();
            this.getHomeWorkList();
       },
       async getstuList(){
           let temp =[];
           let classNum = this.$store.state.user.classNum;
           let res = await this.$http.api_getstuList(classNum);
           if(res.data.code ==200){
               for(let i=0; i<this.homeworkList.length; i++){
                temp = this.getDifferentArray(this.homeworkList[i].submit,res.data.stuArray);
                this.not_submit.push(temp);
               }
           }
       },
       getDifferentArray(arr1,arr2){          //两个数组中找出不同的值
           let arr3 = [];
           for(let i=0; i<arr2.length; i++){
               let a2 = arr2[i];
               let flag = false;
               for(let j=0; j<arr1.length; j++){
                   let a1 = arr1[j];
                   if(a1==a2){
                       flag = true;
                       break;
                   }
               }
                if(!flag){
                    arr3.push(a2);
                }

           }
           return arr3;
       },
       async getStudentFile(id){
        console.log(id);
        await window.open(`/api/get/stuFile?id=${id}`,'_self');
       },
       async deleteStu(index,row){
           if(confirm(`确定删除${row.username}同学吗？`)){
                let res = await this.$http.api_delete_classStu(row);
                if(res.data.code==200){
                    alert('删除成功');
                }else{
                    alert('删除失败');
                }
           }
       },
       async deleteHomework(data){
           console.log(data);
           if(confirm('确定删除该次作业')){
                let res = await this.$http.api_delete_homework(data);
                console.log(res);
                if(res.data.code==200){
                    alert('删除成功');
                    this.getHomeWorkList();
                }else{
                    alert('删除失败');
                }
           }
       }
    },
  };
</script>

<style scoped>
.el-tabs{
    width: 1060px;
    margin: 15px auto;
}
hr{
    margin: 30px 0;
}
.box{
    width: 100%;  
    min-width: 1050px;
}
.bottom{
    width: 1050px;
    height: 350px;
    border-radius: 16px;
    margin: 50px auto;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 12px 12px 5px #ddd;
}
 h2{
    text-align: center;
    font-weight: normal;
    font-family: Arial, Helvetica, sans-serif;
}
.bottom h2{
    padding: 20px;
}
.bottom .left{
    width: 680px;
    height: 200px;
    float: left;
}
.bottom .right{
    width: 350px;
    height: 200px;
    float: left;
    position: relative;
}
.bottom .left span{
    padding: 0 10px;
    font-size: 16px;
    color: #666;
}
.bottom .left .topic{
    width: 600px;
     vertical-align: top;
}
.bottom .left label .content{
    width: 600px;
    vertical-align: top;
}
.bottom  .el-button{
    width: 120px;
    display: block;
    margin: 0 auto;
}
.create-class{
    margin: 30px auto;
    width: 1050px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 12px 12px 5px #ddd;
}
.create-class h2{
    padding: 0 0 20px 0;
}
.create-class label{
    margin: 0 auto;
}
.create-class .el-button{
    width: 100px;
    display: block;
    margin: 20px auto;
}
.create-class span{
    display: inline-block;
    width: 100px;
    line-height: 30px;
    text-align: center;
    height: 30px;
    color: #777;
    font-size: 20px;
}
.create-class .inputInfo{
    width: 400px;
}
.top{
    width: 1050px;
    margin: 0 auto;
}
.el-card{
    width: 1050px;
    margin: 15px auto;
    position: relative;
}
.el-card .item{
    line-height: 25px;
}
.el-card .tip{
    border-style: solid;
    border-width: 0px 0px 80px 80px;
    border-color: transparent transparent #FF9933 transparent;
    width: 0px;
    height: 0px;
    position: absolute;
    right: 0;
    bottom: 0; 
}
.el-card .tip span{
    display: block;
    transform:rotate(40deg);
    position: absolute;
    bottom: -80px;
    right: 20px;
    color: #666;
}
.file{
    color: blue;
    display: block;
    font-size: 15px;
    cursor: pointer;
    margin: 5px 0;
}
.file:hover{
    color: red;
}
.el-dialog label{
    margin: 20px auto;
    display: block;
}
.el-dialog label span{
    width: 30px;
    padding: 5px;
}
.el-dialog .el-input{
    width:700px;
}
.el-tab-pane .show-null{
    text-align: center;
}

</style>
