'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ANIMATION_DELAY, INIT_DELAY } from '@/consts'
import { useConfigStore } from '@/app/(home)/stores/config-store'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { TalkLoading } from './components/TalkLoading'
import { GiscusComments } from '@/components/giscus-comments'

// 防抖函数
function debounce(fn: Function, waitMs = 60) {
  let timer: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), waitMs)
  }
}

// 瀑布流布局函数 - 自适应列数
function waterfallLayout(container: HTMLElement) {
  if (!container) return
  
  const items = [...container.children]
  if (!items.length) return

  container.style.position = 'relative'
  items.forEach(item => {
    const htmlItem = item as HTMLElement
    htmlItem.style.position = 'absolute'
  })

  // 根据屏幕宽度自适应调整列数
  const containerWidth = container.clientWidth
  let columns = 3
  if (containerWidth < 640) { // 小屏幕手机
    columns = 1
  } else if (containerWidth < 1024) { // 平板
    columns = 2
  }
  
  const gap = 12 // 间距
  const columnWidth = (containerWidth - (columns - 1) * gap) / columns
  
  const columnHeights: number[] = Array(columns).fill(0)
  const columnPositions: number[] = Array(columns).fill(0)
  
  for (let i = 0; i < columns; i++) {
    columnPositions[i] = i * (columnWidth + gap)
  }

  items.forEach((item, index) => {
    const htmlItem = item as HTMLElement
    // 设置固定宽度
    htmlItem.style.width = `${columnWidth}px`
    
    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights))
    htmlItem.style.top = `${columnHeights[shortestColumn]}px`
    htmlItem.style.left = `${columnPositions[shortestColumn]}px`
    
    columnHeights[shortestColumn] += htmlItem.clientHeight + gap // gap margin bottom
  })

  container.style.height = `${Math.max(...columnHeights)}px`
}

