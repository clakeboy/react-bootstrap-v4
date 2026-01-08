# Button 组件

Button 组件用于触发操作，支持主题、轮廓样式、加载态和尺寸变化。

## 基本用法

```jsx
import { Button } from '@clake/react-bootstrap4';

<Button>默认按钮</Button>
<Button theme="primary">主要按钮</Button>
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

## 进阶用法

### 轮廓与主题

```jsx
<Button outline theme="primary">轮廓主要按钮</Button>
<Button theme="success">成功按钮</Button>
```

### 图标与加载态

```jsx
<Button icon="home">首页</Button>
<Button icon="user">用户</Button>
<Button loading>加载中...</Button>
```

### 尺寸与块级

```jsx
<Button size="lg">大按钮</Button>
<Button size="sm">小按钮</Button>
<Button block theme="primary">块级按钮</Button>
```
