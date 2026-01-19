export interface Sponsor {
  id?: string;
  name: string;
  amount: string;
  date: string;
  avatar?: string;
}

export const SPONSORS: Sponsor[] = [
  // 示例赞助者数据
  {
    name: "测试用户A",
    amount: "¥5.00",
    date: "2026-01-01",
    avatar: "A"
  },
  {
    name: "测试用户B",
    amount: "¥10.00",
    date: "2026-01-02",
    avatar: "B"
  }
];
