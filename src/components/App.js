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
import Policy from './Policy';
import Lists from './Lists';
import List from './List';
import Archive from './Archive';
import Analytics from './Analytics';
import Help from './Help';
import Settings from './Settings';
import Greeting from './Greeting';
import NotFound from './NotFound';
import getCookie from '../utils/getCookie';
import cleanLocalStorage from '../utils/cleanLocalStorage';

const history = qhistory(
    createBrowserHistory({}),
    stringify,
    parse
);

const App = (props) => {

    if (!getCookie('token')) {
        cleanLocalStorage();

        return (
            <Router history={history}>
                <Header type='outer' history={history} />

                <Switch>
                    <Route exact path='/about' component={About} />
                    <Route exact path='/policy' component={Policy} />
                    <Route exact path='/' component={Home} />
                    <Route
                        render={(props) => <NotFound type={'outer'} {...props} />}
                    />
                </Switch>

                <Footer type='outer' history={history} />
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
                    <Route 
                        exact path='/policy' 
                        render={(props) => <Policy type={'inner'} {...props} />}
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

                <Footer type='inner' history={history} />

                {props.user.isNew && <Greeting />}
            </Router>
        );
    }

};

export default connect(state => state)(App);
