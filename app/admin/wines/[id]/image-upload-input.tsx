'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

function HiddenFileInput({ file, inputName }: { file: File, inputName: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      inputRef.current.files = dt.files;
    }
  }, [file]);
  
  return <input type="file" name={inputName} ref={inputRef} style={{ display: 'none' }} />;
}

type ImageItem = 
  | { id: string; type: 'existing'; url: string }
  | { id: string; type: 'new'; file: File; previewUrl: string };

export function ImageGalleryManager({ initialImages }: { initialImages: string[] }) {
  const [items, setItems] = useState<ImageItem[]>(() => 
    initialImages.map(url => ({ id: url, type: 'existing', url }))
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newItems: ImageItem[] = Array.from(files).map(file => ({
      id: `newFile_${Math.random().toString(36).substring(2, 10)}`,
      type: 'new',
      file,
      previewUrl: URL.createObjectURL(file)
    }))

    setItems(prev => [...prev, ...newItems])
    
    // Clear input so same files can be selected again
    e.target.value = ''
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const moveItem = (index: number, direction: -1 | 1) => {
    setItems(prev => {
      const newItems = [...prev]
      const current = newItems[index]
      newItems[index] = newItems[index + direction]
      newItems[index + direction] = current
      return newItems
    })
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Hidden input for order tracking */}
      <input type="hidden" name="imageOrder" value={JSON.stringify(items.map(i => i.id))} />
      
      {/* Hidden file inputs natively bundled for submission */}
      {items.map(item => item.type === 'new' && (
        <HiddenFileInput key={item.id} file={item.file} inputName={item.id} />
      ))}

      {/* Gallery display */}
      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;
            const imgSrc = item.type === 'existing' ? item.url : item.previewUrl;
            
            return (
              <div key={item.id} className={`relative group rounded-xl overflow-hidden shadow-sm aspect-[3/4] flex flex-col transition-all duration-200 ${isFirst ? 'border-foreground border-[3px]' : 'border border-black/[.08] dark:border-white/[.145]'}`}>
                {isFirst && (
                  <div className="absolute top-2 left-2 z-10 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    Головне
                  </div>
                )}
                
                <Image src={imgSrc} alt="Wine preview" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover z-0" />
                
                {/* Overlay controls */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="flex gap-2">
                     <button 
                       type="button" 
                       onClick={() => moveItem(index, -1)}
                       disabled={isFirst}
                       className="p-1.5 rounded-md bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 transition-colors"
                       title="Перемістити ліворуч"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                     </button>
                     <button 
                       type="button" 
                       onClick={() => moveItem(index, 1)}
                       disabled={isLast}
                       className="p-1.5 rounded-md bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 transition-colors"
                       title="Перемістити праворуч"
                     >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                     </button>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-full bg-red-500/90 hover:bg-red-600 text-white transition-colors shadow-sm"
                    title="Видалити"
                  >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Upload button area */}
      <div className="flex flex-col gap-1.5 flex-1 w-full relative mt-2">
        <label htmlFor="file-upload" className="text-sm font-medium text-foreground">Вибрати фото (можна декілька)</label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent text-sm transition-colors focus:border-foreground focus:outline-none file:mr-4 file:h-full file:px-4 file:border-0 file:bg-black/[.05] dark:file:bg-white/[.05] file:text-foreground file:font-medium hover:file:bg-black/[.1] dark:hover:file:bg-white/[.1] cursor-pointer"
        />
      </div>
    </div>
  )
}
