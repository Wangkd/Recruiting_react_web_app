import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from "antd-mobile";
import NavLinkBar from '../navlink/navlink';
import { Switch, Route } from "react-router-dom";

import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

@connect(
    state => state,
    {getMsgList, recvMsg}
)
class DashBoard extends Component {
    componentDidMount() {
        this.props.getMsgList();
        this.props.recvMsg();
    }
    render() {
        const { pathname } = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: 'genius',
                icon: 'boss',
                title: 'Genius List',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss List',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: 'message',
                icon: 'msg',
                title: 'Message List',
                component: Msg
            },
            {
                path: '/me',
                text: 'me',
                icon: 'user',
                title: 'Personal',
                component: User
            }
        ]

        return (
            <div>
                <NavBar mode='dard' className='fixed-header'>{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {
                            navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        );
    }
}

export default DashBoard;

function Msg() {
    return <h2>message front page</h2>
}


