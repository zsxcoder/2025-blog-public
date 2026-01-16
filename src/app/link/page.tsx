'use client'

import { useEffect } from 'react'
import FriendsList from './components/FriendsList'
import FriendLevelLegend from './components/FriendLevelLegend'
import DisconnectedFriendsList from './components/DisconnectedFriendsList'
import SiteInfo from './components/SiteInfo'
import ErrorBoundary from './components/ErrorBoundary'
import FriendCircle from './components/FriendCircle'
import { FRIEND_LINKS } from './friends'
import { FRIEND_LINK_CONTACT } from '@/config/site-content.json'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen relative flex flex-col">
      <main className="flex-1 flex flex-col relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 z-10">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-500 font-serif mb-4">友情链接</h1>
            <p className="text-lg text-orange-500 font-serif italic">
              探索更多优秀的内容创作者和技术伙伴。
            </p>
          </div>

          {/* Legend */}
          <ErrorBoundary>
            <FriendLevelLegend />
          </ErrorBoundary>

          {/* Friends List with Pagination */}
          <ErrorBoundary>
            <FriendsList links={FRIEND_LINKS} />
          </ErrorBoundary>

          {/* Disconnected Friends List */}
          <ErrorBoundary>
            <DisconnectedFriendsList links={FRIEND_LINKS} />
          </ErrorBoundary>

          {/* Friend Circle */}
          <ErrorBoundary>
            <FriendCircle />
          </ErrorBoundary>

          {/* Apply Section - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* 申请友链 */}
            <div className="rounded-2xl bg-slate-50 dark:bg-white/5 border border-orange-400 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <h3 className="text-lg font-bold text-orange-500">申请友链</h3>
              </div>
              <p className="text-sm text-orange-500 mb-4">
                欢迎技术与生活类博客交换友链
              </p>
              <p className="text-sm text-teal-500 mb-4">
                评论区留言或请发送邮件至 <a href={`mailto:${FRIEND_LINK_CONTACT.email}`} className="text-orange-500 hover:underline">{FRIEND_LINK_CONTACT.email}</a>
              </p>
              {/* 提示信息框 */}
              <div className="rounded-lg border-2 border-dashed border-orange-500/30 dark:border-orange-500/30 bg-orange-500/5 dark:bg-orange-500/10 p-4 text-center">
                <p className="text-sm text-orange-500 font-medium mb-1">
                  博客名称、描述、地址、头像等信息
                </p>
                <p className="text-xs text-orange-500">
                  任意格式均可,包含基本信息即可
                </p>
              </div>
            </div>

            {/* 本站信息 */}
            <SiteInfo 
              name={FRIEND_LINK_CONTACT.name}
              url={FRIEND_LINK_CONTACT.url}
              description={FRIEND_LINK_CONTACT.description}
              avatar={FRIEND_LINK_CONTACT.avatar}
            />
          </div>
        </div>
      </main>
    </div>
  )
}