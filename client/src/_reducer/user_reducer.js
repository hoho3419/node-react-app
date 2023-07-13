import { 
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER

} from "../_action/types";

export default function asd(preState = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return {...preState,loginSuccess: action.payload};
        case REGISTER_USER:
            return {...preState,success: action.payload};
        case AUTH_USER:
            return {...preState,userData: action.payload};
    

        default:
            return preState;
    }
}