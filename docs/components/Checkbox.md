# Checkbox 组件

Checkbox 组件用于创建一个可选中的复选框，支持内联显示、禁用状态和自定义样式。

## 基本用法

```jsx
import { Checkbox } from '@clake/react-bootstrap4';

// 基本复选框
<Checkbox label="选项1" onChange={(evt, obj) => console.log(evt, obj)} />

// 内联复选框
<Checkbox inline label="选项2" onChange={(evt, obj) => console.log(evt, obj)} />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 组件的唯一标识符 |
| label | string | '' | 复选框的标签文本 |
| inline | boolean | false | 是否内联显示复选框 |
| data | any | '' | 复选框的数据 |
| checked | boolean | false | 复选框是否默认选中 |
| onChange | function | null | 复选框状态改变后的回调函数 |
| className | string | '' | 组件的自定义类名 |
| width | string | '' | 组件的宽度 |
| size | string | '' | 组件的尺寸（如 'sm', 'lg'） |
| disabled | boolean | false | 是否禁用复选框 |
| x | string | '' | 绝对定位的水平位置 |
| y | string | '' | 绝对定位的垂直位置 |
| absolute | boolean | false | 是否使用绝对定位 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getChecked | - | 获取复选框的选中状态 |
| setChecked | val: boolean | 设置复选框的选中状态 |

## 示例

### 基本复选框

```jsx
<Checkbox label="选项1" onChange={(evt, obj) => console.log(evt, obj)} />
```
