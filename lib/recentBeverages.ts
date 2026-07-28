export interface RecentWine {
    id: string;
    name: string;
    price: number;
    color: string;
}

const STORAGE_KEY = 'recent_beverages';
const MAX_RECENT = 5;

export function getRecentBeverages(): RecentWine[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
            return parsed;
        }
    } catch (e) {
        console.error('Failed to parse recent beverages from localStorage', e);
    }
    return [];
}

export function addRecentBeverage(wine: RecentWine): RecentWine[] {
    if (typeof window === 'undefined') return [];
    try {
        const current = getRecentBeverages();
        const filtered = current.filter(item => item.id !== wine.id);
        const updated = [{
            id: wine.id,
            name: wine.name,
            price: wine.price,
            color: wine.color
        }, ...filtered].slice(0, MAX_RECENT);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    } catch (e) {
        console.error('Failed to save recent beverage to localStorage', e);
        return [];
    }
}

export function removeRecentBeverage(id: string): RecentWine[] {
    if (typeof window === 'undefined') return [];
    try {
        const current = getRecentBeverages();
        const updated = current.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
    } catch (e) {
        console.error('Failed to remove recent beverage from localStorage', e);
        return [];
    }
}

export function clearRecentBeverages(): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Failed to clear recent beverages from localStorage', e);
    }
}
