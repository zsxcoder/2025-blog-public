import {
  Sparkles, 
  Sprout, 
  Leaf, 
  Flower,
  Feather,
  Wind,
  Cloud,
  Droplets,
  Snowflake,
  Mountain,
  Shield,
  Flame,
  Sun,
  Zap,
  Crown,
  Ghost
} from 'lucide-react';

export interface FriendLevel {
  level: number;
  title: string;
  days: number;
  color: string;
  border: string;
  theme: string;
  Icon: React.ElementType;
}

// 失联等级配置
export const DISCONNECTED_LEVEL: FriendLevel = {
  level: 0,
  title: "失联",
  days: 0,
  color: "text-amber-700 dark:text-amber-300",
  border: "border-amber-300 dark:border-amber-700",
  theme: "text-amber-700 dark:text-amber-300",
  Icon: Ghost
};

// 15级友链等级配置 - 统一使用金色系配色
export const FRIEND_LEVELS: FriendLevel[] = [
  {
    level: 1,
    title: "初遇",
    days: 30,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Sparkles
  },
  {
    level: 2,
    title: "萌芽",
    days: 60,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Sprout
  },
  {
    level: 3,
    title: "抽叶",
    days: 90,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Leaf
  },
  {
    level: 4,
    title: "绽放",
    days: 180,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Flower
  },
  {
    level: 5,
    title: "轻语",
    days: 270,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Feather
  },
  {
    level: 6,
    title: "听风",
    days: 365,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Wind
  },
  {
    level: 7,
    title: "云游",
    days: 450,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Cloud
  },
  {
    level: 8,
    title: "润泽",
    days: 540,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Droplets
  },
  {
    level: 9,
    title: "凝冰",
    days: 630,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Snowflake
  },
  {
    level: 10,
    title: "磐石",
    days: 730,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Mountain
  },
  {
    level: 11,
    title: "坚守",
    days: 900,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Shield
  },
  {
    level: 12,
    title: "燃情",
    days: 1080,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Flame
  },
  {
    level: 13,
    title: "烈阳",
    days: 1460,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Sun
  },
  {
    level: 14,
    title: "雷鸣",
    days: 1825,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Zap
  },
  {
    level: 15,
    title: "传世",
    days: 2190,
    color: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
    theme: "text-amber-700 dark:text-amber-300",
    Icon: Crown
  }
];