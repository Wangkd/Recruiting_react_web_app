import  { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from '../redux/user.redux';

@withRouter
@connect(
    null,
    { loadData }
)
class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathName = this.props.location.pathname;
        if (publicList.indexOf(pathName) > -1) {
            return null;
        }

        //get user info
        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        //user has logined in 
                        this.props.loadData(res.data.data);
                    } else {    //user not logined in 
                        console.log(this.props.history);
                        this.props.history.push('/login');
                    }
                }
            })

        //check if user has logined in 
        //check the current url
        //check the type of user, boss/genius
        //check whether the info of user if completed
    }


    render() {
        return (
            null
        );
    }
}

export default AuthRoute;