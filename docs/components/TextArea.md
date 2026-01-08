# TextArea 组件

TextArea 组件用于创建富文本编辑器和普通文本区域，支持HTML模式、图片插入、全屏模式等功能。

## 基本用法

```jsx
import { TextArea } from '@clake/react-bootstrap4';

// 基本文本区域
<TextArea 
    label="描述"
    placeholder="请输入描述内容..."
    onChange={(val, obj, evt) => console.log('值改变:', val)}
/>

// 带有默认值的文本区域
<TextArea 
    label="描述"
    data="这是默认内容"
    onChange={(val, obj, evt) => console.log('值改变:', val)}
/>

// 只读模式的文本区域
<TextArea 
    label="描述"
    data="这是只读内容"
    readOnly={true}
/>

// 禁用的文本区域
<TextArea 
    label="描述"
    data="这是禁用内容"
    disabled={true}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 文本区域的唯一标识符 |
| label | string | '' | 标签文本 |
| data | any | null | 初始值 |
| summary | string | '' | 摘要文本（显示在文本区域下方） |
| readOnly | boolean | false | 是否为只读模式 |
| placeholder | string | '' | 占位符文本 |
| plaintext | boolean | false | 是否使用纯文本样式 |
| onChange | function | null | 值改变时的回调函数，参数为 (val, obj, evt) |
| row | number | 4 | 行数（仅在普通模式下有效） |
| htmlMode | boolean | false | 是否启用HTML编辑模式 |
| htmlBar | boolean | true | 是否显示HTML编辑工具栏 |
| locked | boolean \| string | false | 是否锁定文本区域（禁用编辑） |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 值操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getValue | - | 获取当前值（HTML模式返回HTML内容，普通模式返回文本） |
| setValue | val: string | 设置值 |

## 示例

### 基本文本区域使用

```jsx
<TextArea 
    label="描述"
    placeholder="请输入描述内容..."
    onChange={(val, obj, evt) => console.log('值改变:', val)}
/>
```
