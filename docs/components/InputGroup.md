# InputGroup 组件

InputGroup 组件用于创建带有标签的输入组，支持尺寸调整和摘要文本。

## 基本用法

```jsx
import { InputGroup } from '@clake/react-bootstrap4';

// 基本输入组
<InputGroup 
    label="姓名" 
    placeholder="请输入姓名"
    onChange={(val, obj) => console.log(val)}
/>

// 带有摘要文本的输入组
<InputGroup 
    label="姓名" 
    placeholder="请输入姓名"
    summary="请填写真实姓名"
    onChange={(val, obj) => console.log(val)}
/>

// 使用不同尺寸
<InputGroup 
    label="姓名" 
    placeholder="请输入姓名"
    size="sm"
    onChange={(val, obj) => console.log(val)}
/>

<InputGroup 
    label="姓名" 
    placeholder="请输入姓名"
    size="lg"
    onChange={(val, obj) => console.log(val)}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 输入组的唯一标识符 |
| label | any | '' | 输入框的标签文本 |
| data | any | undefined | 输入框的初始值 |
| summary | string | '' | 摘要文本（显示在输入框下方） |
| placeholder | string | '' | 输入框的占位符文本 |
| disabled | boolean | false | 是否禁用输入组 |
| onChange | function | null | 输入值变化时的回调函数，参数为 (val, obj) |
| className | string | '' | 组件的自定义类名 |
| width | string | '' | 输入组宽度 |
| size | 'sm' \| 'lg' | '' | 输入组尺寸（'sm', 'lg'） |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getValue | - | 获取当前输入值 |
| setValue | val: any | 设置输入值 |

## 状态

| 属性名 | 类型 | 描述 |
|--------|------|------|
| label | string | 标签文本 |
| value | any | 输入值 |
| disabled | boolean | 是否禁用 |

## 示例

### 基本输入组

```jsx
<InputGroup 
    label="姓名" 
    placeholder="请输入姓名"
    onChange={(val, obj) => console.log(val)}
/>
```
