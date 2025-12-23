# Menu 组件

Menu 组件用于创建上下文菜单和多级导航菜单，支持鼠标右键触发、子菜单嵌套和位置自动调整。

## 基本用法

```jsx
import { Menu, MenuItem } from '@clake/react-bootstrap4';

// 基本菜单
<Menu onClick={(field, data) => console.log('点击了:', field)}>
    <MenuItem field="option1" icon="edit">编辑</MenuItem>
    <MenuItem field="option2" icon="delete">删除</MenuItem>
    <MenuItem step={true} /> {/* 分割线 */}
    <MenuItem field="option3" icon="copy">复制</MenuItem>
</Menu>

// 带有子菜单的多级菜单
<Menu onClick={(field, data) => console.log('点击了:', field)}>
    <MenuItem field="file" icon="folder">文件</MenuItem>
    <MenuItem field="edit" icon="edit">编辑</MenuItem>
    <MenuItem field="view" icon="eye">
        视图
        <MenuItem field="zoom-in" icon="search-plus">放大</MenuItem>
        <MenuItem field="zoom-out" icon="search-minus">缩小</MenuItem>
    </MenuItem>
</Menu>

// 在特定位置显示菜单
<Menu onClick={(field, data) => console.log('点击了:', field)}>
    <MenuItem field="option1">选项1</MenuItem>
    <MenuItem field="option2">选项2</MenuItem>
</Menu>
```

## 属性

### Menu 组件属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 菜单的唯一标识符 |
| onClick | function | null | 菜单项点击时的回调函数，参数为 (field, data) |
| onClose | function | null | 菜单关闭时的回调函数，参数为 (e) |
| onShow | function | null | 菜单显示时的回调函数 |
| zIndex | number | 1200 | 菜单的 z-index 值 |
| width | string | '' | 菜单宽度 |
| className | string | '' | 组件的自定义类名 |

### MenuItem 组件属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 菜单项的唯一标识符 |
| field | string | '' | 菜单项字段名（必需） |
| onClick | function | null | 菜单项点击时的回调函数，参数为 (e, field, data) |
| child | boolean | false | 是否为子菜单项（自动设置） |
| text | string | '' | 菜单项文本内容 |
| icon | string | '' | 图标名称（Font Awesome） |
| parent | Menu | null | 父菜单引用（自动设置） |
| step | boolean | false | 是否为分割线 |
| className | string | '' | 组件的自定义类名 |

## 方法

### Menu 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| show | option: { data?: any, evt?: Event, type?: 'mouse'|'dom'|'dom-top'|'dom-bottom'|'dom-left'|'dom-right', close?: Function, menu_list?: any[] } | 显示菜单 |
| hide | e: Event | 隐藏菜单 |
| closeChild | e: Event | 关闭所有子菜单 |

### MenuItem 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| showChildHandler | e: Event | 显示子菜单 |
| closeChildHandler | e: Event | 关闭子菜单 |

## 示例

### 基本上下文菜单

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.menuRef = null;
    }

    handleContextMenu = (e) => {
        e.preventDefault();
        if (this.menuRef) {
            this.menuRef.show({ evt: e, data: 'context-data' });
        }
    };

    handleClick = (field, data) => {
        console.log('菜单项被点击:', field, '数据:', data);
    };

    render() {
        return (
            <div onContextMenu={this.handleContextMenu} style={{ padding: '20px', border: '1px solid #ddd' }}>
                右键点击此处打开菜单
                <Menu 
                    ref={(c) => this.menuRef = c}
                    onClick={this.handleClick}
                >
                    <MenuItem field="edit" icon="edit">编辑</MenuItem>
                    <MenuItem field="delete" icon="trash-alt">删除</MenuItem>
                    <MenuItem step={true} />
                    <MenuItem field="copy" icon="copy">复制</MenuItem>
                </Menu>
            </div>
        );
    }
}
```

### 多级菜单

```jsx
<Menu onClick={(field, data) => console.log('点击了:', field)}>
    <MenuItem field="file" icon="folder">文件</MenuItem>
    <MenuItem field="edit" icon="edit">编辑</MenuItem>
    <MenuItem field="view" icon="eye">
        视图
        <MenuItem field="zoom-in" icon="search-plus">放大</MenuItem>
        <MenuItem field="zoom-out" icon="search-minus">缩小</MenuItem>
    </MenuItem>
    <MenuItem field="help" icon="question-circle">
        帮助
        <MenuItem field="docs">文档</MenuItem>
        <MenuItem field="support">支持</MenuItem>
    </MenuItem>
