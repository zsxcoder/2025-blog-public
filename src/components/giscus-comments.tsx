'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'

interface GiscusCommentsProps {
  className?: string
}

export function GiscusComments({ className = '' }: GiscusCommentsProps) {
  const giscusRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!giscusRef.current) return
    
    // 检查是否已经加载了giscus脚本
    if (document.querySelector('script[src="https://giscus.app/client.js"]')) {
      return
    }
    
    // 创建giscus脚本
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'zsxcoder/giscus-comments')
    script.setAttribute('data-repo-id', 'R_kgDOQoZP0g')
    script.setAttribute('data-category', 'blog-public')
    script.setAttribute('data-category-id', 'DIC_kwDOQoZP0s4C1CIY')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('async', '')
    
    // 添加到页面
    document.body.appendChild(script)
    
    return () => {
      // 清理脚本
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])
  
  return (
    <div ref={giscusRef} className={className}>
      <div className="giscus" data-repo="zsxcoder/giscus-comments" 
           data-repo-id="R_kgDOQoZP0g" 
           data-category="blog-public" 
           data-category-id="DIC_kwDOQoZP0s4C1CIY" 
           data-mapping="pathname" 
           data-strict="0" 
           data-reactions-enabled="1" 
           data-emit-metadata="0" 
           data-input-position="top" 
           data-theme="light" 
           data-lang="zh-CN" 
           data-loading="lazy"></div>
    </div>
  )
}
