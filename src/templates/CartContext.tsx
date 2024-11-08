// CartContext.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../API/apiGetInfomations';  // Import the getAuthHeaders function

interface CartItem {
    productId: number;
    productName: string;
    productImage: string;
    cost: number;
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateProductQuantityAPI: (productId: number, quantity: number) => void;
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const addToCart = (item: CartItem) => {
        const existingItem = cartItems.find(cartItem => cartItem.productId === item.productId);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.productId === item.productId
                    ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                    : cartItem
            ));
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setCartItems(cartItems.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        ));
    };

    const updateProductQuantityAPI = async (cartId: number, quantity: number) => {
        try {
            const headers = getAuthHeaders();
            console.log('Headers:', headers);
    
            const payload = {
                cartId,  // Truyền `cartId` chính xác theo yêu cầu của API
                quantity
            };
    
            const response = await axios.put(
                `http://localhost:8080/api/cart/change-quantity`,
                payload,
                { headers }
            );
    
            console.log('Response:', response);
            updateQuantity(cartId, quantity);
            alert("Cập nhật số lượng thành công!");
        } catch (error) {
            console.error("Lỗi cập nhật số lượng:", error);
    
            if (axios.isAxiosError(error)) {
                console.error("Chi tiết lỗi:", error.response?.data);
            } else {
                console.error("Lỗi không xác định:", error);
            }
    
            alert("Cập nhật số lượng thất bại!");
        }
    };
    
    

    const removeFromCart = (productId: number) => {
        setCartItems(cartItems.filter(item => item.productId !== productId));
    };

    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        setCartItems([]); // Optional: clear cart on logout
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, updateProductQuantityAPI, isLoggedIn, login, logout }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
