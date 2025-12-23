# Switch 组件

Switch 组件用于创建开关控件，支持主题颜色、尺寸调整和状态变更回调。

## 基本用法

```jsx
import { Switch } from '@clake/react-bootstrap4';

// 基本开关
<Switch 
    checked={false}
    onChange={(checked) => console.log('开关状态:', checked)}
/>

// 默认开启的开关
<Switch 
    checked={true}
    onChange={(checked) => console.log('开关状态:', checked)}
/>

// 带有自定义标签的开关
<Switch 
    checked={true}
    onChange={(checked) => console.log('开关状态:', checked)}
>
    开启
</Switch>

// 禁用的开关
<Switch 
    checked={true}
    disabled={true}
/>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 开关的唯一标识符 |
| checked | boolean | false | 是否开启状态 |
| onChange | function | null | 状态改变时的回调函数，参数为 (checked) |
| theme | string \| Theme | 'primary' | 主题颜色（'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'） |
| size | string | '' | 尺寸（'sm', 'lg'） |
| disabled | boolean | false | 是否禁用开关 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 状态操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| getChecked | - | 获取当前开关状态 |
| setChecked | check: boolean | 设置开关状态 |

## 示例

### 基本开关使用

```jsx
<div className="switch-example">
    <h5>基本开关</h5>
    <Switch 
        checked={false}
        onChange={(checked) => console.log('开关状态:', checked)}
    />
</div>
```

### 带有主题颜色的开关

```jsx
<div className="switch-example">
    <h5>不同主题颜色</h5>
    
    <div className="mb-2">
        <Switch theme="primary" checked={true} />
        <span className="ml-2">主色</span>
    </div>
    
    <div className="mb-2">
        <Switch theme="success" checked={true} />
        <span className="ml-2">成功</span>
    </div>
    
    <div className="mb-2">
        <Switch theme="danger" checked={true} />
        <span className="ml-2">危险</span>
    </div>
    
    <div className="mb-2">
        <Switch theme="warning" checked={true} />
        <span className="ml-2">警告</span>
    </div>
    
    <div className="mb-2">
        <Switch theme="info" checked={true} />
        <span className="ml-2">信息</span>
    </div>
    
    <div className="mb-2">
        <Switch theme="dark" checked={true} />
        <span className="ml-2">深色</span>
    </div>
</div>
```

### 不同尺寸的开关

```jsx
<div className="switch-example">
    <h5>不同尺寸</h5>
    
    <div className="mb-2">
        <Switch size="sm" checked={true} />
        <span className="ml-2">小尺寸</span>
    </div>
    
    <div className="mb-2">
        <Switch checked={true} />
        <span className="ml-2">默认尺寸</span>
    </div>
    
    <div className="mb-2">
        <Switch size="lg" checked={true} />
        <span className="ml-2">大尺寸</span>
    </div>
</div>
```

### 带有标签的开关

```jsx
<div className="switch-example">
    <h5>带标签的开关</h5>
    
    <div className="mb-2">
        <Switch checked={true}>
            开启状态
        </Switch>
    </div>
    
    <div className="mb-2">
        <Switch checked={false}>
            关闭状态
        </Switch>
    </div>
</div>
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <div className="form-group">
        <label>通知设置</label>
        <Switch 
            checked={true}
            onChange={(checked) => console.log('通知开关:', checked)}
        />
    </div>
    
    <div className="form-group">
        <label>自动保存</label>
        <Switch 
            checked={false}
            onChange={(checked) => console.log('自动保存开关:', checked)}
        />
    </div>
    
    <button type="submit" className="btn btn-primary">保存设置</button>
</form>
```

### 响应式开关布局

```jsx
<div className="row">
    <div className="col-md-6">
        <h5>通知设置</h5>
        <div className="mb-2">
            <Switch checked={true} theme="primary" />
            <span className="ml-2">邮件通知</span>
        </div>
        
        <div className="mb-2">
            <Switch checked={false} theme="success" />
            <span className="ml-2">短信通知</span>
        </div>
    </div>
    
    <div className="col-md-6">
        <h5>系统设置</h5>
        <div className="mb-2">
            <Switch checked={true} theme="info" />
            <span className="ml-2">自动更新</span>
        </div>
        
        <div className="mb-2">
            <Switch checked={false} theme="danger" />
            <span className="ml-2">数据备份</span>
        </div>
    </div>
</div>
```

### 自定义样式

```jsx
<div className="switch-example">
    <h5>自定义样式</h5>
    
    <Switch 
        checked={true}
        className="custom-switch"
        style={{ width: '60px', height: '30px' }}
        onChange={(checked) => console.log('开关状态:', checked)}
    />
    
    <style>
        .custom-switch {
            border-radius: 15px;
            background-color: #f0f0f0;
        }
        
        .custom-switch .ck-switch-circle {
            width: 26px;
            height: 26px;
        }
    </style>
</div>
```

### 使用状态管理

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: true,
            autoSave: false
        };
    }

    handleToggle = (setting, checked) => {
        this.setState({
            [setting]: checked
        });
    };

    render() {
        return (
            <div>
                <h5>用户设置</h5>
                
                <div className="mb-3">
                    <Switch 
                        checked={this.state.notifications}
                        onChange={(checked) => this.handleToggle('notifications', checked)}
                    />
                    <span className="ml-2">接收通知</span>
                </div>
                
                <div className="mb-3">
                    <Switch 
                        checked={this.state.autoSave}
                        onChange={(checked) => this.handleToggle('autoSave', checked)}
                    />
                    <span className="ml-2">自动保存</span>
                </div>
                
                <p>当前状态：通知={this.state.notifications}, 自动保存={this.state.autoSave}</p>
            </div>
        );
    }
}
```

### 获取和设置开关状态

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.switchRef = null;
    }

    getSwitchState = () => {
        if (this.switchRef) {
            return this.switchRef.getChecked();
        }
    };

    setSwitchState = (checked) => {
        if (this.switchRef) {
            this.switchRef.setChecked(checked);
        }
    };

    render() {
        return (
            <div>
                <Switch 
                    ref={(c) => this.switchRef = c}
                    checked={false}
                    onChange={(checked) => console.log('开关状态:', checked)}
                />
                
                <button onClick={() => console.log('当前状态:', this.getSwitchState())}>获取状态</button>
                <button onClick={() => this.setSwitchState(true)}>开启开关</button>
                <button onClick={() => this.setSwitchState(false)}>关闭开关</button>
            </div>
        );
    }
}

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.

<environment_details>
# Visual Studio Code Visible Files
docs/components/Switch.md
docs/components/Select.md
docs/components/Scroll.md

# Visual Studio Code Open Tabs
docs/components/Switch.md
docs/components/Select.md
docs/components/Scroll.md

# Current Time
2025/12/23 上午9:18:47 (Asia/Shanghai, UTC+8:00)

# Context Window Usage
69,352 / 128K tokens used (54%)

# Current Mode
ACT MODE
</environment_details>
