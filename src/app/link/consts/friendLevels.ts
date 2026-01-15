import { 
  Sparkles, 
  TreePine, 
  Leaf, 
  Flower2, 
  Star, 
  Heart, 
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

export const FRIEND_LEVELS: FriendLevel[] = [
  {
    level: 1,
    title: "初遇",
    days: 30,
    color: "text-blue-500",
    border: "border-blue-400",
    theme: "text-blue-500",
    Icon: Sparkles
  },
  {
    level: 2,
    title: "萌芽",
    days: 60,
    color: "text-green-500",
    border: "border-green-400",
    theme: "text-green-500",
    Icon: TreePine
  },
  {
    level: 3,
    title: "抽叶",
    days: 90,
    color: "text-emerald-500",
    border: "border-emerald-400",
    theme: "text-emerald-500",
    Icon: Leaf
  },
  {
    level: 4,
    title: "开花",
    days: 180,
    color: "text-pink-500",
    border: "border-pink-400",
    theme: "text-pink-500",
    Icon: Flower2
  },
  {
    level: 5,
    title: "星耀",
    days: 365,
    color: "text-purple-500",
    border: "border-purple-400",
    theme: "text-purple-500",
    Icon: Star
  },
  {
    level: 6,
    title: "心印",
    days: 730,
    color: "text-red-500",
    border: "border-red-400",
    theme: "text-red-500",
    Icon: Heart
  }
];

export const DISCONNECTED_LEVEL: FriendLevel = {
  level: 0,
  title: "失联",
  days: 0,
  color: "text-gray-400",
  border: "border-gray-400",
  theme: "text-gray-400",
  Icon: Ghost
};