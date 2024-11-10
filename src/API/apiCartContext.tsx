import React, { createContext, useContext, useState } from 'react';
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
  userAccount: UserAccount | null;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

  // Hàm thêm sản phẩm vào giỏ hàng
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
        alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
      } else {
        console.error("Phản hồi của máy chủ không bao gồm cartId.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Không thêm được sản phẩm vào giỏ.");
    }
  };

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  const updateProductQuantity = async (productId: number, quantity: number) => {
    const item = cartItems.find(cartItem => cartItem.productId === productId);
    if (!item || !item.cartId) {
      console.error("Không tìm thấy mục giỏ hàng hoặc cartId bị thiếu.");
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
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem.productId === productId ? { ...cartItem, quantity } : cartItem
          )
        );
      } else {
        console.error("Không cập nhật được số lượng. Trạng thái phản hồi:", response.status);
      }
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
      alert("Không cập nhật được số lượng sản phẩm.");
    }
  };

  const login = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Vui lòng đăng nhập để nhận token.");
        return;
      }
  
      const userData: UserAccount = await getUserProfile(token);
      
      // Hiển thị thông báo đăng nhập thành công
      alert("Chúc mừng bạn đã đăng nhập thành công!");
  
      // Cập nhật trạng thái đăng nhập sau khi hiển thị thông báo
      setTimeout(() => {
        setIsLoggedIn(true);
        setUserAccount(userData);
      }, 100); // Thời gian delay ngắn để đảm bảo thông báo được hiển thị trước
    } catch (error) {
      console.error("Không đăng nhập được:", error);
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

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateProductQuantity,
      removeFromCart,
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
