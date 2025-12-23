# CalendarRange 组件

CalendarRange 组件用于选择日期范围，支持多种格式化选项和语言设置。

## 基本用法

```jsx
import { CalendarRange } from '@clake/react-bootstrap4';

// 基本日期范围选择器
<CalendarRange onSelect={(min, max) => console.log(min, max)} />

// 带有时钟的日期范围选择器
<CalendarRange format="YYYY-MM-DD HH:mm:ss" onSelect={(min, max) => console.log(min, max)} />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 组件的唯一标识符 |
| label | string | '' | 输入框的标签文本 |
| minData | string | '' | 最小日期值（支持 Unix 时间戳或日期字符串） |
| maxData | string | '' | 最大日期值（支持 Unix 时间戳或日期字符串） |
| days | number | 30 | 最大日期范围天数 |
| readOnly | boolean | false | 是否只读 |
| placeholderMin | string | '' | 最小日期输入框的占位符文本 |
| placeholderMax | string | '' | 最大日期输入框的占位符文本 |
| onChange | function | null | 选择日期范围后的回调函数 |
| format | string | 'YYYY-MM-DD' | 日期格式化字符串 |
| time | boolean | false | 是否显示时间选择栏 |
| disabled | boolean | false | 是否禁用输入框 |
| disableClear | boolean | false | 是否禁用清除按钮 |
| labelClass | string | '' | 标签的自定义类名 |
| className | string | '' | 组件的自定义类名 |
| textClass | string | '' | 输入框的自定义类名 |
| width | string | '' | 组件的宽度 |
| data | string | '' | 初始日期范围值（支持 Unix 时间戳或日期字符串） |
| limit | { lt?: any, gt?: any } | null | 日期范围限制（lt 表示最小日期，gt 表示最大日期） |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| show | - | 显示日历面板 |
| hide | - | 隐藏日历面板 |

## 示例

### 基本日期范围选择器

```jsx
<CalendarRange onSelect={(min, max) => console.log(min, max)} />
```

### 带有时钟的日期范围选择器

```jsx
<CalendarRange format="YYYY-MM-DD HH:mm:ss" onSelect={(min, max) => console.log(min, max)} />
```

### 设置初始日期范围

```jsx
<CalendarRange minData="2023-10-01" maxData="2023-10-31" onSelect={(min, max) => console.log(min, max)} />
```

### 设置占位符文本

```jsx
<CalendarRange placeholderMin="开始日期" placeholderMax="结束日期" onSelect={(min, max) => console.log(min, max)} />
```

### 禁用输入框

```jsx
<CalendarRange disabled onSelect={(min, max) => console.log(min, max)} />
```

### 设置日期范围限制

```jsx
<CalendarRange limit={{ lt: '2023-01-01', gt: '2023-12-31' }} onSelect={(min, max) => console.log(min, max)} />
```

### 使用小尺寸样式

```jsx
<CalendarRange size="sm" onSelect={(min, max) => console.log(min, max)} />
```

### 使用自定义类名

```jsx
<CalendarRange className="custom-class" labelClass="custom-label-class" textClass="custom-text-class" onSelect={(min, max) => console.log(min, max)} />
