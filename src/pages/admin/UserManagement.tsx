import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../API/apiGetInfomations'; // Đảm bảo đường dẫn đúng đến file apiAccount

interface User {
    userId: number;
    userName: string;
    email: string;
    password: string; // Không nên hiển thị mật khẩu trong bảng
    address: string;
    phoneNumber: number;
    role: string;
}

function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userData = await getAllUsers();
                setUsers(userData); // Lưu trữ dữ liệu người dùng vào state
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserManagement;
