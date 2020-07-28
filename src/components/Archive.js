import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import Topbar from './Topbar';
import Filter from './Filter';
import Action from './Action';
import Task from './Task';
import config from '../config';
import getCookie from '../utils/getCookie';
import filterTasks from '../utils/filterTasks';

const Archive = (props) => {

    let { items, filter } = props.archive,
        filteredTasks     = filterTasks(items, filter);

    let [ preloader, setPreloader ]             = useState(items && items.length > 0 ? false : true),
        [ selectedTasksId, setSelectedTasksId ] = useState([]),
        [ offset, setOffset ]                   = useState(null),
        [ isFullArchive, setIsFullArchive ]     = useState(false);

    const contentBlock = useRef(null);

    function throttle(callback, delay) {
        let isWaiting = false;
        return function () {
            if (!isWaiting) {
                callback.apply(this, arguments);
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                }, delay);
            }
        }
    }
    
    const scrollHandler = throttle(() => {
        let coord = contentBlock.current.getBoundingClientRect().bottom;

        if(coord <= document.body.clientHeight - 50) {
            setPreloader(true);
            setOffset(offset === null ? config.offsetFactor : offset + config.offsetFactor);
        }
    }, 50);

    useEffect(() => {
        if(isFullArchive) return;

        window.addEventListener('scroll', scrollHandler);

        fetch(config.baseURL + `/web/tasks/search?in_archive=1&offset=${offset === null ? 0 : offset}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                preloader && setPreloader(false);
                
                if(offset === null || offset === 0) {
                    props.dispatch({
                        type: 'UPDATE_ARCHIVE_ITEMS',
                        payload: data
                    });
                } else {
                    props.dispatch({
                        type: 'ADD_ARCHIVE_ITEMS',
                        payload: data
                    });
                }

                if(data.length === 0 || data.length < config.offsetFactor) {
                    window.removeEventListener('scroll', scrollHandler);
                    setIsFullArchive(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        return function cleanup() {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, [offset]);

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

    function changeOffset(value) {
        setOffset(offset === null ? value : offset + value);
    }

    return (
        <React.Fragment>
            <Topbar history={props.history} />

            <div className="content content-inner" ref={contentBlock}>
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
                                    changeOffset={changeOffset}
                                />
                                <Filter archived={true} changeOffset={changeOffset} />
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
                                        changeOffset={changeOffset}
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