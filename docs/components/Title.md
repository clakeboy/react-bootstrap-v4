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

### 小号标题

```jsx
<Title text="小号标题" sm={true} />
```

### 在页面中使用

```jsx
<div className="container">
    <Title text="主标题" />
    <p>这是页面内容...</p>
    
    <Title text="子标题" sm={true} />
    <p>这是子标题内容...</p>
</div>
```

### 自定义样式

```jsx
<Title 
    text="自定义标题"
    className="custom-title"
/>

<style>
.custom-title {
    color: #3498db;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>
```

### 使用状态管理

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '动态标题'
        };
    }

    render() {
        return (
            <div>
                <Title text={this.state.title} />
                
                <button onClick={() => this.setState({ title: '更新后的标题' })}>
                    更新标题
                </button>
            </div>
        );
    }
}
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <Title text="表单标题" />
    
    <div className="form-group">
        <label>姓名</label>
        <input type="text" className="form-control" />
    </div>
    
    <button type="submit" className="btn btn-primary">提交</button>
</form>
```

### 响应式标题布局

```jsx
<div className="container">
    <div className="row">
        <div className="col-md-6">
            <Title text="左侧标题" />
            <p>这是左侧内容...</p>
        </div>
        
        <div className="col-md-6">
            <Title text="右侧标题" sm={true} />
            <p>这是右侧内容...</p>
        </div>
    </div>
</div>
