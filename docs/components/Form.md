# Form 组件

Form 组件用于创建一个表单，支持多种输入控件的自动绑定和数据收集。

## 基本用法

```jsx
import { Form, Input, Select, TextArea, CCheckbox, Switch, Dropdown, CDropdown, ComboBox, CalendarRange, RadioGroup } from '@clake/react-bootstrap4';

// 基本表单
<Form onChange={(field, val) => console.log(field, val)}>
    <Input field="name" label="姓名" placeholder="请输入姓名" />
    <Select field="city" label="城市">
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </Select>
    <TextArea field="description" label="描述" placeholder="请输入描述" />
    <CCheckbox field="agree" label="我同意条款" />
    <Switch field="active" label="是否激活" />
</Form>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 表单的唯一标识符 |
| onChange | function | null | 表单项值变化时的回调函数，参数为 (field, val, row, combo, comboField) |
| className | string | '' | 表单的自定义类名 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getValues | - | 获取表单所有字段的值 |
| getNew | - | 获取新增的列数据 |
| setValue | field: any, val: any | 设置指定字段的值 |
| check | - | 验证表单有效性，返回布尔值 |
| getLastErrorCheck | - | 获取最后一个验证失败的组件 |
| setValues | vals: any | 设置多个字段的值 |

## 支持的子组件

Form 组件支持以下子组件，自动绑定事件和数据：

### Input
```jsx
<Input field="name" label="姓名" placeholder="请输入姓名" />
```

### Select
```jsx
<Select field="city" label="城市">
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
</Select>
```

### TextArea
```jsx
<TextArea field="description" label="描述" placeholder="请输入描述" />
```

### CCheckbox
```jsx
<CCheckbox field="agree" label="我同意条款" />
```

### Switch
```jsx
<Switch field="active" label="是否激活" />
```

### Dropdown
```jsx
<Dropdown 
    field="status" 
    data={['启用', '禁用']} 
    text="请选择状态"
/>
```

### CDropdown
```jsx
<CDropdown 
    field="category" 
    data={[{text: '类别1', value: '1'}, {text: '类别2', value: '2'}]} 
    text="请选择分类"
/>
```

### ComboBox
```jsx
<ComboBox 
    field="product" 
    data={[{name: '产品1', value: 'p1'}, {name: '产品2', value: 'p2'}]} 
    dataField="name"
/>
```

### CalendarRange
```jsx
<CalendarRange field="dateRange" label="日期范围" />
```

### RadioGroup
```jsx
<RadioGroup field="gender" label="性别">
    <option value="male">男</option>
    <option value="female">女</option>
</RadioGroup>
```

## 示例

### 基本表单

```jsx
<Form onChange={(field, val) => console.log(field, val)}>
    <Input field="name" label="姓名" placeholder="请输入姓名" />
    <Select field="city" label="城市">
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </Select>
    <TextArea field="description" label="描述" placeholder="请输入描述" />
    <CCheckbox field="agree" label="我同意条款" />
    <Switch field="active" label="是否激活" />
</Form>
```
