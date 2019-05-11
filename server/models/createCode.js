module.exports  = function(){  //生成6位随机数
    var Num="";
        for(var i=0;i<6;i++)
        {
            Num+=Math.floor(Math.random()*10);
        }
    return Num;
}