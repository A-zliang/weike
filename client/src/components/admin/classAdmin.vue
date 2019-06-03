<template>
    <div>
              <el-table :data="classList"  style="width: 100%" >
                    <el-table-column  label="班级" prop="classNum"  width="150" ></el-table-column>
                    
                    <el-table-column label="教师" prop="teacher" width="150"  ></el-table-column>

                    <el-table-column label="班级人数" prop="student.length"  width="180" ></el-table-column>

                    <el-table-column  label="创建时间"  :formatter="dateFormat"  prop="create_time" width="180"   ></el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="deleteClass(scope.$index, scope.row)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            classList:[],
            
        }
    },
    created() {
        this.getClassData();
    },
    methods: {
        async getClassData(){   
            let res = await this.$http.api_get_class({});
            if(res.data.code == 200){
             this.classList =  res.data.res;
            }
        },
       async deleteClass(index,row){
           let classNum = row.classNum;
           if(confirm("确定删除该班级")){
               let res = await this.$http.api_delete_class(classNum);
               if(res.data.code == 200){
                   alert(res.data.msg);             
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