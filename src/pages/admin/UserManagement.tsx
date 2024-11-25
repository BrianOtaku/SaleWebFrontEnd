import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';
import CRUD from '../hooks/useCRUD';
import { UserData } from '../../API/apiCRUD';

interface User {
    userId: number;
    userName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: number;
    role: string;
}

function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);

    const { selectedItems, selectAll, handleSelectItem, handleSelectAll } = useSelect(
        users.map(user => user.userId)
    );

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await getAllUsers(token);
                    console.log(userData);
                    setUsers(userData);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            }
        };

        fetchUsers();
    }, []);

    const handleCreate = async (userData: UserData) => {
        window.location.reload();
        setUsers([...users, userData]);
    };

    const handleUpdate = async (updatedData: UserData) => {
        window.location.reload();
        setUsers(users.map(user => user.userId === updatedData.userId ? updatedData : user));
    };

    const handleDelete = async () => {
        if (selectedItems.length > 0) {
            try {
                window.location.reload();
                setUsers(users.filter(user => !selectedItems.includes(user.userId)));
            } catch (error) {
                console.error('Error deleting users:', error);
            }
        } else {
            console.warn('No users selected for deletion.');
        }
    };

    return (
        <div>
            <div className="header-management">
                <h2>Users Management</h2>
                <CRUD
                    pageType="users"
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    selectedItems={selectedItems}
                    selectedUserData={
                        selectedItems.length === 1
                            ? users.find(user => user.userId === selectedItems[0])
                            : undefined
                    }
                    users={users}
                />
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Role</th>
                            <th className='checkBox'>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
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
                                <td className='checkBox'>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(user.userId)}
                                        onChange={() => handleSelectItem(user.userId)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagement;
