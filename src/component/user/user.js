import React, { Component } from 'react';
import { connect } from "react-redux";
import { Result, WhiteSpace, List, Modal } from "antd-mobile";
import browserCookie from "browser-cookies";
import { logoutSubmit } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        const alert = Modal.alert;
        alert('Logout', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
            {
                text: 'OK', onPress: () => {
                    browserCookie.erase('userid');
                    this.props.logoutSubmit();
                    //window.location.href = window.location.href
                }
            },
        ])
        console.log('log out')
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            <div>
                
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{ width: 50 }} alt="" />}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => 'Description'}>
                    <Item multipleline='true'>
                        {props.title}
                        {props.desc.split('\n').map(v => (<Brief key={v}>{v}</Brief>))}
                        {props.money ? <Brief>Salary: {props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item style={{ zIndex: 1 }} onClick={this.logout} >Logout</Item>
                </List>
            </div>
        ) : <div>{props.redirectTo ? <Redirect to={props.redirectTo} /> : null} </div>;
    }
}

export default User;