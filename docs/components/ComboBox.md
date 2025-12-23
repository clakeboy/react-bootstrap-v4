# ComboBox 组件

ComboBox 组件用于创建一个带有列配置的组合框，支持搜索、多选和自定义列格式化。

## 基本用法

```jsx
import { ComboBox, ComboBoxColumn } from '@clake/react-bootstrap4';

// 基本组合框
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSelect={(val, row) => console.log(val, row)}
/>

// 带有自定义列的组合框
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSelect={(val, row) => console.log(val, row)}
>
    <ComboBoxColumn field="name" text="名称" width="100px"/>
    <ComboBoxColumn field="value" text="值" width="50px"/>
</ComboBox>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 组件的唯一标识符 |
| label | any | '' | 组合框的标签文本 |
| searchColumn | string | '' | 搜索列的字段名 |
| data | any[] | [] | 数据源数组 |
| showRows | number | 5 | 显示的行数 |
| search | string | '' | 初始搜索文本 |
| onSearch | function | null | 搜索回调函数，用于远程数据加载 |
| onSelect | function | null | 选择项后的回调函数 |
| onClose | function | null | 关闭组合框时的回调函数 |
| onShow | function | null | 显示组合框时的回调函数 |
| sm | boolean | false | 是否使用小尺寸样式 |
| multi | boolean | false | 是否支持多选 |
| multiDef | any | null | 多选默认值 |
| onChange | function | null | 值变化后的回调函数 |
| filterColumns | any | [] | 过滤列配置 |
| noSearch | boolean | false | 是否禁用搜索功能 |
| header | boolean | false | 是否显示表头 |
| size | string | '' | 组件的尺寸（如 'sm', 'lg'） |
| value | string | '' | 组合框的初始值 |
| text | string | '' | 组合框的显示文本 |
| validate | any | null | 验证规则 |
| placeholder | string | '' | 输入框的占位符文本 |
| readOnly | boolean | false | 是否只读 |
| disabled | boolean | false | 是否禁用组合框 |
| className | string | '' | 组件的自定义类名 |

## 子组件

### ComboBoxColumn

ComboBoxColumn 组件用于定义组合框中的列。

#### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| field | string | '' | 列的字段名 |
| text | string | '' | 列的显示文本 |
| format | function | null | 列值格式化函数，接收 (val, row) 参数 |
| width | string | '' | 列的宽度 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| check | - | 检查输入框的状态 |

## 示例

### 基本组合框

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 带有自定义列的组合框

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSelect={(val, row) => console.log(val, row)}
>
    <ComboBoxColumn field="name" text="名称" width="100px"/>
    <ComboBoxColumn field="value" text="值" width="50px"/>
</ComboBox>
```

### 使用自定义列格式化

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSelect={(val, row) => console.log(val, row)}
>
    <ComboBoxColumn field="name" text="名称" width="100px"/>
    <ComboBoxColumn field="value" text="值" format={(val) => `ID: ${val}`} width="50px"/>
</ComboBox>
```

### 带有搜索功能的组合框

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSearch={(search, callback) => {
        // 模拟远程搜索
        setTimeout(() => {
            const results = [
                { name: '选项1', value: '1' },
                { name: '选项2', value: '2' }
            ];
            callback(results);
        }, 500);
    }}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 多选组合框

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    multi={true}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 使用自定义尺寸

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    size="sm"
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 使用只读模式

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    readOnly={true}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 使用验证规则

```jsx
<ComboBox 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    validate={val => val.length > 0}
    onSelect={(val, row) => console.log(val, row)}
/>
