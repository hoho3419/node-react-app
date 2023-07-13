import Axios from 'axios';
import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER

 } from './types';

export function loginUser(dataToSubmit){

    const request = Axios.post('/api/user/login',dataToSubmit)
    .then((res) => res.data )
    .catch((err) => {
        alert("서버의 에러 " + err);
    })
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function regisetUser(dataToSubmit){

    const request = Axios.post('/api/user/register',dataToSubmit)
    .then((res) => res.data )
    .catch((err) => {
        alert("서버의 에러 " + err);
    })
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function authUser(){

    const request = Axios.post('/api/users/auth')
    .then((res) => res.data )
    .catch((err) => {
        alert("서버의 에러 " + err);
    })
    return {
        type: AUTH_USER,
        payload: request
    }
}