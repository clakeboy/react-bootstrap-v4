# CKModal 组件

CKModal 组件用于创建各种类型的模态框，包括警告、确认、加载和视图模式。

## 基本用法

```jsx
import { CKModal } from '@clake/react-bootstrap4';

// 创建模态框实例
const modal = new CKModal();

// 显示警告模态框
modal.alert('这是一个警告信息');

// 显示确认模态框
modal.confirm({
    title: '确认操作',
    content: '您确定要执行此操作吗？'
});

// 显示加载模态框
modal.loading('正在处理中...');

// 显示视图模态框
modal.view({
    title: '详细信息',
    content: <div>这里是详细的视图内容</div>
});
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 模态框的唯一标识符 |
| onOpen | function | null | 模态框打开时的回调函数 |
| onClose | function | null | 模态框关闭时的回调函数 |
| center | boolean | true | 是否居中显示 |
| fade | boolean | false | 是否使用淡入淡出动画 |
| header | boolean | true | 是否显示标题栏 |
| blurSelector | string | '' | 模态框打开时添加模糊效果的元素选择器 |
| isCloseBtn | boolean | true | 是否显示关闭按钮 |
| shadowClose | boolean | false | 点击阴影区域是否关闭模态框 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| alert | opt: Options \| any, cb?: () => void | 显示警告模态框 |
| confirm | opt: Options \| any, cb?: (flag: number) => void | 显示确认模态框 |
| loading | opt: Options \| string | 显示加载模态框 |
| view | opts: ViewOptions | 显示视图模态框 |
| open | - | 手动打开模态框 |
| close | callback_close?: () => void | 手动关闭模态框 |

## Options 接口

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| title | string | '' | 模态框标题 |
| content | any | '' | 模态框内容（文本或 JSX 元素） |
| close | boolean | true | 是否显示关闭按钮 |
| header | boolean | true | 是否显示标题栏 |
| center | boolean | true | 是否居中显示 |
| width | string | null | 模态框宽度 |
| btns | {[propsName:string]:string} | {ok: '确定', cancel: '取消'} | 按钮文本 |
| shadowClose | boolean | false | 点击阴影区域是否关闭模态框 |
| fade | boolean | false | 是否使用淡入淡出动画 |
| empty | boolean | false | 是否为空模态框 |

## ViewOptions 接口

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| title | string | '' | 模态框标题 |
| content | any | '' | 模态框内容（文本或 JSX 元素） |
| close | boolean | true | 是否显示关闭按钮 |
| header | boolean | true | 是否显示标题栏 |
| center | boolean | true | 是否居中显示 |
| width | string | null | 模态框宽度 |
| shadowClose | boolean | false | 点击阴影区域是否关闭模态框 |
| fade | boolean | false | 是否使用淡入淡出动画 |
| empty | boolean | false | 是否为空模态框 |
| size | string | 'lg' | 模态框大小（sm, lg, xl） |
| onClose | () => void | null | 模态框关闭时的回调函数 |

## 示例

### 警告模态框

```jsx
const modal = new CKModal();
modal.alert('这是一个警告信息');
```

### 确认模态框

```jsx
const modal = new CKModal();
modal.confirm({
    title: '确认操作',
    content: '您确定要执行此操作吗？',
    callback: (flag) => {
        if (flag === 1) {
            console.log('用户点击了确定');
        } else {
            console.log('用户点击了取消');
        }
    }
});
```

### 加载模态框

```jsx
const modal = new CKModal();
modal.loading('正在处理中...');
```

### 视图模态框

```jsx
const modal = new CKModal();
modal.view({
    title: '详细信息',
    content: <div>这里是详细的视图内容</div>,
    size: 'lg',
    onClose: () => {
        console.log('模态框已关闭');
    }
});
```

### 自定义按钮文本

```jsx
const modal = new CKModal();
modal.confirm({
    title: '确认操作',
    content: '您确定要执行此操作吗？',
    btns: {
        ok: '是',
        cancel: '否'
    }
});
```

### 使用自定义宽度

```jsx
const modal = new CKModal();
modal.alert('这是一个警告信息', () => {
    console.log('模态框已关闭');
});
```

### 使用淡入淡出动画

```jsx
const modal = new CKModal();
modal.alert('这是一个警告信息', () => {
    console.log('模态框已关闭');
});
```

### 设置模态框大小

```jsx
const modal = new CKModal();
modal.view({
    title: '详细信息',
    content: <div>这里是详细的视图内容</div>,
    size: 'sm'
});
```

### 使用回调函数

```jsx
const modal = new CKModal();
modal.alert('这是一个警告信息', (result) => {
    console.log('用户点击了确定');
});
