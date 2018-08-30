import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import login from './container/login/login';
import register from './container/register/register';
import reducers from './reducer';
import './config';
import AuthRoute from './component/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import DashBoard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// function DashBoard() {
//     return <h2>DashBoard</h2>
// }

//boss genius me msg ----- 4 pages
ReactDOM.render(
    (
        <Provider store={store}>
            <Router>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        <Route path='/login' component={login}></Route>
                        <Route path='/register' component={register}></Route>
                        <Route path='/chat/:user' component={Chat}></Route>
                        <Route component={DashBoard}></Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    ), document.getElementById('root')
)
