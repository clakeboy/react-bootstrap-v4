# Table 组件

Table 组件用于数据展示与交互，支持选择、排序、树形结构等能力。

## 基本用法

```jsx
import { Table } from '@clake/react-bootstrap4';

// 基本表格
<Table data={[{ name: '张三', age: 25 }]}>
  <Table.Header field="name" text="姓名" />
  <Table.Header field="age" text="年龄" />
</Table>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| data | array | [] | 表格数据 |
| select | boolean | false | 是否支持选择行 |
| header | boolean | true | 是否显示表头 |
| striped | boolean | true | 是否显示斑马纹 |
| bordered | boolean | false | 是否显示边框 |
| hover | boolean | true | 是否显示悬停效果 |
| sm | boolean | false | 是否使用小尺寸样式 |
| responsive | boolean | false | 是否响应式布局 |
| tree | boolean | false | 是否支持树形结构 |
| onClick | function | null | 行点击事件处理函数 |
| onCheck | function | null | 选择行时的回调函数 |
| onRefresh | function | null | 刷新数据时的回调函数 |

## 表头属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| field | string | null | 字段名 |
| text | string | '' | 表头文本 |
| align | string | 'left' | 对齐方式（left, center, right）|
| width | string | null | 宽度 |
| sort | string | null | 是否支持排序（asc, desc）|
| onSort | function | null | 排序回调函数 |
| onDbClick | function | null | 双击回调函数 |

## 示例

### 基本表格

```jsx
<Table data={[
  { name: '张三', age: 25, email: 'zhangsan@example.com' },
  { name: '李四', age: 30, email: 'lisi@example.com' }
]}>
  <Table.Header field="name" text="姓名" />
  <Table.Header field="age" text="年龄" />
  <Table.Header field="email" text="邮箱" />
</Table>
```
