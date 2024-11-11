import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeaders, getUserProfile } from './apiGetInfomations';

interface CartItem {
  cartId?: number;
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
  updateProductQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => void;
  loadCartItems: () => void;
  userAccount: UserAccount | null;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData: UserAccount = await getUserProfile(token);
          setIsLoggedIn(true);
          setUserAccount(userData);
        } catch (error) {
          console.error("Không thể lấy thông tin người dùng:", error);
        }
      }
    };
    initializeUser();
  }, []);

  const addToCart = async (item: CartItem) => {
    if (!isLoggedIn || !userAccount) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(
        `http://localhost:8080/api/cart/add?userId=${userAccount.userId}&productId=${item.productId}&quantity=${item.quantity}`,
        {},
        { headers }
      );
      if (response.status === 200 && response.data.cart?.cartId) {
        const newCartId = response.data.cart.cartId;
        const newItem = { ...item, cartId: newCartId, quantity: response.data.cart.quantity };
        setCartItems([...cartItems, newItem]);
      } else {
        console.error("Phản hồi từ máy chủ không bao gồm cartId.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  const updateProductQuantity = async (productId: number, quantity: number) => {
    const item = cartItems.find(cartItem => cartItem.productId === productId);
    if (!item || !item.cartId) {
      console.error("Không tìm thấy sản phẩm trong giỏ hoặc thiếu cartId.");
      return;
    }
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(
        `http://localhost:8080/api/cart/change-quantity?cartId=${item.cartId}&quantity=${quantity}`,
        {},
        { headers }
      );
      if (response.status === 200) {
        setCartItems(prevItems =>
          prevItems.map(cartItem =>
            cartItem.productId === productId ? { ...cartItem, quantity } : cartItem
          )
        );
      } else {
        console.error("Không thể cập nhật số lượng. Trạng thái phản hồi:", response.status);
      }
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
      alert("Không thể cập nhật số lượng sản phẩm.");
    }
  };

  const login = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const userData: UserAccount = await getUserProfile(token);
      setTimeout(() => {
        setIsLoggedIn(true);
        setUserAccount(userData);
      }, 100);
    } catch (error) {
      console.error("Đăng nhập không thành công:", error);
      alert("Đăng nhập không thành công. Vui lòng thử lại.");
      setIsLoggedIn(false);
      setUserAccount(null);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserAccount(null);
    setCartItems([]);
  };

  const removeFromCart = async (productId: number) => {
    const item = cartItems.find(cartItem => cartItem.productId === productId);
    if (!item || !item.cartId) {
      console.error("Không tìm thấy sản phẩm hoặc thiếu cartId.");
      return;
    }
    try {
      const headers = getAuthHeaders();
      const response = await axios.delete(
        `http://localhost:8080/api/cart/${item.cartId}`,
        { headers }
      );
      if (response.status === 200) {
        setCartItems(cartItems.filter(cartItem => cartItem.productId !== productId));
        alert("Đã xóa sản phẩm thành công");
      } else {
        console.error("Không thể xóa sản phẩm. Trạng thái phản hồi:", response.status);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      alert("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  const loadCartItems = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Người dùng phải đăng nhập để tải các sản phẩm trong giỏ.");
      return;
    }
    try {
      const userData: UserAccount = await getUserProfile(token);
      if (!userData || !userData.userId) {
        console.error("ID người dùng không tồn tại.");
        return;
      }
      const headers = getAuthHeaders();
      const response = await axios.get(`http://localhost:8080/api/cart/${userData.userId}`, { headers });
      if (response.status === 200) {
        setCartItems(response.data);
      } else {
        console.error("Không thể tải sản phẩm trong giỏ hàng. Trạng thái phản hồi:", response.status);
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm trong giỏ hàng:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateProductQuantity, removeFromCart, isLoggedIn, login, logout, loadCartItems, userAccount }}>
      {children}
    </CartContext.Provider>
  );
};
