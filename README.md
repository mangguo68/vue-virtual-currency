# Vue Virtual Currency

一个基于 Vue 3 + TypeScript + Vite 构建的现代化虚拟货币管理系统，提供丰富的数据可视化和用户管理功能。

## 📋 项目简介

Vue Virtual Currency 是一个功能完备的虚拟货币管理系统，专为数字货币投资者和爱好者设计。系统采用现代化的前端技术栈，提供直观的数据可视化界面，帮助用户实时监控和管理虚拟货币资产。

### 主要特点

- 🎨 精致的 UI 设计，基于专业 UI 设计图实现
- 📊 丰富的图表展示，包括收益表现、投资组合分析、趋势预测等
- 🔒 完善的用户管理系统，支持登录注册和个人设置
- 📈 实时服务器状态监控
- 💱 多币种管理和汇率监控
- 🎯 智能的收益分析和预测功能

## 🛠️ 技术栈

| 技术         | 版本  | 用途       |
| ------------ | ----- | ---------- |
| Vue.js       | 3.5+  | 前端框架   |
| TypeScript   | 5.8+  | 类型系统   |
| Vite         | 7.0+  | 构建工具   |
| Pinia        | 3.0+  | 状态管理   |
| Element Plus | 2.11+ | UI 组件库  |
| ECharts      | 6.0+  | 数据可视化 |
| Tailwind CSS | 4.1+  | 样式框架   |
| Font Awesome | 7.0+  | 图标库     |
| Mock.js      | 1.1+  | 模拟数据   |

## 📁 项目结构

```
src/
├── api/              # API 接口定义
├── assets/           # 静态资源
├── components/       # 组件库
│   ├── charts/       # 图表组件
│   ├── common/       # 通用组件
│   ├── layout/       # 布局组件
│   └── pages/        # 页面组件
├── composables/      # 组合式 API
├── mock/             # 模拟数据
├── router/           # 路由配置
├── stores/           # 状态管理
├── App.vue           # 根组件
└── main.ts           # 入口文件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- npm >= 10.0.0

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

### 代码格式化

```bash
npm run format
```

## 📱 核心功能

### 1. 仪表盘

- 收益表现图表
- 收益分解分析
- 投资组合管理
- 趋势预测分析
- 货币列表监控

### 2. 工具菜单

- 多币种管理
- 投资工具集成
- 市场数据查询

### 3. 数据统计

- 详细的数据分析
- 多维度数据可视化
- 历史数据对比

### 4. 服务器状态

- 实时服务器监控
- 系统性能分析
- 网络状态检测

### 5. 用户设置

- 个人信息管理
- 安全设置
- 通知设置
- 账户偏好配置

## 🎨 界面预览

### 首页仪表盘

<img width="1910" height="933" alt="仪表盘" src="https://github.com/user-attachments/assets/f6018635-a65c-4782-ac5a-7cd9dcff985f" />

### 工具菜单

<img width="1910" height="933" alt="工具菜单" src="https://github.com/user-attachments/assets/d44ba0c1-683a-43bf-aba5-e8e449072995" />

### 数据统计

<img width="1910" height="933" alt="数据统计" src="https://github.com/user-attachments/assets/3ea46899-5da1-4761-a3fd-d339377d5fc3" />

### 服务器状态监控

<img width="1910" height="933" alt="服务器状态" src="https://github.com/user-attachments/assets/a8cb3acb-ddcb-4356-8c2b-eb7da7cdb155" />

### 用户设置

<img width="1910" height="933" alt="用户设置" src="https://github.com/user-attachments/assets/6e72881a-e243-4836-95f2-788eab17340f" />

## 🔧 开发指南

### 推荐 IDE 设置

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用 Vetur)
- 安装项目推荐的扩展

### 代码规范

- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 类型规范
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case

### 模拟数据

项目在开发环境中使用 Mock.js 提供模拟数据，位于 `src/mock/` 目录下。

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件

## 📞 联系我们

如有问题或建议，欢迎联系项目维护者。

---

**感谢使用 Vue Virtual Currency！** 🚀

_注：本项目目前已完成前端部分，后端部分正在开发中，后续将发布后端仓库。_
