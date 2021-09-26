import {LOGIN_USER, REGISTER_USER, OVERLAP_CHECK_EMAIL, AUTH_USER} from '../_actions/types';

export default function user(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}
        case OVERLAP_CHECK_EMAIL:
            return {...state, overlapCheckEmail: action.payload} 
        case AUTH_USER:
            return {...state, userData: action.payload}
        default:
            return state;
    } 
}