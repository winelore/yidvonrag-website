'use client'

import { useState } from 'react'

export function ImageUploadInput() {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5 flex-1 w-full relative">
        <label htmlFor="file" className="text-sm font-medium text-foreground">Вибрати нове фото</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setPreview(URL.createObjectURL(file))
            } else {
              setPreview(null)
            }
          }}
          className="h-12 w-full rounded-lg border border-black/[.15] dark:border-white/[.15] bg-transparent text-sm transition-colors focus:border-foreground focus:outline-none file:mr-4 file:h-full file:px-4 file:border-0 file:bg-black/[.05] dark:file:bg-white/[.05] file:text-foreground file:font-medium hover:file:bg-black/[.1] dark:hover:file:bg-white/[.1] cursor-pointer"
        />
      </div>
      
      {preview && (
        <div className="relative rounded-xl overflow-hidden shadow-sm border border-black/[.08] dark:border-white/[.145] aspect-[3/4] w-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="object-cover w-full h-full" />
        </div>
      )}
    </div>
  )
}
