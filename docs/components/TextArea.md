# TextArea 组件

TextArea 组件用于创建富文本编辑器和普通文本区域，支持HTML模式、图片插入、全屏模式等功能。

## 基本用法

```jsx
import { TextArea } from '@clake/react-bootstrap4';

// 基本文本区域
<TextArea 
    label="描述"
    placeholder="请输入描述内容..."
    onChange={(val, obj, evt) => console.log('值改变:', val)}
/>

// 带有默认值的文本区域
<TextArea 
    label="描述"
    data="这是默认内容"
    onChange={(val, obj, evt) => console.log('值改变:', val)}
/>

// 只读模式的文本区域
<TextArea 
    label="描述"
    data="这是只读内容"
    readOnly={true}
/>

// 禁用的文本区域
<TextArea 
    label="描述"
    data="这是禁用内容"
    disabled={true}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 文本区域的唯一标识符 |
| label | string | '' | 标签文本 |
| data | any | null | 初始值 |
| summary | string | '' | 摘要文本（显示在文本区域下方） |
| readOnly | boolean | false | 是否为只读模式 |
| placeholder | string | '' | 占位符文本 |
| plaintext | boolean | false | 是否使用纯文本样式 |
| onChange | function | null | 值改变时的回调函数，参数为 (val, obj, evt) |
| row | number | 4 | 行数（仅在普通模式下有效） |
| htmlMode | boolean | false | 是否启用HTML编辑模式 |
| htmlBar | boolean | true | 是否显示HTML编辑工具栏 |
| locked | boolean \| string | false | 是否锁定文本区域（禁用编辑） |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 值操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getValue | - | 获取当前值（HTML模式返回HTML内容，普通模式返回文本） |
| setValue | val: string | 设置值 |

## 示例

### 基本文本区域使用

```jsx
<TextArea 
    label="描述"
    placeholder="请输入描述内容..."
    onChange={(val, obj, evt) => console.log('值改变:', val)}
/>
```

### HTML编辑模式

```jsx
<TextArea 
    label="内容"
    htmlMode={true}
    htmlBar={true}
    data="<p>这是<strong>HTML</strong>内容</p>"
    onChange={(val, obj, evt) => console.log('HTML内容改变:', val)}
/>
```

### 带有工具栏的HTML编辑器

```jsx
<TextArea 
    label="内容"
    htmlMode={true}
    htmlBar={true}
    data="<p>这是一个<strong>富文本编辑器</strong></p>"
    onChange={(val, obj, evt) => console.log('HTML内容改变:', val)}
/>
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <div className="form-group">
        <TextArea 
            label="产品描述"
            placeholder="请输入产品详细描述..."
            htmlMode={true}
            htmlBar={true}
            onChange={(val, obj, evt) => console.log('产品描述改变:', val)}
        />
    </div>
    
    <button type="submit" className="btn btn-primary">保存</button>
</form>
```

### 响应式文本区域

```jsx
<div className="container">
    <div className="row">
        <div className="col-md-6">
            <h5>普通文本区域</h5>
            <TextArea 
                label="简介"
                placeholder="请输入简介..."
                onChange={(val, obj, evt) => console.log('值改变:', val)}
            />
        </div>
        
        <div className="col-md-6">
            <h5>HTML编辑器</h5>
            <TextArea 
                label="详细内容"
                htmlMode={true}
                htmlBar={true}
                onChange={(val, obj, evt) => console.log('HTML内容改变:', val)}
            />
        </div>
    </div>
</div>
```

### 自定义样式

```jsx
<TextArea 
    label="内容"
    htmlMode={true}
    htmlBar={true}
    className="custom-textarea"
    style={{ width: '80%', margin: '20px auto' }}
    onChange={(val, obj, evt) => console.log('内容改变:', val)}
/>

<style>
.custom-textarea .header-bar {
    border-radius: 8px 8px 0 0;
}

.custom-textarea .form-control {
    border-radius: 0 0 8px 8px;
}
</style>
```

### 使用状态管理

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '<p>这是初始内容</p>'
        };
    }

    handleContentChange = (val, obj, evt) => {
        this.setState({ content: val });
    };

    render() {
        return (
            <div>
                <h5>富文本编辑器</h5>
                <TextArea 
                    label="内容"
                    htmlMode={true}
                    htmlBar={true}
                    data={this.state.content}
                    onChange={this.handleContentChange}
                />
                
                <p>当前内容长度: {this.state.content.length} 字符</p>
            </div>
        );
    }
}
```

### 全屏模式

```jsx
<TextArea 
    label="内容"
    htmlMode={true}
    htmlBar={true}
    data="<p>点击全屏按钮进入全屏模式</p>"
    onChange={(val, obj, evt) => console.log('内容改变:', val)}
/>
```

### 插入图片

```jsx
<TextArea 
    label="内容"
    htmlMode={true}
    htmlBar={true}
    data="<p>拖拽或粘贴图片到此处</p>"
    onChange={(val, obj, evt) => console.log('内容改变:', val)}
/>
```

### 锁定模式

```jsx
<TextArea 
    label="内容"
    htmlMode={true}
    htmlBar={true}
    locked={true}
    data="<p>这是锁定的内容，无法编辑</p>"
/>
```

### 获取和设置值

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.textAreaRef = null;
    }

    getContent = () => {
        if (this.textAreaRef) {
            return this.textAreaRef.getValue();
        }
    };

    setContent = (content) => {
        if (this.textAreaRef) {
            this.textAreaRef.setValue(content);
        }
    };

    render() {
        return (
            <div>
                <TextArea 
                    ref={(c) => this.textAreaRef = c}
                    label="内容"
                    htmlMode={true}
                    htmlBar={true}
                    onChange={(val, obj, evt) => console.log('内容改变:', val)}
                />
                
                <button onClick={() => console.log('当前内容:', this.getContent())}>获取内容</button>
                <button onClick={() => this.setContent('<p>这是新内容</p>')}>设置内容</button>
            </div>
        );
    }
}
