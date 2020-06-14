import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logo-white.png';
import { SideNav } from 'react-materialize';
import M from 'materialize-css';
import MenuItems from './MenuItems';

const Header = (props) => {

    return (
        <header 
            className={(props.type === 'outer') ? 'header' : 'header header-inner'}
        >
            <nav className="container">
                <div className="nav-wrapper">
                    <div className="logo-wrap">
                        <NavLink exact to={'/'} className="brand-logo">
                            <img src={logo} alt="Logo" />
                        </NavLink>
                    </div>

                    <div className="main-menu-wrap">
                        <ul className="main-menu hide-on-med-and-down">
                            <MenuItems type={props.type} />
                        </ul>
                    </div>

                    <SideNav
                        id="SideNav-10"
                        options={{
                            draggable: true
                        }}
                        trigger={
                            <a href="#" data-target="SideNav-10">
                                <i className="fa fa-bars" aria-hidden="true"></i>
                            </a>
                        }
                    >
                        <MenuItems type={props.type} />
                    </SideNav>

                    {props.type === 'inner' && 
                        <a className="notice-link" href="#" onclick="M.toast({html: 'Данная функция в разработке'})">
                            <i className="fa fa-bell" aria-hidden="true"></i>
                        </a>
                    }
                </div>
            </nav>
        </header>
    );

};

export default connect(state => state)(Header);