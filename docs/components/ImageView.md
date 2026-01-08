# ImageView 组件

ImageView 组件用于创建一个全屏图片查看器，支持多图浏览、导航和标题显示。

## 基本用法

```jsx
import { ImageView } from '@clake/react-bootstrap4';

// 基本图片查看器
<ImageView src={['/path/to/image1.jpg', '/path/to/image2.jpg']} />

// 带有标题的图片查看器
<ImageView src={[
    { src: '/path/to/image1.jpg', title: '图片标题1' },
    { src: '/path/to/image2.jpg', title: '图片标题2' }
]} />

// 使用自定义类名
<ImageView src={['/path/to/image.jpg']} className="custom-image-view" />
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 图片查看器的唯一标识符 |
| src | string[] \| {src: string, title?: string}[] | [] | 图片源数组，支持字符串或对象格式 |
| className | string | '' | 组件的自定义类名 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| show | srcList: any[] | 显示图片查看器，可传入新的图片列表 |

## 状态

| 属性名 | 类型 | 描述 |
|--------|------|------|
| src | any[] | 当前图片列表 |
| currIdx | number | 当前显示的图片索引 |

## 示例

### 基本图片查看器

```jsx
<ImageView src={['/path/to/image1.jpg', '/path/to/image2.jpg']} />
```
