import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface SiteInfoProps {
    name: string;
    url: string;
    description: string;
    avatar: string;
}

const SiteInfo: React.FC<SiteInfoProps> = ({ name, url, description, avatar }) => {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const handleCopyJSON = () => {
        const data = {
            name,
            url,
            description,
            avatar
        };
        handleCopy(JSON.stringify(data, null, 2), 'json');
    };

    const InfoRow = ({ label, value, fieldId }: { label: string; value: string; fieldId: string }) => (
        <div className="group flex items-center hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded px-2 py-1 -mx-2 transition-colors">
            <span className="text-amber-500 w-16 text-sm">{label}</span>
            <span className="text-amber-500 font-medium text-sm flex-1 truncate">{value}</span>
            <button
                onClick={() => handleCopy(value, fieldId)}
                className={`ml-2 p-1 rounded transition-all ${copiedField === fieldId
                        ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 opacity-100'
                        : 'text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 opacity-0 group-hover:opacity-100'
                    }`}
                title="复制"
            >
                {copiedField === fieldId ? <Check size={14} /> : <Copy size={14} />}
            </button>
        </div>
    );

    return (
        <div className="rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-400 p-6">
            <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-lg font-bold text-amber-500">本站信息</h3>
                <button
                    onClick={handleCopyJSON}
                    className={`ml-auto text-xs px-2 py-1 rounded transition-colors ${copiedField === 'json'
                            ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                            : 'bg-amber-100 dark:bg-amber-500/10 text-amber-500 hover:bg-amber-200 dark:hover:bg-amber-500/20'}
                        }`}
                >
                    {copiedField === 'json' ? '已复制' : 'JSON'}
                </button>
            </div>
            <div className="space-y-1">
                <InfoRow label="名称" value={name} fieldId="name" />
                <InfoRow label="地址" value={url} fieldId="url" />
                <InfoRow label="描述" value={description} fieldId="description" />
                <InfoRow label="头像" value={avatar} fieldId="avatar" />
            </div>
        </div>
    );
};

export default SiteInfo;