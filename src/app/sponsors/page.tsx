'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { INIT_DELAY } from '@/consts'
import { cn } from '@/lib/utils'
import { Lightbox } from '@/components/Lightbox'
import { SPONSORS } from './sponsors'

export default function SponsorsPage() {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0)
  
  // Open lightbox
  const openLightbox = (images: string[], initialIndex: number) => {
    setLightboxImages(images)
    setLightboxInitialIndex(initialIndex)
    setLightboxOpen(true)
  }
  
  return (
    <div className='flex flex-col items-center justify-center gap-6 px-6 pt-24 max-sm:pt-24'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className='card relative mx-auto flex items-center justify-between gap-1 p-4 w-full max-w-[840px]'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-bold'>赞助支持</h1>
        </div>
      </motion.div>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: INIT_DELAY / 2 }}
        className='card relative p-6 w-full max-w-[840px]'>
        <div className='space-y-4'>
          <p className='text-base leading-relaxed'>
            如果您觉得我的内容对您有帮助，欢迎通过以下方式支持我的创作。您的每一份支持都是我持续创作的动力！
          </p>
          <p className='text-base leading-relaxed'>
            所有赞助将用于网站维护、服务器费用以及内容创作。
          </p>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: INIT_DELAY / 2 }}
        className='w-full max-w-[840px]'>
        <div className='card relative p-6'>
          <h2 className='text-2xl font-bold mb-6 text-center'>支付方式</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
            {/* Alipay */}
            <div className='bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:shadow-md transition-all'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-12 w-12 flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
                    <path fill="#0891b2" d="M24 0c13.255 0 24 10.745 24 24S37.255 48 24 48S0 37.255 0 24S10.745 0 24 0m0 4.364C13.155 4.364 4.364 13.155 4.364 24S13.155 43.636 24 43.636c6.738 0 12.683-3.393 16.22-8.565a64 64 0 0 1-6.683-2.402q-1.855-.78-5.541-2.459C25.056 33.173 20.769 36 16.174 36c-3.188-.016-8.538-1.627-8.538-6.654s4.956-6.224 8.172-6.224q2.919 0 10.33 3.222l.077.03q1.989-2.434 2.73-5.653l.1-.464h-12.87v-2.32h5.857v-2.9h-8.201v-1.74h8.201v-1.74h8.201l.001-3.479h4.687v3.48h9.374v1.74H26.72v2.899h7.486q-.165 1.086-.371 1.973l-.084.347q-.517 1.868-2.325 5.442c-.32.632-.782 1.364-1.366 2.139q2.766 1.024 5.6 1.99q3.67 1.249 6.345 2.02A19.6 19.6 0 0 0 43.636 24c0-10.845-8.791-19.636-19.636-19.636m-13.685 24.18c0 3.198 6.69 4.472 12.11 1.106q.915-.57 1.71-1.213l-.018-.008l-.427-.262q-5.074-3.087-7.882-3.348c-1.719-.159-5.493.527-5.493 3.725m18.73-8.287h2.209z"/>
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-bold'>支付宝</h3>
                  <p className='text-secondary text-sm'>扫码支付</p>
                </div>
              </div>
              <div className='flex justify-center'>
                <div className='w-48 h-48 bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center border border-gray-200'>
                  <img 
                    src='https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/links/alipay.webp' 
                    alt='支付宝二维码' 
                    className='w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform' 
                    onClick={() => openLightbox(['https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/links/alipay.webp'], 0)} 
                  />
                </div>
              </div>
            </div>

            {/* WeChat Pay */}
            <div className='bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:shadow-md transition-all'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='h-12 w-12 flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                    <g fill="none">
                      <path fill="#78eb7b" d="M12.385 3.757a8.45 8.45 0 0 0-6.93-.541a7.06 7.06 0 0 0-3.633 2.862a5.36 5.36 0 0 0-.669 4.11a6.3 6.3 0 0 0 2.73 3.691q-.372 1.065-.714 2.138c.821-.428 1.634-.872 2.451-1.308a9.1 9.1 0 0 0 3.06.436a5.3 5.3 0 0 1-.211-2.47c.212-1.15.8-2.195 1.673-2.973a7.24 7.24 0 0 1 5.433-1.785a6.34 6.34 0 0 0-3.19-4.162z"/>
                      <path fill="#c9f7ca" d="M1.176 10.269c.14-.533.356-1.042.644-1.511a7.05 7.05 0 0 1 3.632-2.863a8.45 8.45 0 0 1 6.93.542c.7.389 1.326.9 1.848 1.507a8 8 0 0 1 1.343-.023a6.34 6.34 0 0 0-3.19-4.162a8.45 8.45 0 0 0-6.931-.541A7.05 7.05 0 0 0 1.82 6.08a5.36 5.36 0 0 0-.67 4.11q.016.038.026.079"/>
                      <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M12.385 3.757a8.45 8.45 0 0 0-6.93-.541a7.06 7.06 0 0 0-3.633 2.862a5.36 5.36 0 0 0-.669 4.11a6.3 6.3 0 0 0 2.73 3.691q-.372 1.065-.714 2.138c.821-.428 1.634-.872 2.451-1.308a9.1 9.1 0 0 0 3.06.436a5.3 5.3 0 0 1-.211-2.47c.212-1.15.8-2.195 1.673-2.973a7.24 7.24 0 0 1 5.433-1.785a6.34 6.34 0 0 0-3.19-4.162z"/>
                      <path fill="#78eb7b" stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M5.643 6.299a.478.478 0 1 1 .321.9a.478.478 0 0 1-.321-.9m5.029.005a.478.478 0 1 1 .338.894a.478.478 0 0 1-.338-.894"/>
                      <path fill="#78eb7b" d="M22.6 13.584a5.54 5.54 0 0 0-2.58-2.633a7.11 7.11 0 0 0-6.38.024a5.3 5.3 0 0 0-2.828 3.482a4.48 4.48 0 0 0 .574 3.314a6.1 6.1 0 0 0 4.157 2.712a7.6 7.6 0 0 0 3.633-.24c.702.274 1.333.716 2.015 1.042a41 41 0 0 0-.564-1.756a5.7 5.7 0 0 0 1.876-2.073a4.5 4.5 0 0 0 .112-3.872z"/>
                      <path fill="#c9f7ca" d="M13.633 13.288a7.11 7.11 0 0 1 6.38-.024a5.54 5.54 0 0 1 2.58 2.632q.143.325.231.67a4.5 4.5 0 0 0-.23-2.986a5.54 5.54 0 0 0-2.581-2.633a7.11 7.11 0 0 0-6.38.024a5.3 5.3 0 0 0-2.828 3.482c-.151.69-.13 1.406.064 2.085a5.35 5.35 0 0 1 2.764-3.25"/>
                      <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M22.6 13.584a5.54 5.54 0 0 0-2.58-2.633a7.11 7.11 0 0 0-6.38.024a5.3 5.3 0 0 0-2.828 3.482a4.48 4.48 0 0 0 .574 3.314a6.1 6.1 0 0 0 4.157 2.712a7.6 7.6 0 0 0 3.633-.24c.702.274 1.333.716 2.015 1.042a41 41 0 0 0-.564-1.756a5.7 5.7 0 0 0 1.876-2.073a4.5 4.5 0 0 0 .112-3.872z"/>
                      <path fill="#78eb7b" d="M14.813 13.282a.485.485 0 0 1 .613.617a.478.478 0 1 1-.613-.617"/>
                      <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M14.813 13.282a.485.485 0 0 1 .613.617a.478.478 0 1 1-.613-.617"/>
                      <path fill="#78eb7b" d="M18.968 13.27c.36-.03.616.342.462.668l-.001.001a.468.468 0 0 1-.74.128a.74.74 0 0 1-.164-.346a.525.525 0 0 1 .443-.45"/>
                      <path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M18.968 13.27c.36-.03.616.342.462.668l-.001.001a.468.468 0 0 1-.74.128a.74.74 0 0 1-.164-.346a.525.525 0 0 1 .443-.45"/>
                    </g>
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-bold'>微信支付</h3>
                  <p className='text-secondary text-sm'>扫码支付</p>
                </div>
              </div>
              <div className='flex justify-center'>
                <div className='w-48 h-48 bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center border border-gray-200'>
                  <img 
                    src='https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/links/weixin.webp' 
                    alt='微信支付二维码' 
                    className='w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform' 
                    onClick={() => openLightbox(['https://cdn.jsdelivr.net/gh/mcyzsx/picx-images-hosting@master/links/weixin.webp'], 0)} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Afdian */}
          <div className='flex justify-center'>
            <div className='bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:shadow-md transition-all max-w-md w-full'>
              <div className='flex items-center gap-3 mb-4 justify-center'>
                <div className='h-12 w-12 flex items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16">
                    <path fill="#e11d48" d="M10.586 1C12.268 1 13.5 2.37 13.5 4.25c0 1.745-.996 3.359-2.622 4.831q-.25.226-.509.438l1.116 5.584a.75.75 0 0 1-.991.852l-2.409-.876a.25.25 0 0 0-.17 0l-2.409.876a.75.75 0 0 1-.991-.852L5.63 9.519a14 14 0 0 1-.51-.438C3.497 7.609 2.5 5.995 2.5 4.25C2.5 2.37 3.732 1 5.414 1c.963 0 1.843.403 2.474 1.073L8 2.198l.112-.125a3.4 3.4 0 0 1 2.283-1.068zm-3.621 9.495l-.718 3.594l1.155-.42a1.75 1.75 0 0 1 1.028-.051l.168.051l1.154.42l-.718-3.592q-.3.195-.505.314l-.169.097a.75.75 0 0 1-.72 0a10 10 0 0 1-.515-.308zM10.586 2.5c-.863 0-1.611.58-1.866 1.459c-.209.721-1.231.721-1.44 0C7.025 3.08 6.277 2.5 5.414 2.5C4.598 2.5 4 3.165 4 4.25c0 1.23.786 2.504 2.128 3.719c.49.443 1.018.846 1.546 1.198l.325.21l.076-.047l.251-.163a13 13 0 0 0 1.546-1.198C11.214 6.754 12 5.479 12 4.25c0-1.085-.598-1.75-1.414-1.75"/>
                  </svg>
                </div>
                <div>
                  <h3 className='text-lg font-bold'>爱发电</h3>
                  <p className='text-secondary text-sm'>支持创作者</p>
                </div>
              </div>
              <div className='flex justify-center'>
                <div className='w-48 h-48 bg-white rounded-lg overflow-hidden shadow-md flex items-center justify-center border border-gray-200'>
                  <img 
                    src='https://imgbed.mcyzsx.top/file/custom/Vuaj4DpO.jpg' 
                    alt='爱发电二维码' 
                    className='w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform' 
                    onClick={() => openLightbox(['https://imgbed.mcyzsx.top/file/custom/Vuaj4DpO.jpg'], 0)} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Other Support Methods */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: INIT_DELAY / 2 }}
        className='w-full max-w-[840px]'>
        <div className='card relative p-6'>
          <h2 className='text-2xl font-bold mb-6'>其他支持方式</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-4 hover:shadow-md transition-all'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-brand text-xl'>🔗</span>
                <span className='font-semibold'>分享推荐</span>
              </div>
              <p className='text-secondary text-sm'>将我的博客分享给更多朋友</p>
            </div>

            <div className='bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-4 hover:shadow-md transition-all'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-brand text-xl'>💬</span>
                <span className='font-semibold'>留言互动</span>
              </div>
              <p className='text-secondary text-sm'>在文章下方留下您的想法</p>
            </div>

            <div className='bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-4 hover:shadow-md transition-all'>
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-brand text-xl'>⭐</span>
                <span className='font-semibold'>关注订阅</span>
              </div>
              <p className='text-secondary text-sm'>订阅RSS或关注社交媒体</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sponsors List */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: INIT_DELAY / 2 }}
        className='w-full max-w-[840px] mb-12'>
        <div className='card relative p-6'>
          <h2 className='text-2xl font-bold mb-6'>已赞助的小伙伴</h2>
          <h3 className='text-lg font-bold mb-6'>赞助的小伙伴想要加入页面的记得一定要带上截图加信息发送到邮箱: <a href="mailto:3149261770@qq.com" className="text-brand hover:underline">3149261770@qq.com</a></h3>
          <p className='text-secondary mb-6'>感谢以下小伙伴的支持，您的支持是我创作的动力！</p>
          
          <div className='space-y-4'>
            {SPONSORS.map((sponsor, index) => (
              <div key={index} className='bg-white/80 backdrop-blur-md border border-white/20 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-all'>
                <div className='w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center'>
                  <span className='text-brand font-bold'>{sponsor.avatar}</span>
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <h4 className='font-semibold'>{sponsor.name}</h4>
                    <span className='text-brand text-sm font-medium'>{sponsor.amount}</span>
                  </div>
                  <p className='text-secondary text-xs mt-1'>{sponsor.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

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
