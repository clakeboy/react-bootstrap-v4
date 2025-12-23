# Common 工具函数

Common 模块提供了一系列常用的工具函数和实用程序。

## 导出的函数和类

### extend

扩展对象属性。

```javascript
extend(org: any, exd: any): any
```

#### 参数
- `org`: 要扩展的对象
- `exd`: 包含要添加属性的对象

#### 示例
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
extend(obj1, obj2);
// obj1 现在是 { a: 1, b: 2, c: 3, d: 4 }
```

### RandomString

生成指定长度的随机字符串。

```javascript
RandomString(str_length: number, tab: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"): string
```

#### 参数
- `str_length`: 生成字符串的长度
- `tab`: 可用字符集，默认包含数字和字母

#### 示例
```javascript
RandomString(10); // 生成一个10位随机字符串，如 "aB3xY9pQw2"
```

### RandNum

生成指定范围内的随机整数。

```javascript
RandNum(start: number, end: number): number
```

#### 参数
- `start`: 范围起始值（包含）
- `end`: 范围结束值（包含）

#### 示例
```javascript
RandNum(1, 10); // 生成一个1到10之间的随机整数
```

### LoadScript

动态加载脚本或样式表。

```javascript
LoadScript: {
    _loaded: {[propName:string]:boolean},
    load(srcStr: string, strID: string, func?: () => void, version?: string | boolean): void
}
```

#### 参数
- `srcStr`: 脚本或样式表的URL
- `strID`: 元素的ID
- `func`: 加载完成后执行的回调函数
- `version`: 版本号或布尔值，用于缓存控制

#### 示例
```javascript
// 加载CSS文件
LoadScript.load('style.css', 'my-style', () => {
    console.log('样式加载完成');
});

// 加载JavaScript文件
LoadScript.load('script.js', 'my-script', () => {
    console.log('脚本加载完成');
});
```

### GetDomXY

获取元素相对于父元素的坐标位置。

```javascript
GetDomXY(e: HTMLElement, parent: HTMLElement | null = null): { top: number, left: number, height: number, width: number }
```

#### 参数
- `e`: 目标元素
- `parent`: 父元素（可选）

#### 返回值
包含 top、left、height 和 width 属性的对象

#### 示例
```javascript
const element = document.getElementById('my-element');
const position = GetDomXY(element);
console.log(`位置: ${position.top}, ${position.left}`);
```

### GetDPI

获取屏幕的 DPI（每英寸点数）。

```javascript
GetDPI(): number[]
```

#### 返回值
包含宽度和高度 DPI 的数组 `[width, height]`

#### 示例
```javascript
const dpi = GetDPI();
console.log(`屏幕 DPI: ${dpi[0]} x ${dpi[1]}`);
```

### map

遍历对象的属性并应用函数。

```javascript
map(obj: any, func: any): Array
```

#### 参数
- `obj`: 要遍历的对象
- `func`: 应用于每个属性的函数

#### 示例
```javascript
const obj = { a: 1, b: 2, c: 3 };
const result = map(obj, (value, key) => `${key}: ${value}`);
// result: ["a: 1", "b: 2", "c: 3"]
```

### strpad

在字符串左侧或右侧填充字符。

```javascript
strpad(text: string, length: number, padstring: string, type: "left" | "right" = "left"): string
```

#### 参数
- `text`: 原始字符串
- `length`: 目标长度
- `padstring`: 填充字符
- `type`: 填充方向（"left" 或 "right"）

#### 示例
```javascript
strpad("123", 5, "0"); // "00123"
strpad("123", 5, "0", "right"); // "12300"
```

### ucFirst

将字符串的第一个字符转换为大写。

```javascript
ucFirst(str: string): string
```

#### 参数
- `str`: 输入字符串

#### 示例
```javascript
ucFirst("hello"); // "Hello"
```

### under2hump

将下划线命名转换为驼峰命名。

```javascript
under2hump(str: string): string
```

#### 参数
- `str`: 下划线命名的字符串

#### 示例
```javascript
under2hump("hello_world"); // "HelloWorld"
```

### explainUrl

解析URL路径并转换为驼峰命名。

```javascript
explainUrl(path: string): string
```

#### 参数
- `path`: URL路径

#### 示例
```javascript
explainUrl("/user/profile"); // "/user/Profile"
```

### Clone

深度克隆对象。

```javascript
Clone(obj: any): any
```

#### 参数
- `obj`: 要克隆的对象

#### 示例
```javascript
const original = { a: 1, b: { c: 2 } };
const clone = Clone(original);
console.log(clone); // { a: 1, b: { c: 2 } }
```

### hasScrolledParent

检查元素是否有滚动的父容器。

```javascript
hasScrolledParent(el: HTMLElement, direction: "vertical" | "horizontal" = "vertical"): HTMLElement | null
```

#### 参数
- `el`: 目标元素
- `direction`: 滚动方向（"vertical" 或 "horizontal"）

#### 返回值
第一个具有滚动属性的父元素，如果没有则返回 null

#### 示例
```javascript
const element = document.getElementById('my-element');
const scrolledParent = hasScrolledParent(element);
if (scrolledParent) {
    console.log('找到了滚动父元素');
}
```

### Runtime

性能计时器。

```javascript
class Runtime {
    constructor()
    begin(): void
    end(print: boolean = false): number
}
```

#### 方法
- `begin()`: 重置开始时间
- `end(print: boolean = false): number`: 结束计时，返回经过的秒数

#### 示例
```javascript
const timer = new Runtime();
// 执行一些操作...
timer.end(true); // 输出经过的秒数
```

### Version

检测浏览器和设备类型。

```javascript
Version(): {
    trident: boolean,      // IE内核
    presto: boolean,       // Opera内核
    webKit: boolean,       // 苹果/谷歌内核
    gecko: boolean,        // 火狐内核
    mobile: boolean,       // 移动终端
    ios: boolean,          // iOS设备
    android: boolean,      // Android设备
    iPhone: boolean,       // iPhone
    iPad: boolean,         // iPad
    webApp: boolean,       // Web应用（无头部和底部）
    weixin: boolean,       // 微信浏览器
    qq: boolean            // QQ浏览器
}
```

#### 示例
```javascript
const version = Version();
if (version.mobile) {
    console.log('当前是移动设备');
}
if (version.weixin) {
    console.log('当前在微信浏览器中');
}
```

## 使用示例

```javascript
import * as Common from './Common';

// 基本使用
const extended = Common.extend({ a: 1 }, { b: 2 });

// 随机字符串
const randomStr = Common.RandomString(8);

// 加载脚本
Common.LoadScript.load('script.js', 'my-script');

// 获取DOM位置
const position = Common.GetDomXY(document.getElementById('element'));

// 深度克隆
const clone = Common.Clone(originalObject);

// 性能计时
const timer = new Common.Runtime();
timer.begin();
// 执行操作...
const seconds = timer.end(true);
