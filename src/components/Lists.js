import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Topbar from './Topbar';
import CreateList from './Modals/CreateList';
import EditList from './Modals/EditList';
import { Preloader } from 'react-materialize';
import ReactTooltip from 'react-tooltip';
import config from '../config';
import getCookie from '../utils/getCookie';

const Lists = (props) => {

    let {lists} = props.tasks;

    let [preloader, setPreloader] = useState(lists ? false : true);

    useEffect(() => {
        if(!lists) {
            fetch(config.baseURL + '/web/lists/search?lists=all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getCookie('token')}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    sessionStorage.setItem('lists', JSON.stringify(data));

                    props.dispatch({
                        type: 'ADD_LISTS',
                        payload: data
                    });
    
                    setPreloader(false);
                })
                .catch((err) => {
                    console.log(err);
                });   
        }     
    }, []);

    function deleteList(isOwner, listId, event) {
        event.preventDefault();
        if(!isOwner) return;
        
        fetch(config.baseURL + `/web/lists/${listId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        })
            .then((response) => {
                if(response.status === 204) {
                    let i = lists.findIndex(item => item.list_id == listId);

                    if(i === -1) return;

                    lists.splice(i, 1);

                    sessionStorage.setItem('lists', JSON.stringify(lists));

                    props.dispatch({
                        type: 'ADD_LISTS',
                        payload: lists
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
                        <h1>Списки задач</h1>
                        <a className="btn-floating btn-small waves-effect waves-light modal-trigger" href="#modal-create-list">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </a>
                    </div>

                    {preloader && <Preloader active />} 

                    {(lists && lists.length === 0) &&
                        <>
                            <p>Не найдено ни одного списка задач.</p> 
                            <a className="waves-effect waves-light btn modal-trigger" href="#modal-create-list">Создать</a>
                        </>
                    }

                    {(lists && lists.length > 0) && 
                        lists.map((list, i) => {
                            let isOwner = list.user_id == getCookie('userId');

                            return (
                                <div key={i} className="tasks-list">
                                    <div className="list-name">{list.name}</div>
                                    <div className="list-desс">{list.description}</div>
                                    <div className="control-buttons">
                                        <a 
                                            className="control-button" 
                                            href="#" 
                                            data-tip={list.is_private == 1 ? 'Личный список' : 'Групповой список'}
                                            onClick={(event) => {event.preventDefault()}}
                                        >
                                            <i className={list.is_private == 1 ? 'fa fa-lock' : 'fa fa-unlock'} aria-hidden="true"></i>
                                        </a>

                                        <a 
                                            className={isOwner ? 'control-button modal-trigger' : 'control-button not-allowed'} 
                                            href={isOwner ? `#modal-edit-list${list.list_id}` : '#'}
                                            data-tip={isOwner ? '' : 'Изменение настроек доступно только создателю списка'}
                                            onClick={(event) => {event.preventDefault()}}
                                        >
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </a>

                                        <a 
                                            className={isOwner ? 'control-button' : 'control-button not-allowed'} 
                                            href="#"
                                            data-tip={isOwner ? '' : 'Удаление доступно только создателю списка'}
                                            onClick={deleteList.bind(this, isOwner, list.list_id)}
                                        >
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                        </a> 

                                        <ReactTooltip effect="solid" />
                                    </div>
                                    <NavLink exact to={`/list/${list.list_id}`} className="list-link"></NavLink>
                                    
                                    {isOwner && 
                                        <EditList 
                                            id={list.list_id}
                                            name={list.name} 
                                            description={list.description} 
                                            is_private={list.is_private}
                                            guests={list.guests}
                                        />
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <CreateList />
        </React.Fragment>
    );

};

export default connect(state => state)(Lists);