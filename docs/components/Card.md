# Card 组件

Card 组件用于组织内容区块，支持标题、主体和脚部等结构区域。

## 基本用法

```jsx
import { Card } from '@clake/react-bootstrap4';

// 基本卡片
<Card>
  <Card.Header>卡片标题</Card.Header>
  <Card.Body>
    <p>这是卡片内容</p>
  </Card.Body>
</Card>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| theme | string | 'primary' | 卡片主题（primary, secondary, success, danger, warning, info, light, dark）|
| border | boolean | false | 是否显示边框 |
| outline | boolean | false | 是否使用轮廓样式 |

## 子组件

### Card.Header（卡片头部）

```jsx
<Card.Header>卡片标题</Card.Header>
```

### Card.Body（卡片主体）

```jsx
<Card.Body>
  <p>这是卡片内容</p>
</Card.Body>
```

### Card.Footer（卡片脚部）

```jsx
<Card.Footer>卡片底部</Card.Footer>
```

## 示例

### 基本卡片

```jsx
<Card>
  <Card.Header>卡片标题</Card.Header>
  <Card.Body>
    <p>这是卡片内容</p>
  </Card.Body>
</Card>
```
