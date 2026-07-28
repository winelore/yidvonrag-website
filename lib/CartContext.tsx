'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    getItemQuantity: (id: string) => number;
    totalPrice: number;
    clearCart: () => void;
    isLoaded: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCart = localStorage.getItem('wine-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error("Error in the reading of the cart memory:", error);
                localStorage.removeItem('wine-cart');
            }
        }
        setIsLoaded(true);
    },[]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('wine-cart', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addToCart = (newItem: Omit<CartItem, 'quantity'>, count: number = 1) => {
        const qtyToAdd = Math.max(1, count);
        setItems(prev => {
            const existing = prev.find(i => i.id === newItem.id);
            if (existing) {
                return prev.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + qtyToAdd } : i);
            }
            return [...prev, { ...newItem, quantity: qtyToAdd }];
        });
    };

    const getItemQuantity = (id: string): number => {
        const item = items.find(i => i.id === id);
        return item ? item.quantity : 0;
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
    };

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const clearCart = useCallback(() => {
        setItems([]);
    },[]);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, getItemQuantity, totalPrice, clearCart, isLoaded }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};