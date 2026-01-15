export interface FriendLink {
    id?: string;
    name: string;
    url: string;
    description: string;
    avatar: string;
    addDate?: string;
    recommended?: boolean;
    disconnected?: boolean;
}

export const FRIEND_LINKS: FriendLink[] = [
    // 示例友链数据
    {
        name: "示例博客",
        url: "https://example.com",
        description: "这是一个示例博客",
        avatar: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5",
        addDate: "2024-01-01",
        recommended: true
    },
    {
        name: "技术分享",
        url: "https://tech.example.com",
        description: "分享技术文章和教程",
        avatar: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5",
        addDate: "2024-02-01"
    },
    {
        name: "生活博客",
        url: "https://life.example.com",
        description: "记录生活点滴和感悟",
        avatar: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5",
        addDate: "2024-03-01",
        disconnected: true
    }
];