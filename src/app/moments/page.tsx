'use client'

import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'
import { cn } from '@/lib/utils'
import { Lightbox } from '@/components/Lightbox'
import { GiscusComments } from '@/components/giscus-comments'

// 导入 Markdown 渲染相关库
import { marked } from 'marked'

// 扩展 dayjs 以支持相对时间
dayjs.extend(relativeTime)

// 定义类型接口
interface UserInfo {
  firstName: string
  lastName: string
  userName: string
  emailAddresses: string
  imageUrl: string
}

interface Moment {
  userId: string
  tags: string[]
  userInfo: UserInfo
  message: string
  createdAt: string
  isArchived: boolean
  isUseMarkdown: boolean
  isPinned: boolean
  id: string
}

export default function MomentsPage() {
  // 备用数据 - 必须放在所有 useState 调用之前，避免引用错误
  const fallbackMoments: Moment[] = [
    {
      "userId": "user_38hLQoylDbC9CVHM9Vl6YgClR70",
      "tags": [],
      "userInfo": {
        "firstName": "Mao",
        "lastName": "Chenyu",
        "userName": "zsxcoder",
        "emailAddresses": "chenyumao815@outlook.com",
        "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18zOGhMUXJ6SEhiQ2tSa0VXcVh5aGp1ajY3WnAifQ"
      },
      "message": "测试Markdown语法\n# 标题1\n## 标题2\n### 标题3\n\n测试**粗体**、测试*斜体*\n测试`代码`\n\n测试代码块\n```\nHello World\n```\n- 测试\n- 无序列表\n\n1. 测试\n2. 有序列表\n\n测试 https://bing.kemeow.top/ \n\n![](https://bing.kemeow.top/picture/2026-01-25.webp)",
      "createdAt": "2026-01-25T14:04:42.905Z",
      "isArchived": false,
      "isUseMarkdown": true,
      "isPinned": false,
      "id": "B9"
    },
    {
      "userId": "user_38hLQoylDbC9CVHM9Vl6YgClR70",
      "tags": ["日常"],
      "userInfo": {
        "firstName": "Mao",
        "lastName": "Chenyu",
        "userName": "zsxcoder",
        "emailAddresses": "chenyumao815@outlook.com",
        "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18zOGhMUXJ6SEhiQ2tSa0VXcVh5aGp1ajY3WnAifQ"
      },
      "message": "算是修好了吧？",
      "createdAt": "2026-01-24T13:53:32.496Z",
      "isArchived": false,
      "isUseMarkdown": false,
      "isPinned": false,
      "id": "Oz"
    },
    {
      "userId": "user_38hLQoylDbC9CVHM9Vl6YgClR70",
      "tags": ["测试"],
      "userInfo": {
        "firstName": "Mao",
        "lastName": "Chenyu",
        "userName": "zsxcoder",
        "emailAddresses": "chenyumao815@outlook.com",
        "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18zOGhMUXJ6SEhiQ2tSa0VXcVh5aGp1ajY3WnAifQ"
      },
      "message": "测试",
      "createdAt": "2026-01-24T11:01:21.941Z",
      "isArchived": false,
      "isUseMarkdown": false,
      "isPinned": false,
      "id": "oP"
    }
  ]

  // 初始使用备用数据，确保页面加载时就有内容显示
  const itemsPerPage = 15
  const [moments, setMoments] = useState<Moment[]>(fallbackMoments)
  const [loading, setLoading] = useState(false) // 初始为 false，因为已有备用数据
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil(fallbackMoments.length / itemsPerPage))
  
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
  }

  // 备用数据已移到组件顶部

  // Fetch data from API (在后台尝试获取最新数据，不影响页面初始加载)
  const fetchData = async () => {
    // 不设置 loading 状态，避免影响用户体验
    try {
      // 尝试使用 fetch 请求数据
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒超时
      
      const response = await fetch('https://mm.zsxcoder.top/public/notes', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const data: Moment[] = await response.json()
        // 按创建时间倒序排序
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setMoments(data)
        setTotalPages(Math.ceil(data.length / itemsPerPage))
      }
      // 如果响应不ok，不做任何处理，继续使用备用数据
    } catch (error) {
      // 静默处理错误，不显示在控制台
      // 继续使用备用数据
    }
  }

  // 处理 Markdown 内容（备用函数，用于需要自定义渲染时使用）
  // const renderContent = (content: string, isMarkdown: boolean) => {
  //   if (isMarkdown) {
  //     // 处理图片，为其添加点击事件
  //     const renderedMarkdown = marked.parse(content)
  //     // 暂时返回原始 Markdown 渲染结果，后续可以添加图片点击事件
  //     return renderedMarkdown
  //   }
  //   return content
  // }

  // 提取内容中的图片链接
  const extractImages = (content: string): string[] => {
    const imageRegex = /!\[.*?\]\((.*?)\)/g
    const images: string[] = []
    let match
    while ((match = imageRegex.exec(content)) !== null) {
      images.push(match[1])
    }
    return images
  }

  // Format time: 24小时内显示相对时间，24小时外显示具体日期时间
  const formatTime = (dateString: string) => {
    const now = dayjs()
    const momentTime = dayjs(dateString)
    const diffHours = now.diff(momentTime, 'hour')
    
    if (diffHours < 24) {
      return momentTime.fromNow()
    } else {
      return momentTime.format('YYYY-MM-DD HH:mm')
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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

  // Calculate current moments for pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMoments = moments.slice(indexOfFirstItem, indexOfLastItem)

  // 移除加载状态检查，因为初始使用备用数据，页面加载时就有内容显示
  // 后台会尝试获取最新数据，但不影响用户体验

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
          <div className='text-secondary text-sm'>{moments.length} 条</div>
        </div>
      </motion.div>

      {/* Moments List */}
      <div className='w-full max-w-[840px] space-y-6'>
        {currentMoments.map((moment, index) => {
          // 提取图片链接
          const images = extractImages(moment.message)
          
          return (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: INIT_DELAY / 2 }}
              className='card relative p-6 space-y-4'>
              {/* User Info */}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                  <img
                    src={moment.userInfo.imageUrl}
                    alt={moment.userInfo.userName}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div>
                  <h3 className='font-semibold'>{moment.userInfo.firstName} {moment.userInfo.lastName}</h3>
                  <div className='flex items-center gap-2 text-secondary text-xs'>
                    <time>{formatTime(moment.createdAt)}</time>
                    {moment.tags.length > 0 && (
                      <div className='flex items-center gap-1'>
                        {moment.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className='bg-brand/10 text-brand text-xs px-1.5 py-0.5 rounded'>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className='text-base leading-relaxed'>
                {moment.isUseMarkdown ? (
                  // 对于 Markdown 内容，先提取图片，然后渲染内容和可点击的图片网格
                  <div>
                    {/* 渲染 Markdown 内容（不含图片，避免重复） */}
                    <div className='prose prose-sm max-w-none'>
                      <div dangerouslySetInnerHTML={{ __html: marked.parse(moment.message.replace(/!\[.*?\]\((.*?)\)/g, '')) }} />
                    </div>
                    
                    {/* 渲染可点击的图片网格 */}
                    {images.length > 0 && (
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
                        {images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className='relative rounded-md overflow-hidden aspect-square cursor-pointer hover:scale-105 transition-transform'
                            onClick={() => openLightbox(images, imgIndex)}>
                            <img
                              src={img}
                              alt={`Moment image ${imgIndex + 1}`}
                              className='w-full h-full object-cover'
                              loading='lazy'
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // 对于非 Markdown 内容，检查是否包含图片链接并渲染
                  <div>
                    <p>{moment.message}</p>
                    {images.length > 0 && (
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
                        {images.map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className='relative rounded-md overflow-hidden aspect-square cursor-pointer hover:scale-105 transition-transform'
                            onClick={() => openLightbox(images, imgIndex)}>
                            <img
                              src={img}
                              alt={`Moment image ${imgIndex + 1}`}
                              className='w-full h-full object-cover'
                              loading='lazy'
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className='flex justify-end items-center pt-2 border-t border-[#f0f0f0]'>
                <div className='flex items-center gap-3'>
                  <button
                    onClick={handleCommentClick}
                    className='text-secondary hover:text-brand flex items-center gap-1 text-sm transition-colors'
                  >
                    💬 评论
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
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
