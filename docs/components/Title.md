# Title 组件

Title 组件用于创建标题，支持小号字体样式。

## 基本用法

```jsx
import { Title } from '@clake/react-bootstrap4';

// 基本标题
<Title text="这是一个标题" />

// 使用子元素创建标题
<Title>
    这是一个标题内容
</Title>

// 小号标题
<Title text="这是一个小号标题" sm={true} />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 标题的唯一标识符 |
| text | string | '' | 标题文本内容 |
| sm | boolean | false | 是否使用小号字体样式 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 标题操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| 无 | - | 该组件不提供方法 |

## 示例

### 基本标题使用

```jsx
<Title text="主标题" />

<Title>
    通过子元素设置的标题
</Title>
```
