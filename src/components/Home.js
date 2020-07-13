import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import screen from '../img/screen.jpg';

const Home = (props) => {

    return (
        <div className="content">
            <div className="container">
                <div className="get-started row valign-wrapper">
                    <div className="col m6 center-align">
                        <h1 className="center-align">Приведите дела <br/>в порядок с <br/><span>EASY TODO</span></h1>
                        <a className="btn btn-large modal-trigger waves-effect" href="#modal-signup">Начать</a>
                    </div>
                    <div className="col m6 center-align">
                        <img src={image1} alt="Приведите дела в порядок" />
                    </div>
                </div>

                <div className="screenshot">
                    <img src={screen} alt="Приложение EASY TODO" />
                </div>
            </div>

            <div className="read-more">
                <div className="container center-align">
                    <p>Позвольте себе не думать постоянно о ежедневных заботах, переместите свои дела из головы в планировщик задач и обретите спокойствие.</p>
                    <NavLink exact to={'/about'}>
                        <i className="fa fa-arrow-right" aria-hidden="true"></i> 
                        Узнать подробнее о приложении
                    </NavLink>
                </div>
            </div>

            <div className="container">
                <div className="relax row valign-wrapper">
                    <div className="col m6 center-align">
                        <img src={image2} alt="Приведите дела в порядок" />
                    </div>
                    <div className="col m6 center-align">
                        <h3 className="center-align">EASY TODO поможет организовать задачи наилучшим образом, чтобы у вас освободилось больше времени для отдыха</h3>
                        <a className="btn btn-large modal-trigger waves-effect" href="#modal-signup">Начать</a>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default connect(state => state)(Home);