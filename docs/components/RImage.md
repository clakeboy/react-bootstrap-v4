# RImage 组件

RImage 组件用于创建智能图像显示组件，支持自动检测图片方向、圆形边框和点击事件。

## 基本用法

```jsx
import { RImage } from '@clake/react-bootstrap4';

// 基本图像显示
<RImage src="https://example.com/image.jpg" />

// 带有边框的图像
<RImage src="https://example.com/image.jpg" border={true} />

// 圆形图像
<RImage src="https://example.com/image.jpg" circle={true} />

// 自定义尺寸的图像
<RImage src="https://example.com/image.jpg" width="200px" height="150px" />

// 带有点击事件的图像
<RImage 
    src="https://example.com/image.jpg" 
    onClick={(e) => console.log('图像被点击')}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 图像的唯一标识符 |
| src | any | null | 图片源地址（URL或Image对象） |
| border | boolean | false | 是否显示边框 |
| circle | boolean | false | 是否显示为圆形图像 |
| onClick | function | null | 图像点击时的回调函数，参数为 (e) |
| display | string | 'center' | 图像显示方式（'center'） |
| width | string | '100px' | 图像宽度 |
| height | string | '100px' | 图像高度 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 图像加载处理

| 方法名 | 参数 | 描述 |
|--------|------|------|
| loadImage | src: any | 加载图像并检测其方向 |
| clickHandler | e: any | 处理图像点击事件 |

## 示例

### 基本图像显示

```jsx
<div className="rimage-example">
    <h5>基本图像</h5>
    <RImage src="https://example.com/image.jpg" />
</div>
```
