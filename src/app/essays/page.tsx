'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'

interface ChannelMessage {
  id: string
  text: string
  image: string[]
  time: number
  views: string
  tags: string[]
}

interface TgApiResponse {
  nextBefore: number
  Region: string
  version: string
  ChannelMessageData: ChannelMessage[]
}

export default function Essays() {
  // 状态管理
  const [messages, setMessages] = useState<ChannelMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // 页面挂载时初始化
  useEffect(() => {
    fetchMessages()
  }, [])

  // 从API获取数据
  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError(false)
      const response = await fetch('https://tg-api.mcyzsx.top/')
      const data: TgApiResponse = await response.json()
      setMessages(data.ChannelMessageData)
    } catch (err) {
      console.error('加载消息失败:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  // 格式化时间
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 清理HTML标签，只保留部分允许的标签
  const cleanHtml = (html: string) => {
    // 简单的HTML清理，保留一些基本标签
    return html
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<[^>]*>/gi, (tag) => {
        // 只保留a, b, br标签
        if (tag.match(/<\/?(a|b|br)\s*[^>]*>/i)) {
          return tag
        }
        return ''
      })
  }

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* 页面标题 */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 font-serif mb-2">说说</h2>
        <p className="text-sm text-orange-500 font-serif">
          记录生活点滴
        </p>
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-400 p-6 text-center">
          <p className="text-red-500 mb-4">加载失败，请重试</p>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            重新加载
          </button>
        </div>
      )}

      {/* 消息列表 */}
      {!loading && !error && (
        <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-400 p-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="bg-white dark:bg-white/5 rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* 消息内容 */}
                <div 
                  className="mb-4 text-sm text-gray-800 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: cleanHtml(message.text) }}
                />
                
                {/* 图片展示 */}
                {message.image.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {message.image.map((imgUrl, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden">
                        <img
                          src={imgUrl}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          alt={`消息图片 ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* 标签 */}
                {message.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {message.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-500 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 底部信息 */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>{formatDate(message.time)}</span>
                    <span>浏览 {message.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
