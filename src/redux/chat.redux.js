import axios from 'axios';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RESV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length }
        // case MSG_READ:

        case MSG_RECV:
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1 }
        default:
            return state;
    }
};

function msgRecv(data) {
    return { type: MSG_RECV, payload: data }
}

function msgList(msgs) {
    return { type: MSG_LIST, payload: msgs };
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function (data) {
            dispatch(msgRecv(data));
        })
    }
}

export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs));
                }
            })
    }
}

export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg });
    }
}
