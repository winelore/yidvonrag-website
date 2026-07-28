'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

function HiddenFileInput({ file, inputName }: { file: File; inputName: string }) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      const dt = new DataTransfer()
      dt.items.add(file)
      inputRef.current.files = dt.files
    }
  }, [file])

  return <input type="file" name={inputName} ref={inputRef} style={{ display: 'none' }} />
}

export interface AwardItemState {
  id: string
  title: string
  year?: string
  description?: string
  image?: string
  presetIcon?: string
  file?: File
  previewUrl?: string
}

export const PRESET_BADGES = [
  { id: 'gold-medal', name: 'Золота медаль 🥇', icon: '🥇', color: 'from-amber-400 to-yellow-600' },
  { id: 'silver-medal', name: 'Срібна медаль 🥈', icon: '🥈', color: 'from-slate-300 to-slate-500' },
  { id: 'bronze-medal', name: 'Бронзова медаль 🥉', icon: '🥉', color: 'from-amber-600 to-amber-800' },
  { id: 'grand-prix', name: 'Гран-прі / Кубок 🏆', icon: '🏆', color: 'from-amber-300 to-amber-500' },
  { id: 'sommelier-choice', name: 'Вибір Сомельє 🍷', icon: '🍷', color: 'from-purple-500 to-rose-700' },
  { id: 'star-award', name: 'Зірка якості ⭐️', icon: '⭐️', color: 'from-yellow-300 to-amber-500' },
]

interface AwardsManagerProps {
  initialAwards?: Array<{
    id?: string
    title: string
    year?: string
    description?: string
    image?: string
    presetIcon?: string
  }>
}

export function AwardsManager({ initialAwards = [] }: AwardsManagerProps) {
  const [awards, setAwards] = useState<AwardItemState[]>(() =>
    initialAwards.map(a => ({
      id: a.id || 'award_' + Math.random().toString(36).substring(2, 9),
      title: a.title,
      year: a.year,
      description: a.description,
      image: a.image,
      presetIcon: a.presetIcon,
    }))
  )

  // Draft state for creating a new award
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')
  const [presetIcon, setPresetIcon] = useState('gold-medal')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Будь ласка, оберіть файл зображення')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Максимальний розмір файлу — 5MB')
        return
      }
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      e.target.value = ''
    }
  }

  const handleAddAward = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Будь ласка, вкажіть назву нагороди')
      return
    }

    const newAward: AwardItemState = {
      id: 'award_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: title.trim(),
      year: year.trim() || undefined,
      description: description.trim() || undefined,
      presetIcon: selectedFile ? undefined : presetIcon,
      file: selectedFile || undefined,
      previewUrl: previewUrl || undefined,
    }

    setAwards(prev => [...prev, newAward])

    // Reset draft form
    setTitle('')
    setYear('')
    setDescription('')
    setPresetIcon('gold-medal')
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleRemoveAward = (idToRemove: string, e: React.MouseEvent) => {
    e.preventDefault()
    setAwards(prev => prev.filter(a => a.id !== idToRemove))
  }

  // Generate payload string for JSON input (without heavy base64 strings)
  const awardsPayload = JSON.stringify(
    awards.map(a => ({
      id: a.id,
      title: a.title,
      year: a.year,
      description: a.description,
      image: a.image,
      presetIcon: a.presetIcon,
      hasNewFile: !!a.file,
    }))
  )

  return (
    <div className="space-y-6">
      {/* Hidden JSON input containing metadata */}
      <input type="hidden" name="awardsData" value={awardsPayload} />

      {/* Hidden file inputs for awards with newly attached files */}
      {awards.map(
        award =>
          award.file && (
            <HiddenFileInput
              key={award.id}
              file={award.file}
              inputName={`awardFile_${award.id}`}
            />
          )
      )}

      {/* Existing Awards List */}
      <div className="space-y-3">
        {awards.length === 0 ? (
          <p className="text-xs text-gray-500 dark:text-zinc-400 italic">
            Нагороди чи медалі поки що не додано.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {awards.map((award, index) => {
              const preset = PRESET_BADGES.find(p => p.id === award.presetIcon)
              const displaySrc = award.previewUrl || award.image

              return (
                <div
                  key={award.id || index}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 shadow-sm relative group"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/10 to-yellow-500/20 border border-amber-500/20 overflow-hidden">
                    {displaySrc && !displaySrc.startsWith('preset:') ? (
                      <Image
                        src={displaySrc}
                        alt={award.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-2xl">{preset ? preset.icon : '🏅'}</span>
                    )}
                  </div>

                  <div className="flex-grow min-w-0 pr-6">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {award.title}
                      </h4>
                      {award.year && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-medium">
                          {award.year}
                        </span>
                      )}
                    </div>
                    {award.description && (
                      <p className="text-xs text-gray-500 dark:text-zinc-400 truncate mt-0.5">
                        {award.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleRemoveAward(award.id, e)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 text-sm font-bold"
                    title="Видалити нагороду"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Add New Award Form */}
      <div className="p-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/70 dark:bg-zinc-900/60 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span>🏅</span> Додати нагороду / бейдж
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700 dark:text-zinc-300">
              Назва нагороди *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="напр. Золота медаль 2024"
              className="h-10 px-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-black dark:focus:border-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700 dark:text-zinc-300">
              Рік / Номінація
            </label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="напр. 2024"
              className="h-10 px-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-black dark:focus:border-white"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-700 dark:text-zinc-300">
            Опис / Конкурс
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="напр. Odesa Wine Week 1-ше місце"
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-black dark:focus:border-white"
          />
        </div>

        {/* Badge Icon Choice / Custom Badge Image */}
        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-zinc-800">
          <label className="text-xs font-medium text-gray-700 dark:text-zinc-300 block">
            Зображення бейджа / Медалі
          </label>

          <div className="flex flex-wrap gap-2">
            {PRESET_BADGES.map((badge) => (
              <button
                key={badge.id}
                type="button"
                onClick={() => {
                  setPresetIcon(badge.id)
                  setSelectedFile(null)
                  setPreviewUrl(null)
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                  presetIcon === badge.id && !previewUrl
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold ring-1 ring-amber-500'
                    : 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:border-gray-400'
                }`}
              >
                <span>{badge.icon}</span>
                <span>{badge.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
              <span>📷</span>
              <span>Завантажити власне зображення бейджа</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>

            {previewUrl && (
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded border overflow-hidden">
                  <Image src={previewUrl} alt="Badge Preview" fill className="object-cover" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null)
                    setPreviewUrl(null)
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Видалити фото
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddAward}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <span>+ Додати нагороду у список</span>
        </button>
      </div>
    </div>
  )
}
