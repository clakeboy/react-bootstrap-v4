# RadioGroup 组件

RadioGroup 组件用于创建单选按钮组，自动管理多个 Radio 组件的选中状态。

## 基本用法

```jsx
import { RadioGroup, Radio } from '@clake/react-bootstrap4';

// 基本单选按钮组
<RadioGroup 
    data="option1"
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>

// 带有默认选中值的单选按钮组
<RadioGroup 
    data="option2"
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>

// 禁用的单选按钮组
<RadioGroup 
    data="option1"
    disabled={true}
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 单选按钮组的唯一标识符 |
| name | string | 自动生成 | 单选按钮组名称（若未提供则自动生成） |
| data | any | '' | 当前选中的值 |
| onChange | function | null | 选择状态改变时的回调函数，参数为 (value) |
| disabled | boolean | false | 是否禁用整个单选按钮组 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 事件处理

| 方法名 | 参数 | 描述 |
|--------|------|------|
| changeHandler | e: any | 处理单选按钮变化事件 |

## 示例

### 基本单选按钮组使用

```jsx
<RadioGroup 
    data="option1"
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>
```
