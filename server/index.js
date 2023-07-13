const express = require('express');
const { User } = require('./model/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

const app = express();
const port = 5000;
// 필요한 데이터 파싱 해주는 문법
app.use(bodyParser.urlencoded({extended: true}));
// 필요한 데이터 json 형태로 변환 해주는 것
app.use(bodyParser.json());
// cookieParser를 사용할 수 있게 하는 구문
app.use(cookieParser());


// bcrypt 비밀번호 암호화 플러그인
// nodemon 실시간 수정 플러그인

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('mongoDB connect.. DB 연결 완료')).catch((err) => console.log("error " + err));

app.get('/',(req,res) => res.send('hello word! Lee Cheol Ho'));

app.post('/api/user/register',(req,res) =>{
    const user = new User(req.body);
    user.save()
    .then((userInfo) => {
        return res.status(200).json({ success: true, data: userInfo })
    })
    .catch((err) => { 
        return res.json({success : false , err})
    })
/*
*** 구형 코드 ***
user.save((err,userInfo) =>{
    if(err){
        return res.json({ success: false, err})
    }
    return res.status(200).json({ success: true })
})
*/
})
app.get('/api/hello',function(req,res){
    res.send("안녕하세요~ 이제 연결 됐네여");
})

app.post('/api/user/login',function(req,res){
    // 요청된 이메일이 데이터 베이스에 있는지 확인.
    User.findOne({email: req.body.email},function(err,user){
        if(!user){
            return res.json({
                loginSuccess: false,
                messag: "찾는 이메일이 없습니다."
            })
        }
        // 데이터 베이스에 비번이 맞는지 확인.
        user.comparePassword(req.body.password,function(err,isMatch){
            if(!isMatch){
                return res.json({
                    loginSuccess: false,
                    messag: "비밀번호가 틀렸습니다."
                })
            }
            user.generateToken(function(err, user){
                if(err){
                    return res.status(400).send(err);
                }
                // 토큰을 저장한다. 쿠키 or 로컬스토리지
                res.cookie('x_auth',user.token)
                .status(200)
                .json({loginSuccess: true, userId: user._id});
            })
        })
    })
})


// role이 0이면 일반유저이다. 콜백함수가 실행되기 전에 실행되는 것이 미들웨어다
app.post('/api/users/auth',auth,function(req,res){
    // 여기까지 왔으면 authentication 이 true라는 말    
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

app.get('/api/users/logout',auth,function(req,res){

    User.findOneAndUpdate(
        {_id: req.user._id},
        {token: ""},
        function(err,user){
            if(err){
                res.json({success: false, err})
            }

            return res.status(200).send({
                success: true,
                data: user
            })
        })
})


app.listen(port,() => console.log(`Example app listening on port ${port}`));