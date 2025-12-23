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

### 带有边框的图像

```jsx
<div className="rimage-example">
    <h5>带边框的图像</h5>
    <RImage src="https://example.com/image.jpg" border={true} />
</div>
```

### 圆形图像

```jsx
<div className="rimage-example">
    <h5>圆形图像</h5>
    <RImage src="https://example.com/image.jpg" circle={true} />
</div>
```

### 自定义尺寸的图像

```jsx
<div className="rimage-example">
    <h5>自定义尺寸的图像</h5>
    <RImage src="https://example.com/image.jpg" width="200px" height="150px" />
</div>
```

### 带有点击事件的图像

```jsx
<div className="rimage-example">
    <h5>带点击事件的图像</h5>
    <RImage 
        src="https://example.com/image.jpg" 
        onClick={(e) => console.log('图像被点击')}
    />
</div>
```

### 响应式图像显示

```jsx
<div className="row">
    <div className="col-md-4">
        <h6>默认尺寸</h6>
        <RImage src="https://example.com/image1.jpg" />
    </div>
    
    <div className="col-md-4">
        <h6>自定义尺寸</h6>
        <RImage src="https://example.com/image2.jpg" width="150px" height="100px" />
    </div>
    
    <div className="col-md-4">
        <h6>圆形图像</h6>
        <RImage src="https://example.com/image3.jpg" circle={true} />
    </div>
</div>
```

### 图像占位符

```jsx
<div className="rimage-example">
    <h5>加载中的图像</h5>
    <RImage src="" /> {/* 会显示图标 */}
    
    <h5>错误的图像地址</h5>
    <RImage src="https://nonexistent-image.jpg" />
</div>
```

### 在卡片中使用

```jsx
<div className="card">
    <div className="card-body text-center">
        <RImage 
            src="https://example.com/profile.jpg" 
            circle={true} 
            width="80px" 
            height="80px"
        />
        <h5 className="card-title">用户名称</h5>
        <p className="card-text">用户描述信息</p>
    </div>
</div>
```

### 与状态管理结合使用

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: 'https://example.com/image.jpg',
            isLoading: true
        };
    }

    componentDidMount() {
        // 模拟异步加载图像
        setTimeout(() => {
            this.setState({
                imageUrl: 'https://example.com/loaded-image.jpg',
                isLoading: false
            });
        }, 2000);
    }

    handleImageClick = (e) => {
        console.log('图像被点击');
        this.setState({
            imageUrl: 'https://example.com/alternate-image.jpg'
        });
    };

    render() {
        return (
            <div>
                <h5>动态图像</h5>
                <RImage 
                    src={this.state.imageUrl} 
                    onClick={this.handleImageClick}
                />
                
                {this.state.isLoading && <p>正在加载图像...</p>}
            </div>
        );
    }
}
```

### 图像与文本结合使用

```jsx
<div className="image-text-example">
    <RImage 
        src="https://example.com/image.jpg" 
        circle={true} 
        width="60px" 
        height="60px"
    />
    <span className="ml-2">图像描述文本</span>
</div>

<style>
.image-text-example {
    display: flex;
    align-items: center;
}
</style>
```

### 响应式布局中的图像

```jsx
<div className="container">
    <div className="row justify-content-center">
        <div className="col-6 col-md-3 mb-4">
            <RImage src="https://example.com/image1.jpg" circle={true} />
        </div>
        
        <div className="col-6 col-md-3 mb-4">
            <RImage src="https://example.com/image2.jpg" border={true} />
        </div>
        
        <div className="col-6 col-md-3 mb-4">
            <RImage src="https://example.com/image3.jpg" width="120px" height="80px" />
        </div>
    </div>
</div>
