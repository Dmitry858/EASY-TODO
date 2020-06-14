import React from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';

const Help = (props) => {

    return (
        <React.Fragment>
            <Topbar />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>Помощь</h1>
                    </div>

                    <p>Извините, данный раздел находится в разработке.</p> 
                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(Help);