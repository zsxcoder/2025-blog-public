'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, RefreshCw, Hash } from 'lucide-react'

interface Post {
  id: string
  text: string
  image: string[]
  time: number
  views: string
  tags: string[]
}

const EssaysPage: React.FC = () => {
  // 配置选项
  const API_URL = 'https://tg-api.mcyzsx.top/'
  const CACHE_TIME = 10 * 60 * 1000 // 10分钟缓存

  // 状态管理
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentImages, setCurrentImages] = useState<string[]>([])

  // 获取说说数据
  const fetchPosts = async () => {
    const cacheKey = 'essays-cache'
    const cacheTimeKey = 'essays-cache-time'
    const now = Date.now()

    try {
      // 检查缓存
      if (typeof localStorage !== 'undefined') {
        const cacheTime = localStorage.getItem(cacheTimeKey)
        const cachedData = localStorage.getItem(cacheKey)
        
        if (cacheTime && cachedData && (now - parseInt(cacheTime) < CACHE_TIME)) {
          const parsedData = JSON.parse(cachedData)
          setPosts(parsedData)
          setLoading(false)
          return
        }
      }

      // 从API获取数据
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch essays data')
      }
      
      const data = await response.json()
      const postsData = data.ChannelMessageData || []
      
      // 更新缓存
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify(postsData))
        localStorage.setItem(cacheTimeKey, now.toString())
      }
      
      setPosts(postsData)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
      setLoading(false)
    }
  }

  // 页面挂载时获取数据
  useEffect(() => {
    fetchPosts()
  }, [])

  // 格式化时间
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 打开图片模态框
  const openImageModal = (images: string[], index: number) => {
    setCurrentImages(images)
    setCurrentImageIndex(index)
    setShowImageModal(true)
    if (typeof document !== 'undefined') {
      document.body.classList.add('overflow-hidden')
    }
  }

  // 关闭图片模态框
  const closeImageModal = () => {
    setShowImageModal(false)
    if (typeof document !== 'undefined') {
      document.body.classList.remove('overflow-hidden')
    }
  }

  // 下一张图片
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  // 上一张图片
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  // 渲染HTML内容（安全处理）
  const renderText = (text: string) => {
    return {
      __html: text
    }
  }

  // 刷新数据
  const handleRefresh = () => {
    setLoading(true)
    fetchPosts()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-orange-500 font-medium">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-2">加载失败</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex-1 flex flex-col relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20">
        {/* 页面标题 */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 font-serif mb-4">
            说说
          </h1>
          <p className="text-lg text-orange-500 font-serif italic">
            记录生活的点滴
          </p>
        </div>

        {/* 刷新按钮 */}
        <div className="flex justify-end mb-6 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            刷新
          </button>
        </div>

        {/* 说说列表 */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-orange-400 p-6 hover:shadow-xl transition-shadow"
            >
              {/* 说说内容 */}
              <div className="mb-4">
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={renderText(post.text)}
                />
              </div>

              {/* 图片展示 */}
              {post.image && post.image.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {post.image.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative rounded-lg overflow-hidden cursor-pointer group"
                      onClick={() => openImageModal(post.image, imgIndex)}
                    >
                      <img
                        src={img}
                        alt={`Post image ${imgIndex + 1}`}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-medium">查看大图</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 标签和元信息 */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-orange-100 dark:border-gray-700">
                {/* 标签 */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, tagIndex) => (
                      <a
                        key={tagIndex}
                        href={`?q=${encodeURIComponent(tag)}`}
                        className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        <Hash size={12} />
                        {tag.replace('#', '')}
                      </a>
                    ))}
                  </div>
                )}

                {/* 元信息 */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">{post.views}</span>
                    <span>浏览</span>
                  </span>
                  <span>{formatTime(post.time)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 空状态 */}
        {posts.length === 0 && (
          <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h3 className="text-xl font-bold text-orange-500 mb-2">暂无说说</h3>
            <p className="text-gray-600 dark:text-gray-400">快来发布第一条说说吧！</p>
          </div>
        )}

        {/* 图片查看模态框 */}
        {showImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative max-w-5xl w-full mx-4">
              {/* 关闭按钮 */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 图片导航 */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* 图片展示 */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={currentImages[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {/* 图片计数 */}
                {currentImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                    {currentImageIndex + 1} / {currentImages.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default EssaysPage
