import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './templates/header';
import Content from './templates/content';
import Footer from './templates/footer';
import Taskbar from './templates/taskbar';
import DashBoard from './pages/admin/DashBoard';
import ProductDetail from './templates/productDetail'; // Import for ProductDetail
import { CartProvider } from './templates/CartContext'; // Import CartProvider
import './styles/layout.css';
import './styles/header.css';
import './styles/taskbar.css';
import './styles/offcanvas.css';
import './styles/content.css';
import './styles/footer.css';
import { getUserRoleFromToken } from './API/apiAccount';

function App() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = getUserRoleFromToken(token);
      setRole(userRole);
    }
    setLoading(false); // Set loading to false after determining role
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <Router>
      <CartProvider> {/* Wrap everything with CartProvider */}
        <Routes>
          {role === 'Admin' ? (
            <>
              <Route path="/admin" element={<DashBoard />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <>
                    <Taskbar />
                    <Header />
                    <Content />
                    <Footer />
                  </>
                }
              />
              <Route path="/product/:productId" element={<ProductDetail />} /> {/* Route for product detail */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
