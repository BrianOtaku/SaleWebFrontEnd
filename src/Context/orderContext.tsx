import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderContextType {
  productName: string;
  setProductName: (name: string) => void;
  productId: number;
  setProductId: (id: number) => void;
  userId: number;
  setUserId: (id: number) => void;
  orderQuantity: number;
  setOrderQuantity: (quantity: number) => void;
  totalCost: number;
  setTotalCost: (cost: number) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [productName, setProductName] = useState<string>("");
  const [productId, setProductId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [orderQuantity, setOrderQuantity] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  return (
    <OrderContext.Provider
      value={{
        productName,
        setProductName,
        productId,
        setProductId,
        userId,
        setUserId,
        orderQuantity,
        setOrderQuantity,
        totalCost,
        setTotalCost,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};


