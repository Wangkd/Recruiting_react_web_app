import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import { connect } from 'react-redux';
import {update} from '../../redux/user.redux';
import { Redirect } from "react-router-dom";
import AvatarSelector from '../../component/avatar-selector/avatar-selector';

@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: ''
        }
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
                <NavBar mode="dark">牛人信息页</NavBar>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v) => this.handleChange('title', v)}>
                    求职岗位
                </InputItem>
                <TextareaItem
                    rows={1}
                    autoHeight
                    title='个人简介'
                    onChange={(v) => this.handleChange('desc', v)}>
                </TextareaItem>
                <Button type='primary' onClick={()=>{this.props.update(this.state)}}>保存</Button>
            </div>
        );
    }
}

export default GeniusInfo;