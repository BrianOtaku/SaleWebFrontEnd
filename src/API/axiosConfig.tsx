import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

interface DecodedToken {
    iss: string;
    exp: number;
    iat: number;
    userName: string;
    sub: string;    // Email
    scope: string;  // Role
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};