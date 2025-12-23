# CCheckbox 组件

CCheckbox 组件用于创建一个可选中的复选框，支持内联显示、禁用状态、半选状态和自定义样式。

## 基本用法

```jsx
import { CCheckbox } from '@clake/react-bootstrap4';

// 基本复选框
<CCheckbox label="选项1" onChange={(checked) => console.log(checked)} />

// 内联复选框
<CCheckbox inline label="选项2" onChange={(checked) => console.log(checked)} />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 组件的唯一标识符 |
| label | string | '' | 复选框的标签文本 |
| checked | boolean | false | 复选框是否默认选中 |
| onChange | function | null | 复选框状态改变后的回调函数 |
| half | boolean | false | 是否显示半选状态 |
| locked | boolean | false | 是否锁定复选框，使其不可更改 |
| inline | boolean | false | 是否内联显示复选框 |
| disabled | boolean | false | 是否禁用复选框 |
| className | string | '' | 组件的自定义类名 |
| theme | Theme \| string | null | 复选框的主题 |
| x | string | '' | 绝对定位的水平位置 |
| y | string | '' | 绝对定位的垂直位置 |
| absolute | boolean | false | 是否使用绝对定位 |
| tabIndex | string | '0' | 键盘导航的索引 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| setValue | checked: boolean | 设置复选框的选中状态 |
| setChecked | checked: boolean | 设置复选框的选中状态并取消半选状态 |
| setHalf | flag: boolean | 设置复选框的半选状态 |
| getChecked | - | 获取复选框的选中状态 |
| getCheckedIcon | t: string | 获取复选框图标的类型和名称 |

## 示例

### 基本复选框

```jsx
<CCheckbox label="选项1" onChange={(checked) => console.log(checked)} />
```

### 内联复选框

```jsx
<CCheckbox inline label="选项2" onChange={(checked) => console.log(checked)} />
```

### 禁用复选框

```jsx
<CCheckbox label="选项3" disabled onChange={(checked) => console.log(checked)} />
```

### 半选复选框

```jsx
<CCheckbox label="选项4" half onChange={(checked) => console.log(checked)} />
```

### 设置主题

```jsx
<CCheckbox label="选项5" theme="primary" onChange={(checked) => console.log(checked)} />
```

### 绝对定位

```jsx
<CCheckbox label="选项6" absolute x="10px" y="20px" onChange={(checked) => console.log(checked)} />
```

### 使用自定义类名

```jsx
<CCheckbox label="选项7" className="custom-class" onChange={(checked) => console.log(checked)} />
