'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    getRecentBeverages,
    addRecentBeverage,
    removeRecentBeverage,
    clearRecentBeverages,
    RecentWine
} from '@/lib/recentBeverages';

interface SearchInputProps {
    isTransparent?: boolean;
}

export default function SearchInput({ isTransparent = false }: SearchInputProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<RecentWine[]>([]);
    const [recentBeverages, setRecentBeverages] = useState<RecentWine[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Load recent beverages on client mount
    useEffect(() => {
        setRecentBeverages(getRecentBeverages());
    }, []);

    // Debounced live search effect
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            if (recentBeverages.length > 0) {
                // Keep dropdown open if focused and recent beverages exist
            } else {
                setIsOpen(false);
            }
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setResults(data);
                    setIsOpen(true);
                }
            } catch (err) {
                console.error('Failed to fetch search results:', err);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, recentBeverages.length]);

    const handleFocus = () => {
        if (query.trim().length >= 2) {
            setIsOpen(true);
        } else if (recentBeverages.length > 0) {
            // Re-fetch latest recent items from storage when focusing
            const freshRecent = getRecentBeverages();
            setRecentBeverages(freshRecent);
            if (freshRecent.length > 0) {
                setIsOpen(true);
            }
        }
    };

    const handleSelectWine = (wine: RecentWine) => {
        const updated = addRecentBeverage(wine);
        setRecentBeverages(updated);
        setIsOpen(false);
    };

    const handleRemoveRecent = (id: string) => {
        const updated = removeRecentBeverage(id);
        setRecentBeverages(updated);
        if (updated.length === 0 && query.trim().length < 2) {
            setIsOpen(false);
        }
    };

    const handleClearRecent = () => {
        clearRecentBeverages();
        setRecentBeverages([]);
        if (query.trim().length < 2) {
            setIsOpen(false);
        }
    };

    const showRecent = query.trim().length < 2 && recentBeverages.length > 0;

    return (
        <div className="relative w-full max-w-md mx-auto z-40">
            {/* Search Input field wrapper */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        const val = e.target.value;
                        setQuery(val);
                        if (val.trim().length < 2 && recentBeverages.length > 0) {
                            setIsOpen(true);
                        }
                    }}
                    onFocus={handleFocus}
                    placeholder="Пошук вина (напр., Франція, Червоне)..."
                    className={`w-full px-5 py-3 pl-12 text-sm rounded-xl shadow-sm focus:outline-none transition-all duration-300 ${
                        isTransparent
                            ? "bg-white/20 backdrop-blur-md text-white placeholder-gray-200 border border-white/30 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:border-white focus:ring-1 focus:ring-white"
                            : "bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-gray-800 focus:ring-1 focus:ring-gray-800"
                    }`}
                />
                {/* Search magnifying glass icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg width="20" height="20" className={`w-5 h-5 transition-colors ${isTransparent ? "text-gray-200" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {/* Loading spinner overlay */}
                {isLoading && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Floating dropdown panel */}
            {isOpen && (
                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto backdrop-blur-md">
                    {showRecent ? (
                        <div>
                            {/* Section Header for Recent Beverages */}
                            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">
                                    <svg width="14" height="14" className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Нещодавно переглянуті
                                </span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearRecent();
                                    }}
                                    className="text-xs text-gray-400 hover:text-red-600 transition-colors lowercase font-normal"
                                >
                                    Очистити
                                </button>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {recentBeverages.map((wine) => (
                                    <div
                                        key={wine.id}
                                        className="flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 group px-4 py-2.5"
                                    >
                                        <Link
                                            href={`/wines/${wine.id}`}
                                            onClick={() => handleSelectWine(wine)}
                                            className="flex-1 flex items-center justify-between mr-2 min-w-0"
                                        >
                                            <div className="flex flex-col truncate pr-2">
                                                <span className="font-medium text-gray-800 group-hover:text-black transition-colors text-sm truncate">
                                                    {wine.name}
                                                </span>
                                                <span className="text-xs text-gray-400 mt-0.5 truncate">
                                                    {wine.color}
                                                </span>
                                            </div>
                                            <div className="text-xs font-semibold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg group-hover:bg-gray-100 transition-colors shrink-0">
                                                {wine.price} ₴
                                            </div>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveRecent(wine.id);
                                            }}
                                            title="Видалити з історії"
                                            className="text-gray-300 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/60 transition-colors shrink-0"
                                        >
                                            <svg width="14" height="14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {results.map((wine) => (
                                <Link
                                    key={wine.id}
                                    href={`/wines/${wine.id}`}
                                    onClick={() => handleSelectWine(wine)}
                                    className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors duration-150 group"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800 group-hover:text-black transition-colors">
                                            {wine.name}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-0.5">
                                            {wine.color}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg group-hover:bg-gray-100 transition-colors">
                                        {wine.price} ₴
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="px-5 py-4 text-center text-sm text-gray-500">
                            Нічого не знайдено 😔
                        </div>
                    )}
                </div>
            )}

            {/* Background click handler block to automatically close dropdown when clicking outside */}
            {isOpen && (
                <div className="fixed inset-0 -z-10" onClick={() => setIsOpen(false)} />
            )}
        </div>
    );
}