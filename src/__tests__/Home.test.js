import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs';
import Home from '../components/Home';
import { Provider } from 'react-redux';
import store from '../store.js';
import { render } from '@testing-library/react';

describe('Home testing', () => {
    const history = qhistory(
        createBrowserHistory({}),
        stringify,
        parse
    );

    const HomeWithProvider = () => {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Home />
                </Router>
            </Provider>
        );      
    };
    
    it('Home render without crashing', () => {
        const div = document.createElement('div');
      
        ReactDOM.render(
            <HomeWithProvider />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Home matches the snapshot', () => {
        const { container } = render(<HomeWithProvider />);
        expect(container).toMatchSnapshot();
    });
    
});
