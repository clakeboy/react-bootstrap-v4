# Input 组件

Input组件是一个功能强大的输入框组件，支持多种类型和扩展功能，如日历选择器、下拉选择等。

## 基本用法

```jsx
import { Input } from '@clake/react-bootstrap4';

// 基本输入框
<Input placeholder="请输入内容" />

// 带标签的输入框
<Input label="用户名" placeholder="请输入用户名" />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| label | string/ReactElement | '' | 输入框标签 |
| type | string | 'text' | 输入框类型 |
| data | any | null | 输入框的值 |
| placeholder | string | '' | 占位符文本 |
| readOnly | boolean | false | 是否只读 |
| disabled | boolean | false | 是否禁用 |
| calendar | object | null | 日历选择器配置 |
| combo | object | null | 下拉选择器配置 |
| validate | object | null | 验证配置 |
| onChange | function | null | 值改变时的回调函数 |
| onEnter | function | null | 按下回车键时的回调函数 |

## 日历输入框

```jsx
// 基本日历选择器
<Input calendar={{}} />

// 自定义格式的日历选择器
<Input calendar={{ format: 'YYYY-MM-DD' }} />

// 带时间的日历选择器
<Input calendar={{ time: true }} />
```

## 下拉输入框

```jsx
// 基本下拉选择器
<Input combo={{ data: [{ text: '选项1', value: 1 }, { text: '选项2', value: 2 }] }} />

// 带搜索的下拉选择器
<Input combo={{ data: [...], search: true }} />
```

## 验证输入框

```jsx
// 基本验证
<Input validate={{ rule: /^[0-9]+$/, tip: true }} />

// 自定义验证消息
<Input validate={{ rule: /./, text: '此字段为必填项' }} />
```

## 示例

### 基本输入框

```jsx
<Input placeholder="请输入文本" />
```

### 带标签的输入框

```jsx
<Input label="姓名" placeholder="请输入您的姓名" />
```

### 带日历的输入框

```jsx
<Input 
  label="选择日期" 
  calendar={{ format: 'YYYY-MM-DD' }} 
/>
```

### 带下拉选择的输入框

```jsx
<Input 
  label="选择城市" 
  combo={{ 
    data: [
      { text: '北京', value: 'beijing' },
      { text: '上海', value: 'shanghai' }
    ] 
  }} 
/>
```

### 带验证的输入框

```jsx
<Input 
  label="邮箱" 
  validate={{ 
    rule: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    text: '请输入有效的邮箱地址',
    tip: true
  }} 
/>
