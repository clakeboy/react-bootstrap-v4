# InputStyle 组件

InputStyle 组件用于创建带有标签的输入容器，提供统一的表单元素布局。

## 基本用法

```jsx
import { InputStyle } from '@clake/react-bootstrap4';

// 基本输入样式容器
<InputStyle label="姓名">
    <input type="text" className="form-control" placeholder="请输入姓名" />
</InputStyle>

// 带有多个输入元素的容器
<InputStyle label="地址">
    <input type="text" className="form-control" placeholder="请输入地址" />
    <small className="form-text text-muted">请填写详细地址</small>
</InputStyle>

// 使用自定义类名
<InputStyle label="邮箱" className="custom-input-style">
    <input type="email" className="form-control" placeholder="请输入邮箱地址" />
</InputStyle>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 输入样式容器的唯一标识符 |
| label | any | '' | 输入框的标签文本 |
| className | string | '' | 组件的自定义类名 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getClasses | - | 获取组件的CSS类名 |

## 示例

### 基本输入样式容器

```jsx
<InputStyle label="姓名">
    <input type="text" className="form-control" placeholder="请输入姓名" />
</InputStyle>
```

### 带有描述文本的输入样式容器

```jsx
<InputStyle label="地址">
    <input type="text" className="form-control" placeholder="请输入地址" />
    <small className="form-text text-muted">请填写详细地址</small>
</InputStyle>
```

### 使用不同输入类型

```jsx
<InputStyle label="用户名">
    <input type="text" className="form-control" placeholder="请输入用户名" />
</InputStyle>

<InputStyle label="邮箱">
    <input type="email" className="form-control" placeholder="请输入邮箱地址" />
</InputStyle>

<InputStyle label="密码">
    <input type="password" className="form-control" placeholder="请输入密码" />
</InputStyle>

<InputStyle label="电话">
    <input type="tel" className="form-control" placeholder="请输入电话号码" />
</InputStyle>
```

### 与表单结合使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <InputStyle label="姓名">
        <input type="text" className="form-control" placeholder="请输入姓名" />
    </InputStyle>
    
    <InputStyle label="邮箱">
        <input type="email" className="form-control" placeholder="请输入邮箱地址" />
    </InputStyle>
    
    <InputStyle label="电话">
        <input type="tel" className="form-control" placeholder="请输入电话号码" />
    </InputStyle>
    
    <button type="submit">提交</button>
</form>
```

### 使用自定义样式

```jsx
<InputStyle label="备注" className="custom-input-style">
    <textarea className="form-control" rows="4" placeholder="请输入备注信息"></textarea>
</InputStyle>

<style>
.custom-input-style {
    margin-bottom: 1rem;
}
.custom-input-style .form-label {
    font-weight: bold;
    color: #3498db;
}
</style>
```

### 嵌套使用

```jsx
<InputStyle label="个人信息">
    <div className="row">
        <div className="col-md-6">
            <InputStyle label="姓名">
                <input type="text" className="form-control" placeholder="请输入姓名" />
            </InputStyle>
        </div>
        <div className="col-md-6">
            <InputStyle label="年龄">
                <input type="number" className="form-control" placeholder="请输入年龄" />
            </InputStyle>
        </div>
    </div>
</InputStyle>
```

### 与Select结合使用

```jsx
<InputStyle label="选择城市">
    <select className="form-control">
        <option value="">请选择城市</option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="guangzhou">广州</option>
    </select>
</InputStyle>
```

### 与Checkbox结合使用

```jsx
<InputStyle label="订阅新闻">
    <div className="form-check">
        <input className="form-check-input" type="checkbox" id="newsletter" />
        <label className="form-check-label" htmlFor="newsletter">
            我希望接收新闻更新
        </label>
    </div>
</InputStyle>
