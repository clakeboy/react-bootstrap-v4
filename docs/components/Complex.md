# Complex 组件

Complex 组件用于创建一个复杂的输入组件，结合了文本输入框和组合框功能，支持多值选择和自动补全。

## 基本用法

```jsx
import { Complex } from '@clake/react-bootstrap4';

// 基本复杂输入框
<Complex 
    data={['选项1', '选项2', '选项3']}
    placeholder="输入并选择"
    onChange={(val, list) => console.log(val, list)}
/>

// 带有组合框配置的复杂输入框
<Complex 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    dataField="name"
    placeholder="输入并选择"
    combo={{
        searchColumn: 'name',
        showRows: 5
    }}
    onChange={(val, list) => console.log(val, list)}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 组件的唯一标识符 |
| inputWidth | string | '200px' | 输入框宽度 |
| onChange | function | null | 值变化后的回调函数，参数为 (data, list) |
| onSelect | function | null | 选择项后的回调函数，参数为 (val, row) |
| list | any[] | [] | 初始数据列表 |
| dataType | string | 'string' | 数据类型（'string' 或其他） |
| dataField | string | '' | 数据字段名，用于非字符串数据类型 |
| data | any[] | [] | 可选数据源数组 |
| placeholder | string | '' | 输入框的占位符文本 |
| combo | ComboProps | {} | 组合框配置属性 |
| comboData | any | null | 组合框数据源 |
| duplicate | boolean | false | 是否允许重复值 |
| readOnly | boolean | false | 是否只读 |
| theme | Theme \| string | 'primary' | 主题颜色 |
| className | string | '' | 组件的自定义类名 |
| size | string | '' | 组件尺寸（'sm', 'lg'） |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| addNewData | val: any, row?: any | 添加新数据项 |
| deleteHandler | idx: number | 删除指定索引的数据项 |

## 示例

### 基本复杂输入框

```jsx
<Complex 
    data={['选项1', '选项2', '选项3']}
    placeholder="输入并选择"
    onChange={(val, list) => console.log(val, list)}
/>
```
