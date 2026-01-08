# Tabs 组件

Tabs 组件用于创建标签页导航，支持选项卡切换、关闭功能和自定义样式。

## 基本用法

```jsx
import { Tabs, Tab } from '@clake/react-bootstrap4';

// 基本标签页
<Tabs>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>

// 带有默认激活标签的标签页
<Tabs showTab="profile">
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>

// 禁用的标签页
<Tabs disabled={true}>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 标签页组的唯一标识符 |
| pills | boolean | false | 是否使用药丸式标签样式 |
| border | boolean | true | 是否显示边框 |
| content | boolean | true | 是否显示内容区域 |
| onSelect | function | null | 标签切换时的回调函数，参数为 (tab) |
| showTab | string | '' | 默认激活的标签ID |
| position | object | {} | 绝对定位的位置配置（top, left, right, bottom） |
| onClose | function | null | 关闭标签时的回调函数，参数为 (tab, index) |
| sm | boolean | false | 小尺寸样式 |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 标签操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| setSelect | tab_id: string | 设置当前激活的标签 |

## 示例

### 基本标签页使用

```jsx
<Tabs>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>
```
