'use client';

import React, { useState, useEffect } from 'react';
import { Code2, MapPin, Terminal, Cpu } from 'lucide-react';

// 定义类型
interface SocialLink {
  name: string;
  url?: string;
  icon?: React.ReactNode;
  wechatQR?: string;
  douyinId?: string;
}

interface SkillSet {
  programmingLanguages?: string[];
  frameworks?: string[];
  tools?: string[];
}

interface AuthorProfile {
  name: string;
  avatar: string;
  role?: string;
  location?: string;
  blogContent?: string;
  skills?: SkillSet;
  socialLinks?: SocialLink[];
}

// 模拟数据 - 实际使用时应从配置或API获取
const AUTHOR_PROFILE: AuthorProfile = {
  name: '钟神秀',
  avatar: 'https://home.zsxcoder.top/api/avatar.png',
  role: '全栈开发者',
  location: '中国',
  blogContent: '热爱技术，喜欢分享。专注于前端开发、后端架构和云原生技术。',
  skills: {
    programmingLanguages: ['JavaScript', 'TypeScript', 'Python', 'Go'],
    frameworks: ['Next.js', 'React', 'Nest.js', 'Django'],
    tools: ['Git', 'Docker', 'Kubernetes', 'AWS']
  },
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/zsxcoder',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    },
    {
      name: 'email',
      url: 'mailto:example@example.com',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
    }
  ]
};

// 渲染图标
const renderIcon = (icon: React.ReactNode | undefined, size: number) => {
  if (!icon) return null;
  return React.cloneElement(icon as React.ReactElement, { size });
};

// 复制抖音ID到剪贴板
const handleCopyDouyinId = (douyinId: string) => {
  navigator.clipboard.writeText(douyinId).then(() => {
    // 可以添加一个toast提示
    console.log('抖音ID已复制到剪贴板');
  });
};

