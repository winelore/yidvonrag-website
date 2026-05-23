'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define the interface for the wine data structure returned by the API
interface WineResult {
    id: string;
    name: string;
    price: number;
    country: string;
    color: string;
}

export default function SearchInput() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<WineResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Debounced live search effect
    useEffect(() => {
        // Do not trigger search if the user typed less than 2 characters
        if (query.trim().length < 2) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        // Set a timeout to delay the API call (Debounce mechanism)
        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            try {
                // Fetch matching items from our custom search API endpoint
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setResults(data);
                    setIsOpen(true); // Open dropdown overlay if results are successfully fetched
                }
            } catch (err) {
                console.error('Failed to fetch search results:', err);
            } finally {
                setIsLoading(false);
            }
        }, 300); // 300ms delay to prevent database spamming on every keystroke

        // Clean up the timeout if the user continues typing before 300ms passes
        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="relative w-full max-w-md mx-auto z-50">
            {/* Search Input field wrapper */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                    placeholder="Пошук вина (напр., Франція, Червоне)..."
                    // Swapped red highlights for a sleek dark gray focus effect
                    className="w-full px-5 py-3 pl-12 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition-all duration-200"
                />
                {/* Search magnifying glass icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {/* Loading spinner overlay */}
                {isLoading && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        {/* Changed spinner color to a neutral dark gray */}
                        <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Floating search results dropdown panel */}
            {isOpen && (
                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-80 overflow-y-auto backdrop-blur-md">
                    {results.length > 0 ? (
                        <div className="divide-y divide-gray-50">
                            {results.map((wine) => (
                                <Link
                                    key={wine.id}
                                    href={`/wines/${wine.id}`}
                                    onClick={() => setIsOpen(false)} // Close dropdown upon item selection
                                    // Neutralized hover backgrounds and hover text colors to match the clean design
                                    className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors duration-150 group"
                                >
                                    <div className="flex flex-col">
                    <span className="font-medium text-gray-800 group-hover:text-black transition-colors">
                      {wine.name}
                    </span>
                                        <span className="text-xs text-gray-400 mt-0.5">
                      {wine.color} • {wine.country}
                    </span>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg group-hover:bg-gray-100 transition-colors">
                                        {wine.price} ₴
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        // No results found fallback view
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