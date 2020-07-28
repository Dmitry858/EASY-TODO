import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Select } from 'react-materialize';
import config from '../config';
import getCookie from '../utils/getCookie';

const Action = (props) => {
    let { listId, selectedTasksId, filteredTasks, selectAllTasks, archived, changeOffset } = props;

    let [ action, setAction ] = useState('');

    function applyAction() {
        if(action === 'delete' && selectedTasksId.length > 0) {
            selectedTasksId.forEach((id, i) => {
                fetch(config.baseURL + `/web/tasks/${id}`, {
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
                                    payload: id
                                });
                                if(changeOffset && i === selectedTasksId.length - 1) {
                                    changeOffset(config.offsetFactor - selectedTasksId.length);
                                }
                            } else {
                                props.dispatch({
                                    type: 'DELETE_ITEM',
                                    payload: {
                                        list_id: listId,
                                        task_id: id
                                    }
                                });
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });                
            });
        }
    }

    return (
        <div className="input-field action col s10 m8 xl4">
            <div className="action-checkbox">
                <label>
                    <input 
                        type="checkbox" 
                        checked={filteredTasks.length > 0 ? filteredTasks.every(task => selectedTasksId.includes(task.task_id)) : false} 
                        onChange={event => event.target.checked ? selectAllTasks(true) : selectAllTasks(false)} 
                    />
                    <span></span>
                </label>
            </div>

            <Select
                id="select-action"
                multiple={false}
                value={action}
                onChange={event => setAction(event.target.value)}
            >
                <option value="" disabled>Действие</option>
                <option value="delete">Удалить</option>
            </Select>

            <div className="action-btn-wrap">
                <button className="waves-effect waves-light btn-small blue darken-2" onClick={applyAction}>
                    Применить
                </button>
            </div>
        </div>      
    );
};

export default connect(state => state)(Action);