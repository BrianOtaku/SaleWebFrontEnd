import React, { createContext, useContext, useState } from 'react';

type ProductInCart = {
    productId: number;
    productName: string;
    productImage: string;
    cost: number;
    quantity: number;
};

type CartContextType = {
    cartItems: ProductInCart[];
    addToCart: (product: ProductInCart) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<ProductInCart[]>([]);

    const addToCart = (product: ProductInCart) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product.productId);
            if (existingItem) {
                return prevItems.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: product.quantity }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.productId === productId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

