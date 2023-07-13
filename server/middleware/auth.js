const { User } = require("../model/User");

let auth = function(req,res,next){
    // 인증처리 하는곳 

// 클라이언트 쿠키에서 토큰을 가져오기
    let token = req.cookies.x_auth; 

// 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token,function(err,user){
        if(err){
            throw err;
        }
        if(!user){
            return res.json({ isAuth: false, error: true});
        }
        req.token = token;
        req.user = user;
        // 미들웨어 이기 때문에 콜백 함수로 넘기려먼 무조건 해줘야 한다.
        next();
    })

// 유저가 있으면 인증 ㅇㅇ

// 유저가 없으면 x

}

module.exports = {auth};