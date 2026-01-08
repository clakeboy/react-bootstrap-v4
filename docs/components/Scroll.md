# Scroll 组件

Scroll 组件用于创建自定义滚动条，提供更美观的滚动交互体验。

## 基本用法

```jsx
import { Scroll } from '@clake/react-bootstrap4';

// 基本滚动条
<Scroll>
    <div style={{ height: '300px', overflowY: 'auto' }}>
        {/* 长内容 */}
        {Array.from({ length: 50 }, (_, i) => (
            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                内容项 {i + 1}
            </div>
        ))}
    </div>
</Scroll>

// 带有自定义速度的滚动条
<Scroll speed={2}>
    <div style={{ height: '300px', overflowY: 'auto' }}>
        {/* 长内容 */}
        {Array.from({ length: 50 }, (_, i) => (
            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                内容项 {i + 1}
            </div>
        ))}
    </div>
</Scroll>

// 带有滚动事件回调
<Scroll onScroll={(scrollTop) => console.log('滚动位置:', scrollTop)}>
    <div style={{ height: '300px', overflowY: 'auto' }}>
        {/* 长内容 */}
        {Array.from({ length: 50 }, (_, i) => (
            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                内容项 {i + 1}
            </div>
        ))}
    </div>
</Scroll>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 滚动条的唯一标识符 |
| parent | any | undefined | 父容器元素引用 |
| selector | string | '' | 父容器的选择器字符串（如 '.container'） |
| speed | number | 5 | 滚动速度系数（1-10） |
| align | string | 'right' | 滚动条对齐方式（'left', 'right'） |
| onScroll | function | null | 滚动事件回调函数，参数为 (scrollTop) |
| className | string | '' | 组件的自定义类名 |

## 方法

### 滚动处理

| 方法名 | 参数 | 描述 |
|--------|------|------|
| scrollHandler | e: WheelEvent | 处理鼠标滚轮滚动事件 |
| showHandler | - | 显示滚动条 |
| hideHandler | - | 隐藏滚动条 |
| setScrollTop | top: number | 设置滚动位置 |
| setBarTop | top: number | 设置滚动条位置 |
| beginDragHandler | e: React.MouseEvent | 开始拖拽滚动条 |
| moveDragHandler | e: MouseEvent | 拖拽滚动条移动 |
| endDragHandler | - | 结束拖拽 |

## 示例

### 基本滚动条使用

```jsx
<div style={{ height: '400px', border: '1px solid #ddd' }}>
    <Scroll>
        <div style={{ height: '800px', padding: '20px' }}>
            <h4>长内容示例</h4>
            {Array.from({ length: 100 }, (_, i) => (
                <p key={i}>内容行 {i + 1}</p>
            ))}
        </div>
    </Scroll>
</div>
```
