import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Topbar from './Topbar';
import Filter from './Filter';
import Action from './Action';
import Task from './Task';
import config from '../config';
import getCookie from '../utils/getCookie';

const Archive = (props) => {

    let { items, filter } = props.archive,
        filteredTasks            = [];

    let [ preloader, setPreloader ]             = useState(items && items.length > 0 ? false : true),
        [ selectedTasksId, setSelectedTasksId ] = useState([]);

    useEffect(() => {
        fetch(config.baseURL + '/web/tasks/search?in_archive=1', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                preloader && setPreloader(false);
                
                props.dispatch({
                    type: 'UPDATE_ARCHIVE_ITEMS',
                    payload: data
                });
            })
            .catch((err) => {
                console.log(err);
            });   
    }, []);

    if(items && items.length > 0) {
        filteredTasks = items.filter(task => {
            if(filter.listId !== null && filter.listId !== task.list_id) return false;
            if(filter.category && filter.category === null) return false;
            if(filter.category && task.category && filter.category !== task.category.toLowerCase()) return false;
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
                        <h1>Архив</h1>
                    </div>

                    { (items && items.length === 0) && <p>В архиве не найдено ни одной задачи.</p> }

                    { (items && items.length > 0) &&
                        <>
                            <div className="row filter-row">
                                <Action
                                    selectedTasksId={selectedTasksId} 
                                    filteredTasks={filteredTasks}
                                    selectAllTasks={selectAllTasks} 
                                    archived={true}
                                />
                                <Filter archived={true} />
                            </div>

                            { filteredTasks.length > 0 && 
                                <div className="cols-name">
                                    <h6>Задача</h6>
                                    <h6>Категория</h6>
                                    <h6>Дата</h6>
                                    <h6>Статус</h6>
                                </div>
                            }

                            { filteredTasks.map(task => {
                                let listName = '';
                                if(props.tasks.lists) {
                                    let foundList = props.tasks.lists.find(list => list.list_id === task.list_id);
                                    if(foundList) listName = foundList.name;
                                }

                                return (
                                    <Task
                                        key={task.task_id}
                                        task={task}
                                        taskSelectionHandler={taskSelectionHandler}
                                        selectedTasksId={selectedTasksId}
                                        listName={listName}
                                        archived={true}
                                    />
                                )}
                            ) }

                            { filteredTasks.length === 0 && <p>Задач не найдено. Попробуйте изменить параметры фильтра.</p> }
                        </>
                    }

                    { preloader && <Preloader active /> } 

                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(Archive);