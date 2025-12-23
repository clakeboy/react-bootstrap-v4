# Box 组件

Box 组件用于创建一个可自定义样式的容器，支持绝对定位、宽度、高度、边框宽度、边框颜色和背景颜色设置。

## 基本用法

```jsx
import { Box } from '@clake/react-bootstrap4';

// 基本容器
<Box>这是一个基本的容器</Box>

// 绝对定位的容器
<Box absolute x="10px" y="20px">这是一个绝对定位的容器</Box>

// 设置宽度和高度
<Box width="200px" height="100px">这是一个宽度为200px，高度为100px的容器</Box>

// 设置边框宽度和颜色
<Box borderWidth="2px" borderColor="#ff0000">这是一个边框宽度为2px，颜色为红色的容器</Box>

// 设置背景颜色
<Box backColor="#f0f0f0">这是一个背景颜色为浅灰色的容器</Box>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 容器的水平位置（仅在 absolute 为 true 时有效） |
| y | string | '' | 容器的垂直位置（仅在 absolute 为 true 时有效） |
| width | string | '' | 容器的宽度 |
| height | string | '' | 容器的高度 |
| borderWidth | string | '' | 边框宽度 |
| borderColor | string | '#c3c3c3' | 边框颜色 |
| backColor | string | '' | 背景颜色 |

## 示例

### 基本容器

```jsx
<Box>这是一个基本的容器</Box>
```

### 绝对定位容器

```jsx
<Box absolute x="10px" y="20px">这是一个绝对定位的容器</Box>
```

### 设置宽度和高度

```jsx
<Box width="200px" height="100px">这是一个宽度为200px，高度为100px的容器</Box>
```

### 设置边框宽度和颜色

```jsx
<Box borderWidth="2px" borderColor="#ff0000">这是一个边框宽度为2px，颜色为红色的容器</Box>
```

### 设置背景颜色

```jsx
<Box backColor="#f0f0f0">这是一个背景颜色为浅灰色的容器</Box>
