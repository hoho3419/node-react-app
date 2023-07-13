import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_action/user_action';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        const user = {
            email: email.current.value,
            password: password.current.value
        }
        dispatch(loginUser(user))
        .then((res) => {
            if(res.payload.loginSuccess){
                navigate('/');
            }else{
                alert('Error');
            }
        })
/*
        Axios.post('/api/user/login',user)
        .then((res) =>{
            let resData = res.data;
            if(!resData.loginSuccess){
                return alert("아이디와 비밀번호가 맞지 않습니다.\n hint : " + resData.messag );
            }
            alert("로그인이 완료되었습니다.");
        })
        .catch((err) => {
            alert("서버의 에러 " + err);
        })
*/
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            height: '100vh'
            }}>

            <form onSubmit={onSubmitHandler}
            style={{ display: 'flex', flexDirection: 'column'}}>
            <label>Email</label>
            <input type='text' ref={email} />
            <label>Password</label>
            <input type='password' ref={password}/>
            <button>submit</button>
            <br/>
            </form>
        </div>
    );
};

export default LoginPage;