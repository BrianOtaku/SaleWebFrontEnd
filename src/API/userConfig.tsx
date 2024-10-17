import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { decodeToken } from '../API/axiosConfig'; // Nhập hàm decodeToken

function UserConfig() {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    let userName = "Error"; // Giá trị mặc định

    if (token) {
        const decodedToken = decodeToken(token); // Giải mã token
        if (decodedToken) {
            userName = decodedToken.userName; // Lấy giá trị sub
        }
    }

    return (
        <button className='UserIcon'>
            <FontAwesomeIcon icon={faUserCircle} />
            <span>{userName}</span> {/* Hiển thị tên người dùng, nếu không có hiển thị "Error" */}
        </button>
    );
}

export default UserConfig;
