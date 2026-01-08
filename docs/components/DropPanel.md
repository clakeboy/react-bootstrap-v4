# DropPanel 组件

DropPanel 组件用于创建一个浮动面板，支持三角形指向器、边框、阴影和自定义位置。

## 基本用法

```jsx
import { DropPanel } from '@clake/react-bootstrap4';

// 基本浮动面板
<DropPanel selector="#trigger-element">
    <div>浮动面板内容</div>
</DropPanel>

// 带有边框和阴影的浮动面板
<DropPanel 
    selector="#trigger-element"
    border={true}
    shadow={true}
>
    <div>浮动面板内容</div>
</DropPanel>

// 使用自定义主题边框
<DropPanel 
    selector="#trigger-element"
    border={true}
    theme="primary"
>
    <div>浮动面板内容</div>
</DropPanel>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 浮动面板的唯一标识符 |
| selector | string | '' | 触发元素的选择器（必需） |
| border | boolean | false | 是否显示边框 |
| borderTheme | string | '' | 边框主题颜色 |
| borderColor | string | '' | 自定义边框颜色 |
| round | boolean | true | 是否使用圆角边框 |
| shadow | boolean | true | 是否显示阴影 |
| position | string | '' | 定位位置（'top', 'bottom', 'left', 'right'） |
| className | string | '' | 组件的自定义类名 |
| style | object | {} | 自定义样式 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| show | showDom?: HTMLElement | 显示浮动面板，可指定触发元素 |
| hide | - | 隐藏浮动面板 |

## 示例

### 基本浮动面板

```jsx
<DropPanel selector="#trigger-element">
    <div>浮动面板内容</div>
</DropPanel>

<button id="trigger-element">点击显示浮动面板</button>
```
