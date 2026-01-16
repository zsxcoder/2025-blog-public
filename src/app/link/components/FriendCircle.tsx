'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'

interface Article {
  author: string
  title: string
  link: string
  created: string
  avatar: string
}

interface Stats {
  friends_num: number
  active_num: number
  article_num: number
  last_updated_time: string
}

interface FriendCircleProps {
  // 可以根据需要添加props
}

const FriendCircle: React.FC<FriendCircleProps> = () => {
  // 配置选项
  const UserConfig = {
    private_api_url: 'https://moments.myxz.top/',
    page_turning_number: 20,
    error_img: "https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico"
  }

  // 状态管理
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([])
  const [stats, setStats] = useState<Stats>({
    friends_num: 0,
    active_num: 0,
    article_num: 0,
    last_updated_time: ''
  })
  const [start, setStart] = useState(0)
  const [hasMoreArticles, setHasMoreArticles] = useState(true)
  const [randomArticle, setRandomArticle] = useState<Article | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [currentAuthor, setCurrentAuthor] = useState('')
  const [currentAuthorAvatar, setCurrentAuthorAvatar] = useState('')
  const [authorOrigin, setAuthorOrigin] = useState('')
  const [authorArticles, setAuthorArticles] = useState<Article[]>([])

  // 页面挂载时初始化
  useEffect(() => {
    initializeFC()
    return () => {
      window.removeEventListener('click', globalClickHandler)
    }
  }, [])

  // 友链圈初始化
  const initializeFC = () => {
    loadMoreArticles()
  }

  // 加载更多文章
  const loadMoreArticles = async () => {
    const cacheKey = 'friend-circle-lite-cache'
    const cacheTimeKey = 'friend-circle-lite-cache-time'
    const now = new Date().getTime()

    try {
      // 检查缓存
      if (typeof localStorage !== 'undefined') {
        const cacheTime = localStorage.getItem(cacheTimeKey)
        if (cacheTime && (now - parseInt(cacheTime) < 10 * 60 * 1000)) {
          const cachedData = localStorage.getItem(cacheKey)
          if (cachedData) {
            processArticles(JSON.parse(cachedData))
            return
          }
        }
      }

      // 从API获取数据
      const response = await fetch(`${UserConfig.private_api_url}all.json`)
      const data = await response.json()

      // 更新缓存
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify(data))
        localStorage.setItem(cacheTimeKey, now.toString())
      }

      processArticles(data)
    } catch (error) {
      console.error('加载文章失败:', error)
    }
  }

  // 处理文章数据
  const processArticles = (data: any) => {
    // 更新统计数据
    setStats({
      friends_num: data.statistical_data.friends_num,
      active_num: data.statistical_data.active_num,
      article_num: data.statistical_data.article_num,
      last_updated_time: data.statistical_data.last_updated_time
    })

    // 合并新旧文章
    const newArticles = data.article_data
    const mergedArticles = [...allArticles, ...newArticles]
    setAllArticles(mergedArticles)

    // 更新显示的列表
    const newDisplayed = mergedArticles.slice(
      start,
      start + UserConfig.page_turning_number
    )
    setDisplayedArticles([...displayedArticles, ...newDisplayed])

    // 更新起始位置
    setStart(start + UserConfig.page_turning_number)

    // 检查是否有更多文章
    setHasMoreArticles(start + UserConfig.page_turning_number < mergedArticles.length)

    // 显示随机文章
    if (!randomArticle) {
      displayRandomArticle()
    }
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    return dateString ? dateString.substring(0, 10) : ''
  }

  // 显示随机文章
  const displayRandomArticle = () => {
    if (allArticles.length > 0) {
      const randomIndex = Math.floor(Math.random() * allArticles.length)
      setRandomArticle(allArticles[randomIndex])
    }
  }

  // 头像加载处理
  const avatarOrDefault = (avatar: string) => {
    return avatar || UserConfig.error_img
  }

  const handleAvatarError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = UserConfig.error_img
  }

  // 打开文章链接
  const openArticle = (link: string) => {
    window.open(link, '_blank')
  }

  // 打开随机文章
  const openRandomArticle = () => {
    if (randomArticle) {
      window.open(randomArticle.link, '_blank')
    }
  }

  // 显示作者文章模态框
  const showAuthorArticles = (author: string, avatar: string, link: string) => {
    setCurrentAuthor(author)
    setCurrentAuthorAvatar(avatar)
    setAuthorOrigin(new URL(link).origin)
    setAuthorArticles(allArticles
      .filter(article => article.author === author)
      .slice(0, 4)
    )

    setShowModal(true)
    if (typeof document !== 'undefined') {
      document.body.classList.add('overflow-hidden')
    }
    window.addEventListener('click', globalClickHandler)
  }

  // 全局点击事件处理
  const globalClickHandler = (event: MouseEvent) => {
    if ((event.target as HTMLElement).id === 'modal') {
      hideModal()
    }
  }

  // 隐藏模态框
  const hideModal = () => {
    setShowModal(false)
    if (typeof document !== 'undefined') {
      document.body.classList.remove('overflow-hidden')
    }
    window.removeEventListener('click', globalClickHandler)
  }

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      {/* 友链朋友圈标题 */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 font-serif mb-2">友链朋友圈</h2>
        <p className="text-sm text-orange-500 font-serif">
          探索友链的最新动态
        </p>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-400 p-4 text-center">
          <p className="text-sm text-orange-500 font-medium">总友链数</p>
          <p className="text-2xl font-bold text-orange-500">{stats.friends_num}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-400 p-4 text-center">
          <p className="text-sm text-orange-500 font-medium">活跃友链</p>
          <p className="text-2xl font-bold text-orange-500">{stats.active_num}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-400 p-4 text-center">
          <p className="text-sm text-orange-500 font-medium">文章总数</p>
          <p className="text-2xl font-bold text-orange-500">{stats.article_num}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-400 p-4 text-center">
          <p className="text-sm text-orange-500 font-medium">最后更新</p>
          <p className="text-sm text-orange-500">{stats.last_updated_time}</p>
        </div>
      </div>

      {/* 随机文章区域 */}
      {randomArticle && (
        <div className="mb-8 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-400 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-orange-500 flex items-center gap-2">
              随机文章
            </h3>
            <button
              onClick={displayRandomArticle}
              className="p-2 rounded-full text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-colors"
              title="刷新随机文章"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          <div 
            className="bg-white dark:bg-white/5 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={openRandomArticle}
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={avatarOrDefault(randomArticle.avatar)}
                onError={handleAvatarError}
                className="w-8 h-8 rounded-full object-cover"
                alt={randomArticle.author}
              />
              <span className="text-sm font-medium text-orange-500">{randomArticle.author}</span>
            </div>
            <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-2 hover:text-orange-500 transition-colors">
              {randomArticle.title}
            </h4>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatDate(randomArticle.created)}</span>
              <ExternalLink size={12} className="ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* 文章列表区域 */}
      <div className="bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-400 p-6 mb-8">
        <h3 className="text-lg font-bold text-orange-500 mb-4">最新动态</h3>
        <div className="space-y-4">
          {displayedArticles.map((article, index) => (
            <div key={index} className="flex items-start gap-3 bg-white dark:bg-white/5 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div 
                className="flex-shrink-0 cursor-pointer"
                onClick={() => showAuthorArticles(article.author, article.avatar, article.link)}
              >
                <img
                  src={avatarOrDefault(article.avatar)}
                  onError={handleAvatarError}
                  className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
                  alt={article.author}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-orange-500 cursor-pointer hover:underline">
                    {article.author}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(article.created)}
                  </span>
                </div>
                <h4 
                  className="text-sm font-semibold text-gray-800 dark:text-white mb-1 hover:text-orange-500 transition-colors cursor-pointer"
                  onClick={() => openArticle(article.link)}
                >
                  {article.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多按钮 */}
        {hasMoreArticles && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMoreArticles}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              加载更多
            </button>
          </div>
        )}
      </div>

      {/* 作者模态框 */}
      {showModal && (
        <div
          id="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          onClick={hideModal}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-orange-400 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            {/* 模态框头部 */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-orange-200 dark:border-orange-500/20">
              <div className="flex items-center gap-3">
                <img
                  src={avatarOrDefault(currentAuthorAvatar)}
                  onError={handleAvatarError}
                  className="w-12 h-12 rounded-full object-cover"
                  alt={currentAuthor}
                />
                <div>
                  <h3 className="text-lg font-bold text-orange-500">{currentAuthor}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{authorOrigin}</p>
                </div>
              </div>
              <button
                onClick={hideModal}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* 作者文章列表 */}
            <div className="space-y-3">
              {authorArticles.map((article, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <h4 
                    className="text-sm font-semibold text-gray-800 dark:text-white mb-2 hover:text-orange-500 transition-colors cursor-pointer"
                    onClick={() => {
                      openArticle(article.link)
                      hideModal()
                    }}
                  >
                    {article.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{formatDate(article.created)}</span>
                    <ExternalLink size={12} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FriendCircle
