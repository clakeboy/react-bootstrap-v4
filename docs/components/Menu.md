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
