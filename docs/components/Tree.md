# Tree 组件

Tree 组件用于创建可展开的树形结构，支持复选框、双击展开/折叠和右键菜单功能。

## 基本用法

```jsx
import { Tree } from '@clake/react-bootstrap4';

// 基本树形结构
<Tree 
    data={[
        {
            text: '节点1',
            icon: 'folder',
            children: [
                { text: '子节点1-1', icon: 'file' },
                { text: '子节点1-2', icon: 'file' }
            ]
        },
        {
            text: '节点2',
            icon: 'folder',
            children: [
                { text: '子节点2-1', icon: 'file' },
                {
                    text: '子节点2-2',
                    icon: 'folder',
                    children: [
                        { text: '孙节点2-2-1', icon: 'file' },
                        { text: '孙节点2-2-2', icon: 'file' }
                    ]
                }
            ]
        }
    ]}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 树形结构的唯一标识符 |
| data | any[] | [] | 树形数据，每个节点包含 text、icon 和 children 属性 |
| onClick | function | null | 点击节点时的回调函数，参数为 (event, data, id) |
| onDbClick | function | null | 双击节点时的回调函数，参数为 (data, id)，返回 false 会阻止展开 |
| onMenu | function | null | 右键菜单事件回调函数，参数为 (event, data, id) |
| showSelected | boolean | false | 是否显示选中状态（高亮） |
| check | boolean | false | 是否显示复选框 |
| onSelect | function | null | 复选框状态改变时的回调函数，参数为 (checked, data) |
| width | string | '' | 宽度 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 数据操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getSelected | - | 获取所有选中的节点数据 |

## 示例

### 基本树形结构使用

```jsx
<Tree 
    data={[
        {
            text: '根节点',
            icon: 'folder',
            children: [
                { 
                    text: '子节点1', 
                    icon: 'folder',
                    children: [
                        { text: '孙节点1-1', icon: 'file' },
                        { text: '孙节点1-2', icon: 'file' }
                    ]
                },
                { 
                    text: '子节点2', 
                    icon: 'file'
                }
            ]
        },
        {
            text: '根节点2',
            icon: 'folder',
            children: [
                { 
                    text: '子节点2-1', 
                    icon: 'file' 
                }
            ]
        }
    ]}
/>
```

### 带有复选框的树形结构

```jsx
<Tree 
    check={true}
    data={[
        {
            text: '节点1',
            icon: 'folder',
            checked: true,
            children: [
                { text: '子节点1-1', icon: 'file' },
                { text: '子节点1-2', icon: 'file', checked: true }
            ]
        },
        {
            text: '节点2',
            icon: 'folder',
            children: [
                { text: '子节点2-1', icon: 'file' },
                {
                    text: '子节点2-2',
                    icon: 'folder',
                    children: [
                        { text: '孙节点2-2-1', icon: 'file' },
                        { text: '孙节点2-2-2', icon: 'file' }
                    ]
                }
            ]
        }
    ]}
    onSelect={(checked, data) => console.log('选中状态改变:', checked, data)}
/>
```

### 带有点击事件的树形结构

```jsx
<Tree 
    data={[
        {
            text: '节点1',
            icon: 'folder',
            children: [
                { text: '子节点1-1', icon: 'file' },
                { text: '子节点1-2', icon: 'file' }
            ]
        },
        {
            text: '节点2',
            icon: 'folder',
            children: [
                { text: '子节点2-1', icon: 'file' },
                {
                    text: '子节点2-2',
                    icon: 'folder',
                    children: [
                        { text: '孙节点2-2-1', icon: 'file' },
                        { text: '孙节点2-2-2', icon: 'file' }
                    ]
                }
            ]
        }
    ]}
    onClick={(event, data, id) => console.log('点击节点:', data, 'ID:', id)}
    onDbClick={(data, id) => {
        console.log('双击节点:', data);
        // 返回 false 可阻止展开
        return true;
    }}
