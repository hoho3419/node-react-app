import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { regisetUser } from '../../../_action/user_action';


const LegisterPage = () => {
    const email = useRef();
    const password = useRef();
    const name = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        const user = {
            email: email.current.value,
            password: password.current.value,
            confirmPassword: confirmPassword.current.value,
            name: name.current.value
        }
        dispatch(regisetUser(user))
        .then((res) => {
            if(res.payload.success){
                alert('회원가입이 완료되었습니다.');
                console.log(res);
                navigate('/');
            }else{
                alert('Error');
            }
        })
    }

/**
    useEffect(() =>{
        axios('api/hello')
        .then((res) => console.log(res.data, "수신완료"))
        .catch((err) => console.log(err));
    },[])
 */
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
            <label>Name</label>
            <input type='text' ref={name}/>
            <label>Password</label>
            <input type='password' ref={password}/>
            <label>Confirm Password</label>
            <input type='password' ref={confirmPassword}/>
            <button>submit</button>
            <br/>
            </form>
        </div>
    );
};

export default LegisterPage;