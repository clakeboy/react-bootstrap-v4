# GroupStyle 组件

GroupStyle 组件用于创建一个分组样式容器，支持在输入框的左右两侧添加内容。

## 基本用法

```jsx
import { GroupStyle } from '@clake/react-bootstrap4';

// 基本分组样式
<GroupStyle>
    <input type="text" className="form-control" placeholder="输入内容" />
</GroupStyle>

// 带有左侧内容的分组样式
<GroupStyle left="￥">
    <input type="text" className="form-control" placeholder="输入金额" />
</GroupStyle>

// 带有右侧内容的分组样式
<GroupStyle right="元">
    <input type="text" className="form-control" placeholder="输入金额" />
</GroupStyle>

// 带有左右两侧内容的分组样式
<GroupStyle left="￥" right="元">
    <input type="text" className="form-control" placeholder="输入金额" />
</GroupStyle>

// 带有按钮的分组样式
<GroupStyle left={<Button>搜索</Button>} right={<Button>清除</Button>}>
    <input type="text" className="form-control" placeholder="搜索内容" />
</GroupStyle>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 分组样式的唯一标识符 |
| left | string \| JSX.Element | null | 左侧内容（文本或组件） |
| right | string \| JSX.Element | null | 右侧内容（文本或组件） |
| leftClass | string | '' | 左侧内容的自定义类名 |
| rightClass | string | '' | 右侧内容的自定义类名 |
| size | string | 'df' | 组大小（'sm', 'lg'） |
| className | string | '' | 组件的自定义类名 |

## 子组件

### GroupStyle.Content

GroupStyle.Content 组件用于包装组内容。

#### 属性
- `children`: 要包裹的内容

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| renderLeft | - | 渲染左侧内容 |
| renderRight | - | 渲染右侧内容 |

## 示例

### 基本分组样式

```jsx
<GroupStyle>
    <input type="text" className="form-control" placeholder="输入内容" />
</GroupStyle>
```
