import React, { Component } from 'react';
import { Grid, List } from "antd-mobile";
import PropTypes from "prop-types";

class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func
    }
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const avatarList = '1,2,3,4,5,6,7,8'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
            text: null,
            name: v
        }));

        const gridHeader = this.state.icon ? (<div>
            <span>已选择头像</span>
            <img style={{ width: 20 }} src={this.state.icon} alt=''/>
        </div>) : <div>请选择头像</div>

        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid data={avatarList} onClick={elm => {
                        this.setState(elm);
                        this.props.selectAvatar(elm.name);
                    }} />
                </List>
            </div>
        );
    }
}

export default AvatarSelector;