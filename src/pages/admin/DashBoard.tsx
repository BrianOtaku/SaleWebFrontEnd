import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../adminCSS/DashBoard.css';

// import các trang quản lý admin
import UserManagement from './UserManagement';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';
import PaymentManagement from './PaymentManagement';
import InventoryManagement from './InventoryManagement';
import OrderManagement from './OrderManagement';
import DeliveryManagement from './DeliveryManagement';

// import css
import '../adminCSS/ManageTables.css';
import '../adminCSS/CRUD.css';

function DashBoard() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState<string>(() => {
        return localStorage.getItem('activePage') || '';
    });

    useEffect(() => {
        localStorage.setItem('activePage', activePage);
    }, [activePage]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('activePage');
        navigate('/');
        window.location.reload();
    };

    const renderContent = () => {
        switch (activePage) {
            case 'users':
                return <UserManagement />;
            case 'categories':
                return <CategoryManagement />;
            case 'products':
                return <ProductManagement />;
            case 'inventories':
                return <InventoryManagement />;
            case 'orders':
                return <OrderManagement />;
            case 'deliveries':
                return <DeliveryManagement />;
            case 'payments':
                return <PaymentManagement />;
            default:
                if (activePage) {
                    return <div>Invalid page</div>;
                }
                return <div className='adminPage'>Welcome to the Admin dashboard!</div>;
        }
    };

    return (
        <div className='admin'>
            <div className='adminSideBar'>
                <h1>DASHBOARD</h1>
                <Button variant="light" onClick={() => setActivePage('users')}>Manage Users</Button>
                <Button variant="light" onClick={() => setActivePage('categories')}>Manage Categories</Button>
                <Button variant="light" onClick={() => setActivePage('products')}>Manage Products</Button>
                <Button variant="light" onClick={() => setActivePage('inventories')}>Manage Inventories</Button>
                <Button variant="light" onClick={() => setActivePage('orders')}>Manage Orders</Button>
                <Button variant="light" onClick={() => setActivePage('deliveries')}>Manage Deliveries</Button>
                <Button variant="light" onClick={() => setActivePage('payments')}>Manage Payments</Button>
                <Button variant="danger" onClick={handleLogout} className='adminLogout'>Log Out</Button>
            </div>
            <div className='adminContent'>
                {renderContent()}
            </div>
        </div>
    );
}

export default DashBoard;
