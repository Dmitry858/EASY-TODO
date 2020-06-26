import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Topbar from './Topbar';
import CreateList from './Modals/CreateList';
import { Preloader } from 'react-materialize';
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
                            <a class="waves-effect waves-light btn modal-trigger" href="#modal-create-list">Создать</a>
                        </>
                    }

                    {(lists && lists.length > 0) && 
                        lists.map((list, i) =>
                            <div key={i} className="tasks-list">
                                <div className="list-name">{list.name}</div>
                                <div className="list-desс">{list.description}</div>
                                <div className="control-buttons">
                                    <a className="control-button" href="#">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                    </a>
                                    <a className="control-button" href="#">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </a>
                                    <a className="control-button" href="#">
                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    </a> 
                                </div>
                                <NavLink exact to={`/list/${list.list_id}`} className="list-link"></NavLink>
                            </div>
                        )
                    }

                </div>
            </div>

            <CreateList />
        </React.Fragment>
    );

};

export default connect(state => state)(Lists);