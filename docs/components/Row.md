# Row 组件

Row 组件用于创建响应式网格系统的行容器，基于 Bootstrap 的 row 布局系统。

## 基本用法

```jsx
import { Row } from '@clake/react-bootstrap4';

// 基本行容器
<Row>
    <div className="col-md-4">内容1</div>
    <div className="col-md-4">内容2</div>
    <div className="col-md-4">内容3</div>
</Row>

// 无间距的行容器
<Row noGutters={true}>
    <div className="col-md-4">内容1</div>
    <div className="col-md-4">内容2</div>
    <div className="col-md-4">内容3</div>
</Row>

// 带有自定义类名的行容器
<Row className="custom-row">
    <div className="col-md-6">内容1</div>
    <div className="col-md-6">内容2</div>
</Row>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 行容器的唯一标识符 |
| noGutters | boolean | false | 是否移除列之间的间距（gutter） |
| className | string | '' | 组件的自定义类名 |

## 方法

### 布局计算

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getClasses | - | 获取行容器的CSS类名 |

## 示例

### 基本行布局

```jsx
<Row>
    <div className="col-md-3">列1</div>
    <div className="col-md-6">列2</div>
    <div className="col-md-3">列3</div>
</Row>
```
