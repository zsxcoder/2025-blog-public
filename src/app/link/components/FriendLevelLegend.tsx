import React, { useState } from 'react';
import { FRIEND_LEVELS } from '../consts/friendLevels';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

const FriendLevelLegend: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="w-full bg-white dark:bg-white/5 rounded-xl border border-orange-400 overflow-hidden mb-8 transition-all duration-300">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors cursor-pointer group"
            >
                <h3 className="text-lg font-bold text-orange-500 flex items-center gap-2">
                    <Info size={20} className="text-orange-500 group-hover:text-orange-600 transition-colors" />
                    友链印记说明
                </h3>
                <div className="text-orange-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 p-6 pt-0 border-t border-orange-400' : 'grid-rows-[0fr] opacity-0 px-6 py-0'}`}>
                <div className="overflow-hidden">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-4">
                        {FRIEND_LEVELS.map((level, index) => {
                            const prevDays = index === 0 ? 0 : FRIEND_LEVELS[index - 1].days;
                            const isLast = index === FRIEND_LEVELS.length - 1;
                            const dayRange = isLast ? `${level.days}天+` : `${prevDays}-${level.days}天`;
                            
                            return (
                                <div key={level.level} className="flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors cursor-default">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-orange-50 dark:bg-orange-500/20 ${level.theme}`}>
                                        <level.Icon size={16} />
                                    </div>
                                    <div className="flex flex-col cursor-default">
                                        <span className={`text-xs font-bold ${level.theme} cursor-default`}>
                                            {level.title}
                                        </span>
                                        <span className="text-[10px] text-orange-500 cursor-default">
                                            {dayRange}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendLevelLegend;