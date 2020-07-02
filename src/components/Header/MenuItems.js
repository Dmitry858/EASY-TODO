import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import deleteCookie from '../../utils/deleteCookie';

const MenuItems = (props) => {
    let {type, tasks} = props;

    function signOut(event) {
        event.preventDefault();

        deleteCookie('token');
        deleteCookie('userId');

        props.dispatch({
            type: 'HAS_TOKEN',
            payload: false
        });
        props.dispatch({
            type: 'ADD_LISTS',
            payload: null
        });

        props.history.push('/');
    }

    if (type === 'outer') {
        return (
            <React.Fragment>
                <li>
                    <NavLink exact to={'/about'} className="sidenav-close">
                        О сервисе
                    </NavLink>
                </li>
                <li>
                    <a className="modal-trigger sidenav-close" href="#modal-signup">
                        Регистрация
                    </a>
                </li>
                <li>
                    <a className="modal-trigger sidenav-close" href="#modal-signin">
                        Вход
                    </a>
                </li>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <li className={(tasks.lists && tasks.lists.length > 0) ? 'has-submenu' : ''}>
                <NavLink exact to={'/'} className="sidenav-close">
                    <i className="fa fa-list-alt" aria-hidden="true"></i>Списки задач
                </NavLink>
                {(tasks.lists && tasks.lists.length > 0) &&
                    <ul className="submenu">
                        {tasks.lists.map((item, i) =>
                            <li key={i} className="submenu-item">
                                <NavLink exact to={`/list/${item.list_id}`} className="sidenav-close">{item.name}</NavLink>
                            </li>
                        )}
                    </ul>
                }
            </li>
            <li>
                <NavLink exact to={'/archive'} className="sidenav-close">
                    <i className="fa fa-inbox" aria-hidden="true"></i>Архив
                </NavLink>
            </li>
            <li>
                <NavLink exact to={'/analytics'} className="sidenav-close">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>Аналитика
                </NavLink>
            </li>
            <li>
                <NavLink exact to={'/settings'} className="sidenav-close">
                    <i className="fa fa-sliders" aria-hidden="true"></i>Настройки
                </NavLink>
            </li>
            <li>
                <NavLink exact to={'/help'} className="sidenav-close">
                    <i className="fa fa-question-circle" aria-hidden="true"></i>Помощь
                </NavLink>
            </li>
            <li>
                <NavLink exact to={'/about'} className="sidenav-close">
                    <i className="fa fa-info" aria-hidden="true"></i>О сервисе
                </NavLink>
            </li>
            <li>
                <a href="#" className="sidenav-close" onClick={signOut}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>Выход
                </a>
            </li>
        </React.Fragment>
    );
};

export default connect(state => state)(MenuItems);