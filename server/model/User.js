const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// 2의 10제곱으로 텍스트 salt를 만들어주는 작업.
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        // 관리자 권한 줄 수 있게 하는 컬럼.
        type: Number,
        default: 0
    },
    Image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

// 유저 데이터를 저장하기전에 불러오는 로작
userSchema.pre('save',function( next ) {
    // 현재 만들어진 객체를 가리킴
    const user = this;
    
    // 유저의 비밀번호가 수정 되었을때만 실행, 계정을 처음 만들어도 비번이 변경되기 때문에도 포함된다.
    if(user.isModified('password')){
        // salt 라고 비밀번호가 해쉬되기전에 임의의 문자열을 생성하는 것.
        bcrypt.genSalt(saltRounds,function(err,salt){
            // 생성이 안되었다면 에러코드와 함께 다음 로직으로 리턴
            if(err){
                return next(err);
            }
            // 성공하면 기존 패스워드랑 salt를 이용해서 해쉬를 만들고 기존 패스워드를 해쉬로 바꿈.
            bcrypt.hash(user.password,salt,function(err,hash){
              if(err){
                return next(err)
              }  
              // 만든 해쉬로 기존 비밀번호 교체
              user.password = hash;
              next();
            })
        })
    }else{
        // next 구문이 없으면 이 함수는 끝나지 않기 때문에 next가 꼭 필요하다.
        next();
    }
})
// 비밀번호 맞는지 확인
userSchema.methods.comparePassword = function(plainPassword,cb){
    const user = this;
    bcrypt.compare(plainPassword,user.password,function(err,isMatch){
        if(err){
            return cb(err);
        }
        cb(null,isMatch);
    });
};
// 토큰생성
userSchema.methods.generateToken = function(cb){
    const user = this;

    const token = jwt.sign(user._id.toHexString(),"secreatToken");

    user.token = token;
    // 서버에 저장하는 메서드
    user.save(function(err,user){
        if(err){
            return cb(err);
        }
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token, cb){
    const user = this;
// 토큰을 가져와서 검증한다.
    jwt.verify(token,"secreatToken",function(err,decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
 
        user.findOne({"_id": decoded, "token":token},function(err,user){
            if(err){
                return cb(err);
            }
            cb(null,user);
        })       

       /* 내가 보기 편하게 리팩토링 한 코드
        user.findOne({"_id": decoded, "token":token})
        .then((findUser) => cb(null,user))
        .catch((err) => {return cb(err)})
        */
    })
}
const User = mongoose.model('User',userSchema); 
module.exports = {User}; 