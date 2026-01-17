'use client'

import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'
import { cn } from '@/lib/utils'
import { Lightbox } from '@/components/Lightbox'
import { GiscusComments } from '@/components/giscus-comments'

dayjs.extend(relativeTime)

type MessageData = {
  id: string
  text: string
  image: string[]
  time: number
  views: string | null
  tags: string[]
}

type ApiResponse = {
  nextBefore: number
  Region: string
  version: string
  ChannelMessageData: MessageData[]
}

export default function EssaysPage() {
  const [messages, setMessages] = useState<MessageData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 15
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0)
  
  // Comment state
  const [selectedText, setSelectedText] = useState('')
  const commentsRef = useRef<HTMLDivElement>(null)
  
  // Open lightbox
  const openLightbox = (images: string[], initialIndex: number) => {
    setLightboxImages(images)
    setLightboxInitialIndex(initialIndex)
    setLightboxOpen(true)
  }
  
  // Handle text selection
  const handleTextSelect = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString())
    }
  }
  
  // Handle comment button click
  const handleCommentClick = () => {
    // Scroll to comments
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' })
    
    // If there's selected text, we'll handle it in the comments section
    // Giscus doesn't support programmatic setting of comment text, 
    // but we can provide a visual cue or instructions
  }

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://tg-api.mcyzsx.top/')
      const data: ApiResponse = await response.json()
      setMessages(data.ChannelMessageData)
      setTotalPages(Math.ceil(data.ChannelMessageData.length / itemsPerPage))
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  
  useEffect(() => {
    // 添加文本选择事件监听器
    document.addEventListener('mouseup', handleTextSelect)
    document.addEventListener('keyup', handleTextSelect)
    
    return () => {
      // 清理事件监听器
      document.removeEventListener('mouseup', handleTextSelect)
      document.removeEventListener('keyup', handleTextSelect)
    }
  }, [])

  // Calculate current messages for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem)

  // Format time: 24小时内显示相对时间，24小时外显示具体日期时间
  const formatTime = (timestamp: number) => {
    const now = dayjs()
    const messageTime = dayjs(timestamp)
    const diffHours = now.diff(messageTime, 'hour')
    
    if (diffHours < 24) {
      return messageTime.fromNow()
    } else {
      return messageTime.format('YYYY-MM-DD HH:mm')
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <div className='text-secondary'>加载中...</div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-center gap-6 px-6 pt-24 max-sm:pt-24'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className='card relative mx-auto flex items-center justify-between gap-1 p-4 w-full max-w-[840px]'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-bold'>说说</h1>
          <div className='h-2 w-2 rounded-full bg-[#D9D9D9]'></div>
          <div className='text-secondary text-sm'>{messages.length} 条</div>
        </div>
      </motion.div>

      {/* Messages List */}
      <div className='w-full max-w-[840px] space-y-6'>
        {currentMessages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: INIT_DELAY / 2 }}
            className='card relative p-6 space-y-4'>
            {/* Content */}
            <div
              className='text-base leading-relaxed'
              dangerouslySetInnerHTML={{ __html: message.text }}
            />

            {/* Images */}
            {message.image && message.image.length > 0 && (
              <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {message.image.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className='relative rounded-md overflow-hidden aspect-square cursor-pointer hover:scale-105 transition-transform'
                    onClick={() => openLightbox(message.image!, imgIndex)}>
                    <img
                      src={img}
                      alt={`Message image ${imgIndex + 1}`}
                      className='w-full h-full object-cover'
                      loading='lazy'
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className='flex justify-between items-center pt-2 border-t border-[#f0f0f0]'>
              <div className='flex items-center gap-2 text-secondary text-sm'>
                <span className='text-xs'>🕐</span>
                <time>{formatTime(message.time)}</time>
              </div>
              <div className='flex items-center gap-3'>
                {message.views && (
                  <div className='text-secondary text-sm'>
                    {message.views} 浏览
                  </div>
                )}
                <button
                  onClick={handleCommentClick}
                  className='text-secondary hover:text-brand flex items-center gap-1 text-sm transition-colors'
                >
                  💬 评论
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center justify-center gap-2 mt-8 mb-12'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={cn(
                'px-4 py-2 rounded-lg transition-all',
                currentPage === page
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-white/60 hover:bg-white/80 text-secondary hover:text-brand'
              )}
            >
              {page}
            </button>
          ))}
        </motion.div>
      )}

      {/* Comments Section */}
      <div ref={commentsRef} className='w-full max-w-[840px] space-y-6 mt-16 mb-12'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: INIT_DELAY / 2 }}
          className='card relative p-6'>
          <h2 className='text-xl font-bold mb-4'>评论</h2>
          {selectedText && (
            <div className='bg-brand/5 border border-brand/20 rounded-lg p-4 mb-4'>
              <p className='text-sm text-brand mb-2'>你选择的文本：</p>
              <p className='text-sm font-medium'>{selectedText}</p>
              <p className='text-xs text-secondary mt-2'>在下方评论中可以引用这段文本</p>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: INIT_DELAY / 2 }}
          className='card relative p-6'>
          <GiscusComments />
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxInitialIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}