export default function EssaysPage() {
  const { siteContent } = useConfigStore()
  const [loading, setLoading] = useState(true)
  const talkContainerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  // 加载CSS样式
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/essays/shuoshuo.css'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // 渲染TG消息
  const renderTGMessages = () => {
    if (!talkContainerRef.current) return

    // 清理之前的渲染
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }

    talkContainerRef.current.innerHTML = ''
    setLoading(true)

    const generateIconSVG = () => {
      return `<svg viewBox="0 0 512 512"xmlns="http://www.w3.org/2000/svg"class="is-badge icon"><path d="m512 268c0 17.9-4.3 34.5-12.9 49.7s-20.1 27.1-34.6 35.4c.4 2.7.6 6.9.6 12.6 0 27.1-9.1 50.1-27.1 69.1-18.1 19.1-39.9 28.6-65.4 28.6-11.4 0-22.3-2.1-32.6-6.3-8 16.4-19.5 29.6-34.6 39.7-15 10.2-31.5 15.2-49.4 15.2-18.3 0-34.9-4.9-49.7-14.9-14.9-9.9-26.3-23.2-34.3-40-10.3 4.2-21.1 6.3-32.6 6.3-25.5 0-47.4-9.5-65.7-28.6-18.3-19-27.4-42.1-27.4-69.1 0-3 .4-7.2 1.1-12.6-14.5-8.4-26-20.2-34.6-35.4-8.5-15.2-12.8-31.8-12.8-49.7 0-19 4.8-36.5 14.3-52.3s22.3-27.5 38.3-35.1c-4.2-11.4-6.3-22.9-6.3-34.3 0-27 9.1-50.1 27.4-69.1s40.2-28.6 65.7-28.6c11.4 0 22.3-2.1 32.6-6.3 8-16.4 19.5-29.6 34.6-39.7 15-10.1 31.5-15.2 49.4-15.2s34.4 5.1 49.4 15.1c15 10.1 26.6 23.3 34.6 39.7 10.3-4.2 21.1-6.3 32.6-6.3 25.5 0 47.3 9.5 65.4 28.6s27.1 42.1 27.1 69.1c0 12.6-1.9 24-5.7 34.3 16 7.6 28.8 19.3 38.3 35.1 9.5 15.9 14.3 33.4 14.3 52.4zm-266.9 77.1 105.7-158.3c2.7-4.2 3.5-8.8 2.6-13.7-1-4.9-3.5-8.8-7.7-11.4-4.2-2.7-8.8-3.6-13.7-2.9-5 .8-9 3.2-12 7.4l-93.1 140-42.9-42.8c-3.8-3.8-8.2-5.6-13.1-5.4-5 .2-9.3 2-13.1 5.4-3.4 3.4-5.1 7.7-5.1 12.9 0 5.1 1.7 9.4 5.1 12.9l58.9 58.9 2.9 2.3c3.4 2.3 6.9 3.4 10.3 3.4 6.7-.1 11.8-2.9 15.2-8.7z"fill="#1da1f2"></path></svg>`
    }

    const waitForLoadableResources = async (container: HTMLElement, { timeoutMs = 3500 } = {}) => {
      const getPendingTargets = () => {
        const pendingImages = [...container.querySelectorAll('img')].filter((img) => !img.complete)
        const pendingIframes = [...container.querySelectorAll('iframe')].filter(
          (iframe) => iframe.contentDocument == null
        )
        return { pendingImages, pendingIframes }
      }

      const awaitImagesAndIframes = async () => {
        const { pendingImages, pendingIframes } = getPendingTargets()
        const promises = [
          ...pendingImages.flatMap((img) => [
            new Promise((resolve) => img.addEventListener('load', resolve, { once: true })),
            new Promise((resolve) => img.addEventListener('error', resolve, { once: true }))
          ]),
          ...pendingIframes.flatMap((iframe) => [
            new Promise((resolve) => iframe.addEventListener('load', resolve, { once: true })),
            new Promise((resolve) => iframe.addEventListener('error', resolve, { once: true }))
          ])
        ]
        if (!promises.length) return
        await Promise.race([
          Promise.all(promises),
          new Promise((resolve) => setTimeout(resolve, timeoutMs))
        ])
      }

      await Promise.allSettled([awaitImagesAndIframes()])
      return getPendingTargets()
    }

    const setupWaterfallLayoutOnce = (container: HTMLElement, { onReady }: { onReady?: () => void } = {}) => {
      const relayout = debounce(() => waterfallLayout(container), 80)
      window.addEventListener('resize', relayout)

      let didReady = false
      const markReady = () => {
        if (didReady) return
        didReady = true
        if (onReady) onReady()
      }

      const scheduleLateRelayoutOnce = (targets: { pendingImages: HTMLImageElement[]; pendingIframes: HTMLIFrameElement[] }) => {
        let didLateRelayout = false
        const lateRelayout = () => {
          if (didLateRelayout) return
          didLateRelayout = true
          relayout()
        }

        targets.pendingImages.forEach((img) => {
          img.addEventListener('load', lateRelayout, { once: true })
          img.addEventListener('error', lateRelayout, { once: true })
        })
      }

      waitForLoadableResources(container, { timeoutMs: 2500 })
        .then((pendingTargets) => {
          relayout()
          requestAnimationFrame(() => {
            relayout()
            markReady()
          })
          if (pendingTargets.pendingImages.length) {
            scheduleLateRelayoutOnce(pendingTargets)
          }
        })
        .catch(() => {
          relayout()
          markReady()
        })

      return () => {
        window.removeEventListener('resize', relayout)
      }
    }

    const fetchAndRenderTGMessages = () => {
      const url = 'https://tg-api.mcyzsx.top/'
      const cacheKey = 'tgMessagesCache'
      const cacheTimeKey = 'tgMessagesCacheTime'
      const cacheDuration = 30 * 60 * 1000
      const cachedData = localStorage.getItem(cacheKey)
      const cachedTime = localStorage.getItem(cacheTimeKey)
      const now = Date.now()

      if (cachedData && cachedTime && now - parseInt(cachedTime) < cacheDuration) {
        renderTGMessagesList(JSON.parse(cachedData))
      } else {
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP Error: ${res.status} ${res.statusText}`)
            }
            return res.json()
          })
          .then((data) => {
            if (data && Array.isArray(data.ChannelMessageData)) {
              localStorage.setItem(cacheKey, JSON.stringify(data.ChannelMessageData))
              localStorage.setItem(cacheTimeKey, now.toString())
              renderTGMessagesList(data.ChannelMessageData)
            }
          })
          .catch((err) => {
            const errorMsg = err.message || String(err)
            if (!/0x[0-9a-f]+/i.test(errorMsg)) {
              console.error('Error fetching TG messages:', errorMsg)
            }
          })
      }
    }

    const renderTGMessagesList = (list: any[]) => {
      if (!talkContainerRef.current) return
      
      list.map(formatTGMessage).forEach((item) => {
        if (talkContainerRef.current) {
          talkContainerRef.current.appendChild(generateTGMessageElement(item))
        }
      })
      
      if (talkContainerRef.current) {
        cleanupRef.current = setupWaterfallLayoutOnce(talkContainerRef.current, {
          onReady: () => setLoading(false)
        })
      }
    }

    const formatTGMessage = (item: any) => {
      const date = formatTime(item.time)
      let content = item.text || ''
      
      // 移除多余的空格和换行
      content = content.replace(/\s+/g, ' ').trim()
      
      // 处理Markdown分隔线 ---
      content = content.replace(/---/g, '<hr class="markdown-separator">')
      
      // 处理图片 - 支持灯箱
      if (Array.isArray(item.image) && item.image.length > 0) {
        const imgDiv = document.createElement('div')
        imgDiv.className = 'zone_imgbox'
        item.image.forEach((img: string) => {
          const imgTag = document.createElement('img')
          imgTag.src = img.trim()
          imgTag.className = 'zoomable cursor-zoom-in'
          imgTag.setAttribute('data-zoomable', 'true')
          imgDiv.appendChild(imgTag)
        })
        content += imgDiv.outerHTML
      }

      // 处理标签
      if (Array.isArray(item.tags) && item.tags.length > 0) {
        const tagsHtml = item.tags.map((tag: string) => `<span class="tag">#${tag}</span>`).join(' ')
        content += `<div class="tags">${tagsHtml}</div>`
      }

      // 处理浏览量
      if (item.views) {
        content += `<div class="views">👁️ ${item.views}</div>`
      }

      return {
        content,
        user: '钟神秀',
        avatar: 'https://home.zsxcoder.top/api/avatar.png',
        date,
        location: '',
        text: content.replace(/<[^>]+>/g, '')
      }
    }

    const generateTGMessageElement = (item: any) => {
      const talkItem = document.createElement('div')
      talkItem.className = 'talk_item'

      const talkMeta = document.createElement('div')
      talkMeta.className = 'talk_meta'
      const avatar = document.createElement('img')
      avatar.className = 'no-lightbox avatar'
      avatar.src = item.avatar

      const info = document.createElement('div')
      info.className = 'info'
      const nick = document.createElement('span')
      nick.className = 'talk_nick'
      nick.innerHTML = `${item.user} ${generateIconSVG()}`
      const date = document.createElement('span')
      date.className = 'talk_date'
      date.textContent = item.date
      info.appendChild(nick)
      info.appendChild(date)
      talkMeta.appendChild(avatar)
      talkMeta.appendChild(info)

      const talkContent = document.createElement('div')
      talkContent.className = 'talk_content'
      talkContent.innerHTML = item.content

      const talkBottom = document.createElement('div')
      talkBottom.className = 'talk_bottom'

      const commentLink = document.createElement('a')
      commentLink.href = 'javascript:;'
      commentLink.onclick = () => goComment(item.text)
      commentLink.className = 'quote-btn'
      commentLink.title = '引用此消息'
      const icon = document.createElement('span')
      icon.className = 'icon'
      icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M44 6H4v30h9v5l10-5h21zM14 19.5v3m10-3v3m10-3v3"/></svg>'
      commentLink.appendChild(icon)

      talkBottom.appendChild(commentLink)

      talkItem.appendChild(talkMeta)
      talkItem.appendChild(talkContent)
      talkItem.appendChild(talkBottom)

      return talkItem
    }

    const goComment = (e: string) => {
      const textContent = e.replace(/<[^>]+>/g, '')
      const quoteText = `> ${textContent}\n\n`
      
      // 跳转到Giscus评论区
      const giscusElement = document.querySelector('.giscus')
      if (giscusElement) {
        giscusElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      
      // 复制引用文本到剪贴板
      navigator.clipboard.writeText(quoteText)
        .then(() => {
          toast.success('已复制引用文本并跳转到评论区，请粘贴使用 ✨')
        })
        .catch(err => {
          console.error('无法复制文本: ', err)
          toast.info('已跳转到评论区，请手动复制引用文本 ✨')
        })
    }

    const formatTime = (time: number) => {
      const d = new Date(time)
      const pad = (n: number) => n.toString().padStart(2, '0')
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
    }

    fetchAndRenderTGMessages()
  }

  // 灯箱状态
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState('')
  const lightboxRef = useRef<HTMLDivElement>(null)

  // 打开灯箱
  const openLightbox = (imageSrc: string) => {
    setCurrentImage(imageSrc)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  // 关闭灯箱
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  // 灯箱点击事件处理
  const handleLightboxClick = (e: React.MouseEvent) => {
    if (e.target === lightboxRef.current) {
      closeLightbox()
    }
  }

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  // 初始化和重新渲染时处理
  useEffect(() => {
    renderTGMessages()

    // 为图片添加点击事件
    const addImageClickEvents = () => {
      const images = document.querySelectorAll('.zoomable')
      images.forEach(img => {
        img.addEventListener('click', () => {
          if (img instanceof HTMLImageElement) {
            openLightbox(img.src)
          }
        })
      })
    }

    // 初始添加事件
    addImageClickEvents()

    // 监听新图片加载完成后添加事件和布局变化
    const observer = new MutationObserver((mutations) => {
      addImageClickEvents()
      // 当内容发生变化时，重新计算瀑布流布局
      if (talkContainerRef.current) {
        // 检查是否有新元素添加
        const hasNewElements = mutations.some(mutation => 
          mutation.type === 'childList' && mutation.addedNodes.length > 0
        );
        if (hasNewElements) {
          // 等待图片加载完成后重新布局
          setTimeout(() => {
            const relayout = debounce(() => {
              if (talkContainerRef.current) {
                const items = [...talkContainerRef.current.children];
                if (items.length > 0) {
                  waterfallLayout(talkContainerRef.current);
                }
              }
            }, 80);
            relayout();
          }, 100);
        }
      }
    })

    if (talkContainerRef.current) {
      observer.observe(talkContainerRef.current, { childList: true, subtree: true })
    }

    // 监听窗口聚焦事件，当用户从其他页面返回时重新计算布局
    const handleWindowFocus = () => {
      if (talkContainerRef.current) {
        const items = [...talkContainerRef.current.children];
        if (items.length > 0) {
          setTimeout(() => {
            if (talkContainerRef.current) {
              waterfallLayout(talkContainerRef.current);
            }
          }, 100);
        }
      }
    };

    window.addEventListener('focus', handleWindowFocus);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
      observer.disconnect()
      window.removeEventListener('focus', handleWindowFocus);
    }
  }, [])

  return (
    <>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-12">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INIT_DELAY, duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-brand-secondary">
              我的说说
            </span>
          </h1>
          <p className="text-secondary max-w-2xl mx-auto">
            记录生活中的点滴，分享我的想法和感悟
          </p>
        </motion.div>

        {/* Telegram 频道介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INIT_DELAY + ANIMATION_DELAY, duration: 0.5 }}
          className="mb-8 rounded-2xl bg-card/80 backdrop-blur-sm border p-6 text-center"
        >
          <p className="text-sm text-secondary">
            实时同步 Telegram 频道消息
          </p>
        </motion.div>

        {/* 说说内容区域 */}
        <div className="rounded-2xl bg-card/80 backdrop-blur-sm border p-8">
          {loading && <TalkLoading />}
          <div 
            ref={talkContainerRef} 
            id="talk" 
            className={cn("talk-pending", {
              'opacity-100': !loading,
              'hidden': loading
            })}
          ></div>
        </div>

        {/* Giscus Comments */}
        <GiscusComments className="mt-12" />
      </div>

      {/* 灯箱组件 */}
      {lightboxOpen && (
        <motion.div
          ref={lightboxRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleLightboxClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
              onClick={closeLightbox}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={currentImage}
              alt="放大图片"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </>
  )
}
