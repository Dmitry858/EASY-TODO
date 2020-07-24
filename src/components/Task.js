import React from 'react';
import { connect } from 'react-redux';
import EditTask from './Modals/EditTask';
import config from '../config';
import getCookie from '../utils/getCookie';
import dateFormatting from '../utils/dateFormatting';

const Task = (props) => {

    const { task, taskSelectionHandler, selectedTasksId, listName } = props;

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
                            list_id: parseInt(task.list_id, 10),
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
        <div className="task">
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

            <div className="task-name">{task.name}</div>

            <div className="task-category">
                {(task.category && task.category !== 'без категории') ? task.category[0].toUpperCase() + task.category.slice(1) : '-'}
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
    );

};

export default connect(state => state)(Task);