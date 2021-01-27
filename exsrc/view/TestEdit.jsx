/**
 * Created by clakeboy on 2020/11/24.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import {
    Button,
    Container,
    Card
} from "../../src";
import TextArea from "../../src/TextArea";
import ButtonGroup from "../../src/ButtonGroup";

class TestEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            html:""
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <h1>React Bootstrap v4 HTML Editor Demo</h1>
                <Container fluid className='mb-1 p-0'>
                    <Button onClick={() => {
                        this.props.history.goBack();
                    }}>返回主页</Button>
                </Container>
                <Card header='HTML模式'>
                    <ButtonGroup>
                    <Button onClick={() => {
                        this.setState({
                            html:null
                        })
                    }}>设置空值</Button>
                    <Button onClick={() => {
                        this.setState({
                            html:""
                        })
                    }}>设置空值2</Button>
                    </ButtonGroup>
                    <TextArea htmlMode htmlBar height='500px' size='sm' data={this.state.html} onChange={(val)=>{
                        this.setState({
                            html:val
                        })
                    }}/>
                    <hr/>
                    <TextArea htmlMode htmlBar height='500px' size='xs' data={this.state.html} onChange={(val)=>{
                        this.setState({
                            html:val
                        })
                    }}/>
                </Card>
            </Container>
        );
    }
}

TestEdit.propTypes = {

};

TestEdit.defaultProps = {

};

export default TestEdit;