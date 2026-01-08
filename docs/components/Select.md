# Select 组件

Select 组件用于创建下拉选择器，支持数据绑定、只读模式和自定义样式。

## 基本用法

```jsx
import { Select } from '@clake/react-bootstrap4';

// 基本下拉选择器
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>

// 带有默认值的下拉选择器
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    value="beijing"
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>

// 只读模式的下拉选择器
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    readOnly={true}
    value="beijing"
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 下拉选择器的唯一标识符 |
| label | string | '' | 选择器标签文本 |
| data | any[] | [] | 数据源数组，支持字符串或对象格式 |
| summary | string | '' | 摘要文本（显示在选择器下方） |
| readOnly | boolean | false | 是否为只读模式 |
| placeholder | string | '' | 占位符文本（未使用） |
| onSelect | function | null | 选择变化时的回调函数，参数为 (e, obj) |
| value | any | '' | 当前选中的值 |
| size | 'sm' \| 'lg' | '' | 尺寸（'sm', 'lg'） |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 数据操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getValue | - | 获取当前选中的值 |
| setValue | val: any | 设置选中的值 |

## 示例

### 基本下拉选择器使用

```jsx
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>
```
