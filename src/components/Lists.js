import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Topbar from './Topbar';
import CreateList from './Modals/CreateList';

const Lists = (props) => {

    return (
        <React.Fragment>
            <Topbar history={props.history} />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>Списки задач</h1>
                        <a className="btn-floating btn-small waves-effect waves-light modal-trigger" href="#modal-create-list">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </a>
                    </div>

                    <div className="tasks-list">
                        <div className="list-name">Работа</div>
                        <div className="list-desс">Краткое описание списка задач</div>
                        <div className="control-buttons">
                            <a className="control-button" href="#">
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </a>
                            <a className="control-button" href="#">
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </a>
                            <a className="control-button" href="#">
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </a> 
                        </div>
                        <NavLink exact to={'/list/1'} className="list-link"></NavLink>
                    </div>

                </div>
            </div>

            <CreateList />
        </React.Fragment>
    );

};

export default connect(state => state)(Lists);