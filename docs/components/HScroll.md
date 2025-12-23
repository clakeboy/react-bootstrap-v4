# HScroll 组件

HScroll 组件用于创建一个水平滚动条，支持自动显示、拖拽和与父容器的同步。

## 基本用法

```jsx
import { HScroll } from '@clake/react-bootstrap4';

// 基本水平滚动条
<HScroll selector="#scroll-container">
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>

// 使用自定义显示触发器
<HScroll selector="#scroll-container" showSelector="#trigger-element">
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>

// 使用自定义速度和对齐
<HScroll selector="#scroll-container" speed={2} align="top" alignParent>
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 水平滚动条的唯一标识符 |
| selector | string | '' | 要添加水平滚动条的父容器选择器（必需） |
| showSelector | string | '' | 触发滚动条显示的元素选择器（可选） |
| speed | number | 5 | 滚动速度因子（1-10），值越大滚动越快 |
| align | string | 'bottom' | 滚动条对齐方式（'top', 'bottom'） |
| alignParent | boolean | false | 是否与父容器滚动同步（当父容器可滚动时） |
| className | string | '' | 组件的自定义类名 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| initParentEvent | - | 初始化父容器事件 |
| showHandler | - | 显示滚动条 |
| hideHandler | - | 隐藏滚动条 |
| scrollHandler | e: WheelEvent | 处理鼠标滚轮事件 |
| scrollClickHandler | e: React.MouseEvent | 处理滚动条点击事件 |
| beginDragHandler | e: React.MouseEvent | 开始拖拽事件 |
| moveDragHandler | e: MouseEvent | 移动拖拽事件 |
| endDragHandler | - | 结束拖拽事件 |
| setScrollLeft | left: number | 设置滚动条的左偏移量 |
| setBarLeft | left: number | 设置滚动条的左位置 |

## 示例

### 基本水平滚动条

```jsx
<HScroll selector="#scroll-container">
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>
```

### 使用自定义显示触发器

```jsx
<HScroll selector="#scroll-container" showSelector="#trigger-element">
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>

<button id="trigger-element">显示滚动条</button>
```

### 使用自定义速度

```jsx
<HScroll selector="#scroll-container" speed={10}>
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>
```

### 使用顶部对齐

```jsx
<HScroll selector="#scroll-container" align="top">
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>
```

### 使用父容器同步

```jsx
<HScroll selector="#scroll-container" alignParent>
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>
```

### 复杂示例：表格水平滚动

```jsx
<div style={{ width: '100%', overflowX: 'hidden' }}>
    <HScroll selector="#table-container">
        <div id="table-container" style={{ width: '200%', overflowX: 'auto' }}>
            <table style={{ minWidth: '100%' }}>
                <thead>
                    <tr>
                        <th>列1</th><th>列2</th><th>列3</th><th>列4</th><th>列5</th>
                        <th>列6</th><th>列7</th><th>列8</th><th>列9</th><th>列10</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>数据1</td><td>数据2</td><td>数据3</td><td>数据4</td><td>数据5</td>
                        <td>数据6</td><td>数据7</td><td>数据8</td><td>数据9</td><td>数据10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </HScroll>
</div>
```

### 使用自定义样式

```jsx
<HScroll selector="#scroll-container" className="custom-hscroll">
    <div id="scroll-container" style={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <div style={{ width: '200%', height: '100px', background: '#f0f0f0' }}>
            内容...
        </div>
    </div>
</HScroll>

<style>
.custom-hscroll .ck-scroll-bar {
    background-color: #3498db;
}
</style>
