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
