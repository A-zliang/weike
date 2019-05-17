<template>
    <div>
        <div class="top">
            <div class="left">
                <h3>ADMIN</h3>
            </div>
            <div class="right">
                <el-dropdown>
                    <i class="el-icon-setting"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>管理员</span>
            </div>
        </div>
        <el-container style="min-height: 900px; border: 1px solid #eee" class="content">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router>
                    <el-menu-item index="/main/adminWebsite"><i class="el-icon-message"></i>网站管理</el-menu-item>
                    <el-menu-item index="/main/user"><i class="el-icon-message"></i>用户管理</el-menu-item>
                    <el-menu-item index="/main/classAdmin"><i class="el-icon-message"></i>班级管理</el-menu-item>
                    <el-menu-item index="/main/fileAdmin"><i class="el-icon-message"></i>资源管理</el-menu-item>
                    <el-menu-item><i class="el-icon-message"></i>退出系统</el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
       
                <el-main style="padding:0; background-color: #f2f2f2;">
                <router-view></router-view>
                </el-main>
            </el-container>
    </el-container>
    </div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
.top{
    width: 100%;
    height: 70px;
    background-color: #20a0ff;
}
.top .left{
    width: 200px;
    height: 70px;
    border-right: 1px solid rgb(192, 192, 192);
    float: left;
}
.top .left h3{
    font-size: 25px;
    color: #fff;
    line-height: 70px;
    text-align: center;
}
.top .right{
    width: 100px;
    height: 70px;
    float: right;
    line-height: 70px;
}
</style>
