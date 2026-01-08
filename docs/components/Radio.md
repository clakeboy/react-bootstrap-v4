# Radio 组件

Radio 组件用于创建单选按钮，支持内联布局、自定义样式和事件处理。

## 基本用法

```jsx
import { Radio } from '@clake/react-bootstrap4';

// 基本单选按钮
<Radio 
    name="gender" 
    label="男"
    value="male"
    onChange={(e, obj) => console.log('选中:', e.target.value)}
/>

// 带有默认选中的单选按钮
<Radio 
    name="gender" 
    label="女"
    value="female"
    checked={true}
    onChange={(e, obj) => console.log('选中:', e.target.value)}
/>

// 内联布局的单选按钮组
<div>
    <Radio 
        name="size" 
        label="小号"
        value="small"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="size" 
        label="中号"
        value="medium"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="size" 
        label="大号"
        value="large"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
</div>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 单选按钮的唯一标识符 |
| name | string | '' | 单选按钮组名称（必需） |
| label | string | '' | 单选按钮的标签文本 |
| value | any | '' | 单选按钮的值 |
| checked | boolean | false | 是否被选中 |
| onChange | function | null | 选择状态改变时的回调函数，参数为 (e, obj) |
| inputClass | string | '' | 输入元素的自定义类名 |
| inline | boolean | false | 是否使用内联布局（水平排列） |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 事件处理

| 方法名 | 参数 | 描述 |
|--------|------|------|
| changeHandler | e: React.ChangeEvent | 处理选择变化事件 |

## 示例

### 基本单选按钮使用

```jsx
<div className="radio-example">
    <h5>性别选择：</h5>
    <Radio 
        name="gender" 
        label="男"
        value="male"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="gender" 
        label="女"
        value="female"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="gender" 
        label="未知"
        value="unknown"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
</div>
```
