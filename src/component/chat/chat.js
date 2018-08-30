import React, { Component } from 'react';
import { List, InputItem, NavBar } from "antd-mobile";
import { connect } from 'react-redux';
// import io from 'socket.io-client';
// const socket = io('ws://localhost:9093');
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' });
    }

    render() {
        const user = this.props.match.params.user;
        const Item = List.Item;
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {this.props.match.params.user}
                </NavBar>
                {this.props.chat.chatmsg.map(v => {
                    return v.from === user ? (
                        <List key={v._id}>
                            <Item> {v.content}</Item>
                        </List>
                    ) : (<List key={v._id}>
                        <Item extra='me'> {v.content}</Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='type here...'
                            value={this.state.text}
                            onChange={
                                v => { this.setState({ text: v }) }
                            }
                            extra={<span onClick={() => this.handleSubmit()}>send</span>}
                        >
                            Message
                        </InputItem>
                    </List>
                </div>
            </div>
        );
    }
}

export default Chat;