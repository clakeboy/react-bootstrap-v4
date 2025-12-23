# RadioGroup 组件

RadioGroup 组件用于创建单选按钮组，自动管理多个 Radio 组件的选中状态。

## 基本用法

```jsx
import { RadioGroup, Radio } from '@clake/react-bootstrap4';

// 基本单选按钮组
<RadioGroup 
    data="option1"
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>

// 带有默认选中值的单选按钮组
<RadioGroup 
    data="option2"
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>

// 禁用的单选按钮组
<RadioGroup 
    data="option1"
    disabled={true}
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 单选按钮组的唯一标识符 |
| name | string | 自动生成 | 单选按钮组名称（若未提供则自动生成） |
| data | any | '' | 当前选中的值 |
| onChange | function | null | 选择状态改变时的回调函数，参数为 (value) |
| disabled | boolean | false | 是否禁用整个单选按钮组 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 事件处理

| 方法名 | 参数 | 描述 |
|--------|------|------|
| changeHandler | e: any | 处理单选按钮变化事件 |

## 示例

### 基本单选按钮组使用

```jsx
<RadioGroup 
    data="option1"
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>
```

### 带有默认选中值的单选按钮组

```jsx
<RadioGroup 
    data="option2"
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>
```

### 禁用的单选按钮组

```jsx
<RadioGroup 
    data="option1"
    disabled={true}
    onChange={(value) => console.log('选中值:', value)}
>
    <Radio label="选项一" value="option1" />
    <Radio label="选项二" value="option2" />
    <Radio label="选项三" value="option3" />
</RadioGroup>
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <div className="form-group">
        <label>支付方式：</label>
        <RadioGroup 
            data="alipay"
            onChange={(value) => console.log('选中支付方式:', value)}
        >
            <Radio label="支付宝" value="alipay" />
            <Radio label="微信支付" value="wechat" />
            <Radio label="银行卡" value="bank" />
        </RadioGroup>
    </div>
    
    <button type="submit" className="btn btn-primary">提交</button>
</form>
```

### 响应式布局中的单选按钮组

```jsx
<div className="row">
    <div className="col-md-6">
        <h5>选择颜色：</h5>
        <RadioGroup 
            data="red"
            onChange={(value) => console.log('选中颜色:', value)}
        >
            <Radio label="红色" value="red" />
            <Radio label="蓝色" value="blue" />
            <Radio label="绿色" value="green" />
        </RadioGroup>
    </div>
    
    <div className="col-md-6">
        <h5>选择等级：</h5>
        <RadioGroup 
            data="high"
            onChange={(value) => console.log('选中等级:', value)}
        >
            <Radio label="低" value="low" />
            <Radio label="中" value="medium" />
            <Radio label="高" value="high" />
        </RadioGroup>
    </div>
</div>
```

### 带有自定义样式的单选按钮组

```jsx
<div className="radio-group-example">
    <h5>选择偏好：</h5>
    <RadioGroup 
        data="option2"
        className="custom-radio-group"
        onChange={(value) => console.log('选中值:', value)}
    >
        <Radio 
            label="选项一" 
            value="option1" 
            inputClass="custom-radio"
        />
        <Radio 
            label="选项二" 
            value="option2" 
            inputClass="custom-radio"
        />
        <Radio 
            label="选项三" 
            value="option3" 
            inputClass="custom-radio"
        />
    </RadioGroup>
</div>

<style>
.custom-radio-group {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.custom-radio {
    accent-color: #3498db;
}
</style>
```

### 与状态管理结合使用

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'option1'
        };
    }

    handleRadioChange = (value) => {
        this.setState({
            selectedOption: value
        });
    };

    render() {
        return (
            <div>
                <h5>选择选项：</h5>
                <RadioGroup 
                    data={this.state.selectedOption}
                    onChange={this.handleRadioChange}
                >
                    <Radio label="选项一" value="option1" />
                    <Radio label="选项二" value="option2" />
                    <Radio label="选项三" value="option3" />
                </RadioGroup>
                
                <p>当前选中：{this.state.selectedOption}</p>
            </div>
        );
    }
}
```

### 动态生成单选按钮组

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                { label: '选项一', value: 'option1' },
                { label: '选项二', value: 'option2' },
                { label: '选项三', value: 'option3' }
            ],
            selectedValue: 'option1'
        };
    }

    handleRadioChange = (value) => {
        this.setState({
            selectedValue: value
        });
    };

    render() {
        return (
            <div>
                <h5>选择选项：</h5>
                <RadioGroup 
                    data={this.state.selectedValue}
                    onChange={this.handleRadioChange}
                >
                    {this.state.options.map(option => (
                        <Radio 
                            key={option.value}
                            label={option.label} 
                            value={option.value} 
                        />
                    ))}
                </RadioGroup>
                
                <p>当前选中：{this.state.selectedValue}</p>
            </div>
        );
    }
}
