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

### 无间距的行布局

```jsx
<Row noGutters={true}>
    <div className="col-md-4" style={{ backgroundColor: '#f8d7da' }}>列1</div>
    <div className="col-md-4" style={{ backgroundColor: '#d4edda' }}>列2</div>
    <div className="col-md-4" style={{ backgroundColor: '#cce5ff' }}>列3</div>
</Row>
```

### 响应式布局

```jsx
<Row>
    <div className="col-12 col-md-6 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
    <div className="col-12 col-md-6 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
    <div className="col-12 col-md-6 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
    <div className="col-12 col-md-6 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
</Row>
```

### 嵌套行布局

```jsx
<Row>
    <div className="col-md-8">
        <Row>
            <div className="col-md-6">嵌套列1</div>
            <div className="col-md-6">嵌套列2</div>
        </Row>
    </div>
    <div className="col-md-4">
        <Row>
            <div className="col-md-12">嵌套列3</div>
        </Row>
    </div>
</Row>
```

### 自定义样式行

```jsx
<Row className="custom-row" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
    <div className="col-md-4" style={{ backgroundColor: '#e9ecef', padding: '15px' }}>
        <h6>列1</h6>
        <p>内容...</p>
    </div>
    <div className="col-md-4" style={{ backgroundColor: '#e9ecef', padding: '15px' }}>
        <h6>列2</h6>
        <p>内容...</p>
    </div>
    <div className="col-md-4" style={{ backgroundColor: '#e9ecef', padding: '15px' }}>
        <h6>列3</h6>
        <p>内容...</p>
    </div>
</Row>

<style>
.custom-row {
    margin-bottom: 20px;
    border-radius: 8px;
}
</style>
```

### 对齐方式

```jsx
<Row className="align-items-center">
    <div className="col-md-4">垂直居中内容1</div>
    <div className="col-md-4">垂直居中内容2</div>
    <div className="col-md-4">垂直居中内容3</div>
</Row>

<Row className="justify-content-center">
    <div className="col-md-4">水平居中内容1</div>
    <div className="col-md-4">水平居中内容2</div>
</Row>

<Row className="justify-content-between">
    <div className="col-md-3">左对齐内容</div>
    <div className="col-md-3">右对齐内容</div>
</Row>

<Row className="justify-content-around">
    <div className="col-md-3">间隔均匀内容1</div>
    <div className="col-md-3">间隔均匀内容2</div>
    <div className="col-md-3">间隔均匀内容3</div>
</Row>
```

### 响应式断点使用

```jsx
<Row>
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">小屏幕占满，中等屏幕占一半，大屏幕占四分之一</div>
</Row>
```

### 与表单结合使用

```jsx
<form>
    <Row className="mb-3">
        <label htmlFor="input1" className="col-sm-2 col-form-label">标签1</label>
        <div className="col-sm-10">
            <input type="text" className="form-control" id="input1" />
        </div>
    </Row>
    
    <Row className="mb-3">
        <label htmlFor="input2" className="col-sm-2 col-form-label">标签2</label>
        <div className="col-sm-10">
            <input type="text" className="form-control" id="input2" />
        </div>
    </Row>
    
    <Row className="mb-3">
        <label htmlFor="input3" className="col-sm-2 col-form-label">标签3</label>
        <div className="col-sm-10">
            <input type="text" className="form-control" id="input3" />
        </div>
    </Row>
</form>
