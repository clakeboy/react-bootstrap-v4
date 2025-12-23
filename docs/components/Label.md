# Label 组件

Label 组件用于创建自定义标签，支持颜色、背景色、尺寸和定位等样式配置。

## 基本用法

```jsx
import { Label } from '@clake/react-bootstrap4';

// 基本标签
<Label text="普通标签" />

// 带有颜色的标签
<Label text="红色标签" color="red" />

// 带有背景色的标签
<Label text="蓝色背景标签" backColor="#3498db" color="white" />

// 小尺寸标签
<Label text="小尺寸标签" sm={true} />

// 使用自定义样式
<Label 
    text="自定义标签" 
    color="#e74c3c" 
    backColor="#f8d7da"
    sm={true}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 标签的唯一标识符 |
| text | string | '' | 标签文本内容（必需） |
| color | string | '' | 文字颜色 |
| backColor | string | '' | 背景颜色 |
| sm | boolean | false | 小尺寸标签 |
| align | string | '' | 文本对齐方式（'left', 'center', 'right'） |
| absolute | boolean | false | 绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| className | string | '' | 组件的自定义类名 |
| style | object | {} | 内联样式 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getClasses | - | 获取组件的CSS类名 |
| getStyles | - | 获取组件的样式对象 |

## 示例

### 基本标签使用

```jsx
<div className="label-example">
    <Label text="普通标签" />
    <Label text="红色标签" color="red" />
    <Label text="绿色标签" color="green" />
    <Label text="蓝色标签" color="blue" />
</div>
```

### 带有背景色的标签

```jsx
<div className="label-example">
    <Label text="成功" backColor="#d4edda" color="#155724" />
    <Label text="警告" backColor="#fff3cd" color="#856404" />
    <Label text="危险" backColor="#f8d7da" color="#721c24" />
    <Label text="信息" backColor="#d1ecf1" color="#0c5460" />
</div>
```

### 小尺寸标签

```jsx
<div className="label-example">
    <Label text="普通大小" />
    <Label text="小尺寸" sm={true} />
</div>
```

### 绝对定位标签

```jsx
<div style={{ position: 'relative', width: '300px', height: '200px', border: '1px solid #ddd' }}>
    <Label 
        text="绝对定位标签" 
        absolute={true} 
        x="50px" 
        y="50px"
        backColor="#3498db"
        color="white"
    />
</div>
```

### 使用自定义样式

```jsx
<Label 
    text="自定义标签" 
    color="#e74c3c"
    backColor="#f8d7da" 
    width="120px"
    height="30px"
    align="center"
    className="custom-label"
/>
```

### 与表单结合使用

```jsx
<form>
    <div className="form-group">
        <label htmlFor="name">姓名</label>
        <input type="text" className="form-control" id="name" />
        <Label text="必填项" color="red" sm={true} />
    </div>
    
    <div className="form-group">
        <label htmlFor="email">邮箱</label>
        <input type="email" className="form-control" id="email" />
        <Label text="格式正确" backColor="#d4edda" color="#155724" sm={true} />
    </div>
</form>
```

### 动态更新标签内容

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '初始文本'
        };
    }

    updateLabel = () => {
        this.setState({
            message: '更新后的文本'
        });
    }

    render() {
        return (
            <div>
                <Label text={this.state.message} backColor="#3498db" color="white" />
                <button onClick={this.updateLabel}>更新标签</button>
            </div>
        );
    }
}
```

### 响应式布局中的标签

```jsx
<div className="row">
    <div className="col-md-6">
        <Label text="左侧标签" color="#3498db" />
    </div>
    <div className="col-md-6">
        <Label text="右侧标签" backColor="#e74c3c" color="white" />
    </div>
</div>
```

### 标签与图标结合使用

```jsx
<div className="label-with-icon">
    <Label 
        text="成功" 
        backColor="#d4edda" 
        color="#155724"
        className="d-flex align-items-center"
    >
        <span className="mr-1">✓</span>
        {this.state.text}
    </Label>
</div>
