'use client';

import { useEffect } from 'react';
import { addRecentBeverage, RecentWine } from '@/lib/recentBeverages';

interface RecentBeverageTrackerProps {
    wine: RecentWine;
}

export default function RecentBeverageTracker({ wine }: RecentBeverageTrackerProps) {
    useEffect(() => {
        if (wine && wine.id) {
            addRecentBeverage(wine);
        }
    }, [wine]);

    return null;
}