</Menu>
```

### 在特定位置显示菜单

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.menuRef = null;
    }

    showMenuAtPosition = (e) => {
        e.preventDefault();
        if (this.menuRef) {
            this.menuRef.show({ 
                evt: e, 
                type: 'dom', 
                data: 'position-data' 
            });
        }
    };

    handleClick = (field, data) => {
        console.log('菜单项被点击:', field);
    };

    render() {
        return (
            <div style={{ padding: '20px', border: '1px solid #ddd' }}>
                <button onClick={this.showMenuAtPosition}>显示菜单</button>
                
                <Menu 
                    ref={(c) => this.menuRef = c}
                    onClick={this.handleClick}
                >
                    <MenuItem field="option1">选项1</MenuItem>
                    <MenuItem field="option2">选项2</MenuItem>
                </Menu>
            </div>
        );
    }
}
```

### 带有图标和文本的菜单项

```jsx
<Menu onClick={(field, data) => console.log('点击了:', field)}>
    <MenuItem field="home" icon="home">首页</MenuItem>
    <MenuItem field="profile" icon="user">个人中心</MenuItem>
    <MenuItem field="settings" icon="cog">设置</MenuItem>
    <MenuItem step={true} />
    <MenuItem field="logout" icon="sign-out-alt">退出登录</MenuItem>
</Menu>
```

### 使用自定义样式

```jsx
<Menu 
    onClick={(field, data) => console.log('点击了:', field)}
    className="custom-menu"
    style={{ 
        backgroundColor: '#3498db',
        border: '1px solid #2980b9'
    }}
>
    <MenuItem field="option1" style={{ color: 'white' }}>
        选项1
    </MenuItem>
    <MenuItem field="option2" style={{ color: 'white' }}>
        选项2
    </MenuItem>
</Menu>

<style>
.custom-menu {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.custom-menu .ck-menu-item {
    padding: 8px 16px;
}
</style>
```

### 响应式菜单

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.menuRef = null;
    }

    handleContextMenu = (e) => {
        e.preventDefault();
        if (this.menuRef) {
            this.menuRef.show({ 
                evt: e, 
                data: 'context-data',
                type: 'mouse' // 使用鼠标位置
            });
        }
    };

    handleClick = (field, data) => {
        console.log('菜单项被点击:', field);
    };

    render() {
        return (
            <div onContextMenu={this.handleContextMenu} style={{ padding: '20px', border: '1px solid #ddd' }}>
                右键点击此处打开菜单
                <Menu 
                    ref={(c) => this.menuRef = c}
                    onClick={this.handleClick}
                >
                    <MenuItem field="edit" icon="edit">编辑</MenuItem>
                    <MenuItem field="delete" icon="trash-alt">删除</MenuItem>
                    <MenuItem step={true} />
                    <MenuItem field="copy" icon="copy">复制</MenuItem>
                    <MenuItem field="paste" icon="paste">粘贴</MenuItem>
                </Menu>
            </div>
        );
    }
}
```

### 使用子菜单进行复杂导航

```jsx
<Menu onClick={(field, data) => console.log('点击了:', field)}>
    <MenuItem field="dashboard" icon="tachometer-alt">仪表板</MenuItem>
    
    <MenuItem field="products" icon="shopping-bag">
        产品管理
        <MenuItem field="list">产品列表</MenuItem>
        <MenuItem field="add">添加产品</MenuItem>
        <MenuItem field="categories">分类管理</MenuItem>
    </MenuItem>
    
    <MenuItem field="orders" icon="clipboard-list">
        订单管理
        <MenuItem field="list">订单列表</MenuItem>
        <MenuItem field="create">创建订单</MenuItem>
        <MenuItem step={true} />
        <MenuItem field="reports">报表统计</MenuItem>
    </MenuItem>
    
    <MenuItem field="users" icon="users">
        用户管理
        <MenuItem field="list">用户列表</MenuItem>
        <MenuItem field="roles">角色管理</MenuItem>
    </MenuItem>
    
    <MenuItem step={true} />
    
    <MenuItem field="settings" icon="cog">系统设置</MenuItem>
    <MenuItem field="logout" icon="sign-out-alt">退出登录</MenuItem>
</Menu>
