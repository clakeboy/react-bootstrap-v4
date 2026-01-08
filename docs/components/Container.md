# Container 组件

Container 组件用于创建一个容器，支持流体布局和内联样式。

## 基本用法

```jsx
import { Container } from '@clake/react-bootstrap4';

// 基本容器
<Container>
    <div>内容</div>
</Container>

// 流体容器（占满父容器宽度）
<Container fluid>
    <div>流体内容</div>
</Container>

// 内联容器
<Container inline>
    <div>内联内容</div>
</Container>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 容器的唯一标识符 |
| fluid | boolean | false | 是否使用流体布局（占满父容器宽度） |
| inline | boolean | false | 是否使用内联样式 |
| className | string | '' | 容器的自定义类名 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getClasses | - | 获取容器的类名 |

## 示例

### 基本容器

```jsx
<Container>
    <div>内容</div>
</Container>
```
