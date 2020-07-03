import React from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-materialize';
import deleteCookie from '../utils/deleteCookie';

const Topbar = (props) => {

    function signOut(event) {
        event.preventDefault();

        deleteCookie('token');
        deleteCookie('userId');

        props.dispatch({
            type: 'HAS_TOKEN',
            payload: false
        });
        props.dispatch({
            type: 'UPDATE_CATEGORIES',
            payload: []
        });
        props.dispatch({
            type: 'ADD_LISTS',
            payload: null
        });

        props.history.push('/');
    }

    return (
        <div className="topbar">
            <Toast
                options={{
                    html: 'Данная функция в разработке'
                }}
            >
                <a className="notice-link" href="#"><i className="fa fa-bell" aria-hidden="true"></i></a>
            </Toast>            
            <a href="#" onClick={signOut}><i className="fa fa-sign-out" aria-hidden="true"></i></a>
        </div>        
    );
};

export default connect(state => state)(Topbar);