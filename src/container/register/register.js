import React, { Component } from 'react';
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from '../../redux/user.redux';

import Logo from '../../component/logo/logo';
import WrapperForm from '../../component/wrapper-form/wrapper-form';
import '../../index.css';

@connect(
    state => state.user,
    { register }
)
@WrapperForm
class Register extends Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null};
                <Logo />
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.props.state.type === "genius"}
                        onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
                    <RadioItem
                        checked={this.props.state.type === "boss"}
                        onChange={() => this.props.handleChange('type', 'boss')}>boss</RadioItem>
                </List>
                <WhiteSpace />
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
                <WingBlank>
                </WingBlank>
            </div>
        );
    }
}

export default Register;