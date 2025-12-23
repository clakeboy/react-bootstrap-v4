# Load 组件

Load 组件用于创建加载动画，适用于数据加载、异步操作等场景。

## 基本用法

```jsx
import { Load } from '@clake/react-bootstrap4';

// 基本加载动画
<Load />

// 加载动画带文本提示
<Load>正在加载中...</Load>

// 自定义类名的加载动画
<Load className="custom-load" />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 加载动画的唯一标识符 |
| className | string | '' | 组件的自定义类名 |
| children | any | null | 加载动画旁边的文本内容 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getClasses | - | 获取组件的CSS类名 |

## 示例

### 基本加载动画

```jsx
<div className="load-example">
    <Load />
</div>
```

### 带有文本提示的加载动画

```jsx
<div className="load-example">
    <Load>正在加载数据...</Load>
</div>

<div className="load-example">
    <Load>保存中，请稍候...</Load>
</div>

<div className="load-example">
    <Load>正在提交表单...</Load>
</div>
```

### 使用自定义样式

```jsx
<div className="load-example">
    <Load 
        className="custom-load" 
        style={{ color: '#3498db', fontSize: '16px' }}
    >
        加载中...
    </Load>
</div>

<style>
.custom-load {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
```

### 在表格中使用

```jsx
<table className="table">
    <thead>
        <tr>
            <th>名称</th>
            <th>状态</th>
        </tr>
    </thead>
    <tbody>
        {loading ? (
            <tr>
                <td colSpan={2}>
                    <Load>正在加载数据...</Load>
                </td>
            </tr>
        ) : (
            data.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                </tr>
            ))
        )}
    </tbody>
</table>
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <div className="form-group">
        <label htmlFor="name">姓名</label>
        <input type="text" className="form-control" id="name" />
    </div>
    
    <button type="submit" className="btn btn-primary">
        {loading ? (
            <Load>提交中...</Load>
        ) : (
            '提交'
        )}
    </button>
</form>
```

### 在按钮中使用

```jsx
<button className="btn btn-primary" onClick={handleClick}>
    {loading ? (
        <Load>处理中...</Load>
    ) : (
        '点击操作'
    )}
</button>
```

### 与条件渲染结合使用

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
                data: ['项目1', '项目2', '项目3']
            });
        }, 2000);
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <Load>正在加载数据...</Load>
                ) : (
                    <ul>
                        {this.state.data.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}
```

### 自定义加载动画样式

```jsx
<div className="load-example">
    <Load 
        className="custom-load" 
        style={{ 
            color: '#e74c3c', 
            fontSize: '18px',
            fontWeight: 'bold'
        }}
    >
        加载失败，请重试
    </Load>
</div>

<style>
.custom-load {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
