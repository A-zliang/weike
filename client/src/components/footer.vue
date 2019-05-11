<template>
    <div class="footer">
        <div class="main">
            <div class="block left">
                <h3>友情链接</h3>
                <hr>
                <ul>
                    <li><a href="http://www.gxljxt.cn/" target="_blank">广西漓江学堂</a></li>
                    <li><a href="https://www.imooc.com/"  target="_blank">慕课网</a></li>
                    <li><a href="https://www.icourse163.org/"  target="_blank">中国大学慕课</a></li>
                </ul>
            </div>
            <div class="block mid">
                 <h3>帮助中心</h3>
                <hr>
                <ul>
                    <li>常见问题</li>
                    <li>学生帮助</li>
                    <li>意见反馈</li>
                </ul>
            </div>
            <div class="block right">
                 <h3>联系我们</h3>
                <hr>
                <ul>
                    <li>邮箱：1365582147@qq.com</li>
                    <li>电话：136xxxxxxxx</li>
                    <li>微博：xxxx</li>
                </ul>
            </div>
        </div>
        <div class="bottom">
            Copyright ©桂林电子科技大学 学生毕业设计作品 | 桂ICP 备XXXXXXXXXX 号
        </div>
    </div>
</template>

<style scoped>
h3,ul,li,p{
    margin: 0;
    padding: 0;
}
hr{
   width: 90%;
   height: 1px;
   border: none;
   border-top: 1px dashed #999;
   margin: 10px 0;
}
li{
    list-style: none;
    font-size: 13px;
    color: #666;
}

li a{
    text-decoration: none; 
    color: #666;
}
li:hover{
    color: #999;
} 
li a:hover{
    color: #999;
} 
.footer{
    width: 100%;
    min-width: 1263px;
    background-color: #e1e5eb;
    border-top: 2px solid #ccc;
}
.footer .main{
    width: 1263px;
    margin: 0 auto;
    height: 180px;
    margin: 0 auto;
    text-align: center;
}
.footer .block {
	width: 410px;
	height: 180px;
	color: #ccc;
	display: inline-block;
    text-align: left;
}
.footer h3 {
	font-weight: normal;
	padding: 20px 0 0 0;
	font-size: 24px;
    color: #666;
}
.footer ul{
    color: #666;
	font-size: 18px;
	line-height: 2;
}
.footer .bottom {
    border-top: 1px solid #fff;
    text-align: center;
    font-size: 15px;
    color: #666;
    padding: 10px;
}
</style>
