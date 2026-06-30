export type Product = {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  tag?: string
  image: string
}

export const products: Product[] = [
  {
    id: "serum-blue",
    name: "头皮舒缓精华液",
    subtitle: "适配护理仪 · 30ml",
    price: 199,
    originalPrice: 259,
    tag: "热销",
    image: "/product-hero.png",
  },
  {
    id: "liquid-refill",
    name: "导入护理液补充装",
    subtitle: "3 支装 · 90ml",
    price: 459,
    originalPrice: 597,
    tag: "套装",
    image: "/liquid.png",
  },
  {
    id: "device-pro",
    name: "ScalpCare Pro 护理仪",
    subtitle: "第二代 · 多模式",
    price: 1299,
    tag: "新品",
    image: "/device.png",
  },
]

export const metrics = [
  { key: "oil", label: "出油指数", value: 62, unit: "", level: "偏高", color: "#d98c3f" },
  { key: "hydration", label: "头皮水分", value: 48, unit: "%", level: "偏低", color: "#3f8fd9" },
  { key: "density", label: "毛囊密度", value: 78, unit: "", level: "良好", color: "#5aa469" },
  { key: "redness", label: "红肿指数", value: 23, unit: "", level: "正常", color: "#5aa469" },
]

export const trendData = [
  { date: "1周", oil: 78, hydration: 38 },
  { date: "2周", oil: 72, hydration: 41 },
  { date: "3周", oil: 69, hydration: 44 },
  { date: "4周", oil: 65, hydration: 46 },
  { date: "5周", oil: 62, hydration: 48 },
  { date: "6周", oil: 58, hydration: 52 },
]

export const careModes = [
  { id: "soothe", name: "舒缓模式", desc: "低频按摩 · 缓解紧绷", minutes: 8 },
  { id: "clean", name: "深层清洁", desc: "高频清洁 · 控油去屑", minutes: 10 },
  { id: "nourish", name: "营养导入", desc: "脉冲导入 · 滋养毛囊", minutes: 12 },
]

export const planTasks = [
  { id: 1, time: "08:00", name: "晨间舒缓护理", mode: "舒缓模式", done: true },
  { id: 2, time: "12:30", name: "头皮水分检测", mode: "AI 检测", done: true },
  { id: 3, time: "21:00", name: "晚间营养导入", mode: "营养导入", done: false },
]

export const goals = [
  { id: "oil-control", title: "控油平衡", desc: "改善出油，清爽头皮", icon: "droplet" },
  { id: "hydrate", title: "深层补水", desc: "提升头皮含水量", icon: "waves" },
  { id: "anti-hair-loss", title: "固发养护", desc: "强韧发根，减少脱发", icon: "sprout" },
  { id: "soothe", title: "舒缓敏感", desc: "缓解红肿与瘙痒", icon: "heart" },
]
