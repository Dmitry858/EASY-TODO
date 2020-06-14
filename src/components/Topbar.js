import React from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-materialize';

const Topbar = (props) => {
    return (
        <div className="topbar">
            <Toast
                options={{
                    html: 'Данная функция в разработке'
                }}
            >
                <a className="notice-link" href="#"><i className="fa fa-bell" aria-hidden="true"></i></a>
            </Toast>            
            <a href="#"><i className="fa fa-sign-out" aria-hidden="true"></i></a>
        </div>        
    );
};

export default connect(state => state)(Topbar);