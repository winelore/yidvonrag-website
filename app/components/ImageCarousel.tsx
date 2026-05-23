'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
    images: string[];
    alt: string;
    containerClassName?: string;
}

export default function ImageCarousel({ images, alt, containerClassName = "h-[400px] sm:h-[500px]" }: ImageCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollPrev = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            scrollRef.current.scrollBy({ left: -width, behavior: 'smooth' });
        }
    };

    const scrollNext = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            scrollRef.current.scrollBy({ left: width, behavior: 'smooth' });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.clientWidth;
            const scrollLeft = scrollRef.current.scrollLeft;
            const newIndex = Math.round(scrollLeft / width);
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    };

    if (!images || images.length === 0) return null;

    if (images.length === 1) {
        return (
            <div className={`relative w-full ${containerClassName} bg-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100`}>
                <Image src={images[0]} alt={alt} fill className="object-contain p-4" />
            </div>
        );
    }

    return (
        <div className={`relative w-full ${containerClassName} bg-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100 group`}>
            {/* 
              Tailwind snap-x and snap-mandatory enables smooth native scrolling 
              scrollbar-hide class functionality can be done via style
            */}
            <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="hide-scroll flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Style injection to hide webkit scrollbar */}
                <style dangerouslySetInnerHTML={{__html: `
                    .hide-scroll::-webkit-scrollbar { display: none; }
                `}} />
                
                {images.map((img, index) => (
                    <div className="relative flex-[0_0_100%] min-w-full h-full snap-center" key={index}>
                        <Image src={img} alt={`${alt} - ${index + 1}`} fill className="object-contain p-4" />
                    </div>
                ))}
            </div>
            
            <button 
                onClick={scrollPrev} 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
                onClick={scrollNext} 
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Pagination dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <div key={index} className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? 'bg-gray-800' : 'bg-gray-400/50'}`} />
                ))}
            </div>
        </div>
    );
}
