import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs';
import Header from './Header/Header';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Lists from './Lists';
import List from './List';
import Archive from './Archive';
import Analytics from './Analytics';
import Help from './Help';
import Settings from './Settings';
import NotFound from './NotFound';
import getCookie from '../utils/getCookie';

const history = qhistory(
    createBrowserHistory({}),
    stringify,
    parse
);

const App = (props) => {

    if (!getCookie('token')) {
        sessionStorage.removeItem('lists');
        localStorage.removeItem('categories');

        return (
            <Router history={history}>
                <Header type='outer' history={history} />

                <Switch>
                    <Route exact path='/about' component={About} />
                    <Route exact path='/' component={Home} />
                    <Route
                        render={(props) => <NotFound type={'outer'} {...props} />}
                    />
                </Switch>

                <Footer type='outer' />
            </Router>
        );
    } else {
        return (
            <Router history={history}>
                <Header type='inner' history={history} />

                <Switch>
                    <Route 
                        exact path='/about' 
                        render={(props) => <About type={'inner'} {...props} />}
                    />
                    <Route exact path='/help' component={Help} />
                    <Route exact path='/settings' component={Settings} />
                    <Route exact path='/analytics' component={Analytics} />
                    <Route exact path='/archive' component={Archive} />
                    <Route exact path='/list/:id' component={List} />
                    <Route exact path='/' component={Lists} />
                    <Route
                        render={(props) => <NotFound type={'inner'} {...props} />}
                    />
                </Switch>

                <Footer type='inner' />
            </Router>         
        );
    }

};

export default connect(state => state)(App);
