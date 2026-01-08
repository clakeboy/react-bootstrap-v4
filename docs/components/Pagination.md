# Pagination 组件

Pagination 组件用于创建分页导航，支持自定义页面数量、每页显示条目数和信息提示。

## 基本用法

```jsx
import { Pagination } from '@clake/react-bootstrap4';

// 基本分页
<Pagination 
    current={1} 
    count={100} 
    number={20}
    onSelect={(page, showNumber) => console.log('当前页:', page, '每页显示:', showNumber)}
/>

// 带有自定义信息的分页
<Pagination 
    current={1} 
    count={100} 
    number={20}
    info="共 ${count} 条记录，第 ${page} 页"
    onSelect={(page, showNumber) => console.log('当前页:', page, '每页显示:', showNumber)}
/>

// 带有页面数量选项的分页
<Pagination 
    current={1} 
    count={100} 
    number={20}
    numberList={[
        { text: '显示10条', value: 10 },
        { text: '显示20条', value: 20 },
        { text: '显示50条', value: 50 }
    ]}
    onSelect={(page, showNumber) => console.log('当前页:', page, '每页显示:', showNumber)}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 分页组件的唯一标识符 |
| current | number | 1 | 当前页码 |
| count | number | 1 | 总记录数 |
| number | number | 50 | 每页显示的条目数 |
| showPages | number | 10 | 显示的页面按钮数量 |
| onSelect | function | null | 页面切换时的回调函数，参数为 (page, showNumber, txt) |
| align | string | 'right' | 分页对齐方式 ('left', 'center', 'right') |
| info | any | null | 自定义信息显示，支持 ${count} 和 ${page} 占位符 |
| numberList | any[] | [] | 每页显示条目数的下拉选项数组 |
| sticky | boolean | true | 是否使用粘性定位 |

## 方法

### 分页导航按钮事件处理

| 方法名 | 参数 | 描述 |
|--------|------|------|
| clickHandler | page: string \| number | 页面点击事件处理器 |
| renderInfo | - | 渲染自定义信息文本 |
| renderMore | page: any | 渲染省略号（...）按钮 |
| renderPages | - | 渲染页面按钮列表 |

## 示例

### 基本分页使用

```jsx
<Pagination 
    current={1} 
    count={100} 
    number={20}
    onSelect={(page, showNumber) => console.log('当前页:', page, '每页显示:', showNumber)}
/>
```
