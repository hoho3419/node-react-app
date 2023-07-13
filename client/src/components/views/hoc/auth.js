import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../../../_action/user_action";

const Auth = function(specificComponent,option, adminRoute = null){

    // Option 의미
    // null -> 아무나 출입이 가능한 페이지
    // true -> 로그인 한 유저만 출입이 가능한 페이지
    // false -> 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(){
        const dispatch = useDispatch();

        useEffect(() =>{
            dispatch(authUser())
            .then(res => {
                console.log(res);
               
            })
        },[])

        return (
            <specificComponent/>
        )
    }
    return  AuthenticationCheck;
}

export default Auth;