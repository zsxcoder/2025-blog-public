'use client'

import { motion } from 'motion/react'

const skeletonItems = [
  { meta: [60, 40], body: [95, 90, 70], block: true, pill: 55 },
  { meta: [55, 35], body: [90, 80, 75], block: false, pill: 50 },
  { meta: [65, 45], body: [90, 85, 60], block: true, pill: 60 },
  { meta: [50, 30], body: [95, 75, 85], block: false, pill: 45 },
  { meta: [60, 40], body: [85, 90, 55], block: true, pill: 55 },
  { meta: [55, 35], body: [90, 75, 70], block: false, pill: 50 }
]

export function TalkLoading() {
  return (
    <div id='talk-loading' className='talk-loading' aria-live='polite' aria-busy='true'>
      <div className='talk-skeleton' aria-hidden='true'>
        {skeletonItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='talk-skeleton-item'
          >
            <div className='talk-skeleton-meta'>
              <div className='talk-skeleton-avatar skeleton' />
              <div className='talk-skeleton-meta-text'>
                <div className='talk-skeleton-line skeleton' style={{ width: `${item.meta[0]}%` }} />
                <div className='talk-skeleton-line skeleton' style={{ width: `${item.meta[1]}%` }} />
              </div>
            </div>
            <div className='talk-skeleton-body'>
              {item.body.map((w, i) => (
                <div key={i} className='talk-skeleton-line skeleton' style={{ width: `${w}%` }} />
              ))}
              {item.block && <div className='talk-skeleton-block skeleton' />}
            </div>
            <div className='talk-skeleton-footer'>
              <div className='talk-skeleton-pill skeleton' style={{ width: `${item.pill}%` }} />
              <div className='talk-skeleton-icon skeleton' />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// 内联样式
const styles = `
.talk-loading {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  padding: 16px 0;
  user-select: none;
}
.talk-loading-dots::after {
  display: inline-block;
  content: '...';
  width: 0;
  overflow: hidden;
  text-align: left;
  animation: talk-dots 1.2s steps(4, end) infinite;
}
@keyframes talk-dots {
  0% {
    width: 0;
  }
  25% {
    width: 0.55em;
  }
  50% {
    width: 1.1em;
  }
  75% {
    width: 1.65em;
  }
  100% {
    width: 0;
  }
}

.talk-skeleton {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 12px 9px;
  width: 100%;
}
.talk-skeleton-item {
  width: calc(33.333% - 6px);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  overflow: hidden;
}

/* 液态玻璃样式的skeleton */
.dark .talk-skeleton-item {
  background: rgba(17, 24, 39, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

@media (max-width: 900px) {
  .talk-skeleton-item {
    width: calc(50% - 5px);
  }
}
@media (max-width: 450px) {
  .talk-skeleton-item {
    width: calc(100%);
  }
}

.talk-skeleton-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
}
.dark .talk-skeleton-meta {
  border-bottom-color: rgba(255, 255, 255, 0.1);
}
.talk-skeleton-avatar {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  flex: none;
}
.talk-skeleton-meta-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.talk-skeleton-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}
.talk-skeleton-line {
  height: 12px;
  border-radius: 999px;
}
.talk-skeleton-block {
  height: 84px;
  border-radius: 12px;
  margin-top: 2px;
}
.talk-skeleton-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px dashed rgba(255, 255, 255, 0.2);
}
.dark .talk-skeleton-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}
.talk-skeleton-pill {
  height: 22px;
  border-radius: 999px;
}
.talk-skeleton-icon {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  flex: none;
}

.skeleton {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}
.dark .skeleton {
  background: rgba(255, 255, 255, 0.05);
}
.skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  animation: skeleton-shimmer 1.15s ease-in-out infinite;
}
.dark .skeleton::after {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}
@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
  }
  .talk-loading-dots::after {
    animation: none;
    width: 1.65em;
  }
}
`

// 动态注入样式
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
