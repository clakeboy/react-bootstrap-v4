# 项目结构和开发指南

本文件详细介绍了 React Bootstrap v4 组件库的项目结构和开发流程。

## 项目结构

```
react-bootstrap-v4/
├── src/                     # 组件源码目录
│   ├── Button.tsx          # 按钮组件
│   ├── Input.tsx           # 输入框组件
│   ├── Table.tsx           # 表格组件
│   ├── Card.tsx            # 卡片组件
│   └── ...                 # 其他组件
├── examples/               # 示例代码目录
│   ├── index.html          # 主示例页面
│   └── ...                 # 其他示例文件
├── docs/                   # 文档目录
│   ├── components/         # 组件文档
│   │   ├── Button.md       # 按钮组件文档
│   │   ├── Input.md        # 输入框组件文档
│   │   └── ...             # 其他组件文档
│   ├── quick-start.md      # 快速开始指南
│   └── project-structure.md # 项目结构文档
├── lib/                    # 构建输出目录
├── dist/                   # 发布构建目录
├── package.json            # 项目配置文件
└── README.md              # 项目说明文档
```

## 组件开发规范

### 文件命名

所有组件文件应使用 PascalCase 命名，并以 `.tsx` 结尾：

```
Button.tsx
Input.tsx
Table.tsx
```

### 组件结构

每个组件应遵循以下基本结构：

```typescript
import React from 'react';
// 其他导入...

interface Props {
  // 属性定义
}

interface State {
  // 状态定义
}

export class ComponentName extends React.Component<Props, State> {
  // 构造函数
  constructor(props: Props) {
    super(props);
    // 初始化状态
  }

  // 生命周期方法
  componentDidMount() {
    // 组件挂载后执行
  }

  // 渲染方法
  render() {
    return (
      // JSX 内容
    );
  }
}

export default ComponentName;
```

### 属性定义

组件应明确定义属性类型：

```typescript
interface Props {
  theme?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}
```

### 默认属性

组件应定义合理的默认属性：

```typescript
static defaultProps = {
  theme: 'primary',
  disabled: false,
};
```

## 构建流程

### 开发模式

```bash
# 启动开发服务器
npm run start dev
```

这将启动一个本地开发服务器，支持热重载。

### 生产构建

```bash
# 构建生产版本
npm run build
```

这将生成优化的构建文件。

### 发布构建

```bash
# 构建并发布到 npm
npm run build-publish
```

### 项目依赖

#### 开发依赖

```json
{
  "devDependencies": {
    "@babel/core": "^7.3.4",
    "@types/bootstrap": "^5.2.7",
    "@types/react": "^18.0.9",
    "typescript": "^4.6.4",
    "webpack": "^4.47.0",
    "react": "^18.2.0",
    "bootstrap": "^5.3.2"
  }
}
```

## 测试

### 单元测试

所有组件都应有对应的单元测试：

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  const { getByText } = render(<Button>Click me</Button>);
  expect(getByText('Click me')).toBeInTheDocument();
});
```

### 集成测试

集成测试用于验证组件间的协作：

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';
import Input from './Input';

test('form input validation', () => {
  const { getByLabelText } = render(
    <Form>
      <Input label="Email" validate={{ rule: /@/ }} />
    </Form>
  );
  expect(getByLabelText('Email')).toBeInTheDocument();
});
```

## 版本控制

### Git 工作流

1. **主分支** (`main`) - 稳定版本
2. **开发分支** (`develop`) - 开发中的功能
3. **特性分支** (`feature/*`) - 新功能开发

### 提交规范

使用以下格式提交：

```
<type>(<scope>): <subject>

<description>
```

示例：
```
feat(Button): add loading state
Add loading indicator support to Button component
```

## 发布流程

### 版本管理

使用语义化版本控制（SemVer）：

- `MAJOR` 版本：不兼容的 API 修改
- `MINOR` 版本：向后兼容的功能添加
- `PATCH` 版本：向后兼容的问题修复

### 发布步骤

1. 更新 `package.json` 中的版本号
2. 运行构建命令：`npm run build-publish`
3. 发布到 npm：
   ```bash
   npm publish
   ```

## 贡献指南

### 如何提交代码

1. Fork 项目
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 编写代码和测试
4. 提交更改：`git commit -m "feat(component): add new feature"`
5. 推送到远程：`git push origin feature/your-feature`
6. 创建 Pull Request

### 代码审查

所有 Pull Request 需要至少一名维护者审查通过后才能合并。

### 代码风格

遵循以下代码风格：

- 使用 TypeScript 编写组件
- 组件属性使用接口定义
- 适当的注释和文档
- 遵循 React 最佳实践
