const express = require('express');
const { User } = require('./model/User');
const bodyParser = require('body-parser');
const config = require('./config/key');

const app = express();
const port = 3000;
// 필요한 데이터 파싱 해주는 문법
app.use(bodyParser.urlencoded({extended: true}));
// 필요한 데이터 json 형태로 변환 해주는 것
app.use(bodyParser.json());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('mongoDB connect..')).catch((err) => console.log("error " + err));

app.get('/',(req,res) => res.send('hello word! dasdsd'));

app.post('/register',(req,res) =>{

    const user = new User(req.body);
    user.save((err,userInfo) =>{
        if(err){
            return res.json({ success: false, err})
        }
        return res.status(200).json({ success: true })
    })
})

app.listen(port,() => console.log(`Example app listening on port ${port}`));