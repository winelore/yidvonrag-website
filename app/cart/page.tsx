'use client';

import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { useState } from "react";

// Local CartItem type to avoid implicit any errors
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const NP_API_KEY = "8751d1fd6848e311032a24acf7ea0ff8";

interface NPItem {
    Ref: string;
    Description: string;
}

export default function CartPage() {
    const { items, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");

    // Додали phoneCode та phone
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone: ''
    });

    const [cityQuery, setCityQuery] = useState('');
    const [cities, setCities] = useState<NPItem[]>([]);
    const [selectedCity, setSelectedCity] = useState<NPItem | null>(null);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const [branchQuery, setBranchQuery] = useState('');
    const [branches, setBranches] = useState<NPItem[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<NPItem | null>(null);
    const [showBranchDropdown, setShowBranchDropdown] = useState(false);

    const searchCities = async (query: string) => {
        if (query.length < 2) {
            setCities([]);
            return;
        }
        try {
            const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                body: JSON.stringify({
                    apiKey: NP_API_KEY,
                    modelName: "Address",
                    calledMethod: "getCities",
                    methodProperties: { FindByString: query }
                })
            });
            const data = await res.json();
            setCities(data.data || []);
        } catch (e) {
            console.error("Помилка завантаження міст", e);
        }
    };

    const searchBranches = async (cityRef: string, query: string) => {
        try {
            const res = await fetch('https://api.novaposhta.ua/v2.0/json/', {
                method: 'POST',
                body: JSON.stringify({
                    apiKey: NP_API_KEY,
                    modelName: "Address",
                    calledMethod: "getWarehouses",
                    methodProperties: { CityRef: cityRef, FindByString: query }
                })
            });
            const data = await res.json();
            setBranches(data.data || []);
        } catch (e) {
            console.error("Помилка завантаження відділень", e);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Якщо це поле телефону, дозволяємо вводити лише цифри
        if (name === 'phone') {
            const onlyNums = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [name]: onlyNums }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (formError) setFormError("");
    };

    const handleCheckout = async () => {
        if (items.length === 0) return;

        // Перевіряємо, чи заповнено телефон
        if (!formData.name.trim() || !formData.surname.trim() || !formData.phone.trim() || !selectedCity || !selectedBranch) {
            setFormError("Будь ласка, заповніть всі обов'язкові поля (*)");
            return;
        }

        try {
            setLoading(true);
            setFormError("");

            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartItems: items,
                    customerInfo: {
                        name: formData.name,
                        surname: formData.surname,
                        phone: formData.phone, // Тепер тут одразу весь номер
                        city: selectedCity.Description,
                        branch: selectedBranch.Description
                    }
                })
            });

            const data = await res.json();

            if (data.pageUrl) {
                // clear cart locally before redirecting
                try {
                    clearCart();
                } catch {
                    // ignore
                }
                window.location.href = data.pageUrl;
            } else {
                setFormError(data.error || "Помилка створення платежу.");
            }
        } catch (error) {
            console.error(error);
            setFormError("Помилка з'єднання з сервером.");
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-8 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Ваш кошик порожній 🛒</h1>
                <Link href="/wines" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition">Перейти до каталогу</Link>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-8 py-16 min-h-screen">
            <h1 className="text-4xl font-bold mb-10">Кошик</h1>

            <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 sm:p-10">
                <div className="space-y-6 mb-10">
                    {items.map((item: CartItem) => (
                        <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                            <div className="flex-grow">
                                <Link href={`/wines/${item.id}`} className="text-lg text-black font-semibold hover:underline">{item.name}</Link>
                                <div className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} за шт.</div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-black font-bold px-2">-</button>
                                    <span className="font-semibold text-black w-6 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-black font-bold px-2">+</button>
                                </div>
                                <div className="font-bold text-lg w-20 text-black text-right">${(item.price * item.quantity).toFixed(2)}</div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">✕</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* БЛОК ДОСТАВКИ */}
                <div className="border-t border-gray-200 pt-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Дані для доставки</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* ІМ'Я */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Ім&apos;я <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Ім'я"
                                className={`w-full border bg-white text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-colors ${formError && !formData.name.trim() ? 'border-red-400 focus:border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-black'}`}
                            />
                        </div>

                        {/* ПРІЗВИЩЕ */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-1">Прізвище <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                placeholder="Прізвище"
                                className={`w-full border bg-white text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-colors ${formError && !formData.surname.trim() ? 'border-red-400 focus:border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-black'}`}
                            />
                        </div>

                        {/* ТЕЛЕФОН (З вибором країни) */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-900 mb-1">Телефон <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Наприклад: +380501234567"
                                className={`w-full border bg-white text-gray-900 rounded-xl px-4 py-3 transition-colors ${formError && !formData.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-300 focus:border-black'}`}
                            />
                        </div>

                        {/* МІСТО */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-900 mb-1">Місто <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={cityQuery}
                                placeholder="Назва міста..."
                                onChange={(e) => {
                                    setCityQuery(e.target.value);
                                    setSelectedCity(null);
                                    setSelectedBranch(null);
                                    setBranchQuery('');
                                    setShowCityDropdown(true);
                                    searchCities(e.target.value);
                                    if (formError) setFormError("");
                                }}
                                onFocus={() => setShowCityDropdown(true)}
                                onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                                className={`w-full border bg-white text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-colors ${formError && !selectedCity ? 'border-red-400 focus:border-red-500 bg-red-50/30' : 'border-gray-300 focus:border-black'}`}
                            />
                            {showCityDropdown && cities.length > 0 && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                    {cities.map((city) => (
                                        <li
                                            key={city.Ref}
                                            onClick={() => {
                                                setSelectedCity(city);
                                                setCityQuery(city.Description);
                                                setShowCityDropdown(false);
                                                searchBranches(city.Ref, "");
                                            }}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 text-sm text-gray-900"
                                        >
                                            {city.Description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* ВІДДІЛЕННЯ */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-900 mb-1">Відділення Нової Пошти <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={branchQuery}
                                placeholder={selectedCity ? "Оберіть відділення..." : "Спочатку оберіть місто"}
                                disabled={!selectedCity}
                                onChange={(e) => {
                                    setBranchQuery(e.target.value);
                                    setSelectedBranch(null);
                                    setShowBranchDropdown(true);
                                    if (selectedCity) {
                                        searchBranches(selectedCity.Ref, e.target.value);
                                    }
                                    if (formError) setFormError("");
                                }}
                                onFocus={() => selectedCity && setShowBranchDropdown(true)}
                                onBlur={() => setTimeout(() => setShowBranchDropdown(false), 200)}
                                className={`w-full border text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 transition-colors disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed ${formError && !selectedBranch ? 'border-red-400 focus:border-red-500 bg-red-50/30' : 'border-gray-300 bg-white focus:border-black'}`}
                            />
                            {showBranchDropdown && branches.length > 0 && (
                                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                                    {branches.map((branch) => (
                                        <li
                                            key={branch.Ref}
                                            onClick={() => {
                                                setSelectedBranch(branch);
                                                setBranchQuery(branch.Description);
                                                setShowBranchDropdown(false);
                                            }}
                                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 text-sm text-gray-900 line-clamp-2"
                                        >
                                            {branch.Description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {formError && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-3">
                            <span className="text-lg">⚠️</span>
                            <p>{formError}</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-gray-500 text-sm mb-1">Разом до оплати</p>
                        <p className="text-4xl text-black font-black">${totalPrice.toFixed(2)}</p>
                    </div>
                    <button onClick={handleCheckout} disabled={loading} className="bg-black text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition w-full sm:w-auto shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Формуємо платіж..." : "Оформити замовлення"}
                    </button>
                </div>
            </div>
        </main>
    );
}