# Select 组件

Select 组件用于创建下拉选择器，支持数据绑定、只读模式和自定义样式。

## 基本用法

```jsx
import { Select } from '@clake/react-bootstrap4';

// 基本下拉选择器
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>

// 带有默认值的下拉选择器
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    value="beijing"
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>

// 只读模式的下拉选择器
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    readOnly={true}
    value="beijing"
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 下拉选择器的唯一标识符 |
| label | string | '' | 选择器标签文本 |
| data | any[] | [] | 数据源数组，支持字符串或对象格式 |
| summary | string | '' | 摘要文本（显示在选择器下方） |
| readOnly | boolean | false | 是否为只读模式 |
| placeholder | string | '' | 占位符文本（未使用） |
| onSelect | function | null | 选择变化时的回调函数，参数为 (e, obj) |
| value | any | '' | 当前选中的值 |
| size | 'sm' \| 'lg' | '' | 尺寸（'sm', 'lg'） |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 数据操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getValue | - | 获取当前选中的值 |
| setValue | val: any | 设置选中的值 |

## 示例

### 基本下拉选择器使用

```jsx
<Select 
    label="请选择城市"
    data={[
        { text: '北京', value: 'beijing' },
        { text: '上海', value: 'shanghai' },
        { text: '广州', value: 'guangzhou' },
        { text: '深圳', value: 'shenzhen' }
    ]}
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>
```

### 使用字符串数组作为数据源

```jsx
<Select 
    label="请选择等级"
    data={['低', '中', '高']}
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>
```

### 带有默认值和摘要的下拉选择器

```jsx
<Select 
    label="请选择部门"
    data={[
        { text: '技术部', value: 'tech' },
        { text: '市场部', value: 'market' },
        { text: '人事部', value: 'hr' },
        { text: '财务部', value: 'finance' }
    ]}
    value="tech"
    summary="请选择您的所属部门"
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>
```

### 只读模式的下拉选择器

```jsx
<Select 
    label="当前状态"
    data={[
        { text: '待处理', value: 'pending' },
        { text: '进行中', value: 'processing' },
        { text: '已完成', value: 'completed' }
    ]}
    readOnly={true}
    value="processing"
/>
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <div className="form-group">
        <Select 
            label="选择国家"
            data={[
                { text: '中国', value: 'cn' },
                { text: '美国', value: 'us' },
                { text: '日本', value: 'jp' },
                { text: '德国', value: 'de' }
            ]}
            onSelect={(e, obj) => console.log('选中值:', e.target.value)}
        />
    </div>
    
    <div className="form-group">
        <Select 
            label="选择类别"
            data={[
                { text: '电子产品', value: 'electronics' },
                { text: '服装', value: 'clothing' },
                { text: '食品', value: 'food' },
                { text: '书籍', value: 'books' }
            ]}
            onSelect={(e, obj) => console.log('选中值:', e.target.value)}
        />
    </div>
    
    <button type="submit" className="btn btn-primary">提交</button>
</form>
```

### 响应式下拉选择器

```jsx
<div className="row">
    <div className="col-md-6">
        <Select 
            label="选择城市"
            data={[
                { text: '北京', value: 'beijing' },
                { text: '上海', value: 'shanghai' },
                { text: '广州', value: 'guangzhou' }
            ]}
            onSelect={(e, obj) => console.log('选中值:', e.target.value)}
        />
    </div>
    
    <div className="col-md-6">
        <Select 
            label="选择状态"
            data={[
                { text: '启用', value: 'enabled' },
                { text: '禁用', value: 'disabled' }
            ]}
            onSelect={(e, obj) => console.log('选中值:', e.target.value)}
        />
    </div>
</div>
```

### 使用自定义样式

```jsx
<Select 
    label="选择主题"
    data={[
        { text: '浅色', value: 'light' },
        { text: '深色', value: 'dark' }
    ]}
    className="custom-select"
    style={{ width: '200px', margin: '10px 0' }}
    onSelect={(e, obj) => console.log('选中值:', e.target.value)}
/>

<style>
.custom-select {
    border-radius: 8px;
    border-color: #3498db;
}
</style>
```

### 动态更新数据

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [
                { text: '选项一', value: 'option1' },
                { text: '选项二', value: 'option2' }
            ],
            selectedValue: 'option1'
        };
    }

    updateOptions = () => {
        this.setState({
            options: [
                { text: '新选项一', value: 'new1' },
                { text: '新选项二', value: 'new2' },
                { text: '新选项三', value: 'new3' }
            ],
            selectedValue: 'new1'
        });
    };

    handleSelectChange = (e, obj) => {
        this.setState({
            selectedValue: e.target.value
        });
    };

    render() {
        return (
            <div>
                <Select 
                    label="选择选项"
                    data={this.state.options}
                    value={this.state.selectedValue}
                    onSelect={this.handleSelectChange}
                />
                
                <button onClick={this.updateOptions}>更新选项</button>
            </div>
        );
    }
}
```

### 获取和设置值

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.selectRef = null;
    }

    getSelectedValue = () => {
        if (this.selectRef) {
            return this.selectRef.getValue();
        }
    };

    setSelectedValue = (value) => {
        if (this.selectRef) {
            this.selectRef.setValue(value);
        }
    };

    render() {
        return (
            <div>
                <Select 
                    ref={(c) => this.selectRef = c}
                    label="选择状态"
                    data={[
                        { text: '启用', value: 'enabled' },
                        { text: '禁用', value: 'disabled' }
                    ]}
                />
                
                <button onClick={() => console.log('当前值:', this.getSelectedValue())}>获取值</button>
                <button onClick={() => this.setSelectedValue('disabled')}>设置为禁用</button>
            </div>
        );
    }
}
