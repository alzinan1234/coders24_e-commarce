import { Product, Category } from "@/types";

export const categories: Category[] = [
  { id: "1", name: "Silk & Fabric",      nameZh: "丝绸布料", slug: "silk",      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", count: 48, icon: "✦" },
  { id: "2", name: "Tea & Herbs",        nameZh: "茶叶草药", slug: "tea",       image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400", count: 62, icon: "🍃" },
  { id: "3", name: "Ceramics & Pottery", nameZh: "陶瓷工艺", slug: "ceramics",  image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400", count: 35, icon: "◈" },
  { id: "4", name: "Jade & Jewelry",     nameZh: "玉石珠宝", slug: "jewelry",   image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400", count: 29, icon: "◇" },
  { id: "5", name: "Art & Calligraphy",  nameZh: "书法艺术", slug: "art",       image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400", count: 41, icon: "✸" },
  { id: "6", name: "Lanterns & Decor",   nameZh: "灯笼装饰", slug: "decor",     image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400", count: 53, icon: "◉" },
];

export const products: Product[] = [
  {
    id: "p1", name: "Dragon Phoenix Silk Scarf",      nameZh: "龙凤丝巾",
    price: 128, originalPrice: 188,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600",
    ],
    category: "silk", description: "Luxurious hand-painted silk scarf featuring traditional dragon and phoenix motifs. Made from 100% Grade-A mulberry silk in Suzhou.",
    rating: 4.9, reviews: 214, stock: 12, tags: ["silk","dragon","luxury","scarf"],
    featured: true, bestseller: true, discount: 32, origin: "Suzhou, Jiangsu", material: "100% Mulberry Silk",
  },
  {
    id: "p2", name: "Premium Longjing Dragon Well Tea", nameZh: "龙井茶",
    price: 68, originalPrice: 88,
    images: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600",
    ],
    category: "tea", description: "First flush spring harvest Longjing tea from West Lake, Hangzhou. Sweet chestnut aroma with a refreshing aftertaste.",
    rating: 4.8, reviews: 389, stock: 45, tags: ["tea","green-tea","longjing","organic"],
    featured: true, bestseller: true, discount: 23, origin: "Hangzhou, Zhejiang", weight: "100g",
  },
  {
    id: "p3", name: "Blue & White Porcelain Vase",      nameZh: "青花瓷瓶",
    price: 245, originalPrice: 320,
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
    ],
    category: "ceramics", description: "Handcrafted Jingdezhen blue and white porcelain vase with intricate landscape paintings. Each piece is unique.",
    rating: 4.7, reviews: 156, stock: 8, tags: ["porcelain","vase","jingdezhen","blue-white"],
    featured: true, discount: 23, origin: "Jingdezhen, Jiangxi", material: "Porcelain",
  },
  {
    id: "p4", name: "Imperial Jade Bracelet",          nameZh: "帝王翡翠",
    price: 580, originalPrice: 750,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
    ],
    category: "jewelry", description: "Grade A Burmese jadeite bracelet, translucent green with natural patterns. Certified authentic with certificate.",
    rating: 5.0, reviews: 89, stock: 5, tags: ["jade","bracelet","luxury","jade-a"],
    featured: true, newArrival: true, discount: 23, origin: "Burma / Yunnan", material: "Grade A Jadeite",
  },
  {
    id: "p5", name: "Hand-painted Silk Fan",           nameZh: "手绘丝扇",
    price: 45, originalPrice: 65,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600",
    ],
    category: "art", description: "Delicately painted silk fan with traditional ink wash landscape. Sandalwood frame, hand-stitched silk.",
    rating: 4.6, reviews: 201, stock: 23, tags: ["fan","silk","hand-painted","art"],
    newArrival: true, discount: 31, origin: "Hangzhou", material: "Sandalwood & Silk",
  },
  {
    id: "p6", name: "Red Palace Lantern Set",          nameZh: "红宫灯",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600",
    ],
    category: "decor", description: "Set of 3 traditional red lanterns with golden tassels. Perfect for festivals, weddings, and home decoration.",
    rating: 4.5, reviews: 312, stock: 34, tags: ["lantern","red","festival","decor"],
    bestseller: true, origin: "Beijing", material: "Bamboo & Paper",
  },
  {
    id: "p7", name: "Pu-erh Aged Tea Cake",            nameZh: "普洱茶饼",
    price: 156, originalPrice: 195,
    images: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600",
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600",
    ],
    category: "tea", description: "10-year aged Pu-erh tea cake from Yunnan. Rich earthy aroma with smooth deep flavor. Collector's quality.",
    rating: 4.9, reviews: 145, stock: 18, tags: ["tea","pu-erh","aged","yunnan"],
    featured: true, discount: 20, origin: "Yunnan", weight: "357g",
  },
  {
    id: "p8", name: "Celadon Dragon Tea Set",          nameZh: "龙泉茶具",
    price: 198,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600",
    ],
    category: "ceramics", description: "Complete gongfu tea set in Longquan celadon. Includes teapot, 6 cups, and tray. Pale jade-green glaze.",
    rating: 4.8, reviews: 78, stock: 11, tags: ["tea-set","celadon","longquan","gongfu"],
    newArrival: true, origin: "Longquan, Zhejiang", material: "Celadon Porcelain",
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Imperial Silk Collection",
    titleZh: "皇家丝绸系列",
    subtitle: "Woven from centuries of tradition",
    cta: "Explore Collection",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600",
    badge: "New Season",
    color: "#C8102E",
  },
  {
    id: 2,
    title: "Sacred Jade & Jewels",
    titleZh: "神圣翡翠珠宝",
    subtitle: "Treasures from the Middle Kingdom",
    cta: "Shop Jewelry",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1600",
    badge: "Bestseller",
    color: "#2D6A4F",
  },
  {
    id: 3,
    title: "Ancient Tea Rituals",
    titleZh: "古老茶道仪式",
    subtitle: "Taste the wisdom of the ancients",
    cta: "Discover Tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1600",
    badge: "Spring Harvest",
    color: "#2D6A2D",
  },
];

export const testimonials = [
  { id: 1, name: "Sarah Chen",     avatar: "https://i.pravatar.cc/60?img=1", rating: 5, text: "The silk scarf I ordered is absolutely stunning. The craftsmanship is incredible and it arrived beautifully packaged.", product: "Dragon Phoenix Silk Scarf", location: "New York, USA" },
  { id: 2, name: "James Morrison", avatar: "https://i.pravatar.cc/60?img=3", rating: 5, text: "Best Longjing tea I've ever tasted outside of China. The aroma is perfect and the taste is so smooth.", product: "Premium Longjing Tea",      location: "London, UK" },
  { id: 3, name: "Yuki Tanaka",    avatar: "https://i.pravatar.cc/60?img=5", rating: 5, text: "The jade bracelet is authentic and gorgeous. Certificate of authenticity included. Highly recommend!", product: "Imperial Jade Bracelet",    location: "Tokyo, Japan" },
];

export const stats = [
  { label: "Products",        value: "10,000+", suffix: "",  icon: "◈" },
  { label: "Happy Customers", value: "50,000",  suffix: "+", icon: "◉" },
  { label: "Countries",       value: "85",      suffix: "+", icon: "✦" },
  { label: "Years of Trust",  value: "15",      suffix: "+", icon: "✸" },
];
