# Calendar 组件

Calendar 组件用于选择日期和时间，支持多种格式化选项和语言设置。

## 基本用法

```jsx
import { Calendar } from '@clake/react-bootstrap4';

// 基本日历选择器
<Calendar onSelect={(date) => console.log(date)} />

// 带有时钟的日历选择器
<Calendar format="YYYY-MM-DD HH:mm:ss" onSelect={(date) => console.log(date)} />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| none | boolean | false | 是否隐藏日历 |
| shadow | boolean | false | 是否带有阴影效果 |
| value | string | '' | 初始日期值（支持 Unix 时间戳或日期字符串） |
| lang | string | 'zh' | 日历的语言（支持 'zh' 和 'en'） |
| onSelect | function | null | 选择日期后的回调函数 |
| triangular | 'up' \| 'left' \| 'bottom' \| 'right' | null | 三角形指示器的方向 |
| format | string | 'YYYY-MM-DD' | 日期格式化字符串 |
| sm | boolean | false | 是否使用小尺寸样式 |
| timeBar | boolean | false | 是否显示时间选择栏 |
| target | HTMLElement | null | 目标元素，用于定位日历 |
| limit | { lt?: any, gt?: any } | null | 日期范围限制（lt 表示最小日期，gt 表示最大日期） |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| show | dom: HTMLElement | 显示日历 |
| hide | - | 隐藏日历 |
| format | formatStr: string, date: Date | 格式化日期 |

## 示例

### 基本日历选择器

```jsx
<Calendar onSelect={(date) => console.log(date)} />
```
