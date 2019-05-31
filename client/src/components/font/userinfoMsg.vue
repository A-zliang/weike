<template>
  <div class="msg">
    <div class="center">
      <el-table class="tab" :data="watchList" style="width:100%">
        <el-table-column label="主题" width="180">
          <template slot-scope="scope">
            <i class="iconfont el-icon-dzshipin"></i>
            <span>{{scope.row.topic}}</span>
          </template>
        </el-table-column>
        <el-table-column label="观看时长" width="280">
            <template slot-scope="scope">
               <span>{{scope.row.time}}s</span>
            </template>
        </el-table-column>
         <el-table-column label="观看" width="100">
              <template slot-scope="scope">
                  <router-link :to="{path: '/video', query:scope.row}">
                        <i class="iconfont el-icon-dzguankan"></i>
                  </router-link>
             </template>    
        </el-table-column>
        <el-table-column label="删除">
            <template slot-scope="scope">
                <i @click="deleteRecord(scope.row)" class="iconfont el-icon-dzdelete"></i>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      watchList: []
    };
  },
  created() {
    this.getWatchMsg();
  },
  methods: {
    async getWatchMsg() {
        this.watchList = [];
      let user = this.$store.state.user.user_name;
      let res = await this.$http.api_get_watchMsg(user);
      if (res.data.code == 200) {
        //this.watchList = res.data.res;
        let record = {
            _id:'',
            filePath:'',
            topic:'',
            content:'',
            time:''
        }
        for(let i=0; i<res.data.res.length; i++){
            record._id = res.data.res[i].videoId;
            record.filePath = res.data.res[i].filePath;
            record.topic = res.data.res[i].topic;
            record.content = res.data.res[i].content;
            record.time = res.data.res[i].time;
            this.watchList.push(record);
            record = {
                _id:'',
                filePath:'',
                topic:'',
                content:'',
                time:''
            }
        }
      }
    },
    async deleteRecord(row){
        let username = this.$store.state.user.user_name;
        let msg = {
            username:username,
            topic:row.topic,
            videoId:row._id
        }
        let res = await this.$http.api_set_flag(msg);
        if(res.data.code == 200){
            this.getWatchMsg();
        }
    }
  }
};
</script>
<style scoped>
.msg {
  width: 100%;
  min-width: 1263px;
}
.center {
  width: 1000px;
  margin: 50px auto;
}
</style>