const AuthorCard: React.FC = () => {
  const [copiedDouyinId, setCopiedDouyinId] = useState(false);

  // 处理复制抖音ID后的状态重置
  useEffect(() => {
    if (copiedDouyinId) {
      const timer = setTimeout(() => setCopiedDouyinId(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedDouyinId]);

  return (
    <div className="author-card-wrapper w-full max-w-5xl mx-auto p-4 relative">
      {/* 主卡片容器 */}
      <div className="group/card relative w-full bg-gradient-to-br from-white/95 to-slate-50/95 dark:from-[#1e2026]/95 dark:to-[#15171e]/95 rounded-lg border border-[#d3bc8e]/30 dark:border-[#d3bc8e]/20 shadow-lg shadow-[#d3bc8e]/5 dark:shadow-[#d3bc8e]/3 overflow-hidden">
        {/* 主内容区域 */}
        <div className="flex flex-col md:flex-row relative">
          {/* Left Avatar Section */}
          <div className="md:w-48 flex flex-col items-center justify-center pt-6 pb-4 px-6 relative z-10">
            {/* Avatar Container with Decorative Elements */}
            <div className="relative group/avatar">
              {/* Avatar Circle */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#d3bc8e]/30 dark:border-[#d3bc8e]/20 shadow-lg shadow-[#d3bc8e]/10 dark:shadow-[#d3bc8e]/5 relative z-10 bg-white">
                <img
                  src={AUTHOR_PROFILE.avatar}
                  alt={AUTHOR_PROFILE.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                />
              </div>

              {/* Avatar Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#d3bc8e] to-[#a38753] rounded-full blur opacity-30 group-hover/avatar:opacity-60 transition-opacity duration-500 -z-10"></div>

              {/* Constellation Points */}
              <div className="absolute inset-0 opacity-30 group-hover/avatar:opacity-50 transition-opacity duration-500">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-0.5 rounded-full bg-[#d3bc8e] dark:bg-[#a38753]"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `twinkle ${Math.random() * 3 + 2}s infinite`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Name */}
            <h3 className="mt-4 text-lg font-bold text-[#8c7b60] dark:text-[#d3bc8e] drop-shadow-sm">
              {AUTHOR_PROFILE.name}
            </h3>

            {/* Location with Decorative Icon */}
            {AUTHOR_PROFILE.location && (
              <div className="mt-2 flex items-center justify-center">
                <div className="flex items-center gap-1.5 bg-[#d3bc8e]/10 dark:bg-[#d3bc8e]/5 px-3 py-1 rounded-full">
                  <MapPin className="text-[#a38753] dark:text-[#d3bc8e]" size={14} />
                  <span className="text-[10px] font-medium text-[#8c7b60] dark:text-[#d3bc8e]/80">
                    {AUTHOR_PROFILE.location}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Content Section */}
          <div className="flex-1 pt-6 px-6 pb-4 md:pt-8 md:px-8 md:pb-4 relative z-10">
            {/* Constellation Decor Top Right */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <svg className="w-40 h-40 text-[#d3bc8e]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M10,10 L90,90 M90,10 L10,90" strokeOpacity="0.5" />
              </svg>
            </div>

            {/* Bio */}
            <div className="relative z-10 mb-6">
              <div className="flex items-center gap-3 mb-3">
                {AUTHOR_PROFILE.role && (
                  <span className="text-[10px] font-bold tracking-widest text-[#a38753] dark:text-[#d3bc8e] uppercase border border-[#d3bc8e]/40 dark:border-[#d3bc8e]/30 px-2 py-0.5 rounded-sm">
                    {AUTHOR_PROFILE.role}
                  </span>
                )}
                <div className="h-px flex-1 bg-gradient-to-r from-[#d3bc8e]/30 dark:from-[#d3bc8e]/20 to-transparent"></div>
              </div>

              {AUTHOR_PROFILE.blogContent && (
                <div className="relative pr-32">
                  <div
                    className="text-sm text-slate-600 dark:text-[#e0e0e0]/80 leading-relaxed font-sans"
                    dangerouslySetInnerHTML={{ __html: AUTHOR_PROFILE.blogContent }}
                  />
                  {/* Code Pattern Texture at blogContent Right */}
                  <div className="absolute top-0 right-0 opacity-5 dark:opacity-[0.03] pointer-events-none" style={{ opacity: 0.08 }}>
                    <div className="relative w-32 h-32 -top-2 -right-4">
                      <Code2 size={128} className="text-[#a38753] dark:text-[#d3bc8e]/30" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Skills Section - Genshin Talent Style */}
            {AUTHOR_PROFILE.skills && (
              <div className="mb-6 relative z-10">
                <div className="flex flex-col gap-4">
                  {/* Programming Languages */}
                  {AUTHOR_PROFILE.skills.programmingLanguages && AUTHOR_PROFILE.skills.programmingLanguages.length > 0 && (
                    <div className="group/skill">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1 rounded bg-[#d3bc8e]/10 text-[#a38753] dark:text-[#d3bc8e] group-hover/skill:bg-[#d3bc8e] group-hover/skill:text-white transition-colors">
                          <Code2 size={12} />
                        </div>
                        <span className="text-[10px] font-bold text-[#8c7b60] dark:text-[#d3bc8e]/80 uppercase tracking-wider">Languages</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {AUTHOR_PROFILE.skills.programmingLanguages.map((skill, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-[#d3bc8e]/5 border border-transparent hover:border-[#d3bc8e]/30 text-slate-600 dark:text-[#e0e0e0]/70 cursor-default transition-all hover:scale-105">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Frameworks */}
                  {AUTHOR_PROFILE.skills.frameworks && AUTHOR_PROFILE.skills.frameworks.length > 0 && (
                    <div className="group/skill">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1 rounded bg-[#d3bc8e]/10 text-[#a38753] dark:text-[#d3bc8e] group-hover/skill:bg-[#d3bc8e] group-hover/skill:text-white transition-colors">
                          <Cpu size={12} />
                        </div>
                        <span className="text-[10px] font-bold text-[#8c7b60] dark:text-[#d3bc8e]/80 uppercase tracking-wider">Frameworks</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {AUTHOR_PROFILE.skills.frameworks.map((skill, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-[#d3bc8e]/5 border border-transparent hover:border-[#d3bc8e]/30 text-slate-600 dark:text-[#e0e0e0]/70 cursor-default transition-all hover:scale-105">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools */}
                  {AUTHOR_PROFILE.skills.tools && AUTHOR_PROFILE.skills.tools.length > 0 && (
                    <div className="group/skill">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1 rounded bg-[#d3bc8e]/10 text-[#a38753] dark:text-[#d3bc8e] group-hover/skill:bg-[#d3bc8e] group-hover/skill:text-white transition-colors">
                          <Terminal size={12} />
                        </div>
                        <span className="text-[10px] font-bold text-[#8c7b60] dark:text-[#d3bc8e]/80 uppercase tracking-wider">Tools</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {AUTHOR_PROFILE.skills.tools.map((skill, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-sm bg-slate-100 dark:bg-[#d3bc8e]/5 border border-transparent hover:border-[#d3bc8e]/30 text-slate-600 dark:text-[#e0e0e0]/70 cursor-default transition-all hover:scale-105">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {AUTHOR_PROFILE.socialLinks?.map((social, index) => {
                const isDouyin = social.name === '抖音' || social.douyinId || social.name === 'tiktok';
                const isEmail = social.name === 'email';
                const isWeChat = social.name === 'wechat';
                const isBilibili = social.name === 'bilibili';
                const isGitHub = social.name === 'gitHub' || social.name === 'github';

                // Compact Genshin Button Style
                const btnClass = "relative group/btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm cursor-pointer transition-all duration-300 overflow-hidden";

                // Handle WeChat - Hover to show QR
                if (isWeChat) {
                  const wechatQR = social.wechatQR;
                  return (
                    <div key={index} className="relative group/wechat">
                      <button className={btnClass}>
                        {/* 背景光效 */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#d3bc8e]/10 via-[#a38753]/5 to-[#d3bc8e]/10 dark:from-[#d3bc8e]/5 dark:via-[#a38753]/3 dark:to-[#d3bc8e]/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                        {/* 主容器 */}
                        <div className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm
                            bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-[#1e2026]/90 dark:to-[#15171e]/90
                            border border-[#d3bc8e]/30 dark:border-[#d3bc8e]/20
                            shadow-sm shadow-[#d3bc8e]/5 dark:shadow-[#d3bc8e]/3
                            group-hover/btn:border-[#d3bc8e] dark:group-hover/btn:border-[#d3bc8e]/60
                            group-hover/btn:shadow-md group-hover/btn:shadow-[#d3bc8e]/20 dark:group-hover/btn:shadow-[#d3bc8e]/10
                            group-hover/btn:scale-105
                            transition-all duration-300">

                            {/* 装饰性边框 */}
                            <div className="absolute inset-0 rounded-sm border border-[#d3bc8e]/10 dark:border-[#d3bc8e]/5 pointer-events-none"></div>

                            {/* 图标和文字 */}
                            <div className="relative z-10 flex items-center gap-1.5">
                                <div className="text-[#8c7b60] dark:text-[#d3bc8e]/70 group-hover/btn:text-[#a38753] dark:group-hover/btn:text-[#d3bc8e] transition-colors">
                                    {renderIcon(social.icon, 14)}
                                </div>
                                <span className="text-[10px] font-medium tracking-wide text-[#8c7b60] dark:text-[#d3bc8e]/70 group-hover/btn:text-[#a38753] dark:group-hover/btn:text-[#d3bc8e] transition-colors whitespace-nowrap">
                                    {social.name}
                                </span>
                            </div>

                            {/* 顶部高光 */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d3bc8e]/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-t-sm"></div>
                        </div>
                      </button>

                      {/* QR Code Popup */}
                      {wechatQR && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 invisible group-hover/wechat:opacity-100 group-hover/wechat:visible transition-all duration-300 z-50">
                          <div className="w-32 h-32 p-2 bg-white rounded-lg shadow-xl border border-[#d3bc8e]">
                            <img
                              src={wechatQR}
                              alt="WeChat QR"
                              className="w-full h-full object-contain"
                            />
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#d3bc8e] rotate-45"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                // Handle TikTok (Douyin) - Click to Copy
                if (isDouyin) {
                  return (
                    <button key={index} onClick={() => handleCopyDouyinId(social.douyinId || '')} className={btnClass}>
                      {/* 背景光效 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d3bc8e]/10 via-[#a38753]/5 to-[#d3bc8e]/10 dark:from-[#d3bc8e]/5 dark:via-[#a38753]/3 dark:to-[#d3bc8e]/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                      {/* 主容器 */}
                      <div className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm
                          bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-[#1e2026]/90 dark:to-[#15171e]/90
                          border border-[#d3bc8e]/30 dark:border-[#d3bc8e]/20
                          shadow-sm shadow-[#d3bc8e]/5 dark:shadow-[#d3bc8e]/3
                          group-hover/btn:border-[#d3bc8e] dark:group-hover/btn:border-[#d3bc8e]/60
                          group-hover/btn:shadow-md group-hover/btn:shadow-[#d3bc8e]/20 dark:group-hover/btn:shadow-[#d3bc8e]/10
                          group-hover/btn:scale-105
                          transition-all duration-300">

                          {/* 装饰性边框 */}
                          <div className="absolute inset-0 rounded-sm border border-[#d3bc8e]/10 dark:border-[#d3bc8e]/5 pointer-events-none"></div>

                          {/* 图标和文字 */}
                          <div className="relative z-10 flex items-center gap-1.5">
                              <div className="text-[#8c7b60] dark:text-[#d3bc8e]/70 group-hover/btn:text-[#a38753] dark:group-hover/btn:text-[#d3bc8e] transition-colors">
                                  {renderIcon(social.icon, 14)}
                              </div>
                              <span className="text-[10px] font-medium tracking-wide text-[#8c7b60] dark:text-[#d3bc8e]/70 group-hover/btn:text-[#a38753] dark:group-hover/btn:text-[#d3bc8e] transition-colors whitespace-nowrap">
                                  {copiedDouyinId ? '已复制' : social.name}
                              </span>
                          </div>

                          {/* 顶部高光 */}
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d3bc8e]/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-t-sm"></div>
                      </div>
                    </button>
                  );
                }

                // Handle Bilibili, Email, GitHub - Normal Links
                if (isBilibili || isEmail || isGitHub || social.url) {
                  return (
                    <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className={btnClass}>
                      {/* 背景光效 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d3bc8e]/10 via-[#a38753]/5 to-[#d3bc8e]/10 dark:from-[#d3bc8e]/5 dark:via-[#a38753]/3 dark:to-[#d3bc8e]/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>

                      {/* 主容器 */}
                      <div className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm
                          bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-[#1e2026]/90 dark:to-[#15171e]/90
                          border border-[#d3bc8e]/30 dark:border-[#d3bc8e]/20
                          shadow-sm shadow-[#d3bc8e]/5 dark:shadow-[#d3bc8e]/3
                          group-hover/btn:border-[#d3bc8e] dark:group-hover/btn:border-[#d3bc8e]/60
                          group-hover/btn:shadow-md group-hover/btn:shadow-[#d3bc8e]/20 dark:group-hover/btn:shadow-[#d3bc8e]/10
                          group-hover/btn:scale-105
                          transition-all duration-300">

                          {/* 装饰性边框 */}
                          <div className="absolute inset-0 rounded-sm border border-[#d3bc8e]/10 dark:border-[#d3bc8e]/5 pointer-events-none"></div>

                          {/* 图标和文字 */}
                          <div className="relative z-10 flex items-center gap-1.5">
                              <div className="text-[#8c7b60] dark:text-[#d3bc8e]/70 group-hover/btn:text-[#a38753] dark:group-hover/btn:text-[#d3bc8e] transition-colors">
                                  {renderIcon(social.icon, 14)}
                              </div>
                              <span className="text-[10px] font-medium tracking-wide text-[#8c7b60] dark:text-[#d3bc8e]/70 group-hover/btn:text-[#a38753] dark:group-hover/btn:text-[#d3bc8e] transition-colors whitespace-nowrap">
                                  {social.name}
                              </span>
                          </div>

                          {/* 顶部高光 */}
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d3bc8e]/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity rounded-t-sm"></div>
                      </div>
                    </a>
                  );
                }

                return null;
              })}
            </div>
          </div>
        </div>

        {/* Card Shadow/Glow effect */}
        <div className="absolute -inset-0.5 bg-[#d3bc8e]/20 blur-md rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
    </div>
  );
};

export default AuthorCard;