<template>
    <div class="Paginator">
        <ul>
            <li @click="jump(pagination_page - 1)" class="iconfont el-icon-dzshangyiye"></li>
            <li v-for="i in pages" :key="i" @click="jump(i)" v-bind:class = "i == pagination_page ? 'active' : ''">{{i}}</li>
            <li @click="jump(pagination_page + 1)" class="iconfont el-icon-dzprev"></li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        pagination_page: Number,
        pagination_size: Number,
        pagination_total: Number
    },
    computed: {
         total_page(){
             return Math.ceil(this.pagination_total/this.pagination_size);
         },
         pages: function() {
             let ret = [];  //页码数组
             for(let i=1; i<=this.total_page; i++){
                 ret.push(i);
             }
             return ret;
         }
    },
    methods: {
        jump(num){
            if(num <=0 ){
                alert("已经是第一页了");
                return;
            }
            if(num > this.total_page){
                alert("已经是最后一页了");
                return;
            } 
            if(num == this.pagination_page){
                return;
            }
            this.$emit('jump', num);
        },
    },
}
</script>
<style scoped>
.Paginator{
    margin-top: 25px;
}
.Paginator ul{
    text-align: center;
}
.Paginator li{
    display: inline-block;
    letter-spacing: 5px;
    cursor: pointer;
}
.Paginator li:hover{
    color: red;
}
.active{
    color: red;
}
</style>
