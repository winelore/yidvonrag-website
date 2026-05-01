'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    addToCart: (wine: { id: string, name: string, price: number }) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const[items, setItems] = useState<CartItem[]>([])

    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) setItems(JSON.parse(savedCart))
    },[])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    },[items])

    const addToCart = (wine: { id: string, name: string, price: number }) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === wine.id)
            if (existing) {
                return prev.map(item => item.id === wine.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...prev, { ...wine, quantity: 1 }]
        })
        alert(`"${wine.name}" додано до корзини!`)
    }

    const removeFromCart = (id: string) => setItems(prev => prev.filter(item => item.id !== id))
    const clearCart = () => setItems([])
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}