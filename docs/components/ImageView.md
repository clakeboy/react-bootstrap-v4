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

### 带有标题的图片查看器

```jsx
<ImageView src={[
    { src: '/path/to/image1.jpg', title: '图片标题1' },
    { src: '/path/to/image2.jpg', title: '图片标题2' }
]} />
```

### 使用数组引用

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.imageUrls = [
            '/path/to/image1.jpg',
            '/path/to/image2.jpg',
            '/path/to/image3.jpg'
        ];
    }

    showImageView = () => {
        const imageViewRef: any = this.imageViewRef.current;
        if (imageViewRef) {
            imageViewRef.show(this.imageUrls);
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.showImageView}>查看图片</button>
                <ImageView ref={(c) => this.imageViewRef = c} />
            </div>
        );
    }
}
```

### 动态加载图片

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
    }

    loadImages() {
        // 模拟异步加载图片
        const newImages = [
            { src: '/path/to/image1.jpg', title: '图片1' },
            { src: '/path/to/image2.jpg', title: '图片2' },
            { src: '/path/to/image3.jpg', title: '图片3' }
        ];
        
        this.setState({ images: newImages });
    }

    render() {
        return (
            <div>
                <button onClick={() => this.loadImages()}>加载图片</button>
                <ImageView src={this.state.images} />
            </div>
        );
    }
}
```

### 嵌套使用

```jsx
<div className="image-gallery">
    <div className="thumbnail" onClick={() => {
        const imageViewRef: any = this.imageViewRef.current;
        if (imageViewRef) {
            imageViewRef.show(['/path/to/image1.jpg']);
        }
    }}>
        <img src="/path/to/thumbnail1.jpg" alt="缩略图1" />
    </div>
    
    <div className="thumbnail" onClick={() => {
        const imageViewRef: any = this.imageViewRef.current;
        if (imageViewRef) {
            imageViewRef.show(['/path/to/image2.jpg', '/path/to/image3.jpg']);
        }
    }}>
        <img src="/path/to/thumbnail2.jpg" alt="缩略图2" />
    </div>
    
    <ImageView ref={(c) => this.imageViewRef = c} />
</div>
```

### 使用远程图片

```jsx
<ImageView src={[
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    {
        src: 'https://example.com/image3.jpg',
        title: '来自远程服务器的图片'
    }
]} />
```

### 自定义样式

```jsx
<ImageView 
    src={['/path/to/image.jpg']} 
    className="custom-image-view"
    style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
/>
```

### 自定义关闭按钮

```jsx
<ImageView 
    src={['/path/to/image.jpg']} 
    className="custom-image-view"
>
    <div className="custom-close-button">
        关闭
    </div>
</ImageView>
