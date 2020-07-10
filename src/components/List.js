import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';
import Filter from './Filter';
import CreateTask from './Modals/CreateTask';
import EditTask from './Modals/EditTask';
import NotFound from './NotFound';
import { Preloader, Select } from 'react-materialize';
import config from '../config';
import getCookie from '../utils/getCookie';
import dateFormatting from '../utils/dateFormatting';
import isIncludedInTimePeriod from '../utils/isIncludedInTimePeriod';

const List = (props) => {

    let listName = '',
        { lists, items, filter } = props.tasks,
        foundEl = items.find(item => item.list_id === parseInt(props.match.params.id, 10)),
        currentList = lists.find(list => list.list_id === parseInt(props.match.params.id, 10));

    let [preloader, setPreloader] = useState(foundEl ? false : true),
        [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        let cleanupFunction = false;

        if(!foundEl || currentList.is_private === 0 || isExpired) {
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
                    setIsExpired(false);

                    setTimeout(function() {
                        if(!cleanupFunction) setIsExpired(true);
                    }, 60000);
                })
                .catch((err) => {
                    console.log(err);
                });   
        }
        
        return () => cleanupFunction = true;
    }, [props.match.params.id, isExpired]);

    if(!lists) return <NotFound type={'inner'} />;

    if(lists) {
        let result = lists.find(function(item) {
            return parseInt(item.list_id, 10) === parseInt(props.match.params.id, 10);
        });

        if(!result) return <NotFound type={'inner'} />;

        listName = result.name;
    }

    function deleteTask(taskId, event) {
        event.preventDefault();
        
        fetch(config.baseURL + `/web/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        })
            .then((response) => {
                if(response.status === 204 || response.status === 404) {
                    props.dispatch({
                        type: 'DELETE_ITEM',
                        payload: {
                            list_id: parseInt(props.match.params.id, 10),
                            task_id: parseInt(taskId, 10)
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
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

                    {(foundEl && foundEl.tasks.length > 0) && 
                        <div className="row filter-row">
                            <div className="input-field action col s10 m8 xl4">
                                <div className="action-checkbox">
                                    <label>
                                        <input type="checkbox" />
                                        <span></span>
                                    </label>
                                </div>

                                <Select
                                    id="select-action"
                                    multiple={false}
                                    value=""
                                >
                                    <option value="" disabled selected>Действие</option>
                                    <option value="1">Удалить</option>
                                    <option value="2">В архив</option>
                                    <option value="3">Выполнена</option>
                                </Select>

                                <div className="action-btn-wrap">
                                    <button className="waves-effect waves-light btn-small blue darken-2">Применить</button>
                                </div>
                            </div>

                            <Filter />
                        </div>                    
                    }          

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

                            {foundEl.tasks.map(task => {
                                if(filter.category && task.category === null) return null;
                                if(filter.category && task.category && filter.category !== task.category.toLowerCase()) return null;
                                if(filter.date && !isIncludedInTimePeriod(filter.date, task.date)) return null;
                                if(filter.status !== null && filter.status !== task.status) return null;

                                return (
                                    <div key={task.task_id} className="task">
                                        <div className="task-checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                <span></span>
                                            </label>
                                        </div>
    
                                        <div className="task-name">{task.name}</div>
    
                                        <div className="task-category">
                                            {task.category ? task.category[0].toUpperCase() + task.category.slice(1) : '-'}
                                        </div>
    
                                        <div className="task-date">
                                            {dateFormatting(task.date)}
                                        </div>
    
                                        <div className="task-status">{task.status === 1 ? 'Выполнена' : 'Выполнить'}</div>
    
                                        <div className="control-buttons">
                                            <a className="control-button modal-trigger" href={`#modal-edit-task${task.task_id}`}>
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </a>
                                            <a className="control-button" href="#" onClick={deleteTask.bind(this, task.task_id)}>
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </a> 
                                        </div>
    
                                        <EditTask task={task} listName={listName} />
                                    </div> 
                                )}
                            )}
                        </>
                    }
                </div>
            </div>

            <CreateTask listId={props.match.params.id} listName={listName} />
        </React.Fragment>
    );

};

export default connect(state => state)(List);