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
