import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { decodeToken } from '../API/axiosConfig';

function UserConfig() {
    const token = localStorage.getItem('token');
    let userName = "Error";

    if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken) {
            userName = decodedToken.userName;
        }
    }

    return (
        <button className='UserIcon'>
            <FontAwesomeIcon icon={faUserCircle} />
            <span>{userName}</span>
        </button>
    );
}

export default UserConfig;
