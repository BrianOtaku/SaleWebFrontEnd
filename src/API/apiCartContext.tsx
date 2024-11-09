import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from './apiGetInfomations';

interface CartItem {
  productId: number;
  productName: string;
  productImage: string;
  cost: number;
  quantity: number;
}

interface UserAccount {
  userId: number;
  userName: string;
  email: string;
  address: string;
  phoneNumber: number;
  role: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateProductQuantityAPI: (cartId: number, quantity: number) => void;
  isLoggedIn: boolean;
  login: (userAccount: UserAccount) => void;
  logout: () => void;
  userAccount: UserAccount | null;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

  const addToCart = async (item: CartItem) => {
    if (!isLoggedIn || !userAccount) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    try {
      const headers = getAuthHeaders();
      await axios.post(
        `http://localhost:8080/api/cart/add?userId=${userAccount.userId}&productId=${item.productId}&quantity=${item.quantity}`,
        {},
        { headers }
      );

      // Cập nhật cartItems với callback để đảm bảo sử dụng trạng thái mới nhất
      setCartItems((prevCartItems) => [...prevCartItems, item]);
      alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Không thêm được sản phẩm vào giỏ hàng.");
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    ));
  };

  const updateProductQuantityAPI = async (cartId: number, quantity: number) => {
    if (!userAccount) return;

    try {
      const headers = getAuthHeaders();
      const response = await axios.put(
        `http://localhost:8080/api/cart/change-quantity?cartId=${cartId}&quantity=${quantity}`,  // Thêm cả cartId và quantity vào URL
        {},  // Không cần body
        { headers }
      );

      if (response.status === 200) {
        updateQuantity(cartId, quantity);
        alert("Số lượng đã được cập nhật thành công!");
      } else {
        console.error("Lỗi khi cập nhật số lượng:", response.status, response.data);
        alert("Không thể cập nhật số lượng. Vui lòng kiểm tra bảng điều khiển để biết chi tiết.");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Dữ liệu phản hồi lỗi:", error.response.data);
        console.error("Trạng thái phản hồi lỗi:", error.response.status);
      } else {
        console.error("Lỗi không có phản hồi:", error.message);
      }
      alert("Không thể cập nhật số lượng. Vui lòng kiểm tra bảng điều khiển để biết chi tiết.");
    }
  };


  const login = (userAccount: UserAccount) => {
    setIsLoggedIn(true);
    setUserAccount(userAccount);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserAccount(null);
    setCartItems([]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      updateProductQuantityAPI,
      isLoggedIn,
      login,
      logout,
      userAccount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};
