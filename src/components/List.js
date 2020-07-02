import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';
import CreateTask from './Modals/CreateTask';
import NotFound from './NotFound';
import { Preloader } from 'react-materialize';
import config from '../config';
import getCookie from '../utils/getCookie';

const List = (props) => {

    let listName = '',
        {lists, items} = props.tasks,
        foundEl = items.find(item => item.list_id === parseInt(props.match.params.id, 10));

    let [preloader, setPreloader] = useState(foundEl ? false : true);

    useEffect(() => {
        if(!foundEl) {
            fetch(config.baseURL + `/web/tasks/search?list_id=${props.match.params.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    props.dispatch({
                        type: 'ADD_ITEMS',
                        payload: {
                            list_id: parseInt(props.match.params.id, 10),
                            tasks: data
                        }
                    });
    
                    setPreloader(false);
                })
                .catch((err) => {
                    console.log(err);
                });   
        }     
    }, [props.match.params.id]);

    if(!lists) return <NotFound type={'inner'} />;

    if(lists) {
        let result = lists.find(function(item) {
            return parseInt(item.list_id, 10) === parseInt(props.match.params.id, 10);
        });

        if(!result) return <NotFound type={'inner'} />;

        listName = result.name;
    }

    return (
        <React.Fragment>
            <Topbar history={props.history} />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>{listName}</h1>
                        <a className="btn-floating btn-small waves-effect waves-light modal-trigger" href="#modal-create-task">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </a>
                    </div>

                    {preloader && <Preloader active />} 

                    {(foundEl && foundEl.tasks.length === 0) &&
                        <>
                            <p>Не найдено ни одной задачи.</p> 
                            <a className="waves-effect waves-light btn modal-trigger" href="#modal-create-task">Создать</a>
                        </>
                    }

                    {(foundEl && foundEl.tasks.length > 0) &&
                        <>
                            <div className="cols-name">
                                <h6>Задача</h6>
                                <h6>Категория</h6>
                                <h6>Дата</h6>
                                <h6>Статус</h6>
                            </div>

                            {foundEl.tasks.map(task => 
                                <div key={task.task_id} className="task">
                                    <div className="task-checkbox">
                                        <label>
                                            <input type="checkbox" />
                                            <span></span>
                                        </label>
                                    </div>
                                    <div className="task-name">{task.name}</div>
                                    <div className="task-category">{task.category ? task.category : '-'}</div>
                                    <div className="task-date">{task.date ? task.date : '-'}</div>
                                    <div className="task-status">{task.status === 0 ? 'Выполнить' : 'Выполнена'}</div>
                                    <div className="control-buttons">
                                        <a className="control-button" href="#">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </a>
                                        <a className="control-button" href="#">
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </a> 
                                    </div>
                                </div> 
                            )}
                        </>
                    }
                </div>
            </div>

            <CreateTask />
        </React.Fragment>
    );

};

export default connect(state => state)(List);