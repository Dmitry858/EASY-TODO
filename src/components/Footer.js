import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SignUp from './Modals/SignUp';
import SignIn from './Modals/SignIn';

const Footer = (props) => {

    return (
        <footer 
            className={(props.type === 'outer') ? 'footer' : 'footer footer-inner'}
        >
            <div className="container">
                {props.type === 'inner' && <hr/>}

                <p className={(props.type === 'outer') ? 'center-align' : 'center-align сopyright'}>
                    Copyright © 2020 EASY TODO. 
                    <NavLink exact to={'/policy'} className="policy-link">Политика конфиденциальности</NavLink>
                </p>
            </div>

            {props.type === 'outer' &&
                <>
                    <SignUp history={props.history} />
                    <SignIn history={props.history} />                
                </>
            }
        </footer>
    );

};

export default connect(state => state)(Footer);