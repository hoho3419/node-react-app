import React,{ useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();
    const button = useRef();

    const onClickHandler = (event) =>{
        event.preventDefault();
        console.log(event.target.innerText);
        if(event.target.innerText === '로그인'){
            return navigate('/login');
        }

        axios.get('/api/users/logout')
        .then((res) => {
            console.log(res);
            if(res.data.success){
                alert('로그아웃이 완료되었습니다');
                document.querySelector("button").innerText = "로그인";
            }else{
                document.querySelector("button").innerText = "로그아웃";
            }
        })
        .catch((err) =>{
            alert("err -> " + err);
        })
    }
    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            height: '100vh',
            fontSize: '3rem'
            }}>
            시작 페이지
            <button ref={button} onClick={onClickHandler}> 로그인 </button>
        </div>
    );
};

export default LandingPage;