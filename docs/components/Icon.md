# Icon 组件

Icon 组件用于在 React 应用中显示图标，支持 Font Awesome 和 Bootstrap 图标系统。

## 基本用法

```jsx
import { Icon } from '@clake/react-bootstrap4';

// 基本图标
<Icon icon="home" />

// 使用不同样式
<Icon icon="home" iconType="regular" />
<Icon icon="home" iconType="light" />
<Icon icon="facebook-f" iconType="brands" />

// 带有旋转效果的图标
<Icon icon="spinner" spin={true} />

// 使用 Bootstrap 图标
<Icon icon="bi-check-circle" bs={true} />

// 带有点击事件的图标
<Icon icon="times" onClick={(e) => console.log('图标被点击')} />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 图标的唯一标识符 |
| iconType | 'solid' \| 'regular' \| 'light' \| 'brands' | 'solid' | 图标类型 |
| icon | string | '' | 图标名称（必需） |
| spin | boolean | false | 是否旋转图标 |
| bs | boolean | false | 是否使用 Bootstrap 图标 |
| onClick | function | null | 点击事件处理器 |
| className | string | '' | 图标的自定义类名 |
| style | object | {} | 图标的内联样式 |

## 方法

### IconRef 接口

Icon 组件提供了一个 ref 接口，用于动态修改图标。

```typescript
interface IconRef {
    setIcon: (icon: string) => void;
}
```

#### 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| setIcon | icon: string | 设置图标名称 |

## 图标类型说明

### Font Awesome 图标类型
- `solid` (默认): 实心图标（fas）
- `regular`: 常规图标（far）  
- `light`: 细线图标（fal）
- `brands`: 品牌图标（fab）

### Bootstrap 图标
当设置 `bs={true}` 时，使用 Bootstrap Icons 库。需要在项目中引入 Bootstrap Icons CSS。

## 示例

### 基本图标使用

```jsx
<div className="icon-example">
    <Icon icon="home" /> 基本图标
</div>

<div className="icon-example">
    <Icon icon="home" iconType="regular" /> 常规图标
</div>

<div className="icon-example">
    <Icon icon="home" iconType="light" /> 细线图标
</div>

<div className="icon-example">
    <Icon icon="facebook-f" iconType="brands" /> 品牌图标
</div>
```

### 旋转动画

```jsx
<div className="icon-example">
    <Icon icon="spinner" spin={true} /> 加载中...
</div>

<div className="icon-example">
    <Icon icon="refresh" spin={true} /> 刷新
</div>
```

### Bootstrap 图标

```jsx
<div className="icon-example">
    <Icon icon="bi-check-circle" bs={true} /> 成功
</div>

<div className="icon-example">
    <Icon icon="bi-x-circle" bs={true} /> 错误
</div>

<div className="icon-example">
    <Icon icon="bi-search" bs={true} /> 搜索
</div>
```

### 使用 ref 动态修改图标

```jsx
import React, { useRef } from 'react';

function MyComponent() {
    const iconRef = useRef<IconRef>(null);

    const changeIcon = () => {
        if (iconRef.current) {
            iconRef.current.setIcon('user');
        }
    };

    return (
        <div>
            <Icon ref={iconRef} icon="home" />
            <button onClick={changeIcon}>切换为用户图标</button>
        </div>
    );
}
```

### 带有点击事件的图标

```jsx
<div className="icon-example">
    <Icon 
        icon="times" 
        onClick={(e) => {
            console.log('关闭图标被点击');
            // 执行关闭操作
        }}
    />
</div>

<div className="icon-example">
    <Icon 
        icon="edit" 
        onClick={(e) => {
            console.log('编辑图标被点击');
            // 执行编辑操作
        }}
    />
</div>
```

### 组合使用

```jsx
<div className="icon-example">
    <Icon icon="user" />
    <span>用户</span>
</div>

<div className="icon-example">
    <Icon icon="search" />
    <input type="text" placeholder="搜索..." />
</div>

<div className="icon-example">
    <Icon icon="check-circle" color="green" />
    <span>成功</span>
</div>

<div className="icon-example">
    <Icon icon="exclamation-circle" color="red" />
    <span>错误</span>
</div>
```

### 自定义样式

```jsx
<div className="icon-example">
    <Icon 
        icon="home" 
        style={{ color: '#3498db', fontSize: '24px' }}
    />
</div>

<div className="icon-example">
    <Icon 
        icon="heart" 
        className="text-danger"
        style={{ fontSize: '32px' }}
    />
</div>
