// import library
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import templates
import Header from './templates/header';
import Content from './templates/content';
import Footer from './templates/footer';
import Taskbar from './templates/taskbar';

// import admin pages
import DashBoard from './pages/admin/DashBoard';
import ProductDetail from './pages/productDetail';
import ProductManufacturerResult from './pages/productManufacturerResult';

// import styles
import './styles/layout.css';
import './styles/header.css';
import './styles/taskbar.css';
import './styles/offcanvas.css';
import './styles/content.css';
import './styles/footer.css';
import './styles/productCard.css';
import './styles/cartModal.css';
import './styles/productDetail.css';

// import components
import { getUserRoleFromToken } from './API/apiAccount';
import { CartProvider } from './API/apiCartContext';

function App() {
  const [role, setRole] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userRole = getUserRoleFromToken(token);
      setRole(userRole);
    }
    // setLoading(false);
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Router>
      <CartProvider>
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
              <Route
                path="/products/manufacturer/:manufacturer"
                element={
                  <>
                    <Taskbar />
                    <ProductManufacturerResult
                      handleAddToCart={() => { }}
                      page={1}
                      limit={10}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/product/:productId"
                element={
                  <>
                    <Taskbar />
                    <ProductDetail />
                    <Footer />
                  </>}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
