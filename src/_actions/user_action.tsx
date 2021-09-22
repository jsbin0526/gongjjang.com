import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, OVERLAP_CHECK_EMAIL } from './types';

export async function loginUser(dataToSubmit) {
    const request = axios.post("/api/user/login", dataToSubmit).then((response) => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export async function registerUser(dataToSubmit: {
    email: string;
    password: string;
    name: string;
    sex: string;
    school: string;
    grade: string;
    option: string;
}) {
    const request = axios.post("/api/user/register", dataToSubmit).then((response) => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export async function overlapCheckEmail(dataToSubmit) {
    const request = axios.post("/api/user/overlapCheckEmail", dataToSubmit).then((response) => response.data);
    return {
        type: OVERLAP_CHECK_EMAIL,
        payload: request
    }
}