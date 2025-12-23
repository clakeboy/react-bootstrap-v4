# Combo 组件

Combo 组件用于创建一个带有搜索功能的下拉组合框，支持远程数据加载、多选和自定义列过滤。

## 基本用法

```jsx
import { Combo } from '@clake/react-bootstrap4';

// 基本组合框
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSelect={(val, row) => console.log(val, row)}
/>

// 带有搜索功能的组合框
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSearch={(search, callback) => {
        // 模拟远程搜索
        setTimeout(() => {
            const results = [
                { name: '选项1', value: '1' },
                { name: '选项2', value: '2' }
            ];
            callback(results);
        }, 500);
    }}
    onSelect={(val, row) => console.log(val, row)}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| searchColumn | string | '' | 搜索列的字段名 |
| data | any[] | [] | 数据源数组 |
| showRows | number | 8 | 显示的行数 |
| search | string | '' | 初始搜索文本 |
| onSearch | function | null | 搜索回调函数，用于远程数据加载 |
| onSelect | function | null | 选择项后的回调函数 |
| onClose | function | null | 关闭组合框时的回调函数 |
| onShow | function | null | 显示组合框时的回调函数 |
| sm | boolean | false | 是否使用小尺寸样式 |
| multi | boolean | false | 是否支持多选 |
| multiDef | any | null | 多选默认值 |
| filterColumns | any[] | [] | 过滤列配置 |
| noSearch | boolean | false | 是否禁用搜索功能 |
| header | boolean | false | 是否显示表头 |
| searchType | string | 'start' | 搜索类型（'start', 'include'） |
| triangular | string | '' | 三角形指示器方向 |
| empty | string | 'Not Data' | 空数据时显示的文本 |
| className | string | '' | 组件的自定义类名 |
| height | string | '' | 组件的高度 |
| width | string | '' | 组件的宽度 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| show | search: any, dom: HTMLElement | 显示组合框 |
| setSearchText | text: string | 设置搜索文本 |
| clearSelect | - | 清除选择 |
| moveItem | step: number | 移动选中项 |
| selectItem | - | 选择当前项 |
| fixPosition | - | 修复位置 |
| hide | - | 隐藏组合框 |
| filter | search: string | 过滤数据 |
| filterColumns | - | 获取过滤列配置 |
| getClasses | - | 获取组件类名 |
| getStyles | - | 获取组件样式 |

## 示例

### 基本组合框

```jsx
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 带有搜索功能的组合框

```jsx
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    onSearch={(search, callback) => {
        // 模拟远程搜索
        setTimeout(() => {
            const results = [
                { name: '选项1', value: '1' },
                { name: '选项2', value: '2' }
            ];
            callback(results);
        }, 500);
    }}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 多选组合框

```jsx
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    multi={true}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 自定义搜索类型

```jsx
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    searchType="include"
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 带有表头的组合框

```jsx
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    header={true}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 使用自定义列配置

```jsx
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    filterColumns={[
        { field: 'name', text: '名称' },
        { field: 'value', text: '值' }
    ]}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 使用小尺寸样式

```jsx
<Combo 
    data={[
        { name: '选项1', value: '1' },
        { name: '选项2', value: '2' },
        { name: '选项3', value: '3' }
    ]}
    searchColumn="name"
    sm={true}
    onSelect={(val, row) => console.log(val, row)}
/>
```

### 使用自定义空数据文本

```jsx
<Combo 
    data={[]}
    searchColumn="name"
    empty="没有找到数据"
    onSelect={(val, row) => console.log(val, row)}
/>
