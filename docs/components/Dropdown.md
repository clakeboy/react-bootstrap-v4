# Dropdown 组件

Dropdown 组件用于创建一个下拉菜单，支持文本选择、图标显示和网格布局。

## 基本用法

```jsx
import { Dropdown, DropdownValue } from '@clake/react-bootstrap4';

// 基本下拉菜单
<Dropdown 
    data={['选项1', '选项2', '选项3']}
    text="选择一个选项"
    onChange={(text, value) => console.log(text, value)}
/>

// 带有图标的下拉菜单
<Dropdown 
    data={['选项1', '选项2', '选项3']}
    text="选择一个选项"
    icon="arrow-down"
    onChange={(text, value) => console.log(text, value)}
/>

// 使用子组件定义选项
<Dropdown 
    text="选择一个选项"
    onChange={(text, value) => console.log(text, value)}
>
    <DropdownValue text="选项1" value="1" />
    <DropdownValue text="选项2" value="2" />
    <DropdownValue text="选项3" value="3" />
</Dropdown>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 下拉菜单的唯一标识符 |
| data | any[] | [] | 下拉选项数据数组 |
| text | string | '' | 按钮显示的文本 |
| onChange | function | null | 选择项后的回调函数，参数为 (text, value) |
| outline | boolean | false | 是否使用轮廓样式 |
| theme | Theme \| string | 'secondary' | 按钮主题颜色 |
| icon | string | '' | 按钮图标名称（来自 Font Awesome） |
| grid | boolean | false | 是否使用网格布局显示选项 |
| locked | boolean | false | 是否锁定下拉菜单，禁止选择 |
| className | string | '' | 组件的自定义类名 |
| width | string | '' | 下拉菜单宽度 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的水平位置 |
| y | string | '' | 绝对定位的垂直位置 |
| size | string | '' | 按钮尺寸（'sm', 'lg'） |
| style | object | {} | 自定义样式 |

## 子组件

### DropdownValue

DropdownValue 组件用于定义下拉菜单中的选项。

#### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| text | string | '' | 选项的显示文本 |
| value | any | '' | 选项的值 |
| active | boolean | false | 是否默认选中 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| setValue | val: any | 设置选中项的值 |
| getValue | - | 获取当前选中的值 |
| getJsonValue | - | 获取当前选中项的完整对象（包含 text 和 value） |

## 示例

### 基本下拉菜单

```jsx
<Dropdown 
    data={['选项1', '选项2', '选项3']}
    text="选择一个选项"
    onChange={(text, value) => console.log(text, value)}
/>
```
