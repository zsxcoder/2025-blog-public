'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface LightboxProps {
  images: string[]
  initialIndex?: number
  open: boolean
  onClose: () => void
}

export function Lightbox({ images, initialIndex = 0, open, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    if (open) {
      // 打开时禁用滚动
      document.body.style.overflow = 'hidden'
    } else {
      // 关闭时恢复滚动
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
    }
  }, [open, initialIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageClick = (index: number) => {
    setCurrentIndex(index)
  }

  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
      onClick={onClose}
    >
      {/* Main image */}
      <div className='relative w-full max-w-5xl mx-auto p-4'>
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className='w-full h-auto max-h-[80vh] object-contain rounded-lg'
          onClick={(e) => e.stopPropagation()}
        />

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition-all'
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
            >
              &lt;
            </button>
            <button
              className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-md transition-all'
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
            >
              &gt;
            </button>
          </>
        )}

        {/* Close button */}
        <button
          className='absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all'
          onClick={onClose}
        >
          ×
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className='absolute bottom-4 left-0 right-0 flex justify-center gap-2 p-4 overflow-x-auto'
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative w-16 h-12 rounded-md overflow-hidden transition-all ${currentIndex === index ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className='w-full h-full object-cover'
              />
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
