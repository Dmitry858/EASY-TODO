import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import qhistory from 'qhistory';
import { stringify, parse } from 'qs';
import About from '../components/About';
import { Provider } from 'react-redux';
import store from '../store.js';
import { render } from '@testing-library/react';

describe('About testing', () => {
    const history = qhistory(
        createBrowserHistory({}),
        stringify,
        parse
    );

    const type = 'inner';

    const AboutWithProvider = () => {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <About type={type} />
                </Router>
            </Provider>  
        );      
    };

    it('About render without crashing', () => {
        const div = document.createElement('div');
      
        ReactDOM.render(
            <AboutWithProvider />,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('About matches the snapshot', () => {
        const { container } = render(<AboutWithProvider />);
        expect(container).toMatchSnapshot();
    });

});
