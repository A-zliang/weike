const path = require('path');
const fs = require('fs');

module.exports  = async (topic)=>{  //生成6位随机数
    let filePath;
        for(let i=1; i<=34; i++){
           filePath = path.join(__dirname,`../public/videoPic/${topic}_${i}.jpg`);
           console.log(filePath);
           fs.unlink(filePath,(err)=>{
            if(err){
                console.log(err);
                return false;
             }
              console.log('文件删除成功');
         });
    }
}