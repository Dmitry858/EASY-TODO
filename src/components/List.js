import React from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';
import CreateTask from './Modals/CreateTask';
import NotFound from './NotFound';

const List = (props) => {

    let {lists} = props.tasks;

    if(!lists) return <NotFound type={'inner'} />;

    if(lists) {
        let result = lists.find(function(item) {
            return parseInt(item.list_id, 10) === parseInt(props.match.params.id, 10);
        });

        if(!result) return <NotFound type={'inner'} />;
    }

    return (
        <React.Fragment>
            <Topbar history={props.history} />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>Работа</h1>
                        <a className="btn-floating btn-small waves-effect waves-light modal-trigger" href="#modal-create-task">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </a>
                    </div>

                    <p>Не найдено ни одной задачи.</p> 
                    <a className="waves-effect waves-light btn modal-trigger" href="#modal-create-task">Создать</a>

                </div>
            </div>

            <CreateTask />
        </React.Fragment>
    );

};

export default connect(state => state)(List);