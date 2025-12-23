# Tabs 组件

Tabs 组件用于创建标签页导航，支持选项卡切换、关闭功能和自定义样式。

## 基本用法

```jsx
import { Tabs, Tab } from '@clake/react-bootstrap4';

// 基本标签页
<Tabs>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>

// 带有默认激活标签的标签页
<Tabs showTab="profile">
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>

// 禁用的标签页
<Tabs disabled={true}>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>
```

## 属性

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| id | string | '' | 标签页组的唯一标识符 |
| pills | boolean | false | 是否使用药丸式标签样式 |
| border | boolean | true | 是否显示边框 |
| content | boolean | true | 是否显示内容区域 |
| onSelect | function | null | 标签切换时的回调函数，参数为 (tab) |
| showTab | string | '' | 默认激活的标签ID |
| position | object | {} | 绝对定位的位置配置（top, left, right, bottom） |
| onClose | function | null | 关闭标签时的回调函数，参数为 (tab, index) |
| sm | boolean | false | 小尺寸样式 |
| width | string | '' | 宽度 |
| height | string | '' | 高度 |
| absolute | boolean | false | 是否使用绝对定位 |
| x | string | '' | 绝对定位的 left 值 |
| y | string | '' | 绝对定位的 top 值 |
| className | string | '' | 组件的自定义类名 |

## 方法

### 标签操作

| 方法名 | 参数 | 描述 |
|--------|------|------|
| setSelect | tab_id: string | 设置当前激活的标签 |

## 示例

### 基本标签页使用

```jsx
<Tabs>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>
```

### 药丸式标签页

```jsx
<Tabs pills={true}>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>
```

### 带有关闭功能的标签页

```jsx
<Tabs onClose={(tab, index) => console.log('关闭标签:', tab, '索引:', index)}>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>
```

### 带有默认激活标签的标签页

```jsx
<Tabs showTab="profile">
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>
```

### 在表单中使用

```jsx
<form onSubmit={(e) => e.preventDefault()}>
    <div className="mb-3">
        <Tabs showTab="profile" onSelect={(tab) => console.log('切换到:', tab)}>
            <Tab id="home" text="首页">
                <div className="form-group">
                    <label>姓名</label>
                    <input type="text" className="form-control" />
                </div>
            </Tab>
            <Tab id="profile" text="个人资料">
                <div className="form-group">
                    <label>邮箱</label>
                    <input type="email" className="form-control" />
                </div>
            </Tab>
            <Tab id="contact" text="联系我们">
                <div className="form-group">
                    <label>电话</label>
                    <input type="tel" className="form-control" />
                </div>
            </Tab>
        </Tabs>
    </div>
    
    <button type="submit" className="btn btn-primary">提交</button>
</form>
```

### 响应式标签页布局

```jsx
<div className="container">
    <div className="row">
        <div className="col-md-6">
            <h5>基本标签页</h5>
            <Tabs showTab="profile">
                <Tab id="home" text="首页">
                    <p>这是首页内容</p>
                </Tab>
                <Tab id="profile" text="个人资料">
                    <p>这是个人资料内容</p>
                </Tab>
            </Tabs>
        </div>
        
        <div className="col-md-6">
            <h5>药丸式标签页</h5>
            <Tabs pills={true} showTab="contact">
                <Tab id="home" text="首页">
                    <p>这是首页内容</p>
                </Tab>
                <Tab id="profile" text="个人资料">
                    <p>这是个人资料内容</p>
                </Tab>
                <Tab id="contact" text="联系我们">
                    <p>这是联系我们内容</p>
                </Tab>
            </Tabs>
        </div>
    </div>
</div>
```

### 自定义样式

```jsx
<Tabs 
    className="custom-tabs"
    style={{ width: '400px', margin: '20px auto' }}
    onSelect={(tab) => console.log('切换到:', tab)}
>
    <Tab id="home" text="首页">
        <p>这是首页内容</p>
    </Tab>
    <Tab id="profile" text="个人资料">
        <p>这是个人资料内容</p>
    </Tab>
    <Tab id="contact" text="联系我们">
        <p>这是联系我们内容</p>
    </Tab>
</Tabs>

<style>
.custom-tabs .nav-link {
    border-radius: 8px;
    margin-right: 5px;
}

.custom-tabs .nav-link.active {
    background-color: #3498db;
    color: white;
}
</style>
```

### 使用状态管理

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'profile'
        };
    }

    handleTabSelect = (tab) => {
        this.setState({ activeTab: tab });
    };

    handleCloseTab = (tab, index) => {
        console.log('关闭标签:', tab);
        if (this.state.activeTab === tab) {
            // 如果关闭的是当前激活的标签，切换到第一个可用标签
            this.setState({ activeTab: 'home' });
        }
    };

    render() {
        return (
            <div>
                <h5>状态管理的标签页</h5>
                <Tabs 
                    showTab={this.state.activeTab}
                    onSelect={this.handleTabSelect}
                    onClose={this.handleCloseTab}
                >
                    <Tab id="home" text="首页">
                        <p>这是首页内容</p>
                    </Tab>
                    <Tab id="profile" text="个人资料">
                        <p>这是个人资料内容</p>
                    </Tab>
                    <Tab id="contact" text="联系我们">
                        <p>这是联系我们内容</p>
                    </Tab>
                </Tabs>
                
                <p>当前激活的标签: {this.state.activeTab}</p>
            </div>
        );
    }
}
```

### 动态添加标签

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { id: 'home', text: '首页' },
                { id: 'profile', text: '个人资料' }
            ],
            nextId: 3
        };
    }

    addTab = () => {
        const newTab = { id: 'tab' + this.state.nextId, text: '新标签' + this.state.nextId };
        const newTabs = [...this.state.tabs, newTab];
        
        this.setState({
            tabs: newTabs,
            nextId: this.state.nextId + 1
        });
    };

    handleTabSelect = (tab) => {
        console.log('切换到:', tab);
    };

    handleCloseTab = (tab, index) => {
        const newTabs = this.state.tabs.filter(t => t.id !== tab);
        
        if (this.state.activeTab === tab) {
            this.setState({
                tabs: newTabs,
                activeTab: newTabs.length > 0 ? newTabs[0].id : ''
            });
        } else {
            this.setState({ tabs: newTabs });
        }
    };

    render() {
        return (
            <div>
                <button onClick={this.addTab} className="btn btn-sm btn-primary mb-3">添加标签</button>
                
                <Tabs 
                    showTab={this.state.activeTab || this.state.tabs[0]?.id}
                    onSelect={this.handleTabSelect}
                    onClose={this.handleCloseTab}
                >
                    {this.state.tabs.map(tab => (
                        <Tab key={tab.id} id={tab.id} text={tab.text}>
                            <p>这是 {tab.text} 的内容</p>
                        </Tab>
                    ))}
                </Tabs>
            </div>
        );
    }
}