/>
```

### 带有右键菜单的树形结构

```jsx
<Tree 
    data={[
        {
            text: '节点1',
            icon: 'folder',
            children: [
                { text: '子节点1-1', icon: 'file' },
                { text: '子节点1-2', icon: 'file' }
            ]
        },
        {
            text: '节点2',
            icon: 'folder',
            children: [
                { text: '子节点2-1', icon: 'file' },
                {
                    text: '子节点2-2',
                    icon: 'folder',
                    children: [
                        { text: '孙节点2-2-1', icon: 'file' },
                        { text: '孙节点2-2-2', icon: 'file' }
                    ]
                }
            ]
        }
    ]}
    onMenu={(event, data, id) => {
        event.preventDefault();
        console.log('右键菜单:', data);
        // 在此处显示自定义右键菜单
    }}
/>
```

### 获取选中节点

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.treeRef = null;
    }

    getSelectedNodes = () => {
        if (this.treeRef) {
            return this.treeRef.getSelected();
        }
    };

    render() {
        return (
            <div>
                <Tree 
                    ref={(c) => this.treeRef = c}
                    check={true}
                    data={[
                        {
                            text: '节点1',
                            icon: 'folder',
                            children: [
                                { text: '子节点1-1', icon: 'file' },
                                { text: '子节点1-2', icon: 'file' }
                            ]
                        },
                        {
                            text: '节点2',
                            icon: 'folder',
                            children: [
                                { text: '子节点2-1', icon: 'file' },
                                {
                                    text: '子节点2-2',
                                    icon: 'folder',
                                    children: [
                                        { text: '孙节点2-2-1', icon: 'file' },
                                        { text: '孙节点2-2-2', icon: 'file' }
                                    ]
                                }
                            ]
                        }
                    ]}
                />
                
                <button onClick={() => {
                    const selected = this.getSelectedNodes();
                    console.log('选中节点:', selected);
                }}>
                    获取选中节点
                </button>
            </div>
        );
    }
}
```

### 响应式树形结构布局

```jsx
<div className="container">
    <div className="row">
        <div className="col-md-6">
            <h5>基本树形结构</h5>
            <Tree 
                data={[
                    {
                        text: '节点1',
                        icon: 'folder',
                        children: [
                            { text: '子节点1-1', icon: 'file' },
                            { text: '子节点1-2', icon: 'file' }
                        ]
                    },
                    {
                        text: '节点2',
                        icon: 'folder',
                        children: [
                            { text: '子节点2-1', icon: 'file' },
                            {
                                text: '子节点2-2',
                                icon: 'folder',
                                children: [
                                    { text: '孙节点2-2-1', icon: 'file' },
                                    { text: '孙节点2-2-2', icon: 'file' }
                                ]
                            }
                        ]
                    }
                ]}
            />
        </div>
        
        <div className="col-md-6">
            <h5>带复选框的树形结构</h5>
            <Tree 
                check={true}
                data={[
                    {
                        text: '节点1',
                        icon: 'folder',
                        checked: true,
                        children: [
                            { text: '子节点1-1', icon: 'file' },
                            { text: '子节点1-2', icon: 'file' }
                        ]
                    },
                    {
                        text: '节点2',
                        icon: 'folder',
                        children: [
                            { text: '子节点2-1', icon: 'file' },
                            {
                                text: '子节点2-2',
                                icon: 'folder',
                                children: [
                                    { text: '孙节点2-2-1', icon: 'file' },
                                    { text: '孙节点2-2-2', icon: 'file' }
                                ]
                            }
                        ]
                    }
                ]}
            />
        </div>
    </div>
</div>
```

### 自定义样式

```jsx
<Tree 
    data={[
        {
            text: '节点1',
            icon: 'folder',
            children: [
                { text: '子节点1-1', icon: 'file' },
                { text: '子节点1-2', icon: 'file' }
            ]
        },
        {
            text: '节点2',
            icon: 'folder',
            children: [
                { text: '子节点2-1', icon: 'file' },
                {
                    text: '子节点2-2',
                    icon: 'folder',
                    children: [
                        { text: '孙节点2-2-1', icon: 'file' },
                        { text: '孙节点2-2-2', icon: 'file' }
                    ]
                }
            ]
        }
    ]}
    className="custom-tree"
/>

<style>
.custom-tree .ck-tree-item {
    margin-bottom: 5px;
}

.custom-tree .ck-tree-content {
    padding: 8px;
    border-radius: 4px;
}

.custom-tree .ck-tree-content:hover {
    background-color: #f8f9fa;
}

.custom-tree .ck-tree-icon {
    color: #3498db;
}
</style>
