# Button 组件

Button组件是一个功能丰富的按钮组件，支持多种主题、尺寸和状态。

## 基本用法

```jsx
import { Button } from '@clake/react-bootstrap4';

// 基本按钮
<Button>点击我</Button>

// 主要主题按钮
<Button theme="primary">主要按钮</Button>

// 次要主题按钮
<Button theme="secondary">次要按钮</Button>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| theme | string | 'primary' | 按钮主题（primary, secondary, success, danger, warning, info, light, dark）|
| outline | boolean | false | 是否使用轮廓样式 |
| icon | string | null | 图标名称（来自Font Awesome）|
| tip | string | null | 悬停提示文本 |
| loading | boolean | false | 是否显示加载状态 |
| block | boolean | false | 是否占满父容器宽度 |
| size | string | 'df' | 按钮大小（lg, sm, xs）|
| onClick | function | null | 点击事件处理函数 |

## 示例

### 基本按钮

```jsx
<Button theme="primary">主要按钮</Button>
<Button theme="secondary">次要按钮</Button>
<Button theme="success">成功按钮</Button>
```

### 轮廓按钮

```jsx
<Button outline theme="primary">轮廓主要按钮</Button>
<Button outline theme="secondary">轮廓次要按钮</Button>
```

### 带图标按钮

```jsx
<Button icon="home">首页</Button>
<Button icon="user">用户</Button>
```

### 加载状态按钮

```jsx
<Button loading>加载中...</Button>
```

### 大小按钮

```jsx
<Button size="lg">大按钮</Button>
<Button size="sm">小按钮</Button>
```

### 块级按钮

```jsx
<Button block theme="primary">块级按钮</Button>
