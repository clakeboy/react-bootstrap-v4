# Card 组件

Card组件是一个卡片式布局组件，用于组织和展示内容，支持标题、主体和脚部等部分。

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

### 带主题的卡片

```jsx
<Card theme="primary">
  <Card.Header>主要卡片</Card.Header>
  <Card.Body>
    <p>这是主要主题的卡片内容</p>
  </Card.Body>
</Card>
```

### 带边框的卡片

```jsx
<Card border={true}>
  <Card.Header>带边框卡片</Card.Header>
  <Card.Body>
    <p>这是一个有边框的卡片</p>
  </Card.Body>
</Card>
```

### 带脚部的卡片

```jsx
<Card>
  <Card.Header>带脚部的卡片</Card.Header>
  <Card.Body>
    <p>这是卡片内容</p>
  </Card.Body>
  <Card.Footer>卡片底部</Card.Footer>
</Card>
```

### 带自定义样式的卡片

```jsx
<Card style={{ width: '300px' }}>
  <Card.Header>自定义宽度卡片</Card.Header>
  <Card.Body>
    <p>这个卡片有300px的宽度</p>
  </Card.Body>
</Card>
```

### 带按钮的卡片

```jsx
<Card>
  <Card.Header>操作卡片</Card.Header>
  <Card.Body>
    <p>点击按钮执行操作</p>
  </Card.Body>
  <Card.Footer>
    <Button theme="primary">确认</Button>
    <Button theme="secondary">取消</Button>
  </Card.Footer>
</Card>
