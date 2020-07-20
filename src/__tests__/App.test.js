import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { Provider } from 'react-redux';
import store from '../store.js';
import { render } from '@testing-library/react';

describe('App testing', () => {
    it('App render without crashing', () => {
        const div = document.createElement('div');
      
        ReactDOM.render(
            <Provider store={store}>
                <App />
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('App matches the snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>            
        );
        expect(container).toMatchSnapshot();
    });
    
});
