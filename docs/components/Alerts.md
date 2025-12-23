# Alerts 组件

Alerts 组件用于显示各种类型的警告或通知信息，支持不同的主题、自动隐藏时间和宽度设置。

## 基本用法

```jsx
import { Alerts } from '@clake/react-bootstrap4';

// 基本警告
<Alerts>这是一个警告信息</Alerts>

// 主题为成功的警告
<Alerts theme="success">这是一个成功的消息</Alerts>

// 自动隐藏时间为5秒的警告
<Alerts autoHide={5000}>这是一个5秒后自动隐藏的警告</Alerts>

// 宽度为30%的警告
<Alerts width="30%">这是一个宽度为30%的警告</Alerts>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| theme | Theme \| string | 'danger' | 警告的主题（danger, success, info, warning, primary, secondary, light, dark）|
| autoHide | number | 3000 | 自动隐藏时间（毫秒），设置为0则不自动隐藏 |
| width | string | '50%' | 警告的宽度 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| show | ShowOptions \| JSX.Element \| string | 显示警告，可以传入内容、主题、自动隐藏时间和宽度等选项 |
| loading | msg: any | 显示加载中的警告，内容为加载图标和传入的消息 |
| hide | - | 隐藏当前显示的警告 |

## 示例

### 基本警告

```jsx
<Alerts>这是一个警告信息</Alerts>
```

### 不同主题的警告

```jsx
<Alerts theme="success">这是一个成功的消息</Alerts>
<Alerts theme="info">这是一个信息消息</Alerts>
<Alerts theme="warning">这是一个警告消息</Alerts>
<Alerts theme="danger">这是一个危险消息</Alerts>
```

### 自动隐藏警告

```jsx
<Alerts autoHide={5000}>这是一个5秒后自动隐藏的警告</Alerts>
```

### 宽度设置

```jsx
<Alerts width="30%">这是一个宽度为30%的警告</Alerts>
<Alerts width="100%">这是一个宽度为100%的警告</Alerts>
```

### 使用方法显示警告

```jsx
const showAlert = () => {
    alerts.show('这是一个通过方法显示的警告');
};

const alerts = new Alerts();

<button onClick={showAlert}>显示警告</button>
```

### 加载中的警告

```jsx
alerts.loading('正在加载...');
```

### 隐藏警告

```jsx
alerts.hide();
