# Radio 组件

Radio 组件用于创建单选按钮，支持内联布局、自定义样式和事件处理。

## 基本用法

```jsx
import { Radio } from '@clake/react-bootstrap4';

// 基本单选按钮
<Radio 
    name="gender" 
    label="男"
    value="male"
    onChange={(e, obj) => console.log('选中:', e.target.value)}
/>

// 带有默认选中的单选按钮
<Radio 
    name="gender" 
    label="女"
    value="female"
    checked={true}
    onChange={(e, obj) => console.log('选中:', e.target.value)}
/>

// 内联布局的单选按钮组
<div>
    <Radio 
        name="size" 
        label="小号"
        value="small"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="size" 
        label="中号"
        value="medium"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="size" 
        label="大号"
        value="large"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
</div>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 单选按钮的唯一标识符 |
| name | string | '' | 单选按钮组名称（必需） |
| label | string | '' | 单选按钮的标签文本 |
| value | any | '' | 单选按钮的值 |
| checked | boolean | false | 是否被选中 |
| onChange | function | null | 选择状态改变时的回调函数，参数为 (e, obj) |
| inputClass | string | '' | 输入元素的自定义类名 |
| inline | boolean | false | 是否使用内联布局（水平排列） |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 事件处理

| 方法名 | 参数 | 描述 |
|--------|------|------|
| changeHandler | e: React.ChangeEvent | 处理选择变化事件 |

## 示例

### 基本单选按钮使用

```jsx
<div className="radio-example">
    <h5>性别选择：</h5>
    <Radio 
        name="gender" 
        label="男"
        value="male"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="gender" 
        label="女"
        value="female"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="gender" 
        label="未知"
        value="unknown"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
</div>
```

### 内联布局的单选按钮组

```jsx
<div className="radio-example">
    <h5>尺寸选择：</h5>
    <Radio 
        name="size" 
        label="小号"
        value="small"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="size" 
        label="中号"
        value="medium"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="size" 
        label="大号"
        value="large"
        inline={true}
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
</div>
```

### 带有自定义样式和默认选中的单选按钮

```jsx
<div className="radio-example">
    <h5>优先级选择：</h5>
    <Radio 
        name="priority" 
        label="低"
        value="low"
        checked={true}
        inputClass="custom-radio"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="priority" 
        label="中"
        value="medium"
        inputClass="custom-radio"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    <Radio 
        name="priority" 
        label="高"
        value="high"
        inputClass="custom-radio"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
</div>

<style>
.custom-radio {
    accent-color: #3498db;
}
</style>
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <div className="form-group">
        <label>支付方式：</label>
        <Radio 
            name="payment" 
            label="支付宝"
            value="alipay"
            onChange={(e, obj) => console.log('选中:', e.target.value)}
        />
        <Radio 
            name="payment" 
            label="微信支付"
            value="wechat"
            onChange={(e, obj) => console.log('选中:', e.target.value)}
        />
        <Radio 
            name="payment" 
            label="银行卡"
            value="bank"
            onChange={(e, obj) => console.log('选中:', e.target.value)}
        />
    </div>
    
    <button type="submit" className="btn btn-primary">提交</button>
</form>
```

### 使用绝对定位

```jsx
<div style={{ position: 'relative', width: '300px', height: '200px', border: '1px solid #ddd' }}>
    <Radio 
        name="position" 
        label="左上角"
        value="top-left"
        absolute={true}
        x="10px"
        y="10px"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
    
    <Radio 
        name="position" 
        label="右下角"
        value="bottom-right"
        absolute={true}
        x="200px"
        y="150px"
        onChange={(e, obj) => console.log('选中:', e.target.value)}
    />
</div>
```

### 带有数据绑定的单选按钮

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'option1'
        };
    }

    handleRadioChange = (e, obj) => {
        this.setState({
            selectedValue: e.target.value
        });
    };

    render() {
        return (
            <div>
                <h5>选择选项：</h5>
                {[
                    { value: 'option1', label: '选项一' },
                    { value: 'option2', label: '选项二' },
                    { value: 'option3', label: '选项三' }
                ].map(item => (
                    <Radio 
                        key={item.value}
                        name="options" 
                        label={item.label}
                        value={item.value}
                        checked={this.state.selectedValue === item.value}
                        onChange={this.handleRadioChange}
                    />
                ))}
                
                <p>当前选中：{this.state.selectedValue}</p>
            </div>
        );
    }
}
```

### 响应式单选按钮组

```jsx
<div className="row">
    <div className="col-md-6">
        <h5>选项一：</h5>
        <Radio 
            name="choice" 
            label="选项A"
            value="a"
            onChange={(e, obj) => console.log('选中:', e.target.value)}
        />
        <Radio 
            name="choice" 
            label="选项B"
            value="b"
            onChange={(e, obj) => console.log('选中:', e.target.value)}
        />
    </div>
    
    <div className="col-md-6">
        <h5>选项二：</h5>
        <Radio 
            name="choice2" 
            label="选项C"
            value="c"
            onChange={(e, obj) => console.log('选中:', e.target.value)}
        />
        <Radio 
            name="choice2" 
            label="选项D"
            value="d"
            onChange={(e, obj) => console.log('选中:', e.target.value)}
        />
    </div>
</div>
