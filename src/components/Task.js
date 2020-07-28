import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import EditTask from './Modals/EditTask';
import config from '../config';
import getCookie from '../utils/getCookie';
import dateFormatting from '../utils/dateFormatting';

const Task = (props) => {

    const { task, taskSelectionHandler, selectedTasksId, listName, archived, changeOffset } = props;

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
                    if(archived) {
                        props.dispatch({
                            type: 'DELETE_ARCHIVE_ITEM',
                            payload: taskId
                        });
                        if(changeOffset) changeOffset(config.offsetFactor - 1);
                    } else {
                        props.dispatch({
                            type: 'DELETE_ITEM',
                            payload: {
                                list_id: parseInt(task.list_id, 10),
                                task_id: parseInt(taskId, 10)
                            }
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function changeArchiveStatus(taskId, status, event) {
        event.preventDefault();

        fetch(config.baseURL + `/web/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({'in_archive': status})
        })
            .then( response => response.json() )
            .then( (data) => {
                if (data.task_id && status === 1) {
                    props.dispatch({
                        type: 'DELETE_ITEM',
                        payload: {
                            list_id: parseInt(task.list_id, 10),
                            task_id: parseInt(taskId, 10)
                        }
                    });
                }

                if (data.task_id && status === 0) {
                    props.dispatch({
                        type: 'DELETE_ARCHIVE_ITEM',
                        payload: taskId
                    });
                    props.dispatch({
                        type: 'ADD_NEW_ITEM',
                        payload: {
                            list_id: data.list_id,
                            task: data
                        }
                    });
                    if(changeOffset) changeOffset(config.offsetFactor - 1);
                }
            })
            .catch( (err) => {
                console.log(err);
            });
    }

    return (
        <div className={archived ? "task archived" : "task"}>
            <div className="task-checkbox">
                <label>
                    <input 
                        type="checkbox"
                        checked={selectedTasksId.includes(task.task_id)}
                        onChange={taskSelectionHandler.bind(this, task.task_id)} 
                    />
                    <span></span>
                </label>
            </div>

            <div className="task-name">
                {task.name}
                {archived && <span className="list-name-label">{listName}</span>}
            </div>

            <div className="task-category">
                {(task.category && task.category !== 'без категории') ? task.category[0].toUpperCase() + task.category.slice(1) : '-'}
            </div>

            <div className="task-date">
                {dateFormatting(task.date)}
            </div>

            <div className="task-status">{task.status === 1 ? 'Выполнена' : 'Выполнить'}</div>

            <div className="control-buttons">
                {!archived && 
                    <a className="control-button modal-trigger" href={`#modal-edit-task${task.task_id}`} data-tip="Редактировать">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </a>
                }

                <a 
                    className="control-button" 
                    href="#" 
                    data-tip={archived ? "Разархивировать" : "Переместить в архив"} 
                    onClick={changeArchiveStatus.bind(this, task.task_id, archived ? 0 : 1)}
                >
                    <i className={archived ? "fa fa-reply" : "fa fa-inbox"} aria-hidden="true"></i>
                </a>
                <a className="control-button" href="#" data-tip="Удалить" onClick={deleteTask.bind(this, task.task_id)}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </a> 
            </div>

            <ReactTooltip effect="solid" globalEventOff="click" />
            {!archived && <EditTask task={task} listName={listName} />}
        </div>
    );

};

export default connect(state => state)(Task);