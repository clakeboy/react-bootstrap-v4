# 快速开始指南

本指南将帮助您快速上手使用 React Bootstrap v4 组件库。

## 安装

### 使用 npm 安装

```bash
npm install @clake/react-bootstrap4
```

### 使用 yarn 安装

```bash
yarn add @clake/react-bootstrap4
```

## 基本使用

### 导入组件

```jsx
// 导入单个组件
import { Button, Input } from '@clake/react-bootstrap4';

// 或者导入所有组件
import * as ReactBootstrap from '@clake/react-bootstrap4';
```

### 基本示例

```jsx
import React from 'react';
import { Button, Input, Card } from '@clake/react-bootstrap4';

function App() {
  return (
    <div>
      <Card>
        <Card.Header>欢迎使用 React Bootstrap v4</Card.Header>
        <Card.Body>
          <Input placeholder="请输入内容" />
          <Button theme="primary" style={{ marginTop: '10px' }}>
            点击按钮
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
```

## 样式集成

### 引入 CSS

React Bootstrap v4 需要引入对应的样式文件：

```jsx
import '@clake/react-bootstrap4/lib/css/bootstrap.5.3.2.css';
// 或者使用 CDN
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
```

### 使用 Bootstrap 样式

```jsx
import { Button } from '@clake/react-bootstrap4';

// 使用 Bootstrap 的主题样式
<Button theme="primary">主要按钮</Button>
<Button theme="secondary">次要按钮</Button>
```

## 常见问题

### 1. 样式不显示

确保您已正确引入 Bootstrap CSS 文件：

```jsx
import '@clake/react-bootstrap4/lib/css/bootstrap.5.3.2.css';
```

### 2. 组件未定义

确保您正确导入了组件：

```jsx
// 正确方式
import { Button } from '@clake/react-bootstrap4';

// 错误方式（如果组件未导出）
import { Button } from 'react-bootstrap';
```

### 3. TypeScript 类型错误

如果您使用 TypeScript，确保已安装类型定义：

```bash
npm install @types/bootstrap --save-dev
```

## 最佳实践

### 1. 组件组合使用

```jsx
import { Form, Input, Button, Card } from '@clake/react-bootstrap4';

function LoginForm() {
  return (
    <Card>
      <Card.Header>登录表单</Card.Header>
      <Card.Body>
        <Form>
          <Input label="用户名" placeholder="请输入用户名" />
          <Input label="密码" type="password" placeholder="请输入密码" />
          <Button theme="primary" type="submit">登录</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
```

### 2. 响应式设计

```jsx
import { Button } from '@clake/react-bootstrap4';

function ResponsiveButton() {
  return (
    <div className="d-flex flex-column gap-2">
      <Button size="lg">大按钮</Button>
      <Button size="md">中按钮</Button>
      <Button size="sm">小按钮</Button>
    </div>
  );
}
```

### 3. 表单验证

```jsx
import { Input } from '@clake/react-bootstrap4';

function ValidatedInput() {
  return (
    <Input 
      label="邮箱"
      validate={{
        rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        text: '请输入有效的邮箱地址',
        tip: true
      }}
    />
  );
}
```

## 开发和构建

### 开发模式

```bash
# 启动开发服务器
npm run start dev
```

### 生产构建

```bash
# 构建生产版本
npm run build
```

### 发布到 npm

```bash
# 构建并发布
npm run build-publish
