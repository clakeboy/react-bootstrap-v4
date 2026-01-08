# Switch 组件

Switch 组件用于创建开关控件，支持主题颜色、尺寸调整和状态变更回调。

## 基本用法

```jsx
import { Switch } from '@clake/react-bootstrap4';

// 基本开关
<Switch 
    checked={false}
    onChange={(checked) => console.log('开关状态:', checked)}
/>

// 默认开启的开关
<Switch 
    checked={true}
    onChange={(checked) => console.log('开关状态:', checked)}
/>

// 带有自定义标签的开关
<Switch 
    checked={true}
    onChange={(checked) => console.log('开关状态:', checked)}
>
    开启
</Switch>

// 禁用的开关
<Switch 
    checked={true}
    disabled={true}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 开关的唯一标识符 |
| checked | boolean | false | 是否开启状态 |
| onChange | function | null | 状态改变时的回调函数，参数为 (checked) |
| theme | string \| Theme | 'primary' | 主题颜色（'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'） |
| size | string | '' | 尺寸（'sm', 'lg'） |
| disabled | boolean | false | 是否禁用开关 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 状态操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getChecked | - | 获取当前开关状态 |
| setChecked | check: boolean | 设置开关状态 |

## 示例

### 基本开关使用

```jsx
<div className="switch-example">
    <h5>基本开关</h5>
    <Switch 
        checked={false}
        onChange={(checked) => console.log('开关状态:', checked)}
    />
</div>
```
