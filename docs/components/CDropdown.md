# CDropdown 组件

CDropdown 组件用于创建一个下拉选择框，支持自定义数据、显示行数、下拉宽度和验证规则。

## 基本用法

```jsx
import { CDropdown, CDropdownValue } from '@clake/react-bootstrap4';

// 基本下拉选择框
<CDropdown label="选择一个选项" onChange={(val, row) => console.log(val, row)}>
    <CDropdownValue text="选项1" value="1" />
    <CDropdownValue text="选项2" value="2" />
    <CDropdownValue text="选项3" value="3" />
</CDropdown>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 组件的唯一标识符 |
| data | any | '' | 下拉选项的数据 |
| text | string | '' | 下拉框的默认文本 |
| label | any | '' | 下拉框的标签文本 |
| value | any | '' | 下拉框的默认选中值 |
| onChange | function | null | 选择项变化后的回调函数 |
| showRows | number | 8 | 下拉列表显示的最大行数 |
| dropWidth | string | '100%' | 下拉列表的宽度 |
| validate | any | null | 验证规则 |
| className | string | '' | 组件的自定义类名 |
| width | string | '' | 组件的宽度 |
| size | string | '' | 组件的尺寸（如 'sm', 'lg'） |
| disabled | boolean | false | 是否禁用下拉框 |

## 子组件

### CDropdownValue

CDropdownValue 组件用于定义下拉框中的每个选项。

#### 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| text | any | '' | 选项的显示文本 |
| value | any | '' | 选项的值 |
| format | any | null | 选项的格式化规则 |
| active | boolean | false | 是否默认选中该选项 |

## 方法

| 方法名 | 参数 | 描述 |
|--------|------|------|
| check | - | 检查输入框的状态 |

## 示例

### 基本下拉选择框

```jsx
<CDropdown label="选择一个选项" onChange={(val, row) => console.log(val, row)}>
    <CDropdownValue text="选项1" value="1" />
    <CDropdownValue text="选项2" value="2" />
    <CDropdownValue text="选项3" value="3" />
</CDropdown>
```
