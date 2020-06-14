import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItems = (props) => {

    if (props.type === 'outer') {
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
            <li>
                <NavLink exact to={'/'} className="sidenav-close">
                    <i className="fa fa-list-alt" aria-hidden="true"></i>Списки задач
                </NavLink>
                <ul className="submenu">
                    <li className="submenu-item">
                        <NavLink exact to={'/list/1'} className="sidenav-close">Работа</NavLink>
                    </li>
                </ul>
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
                <a href="#" className="sidenav-close">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>Выход
                </a>
            </li>
        </React.Fragment>
    );
};

export default MenuItems;