# ClearNose 落地页技术架构文档

## 1. 架构设计

```mermaid
flowchart TD
    subgraph "前端层 (React + Vite + Tailwind)"
        "App.tsx 主入口"
        "i18n 多语言系统"
        "9 个区块组件"
        "导航组件"
        "倒计时 Hook"
    end

    subgraph "静态资源层"
    "产品图片 (public/images)"
    "翻译文案 (i18n/locales)"
    end

    subgraph "外部服务"
    "Stripe 支付跳转"
    "Google Analytics (预留)"
    "GitHub Pages 部署"
    end

    "App.tsx 主入口" --> "i18n 多语言系统"
    "App.tsx 主入口" --> "9 个区块组件"
    "App.tsx 主入口" --> "导航组件"
    "i18n 多语言系统" --> "翻译文案 (i18n/locales)"
    "9 个区块组件" --> "静态资源层"
    "导航组件" --> "Stripe 支付跳转"
    "App.tsx 主入口" --> "Google Analytics (预留)"
    "App.tsx 主入口" --> "GitHub Pages 部署"
```

## 2. 技术栈说明

* **前端框架**：React\@18 + TypeScript

* **构建工具**：Vite\@5（vite-init 模板）

* **样式方案**：Tailwind CSS\@3

* **路由**：无路由（单页滚动落地页，使用锚点导航）

* **状态管理**：Zustand（用于语言切换状态 + 倒计时状态）

* **i18n 方案**：react-i18next + i18next（轻量级，支持中英文）

* **图标库**：lucide-react

* **动画**：CSS 动画 + Intersection Observer 实现滚动渐入

* **后端**：无（纯前端静态部署）

* **数据库**：无

## 3. 目录结构

```
src/
├── components/
│   ├── Navbar.tsx              # 顶部导航 + 语言切换 + Buy Now
│   ├── HeroSection.tsx         # Hero 首屏
│   ├── ProblemSection.tsx      # 痛点区域
│   ├── ProductSection.tsx      # 产品介绍
│   ├── HowToUseSection.tsx     # 使用方法 3 步
│   ├── IngredientsSection.tsx  # 成分说明
│   ├── ReviewsSection.tsx      # 用户评价
│   ├── FAQSection.tsx          # FAQ 折叠
│   ├── PricingSection.tsx      # 价格模块 + 倒计时
│   └── Footer.tsx              # Footer 法律信息
├── hooks/
│   ├── useCountdown.ts         # 倒计时 Hook
│   └── useScrollReveal.ts      # 滚动渐入动画 Hook
├── store/
│   └── useLanguageStore.ts     # 语言状态 Zustand
├── i18n/
│   ├── index.ts                # i18n 初始化配置
│   └── locales/
│       ├── en.json             # 英文文案
│       └── zh.json             # 中文文案
├── constants/
│   └── config.ts               # 配置常量（Stripe URL、GA ID 等）
├── App.tsx                     # 主入口，组合所有区块
├── main.tsx                    # React 挂载入口
└── index.css                   # Tailwind 全局样式 + 自定义动画
```

## 4. 路由定义

| 路由  | 用途                   |
| --- | -------------------- |
| `/` | 单页落地页（所有区块垂直滚动，锚点导航） |

锚点 ID：

* `#home` - Hero

* `#problem` - 痛点

* `#product` - 产品

* `#how-to-use` - 使用方法

* `#ingredients` - 成分

* `#reviews` - 评价

* `#faq` - FAQ

* `#pricing` - 购买区

## 5. 关键实现细节

### 5.1 多语言 i18n

* 使用 `react-i18next`，默认语言英文（en），可切换中文（zh）

* 语言选择器位于导航栏右上角

* 语言偏好存储在 localStorage（key: `clearnose-lang`）

* 所有文案集中在 `src/i18n/locales/` 下的 JSON 文件

### 5.2 倒计时

* 使用 Zustand + 自定义 `useCountdown` Hook

* 24 小时循环倒计时（每天 0 点重置或基于首次访问时间）

* 显示在购买区上方：HH:MM:SS

### 5.3 FAQ 折叠

* 使用原生 `<details>` + `<summary>` 或自定义 useState 控制

* 单开模式（同时只能展开一个）

* 平滑高度过渡动画

### 5.4 滚动渐入动画

* Intersection Observer API 监测元素进入视口

* 添加 CSS class 触发 `fade-in-up` 动画

* 各区块错位延迟（animation-delay）

### 5.5 Stripe 跳转

* 所有 Buy Now 按钮统一调用 `handleBuyNow(plan)` 函数

* 跳转 `https://buy.stripe.com/test`

* 预留埋点：`gtag('event', 'buy_now_click', { plan })`

### 5.6 SEO 优化

* `index.html` 中配置完整 meta 标签

* 使用语义化 HTML（section, h1, h2, h3, article）

* 产品图片使用 WebP/优化后的 JPG + alt 属性

* 配置 `robots.txt` 和 `sitemap.xml`

### 5.7 Google Analytics 预留

* `index.html` 中预留 GA4 脚本占位（注释状态，ID 为 G-XXXXXXXXXX）

* 封装 `trackEvent` 工具函数，便于后续启用

## 6. 部署配置

### 6.1 构建命令

```bash
npm run build   # 输出到 dist/
```

### 6.2 GitHub Pages 部署

* 设置 `vite.config.ts` 中 `base: '/ClearNose-Botanical-Spray/'`

* 推送到 `git@github.com:yangyangyang9-9/ClearNose-Botanical-Spray.git`

* 访问地址：`https://yangyangyang9-9.github.io/ClearNose-Botanical-Spray/`

### 6.3 环境变量

* 无需环境变量（Stripe URL 为固定测试地址）

* GA ID 在代码中占位，后续替换

## 7. 数据模型

无数据库。所有内容为静态文案，存储在 i18n JSON 文件中。

### 7.1 i18n 数据结构示例

```json
{
  "hero": {
    "productName": "ClearNose Botanical Spray",
    "headline": "Breathe easier in minutes with botanical nasal support",
    "subheadline": "A gentle plant-based spray to help relieve nasal discomfort",
    "cta": "Buy Now"
  }
}
```

