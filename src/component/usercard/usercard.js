import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Card, WhiteSpace, WingBlank } from "antd-mobile";
import { withRouter } from 'react-router-dom';
import '../../index.css';
@withRouter
class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`);
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                <WhiteSpace size='lg' />
                {this.props.userlist.map(v => (
                    v.avatar ?
                        <Card style={{ zIndex: 10 }} key={v._id} onClick={() => this.handleClick(v)}>
                            <Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}>
                            </Header>
                            <Body>
                                {v.type === 'boss' ? <div>company:{v.company}</div> : null}
                                {v.desc.split('\n').map(v => (
                                    <div key={v}>{v}</div>
                                ))}
                                {v.type === 'boss' ? <div>salary:{v.money}</div> : null}
                            </Body>
                        </Card>
                        : null
                ))}
            </WingBlank>
        );
    }
}

export default UserCard;