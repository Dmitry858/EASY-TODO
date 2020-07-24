import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';
import Filter from './Filter';
import Action from './Action';
import Task from './Task';
import CreateTask from './Modals/CreateTask';
import NotFound from './NotFound';
import { Preloader } from 'react-materialize';
import config from '../config';
import getCookie from '../utils/getCookie';
import isIncludedInTimePeriod from '../utils/isIncludedInTimePeriod';

const List = (props) => {

    let listName = '',
        filteredTasks = [],
        { lists, items, filter } = props.tasks,
        foundEl = items.find(item => item.list_id === parseInt(props.match.params.id, 10)),
        currentList = lists.find(list => list.list_id === parseInt(props.match.params.id, 10));

    let [ preloader, setPreloader ] = useState(foundEl ? false : true),
        [ isExpired, setIsExpired ] = useState(false),
        [ selectedTasksId, setSelectedTasksId ] = useState([]);

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

    if(foundEl && foundEl.tasks.length > 0) {
        filteredTasks = foundEl.tasks.filter(task => {
            if(filter.category && task.category === null) return false;
            if(filter.category && task.category && filter.category !== task.category.toLowerCase()) return false;
            if(filter.date && !isIncludedInTimePeriod(filter.date, task.date)) return false;
            if(filter.status !== null && filter.status !== task.status) return false;
            return true;
        });
    }

    function taskSelectionHandler(taskId, event) {
        let foundId = selectedTasksId.find(id => id === taskId);
        if(event.target.checked) {
            if(foundId) return;
            setSelectedTasksId([...selectedTasksId, taskId]);
        } else {
            if(!foundId) return;
            setSelectedTasksId(selectedTasksId.filter(id => id !== taskId));
        }
    }

    function selectAllTasks(value) {
        if(!value) setSelectedTasksId([]);

        if(value) {
            const newIdsArr = [];
            filteredTasks.forEach(task => {
                if(task) newIdsArr.push(task.task_id);
            });
            setSelectedTasksId(newIdsArr);
        }
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
                            <Action 
                                listId={parseInt(props.match.params.id, 10)}
                                selectedTasksId={selectedTasksId} 
                                filteredTasks={filteredTasks}
                                selectAllTasks={selectAllTasks} 
                            />
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
                            {filteredTasks.length > 0 && 
                                <div className="cols-name">
                                    <h6>Задача</h6>
                                    <h6>Категория</h6>
                                    <h6>Дата</h6>
                                    <h6>Статус</h6>
                                </div>
                            }

                            {filteredTasks.map(task => {
                                return (
                                    <Task
                                        key={task.task_id}
                                        task={task}
                                        taskSelectionHandler={taskSelectionHandler}
                                        selectedTasksId={selectedTasksId}
                                        listName={listName}
                                    />
                                )}
                            )}
                            {filteredTasks.length === 0 && <p>Задач не найдено. Попробуйте изменить параметры фильтра.</p>}
                        </>
                    }
                </div>
            </div>

            <CreateTask listId={props.match.params.id} listName={listName} />
        </React.Fragment>
    );

};

export default connect(state => state)(List);