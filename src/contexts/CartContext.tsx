import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: { ar: string; fr: string };
  price: number;
  image: string;
  quantity: number;
  selectedFlavor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: {
    fullName: string;
    wilaya: string;
    commune: string;
    phone?: string;
  };
  shippingType: 'home' | 'office';
  shippingCost: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  createOrder: (customerInfo: Order['customerInfo'], shippingType: 'home' | 'office', shippingCost: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(item => 
        item.productId === newItem.productId && 
        item.selectedFlavor === newItem.selectedFlavor && 
        item.selectedSize === newItem.selectedSize
      );

      if (existingItem) {
        return prev.map(item => 
          item.id === existingItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...newItem, id: Date.now().toString(), quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const createOrder = (customerInfo: Order['customerInfo'], shippingType: 'home' | 'office', shippingCost: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...items],
      customerInfo,
      shippingType,
      shippingCost,
      total: getCartTotal() + shippingCost,
      status: 'pending',
      createdAt: new Date(),
    };

    setOrders(prev => [...prev, newOrder]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <CartContext.Provider value={{
      items,
      orders,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      createOrder,
      updateOrderStatus,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};