# Chat Bot - LLM大模型对话项目

## 项目简介
本项目是一个基于大语言模型（LLM）的聊天机器人应用，采用前后端分离的架构。前端使用 React.js 构建用户界面，结合 Redux 进行状态管理，后端使用 Node.js 和 Express 搭建服务器，利用 Mongoose 与 MongoDB 数据库进行交互，实现了用户注册、登录、聊天记录的创建、更新、获取和删除等功能。

## 项目结构
```
chat-bot/
├── chatbot-nodejs/        # 后端项目
│   ├── bin/               # 启动脚本
│   ├── config/            # 配置文件
│   ├── middlewares/       # 中间件
│   ├── models/            # 数据库模型
│   ├── routes/            # 路由
│   ├── views/             # 视图模板
│   ├── app.js             # 主应用文件
│   └── package.json       # 依赖管理
├── chatbot-reactjs/       # 前端项目
│   ├── public/            # 公共资源
│   ├── src/               # 源代码
│   │   ├── apis/          # API 请求
│   │   ├── components/    # 组件
│   │   ├── pages/         # 页面
│   │   ├── router/        # 路由配置
│   │   ├── store/         # 状态管理
│   │   ├── utils/         # 工具函数
│   │   ├── index.css      # 全局样式
│   │   └── main.jsx       # 入口文件
│   ├── .gitignore         # Git 忽略文件
│   ├── index.html         # HTML 模板
│   ├── package.json       # 依赖管理
│   └── vite.config.js     # Vite 配置文件
└── .gitignore             # 全局 Git 忽略文件
```

## 功能特性
1. **用户认证**：支持用户注册、登录和注销功能。
2. **聊天记录管理**：用户可以创建新的对话，更新对话内容，获取对话列表和特定对话，以及删除对话。
3. **流式响应**：与大语言模型的交互采用流式响应，提升用户体验。
4. **状态管理**：使用 Redux Toolkit 管理应用状态，确保数据的一致性和可维护性。

## 安装与运行

### 后端项目（chatbot-nodejs）
1. 克隆项目：
```bash
git clone https://github.com/jet-isnt-haha/chat-bot.git
cd chat-bot/chatbot-nodejs
```
2. 安装依赖：
```bash
npm install
```
3. 配置环境变量：
在 `config/config.js` 文件中配置数据库连接信息和大语言模型的 API 地址及密钥。
```javascript
module.exports = {
    API_URL: 'your_api_url',
    API_KEY: 'your_api_key'
};
```
4. 启动服务器：
```bash
npm start
```

### 前端项目（chatbot-reactjs）
1. 进入前端项目目录：
```bash
cd ../chatbot-reactjs
```
2. 安装依赖：
```bash
npm install
```
3. 启动开发服务器：
```bash
npm run dev
```

## API 文档

### 用户相关
- **注册**：`POST /api/register`
- **登录**：`POST /api/login`
- **注销**：`POST /api/logout`

### 聊天记录相关
- **创建新对话**：`GET /api/message`
- **更新对话**：`POST /api/message/upsert`
- **获取对话列表**：`GET /api/msgids`
- **获取特定对话**：`GET /api/message/:id`
- **删除对话**：`DELETE /api/message/:id`

### 大语言模型交互
- **生成回复**：`POST /api/generate`

## 代码说明

### 后端代码
- `models/` 目录下定义了数据库模型，如 `UserModel.js` 和 `MessageModel.js`。
- `routes/` 目录下定义了 API 路由，如 `message.js` 和 `model.js`。
- `middlewares/` 目录下定义了中间件，如 `checkTokenMiddleware.js` 用于验证用户身份。

### 前端代码
- `src/apis/` 目录下定义了 API 请求函数，如 `chatbot.js` 和 `user.js`。
- `src/store/` 目录下使用 Redux Toolkit 管理应用状态，如 `user.js` 和 `message.js`。
- `src/components/` 目录下定义了组件，如 `ChatBody.jsx` 和 `ChatHeader.jsx`。

## 贡献指南
1. 克隆项目并创建新的分支。
2. 提交代码并确保代码通过测试。
3. 发起 Pull Request，描述你的修改内容和目的。

## 许可证
本项目采用 [MIT 许可证](LICENSE)。


