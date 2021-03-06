import React from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';

const Analytics = (props) => {

    return (
        <React.Fragment>
            <Topbar history={props.history} />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>Аналитика</h1>
                    </div>

                    <p>Извините, данный раздел находится в разработке.</p> 
                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(Analytics);