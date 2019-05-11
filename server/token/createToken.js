const jwt = require('jsonwebtoken');

module.exports = function(user_id) {
    const  token = jwt.sign({
            user_id: user_id
        },
        'sinner77',
        {
            expiresIn: '60s' //过期时间设置为60妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
        });
        return token;
};