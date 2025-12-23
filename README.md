# React Bootstrap v4 组件库

这是一个基于Bootstrap 4的React组件库，提供了丰富的UI组件来构建现代化的Web应用程序。

## 特性

- 基于React和Bootstrap 4
- 完整的UI组件集合
- TypeScript支持
- 响应式设计
- 易于定制和扩展

## 安装

```bash
npm install @clake/react-bootstrap4
```

或者使用yarn：

```bash
yarn add @clake/react-bootstrap4
```

## 使用

### 基本用法

```jsx
import React from 'react';
import { Button, Input } from '@clake/react-bootstrap4';

function App() {
  return (
    <div>
      <Button theme="primary">点击我</Button>
      <Input placeholder="请输入内容" />
    </div>
  );
}
```

### 组件导入

```javascript
// 导入单个组件
import { Button } from '@clake/react-bootstrap4';

// 或者导入所有组件
import * as ReactBootstrap from '@clake/react-bootstrap4';
```

## 组件列表

本库包含以下主要组件：

- Button - 按钮组件
- Input - 输入框组件
- Table - 表格组件
- Card - 卡片组件
- Dropdown - 下拉菜单组件
- Modal - 模态框组件
- Form - 表单组件
- Calendar - 日历组件
- Tabs - 标签页组件
- 和更多...

## 文档结构

详细的组件文档和使用示例请查看：

1. [组件文档](docs/README.md)
2. [快速开始](docs/quick-start.md)
3. [示例代码](examples/index.html)

## 组件使用指南

### Button（按钮）

```jsx
<Button theme="primary" onClick={handleClick}>
  点击我
</Button>
```

### Input（输入框）

```jsx
<Input 
  placeholder="请输入内容"
  onChange={handleChange}
/>
```

### Table（表格）

```jsx
<Table data={data}>
  <Table.Header field="name" text="姓名" />
  <Table.Header field="age" text="年龄" />
</Table>
```

## 快速开始

1. 安装依赖包
2. 在项目中导入组件
3. 开始使用组件构建用户界面

## 示例代码

### 基本按钮示例

```jsx
import React from 'react';
import { Button } from '@clake/react-bootstrap4';

function Example() {
  return (
    <div>
      <Button theme="primary">主要按钮</Button>
      <Button theme="secondary">次要按钮</Button>
      <Button theme="success">成功按钮</Button>
    </div>
  );
}
```

### 表单示例

```jsx
import React, { useState } from 'react';
import { Form, Input, Button } from '@clake/react-bootstrap4';

function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Form>
      <Input 
        label="姓名"
        value={formData.name}
        onChange={(val) => handleChange('name', val)}
      />
      <Input 
        label="邮箱"
        value={formData.email}
        onChange={(val) => handleChange('email', val)}
      />
      <Button type="submit">提交</Button>
    </Form>
  );
}
```

## 开发和贡献

### 构建项目

```bash
# 安装依赖
npm install

# 开发模式运行
npm run start dev

# 构建生产版本
npm run build
```

### 项目结构

- `src/` - 组件源码目录
- `examples/` - 示例代码目录  
- `docs/` - 文档目录

## 许可证

MIT 许可证，详情请查看 [LICENSE](LICENSE) 文件。
