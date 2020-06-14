import React from 'react';
import { connect } from 'react-redux';
import { Chip } from 'react-materialize';
import Topbar from './Topbar';

const Settings = (props) => {

    return (
        <React.Fragment>
            <Topbar />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>Настройки</h1>
                    </div>

                    <h6 className="settings-subtitle">Регистрационные данные</h6>

                    <div className="settings-row">
                        <p className="setting-label">Логин</p>
                        <p>admin</p> 
                    </div>
                    <div className="settings-row">
                        <p className="setting-label">Пароль</p>
                        <a className="waves-effect waves-light btn-small modal-trigger" href="#">Изменить</a> 
                    </div>

                    <h6 className="settings-subtitle">Категории задач</h6>
                    <Chip
                        close={true} 
                        closeIcon={<i class="fa fa-times" aria-hidden="true"></i>}
                        options={{
                            placeholder: 'Добавьте новую категорию',
                            secondaryPlaceholder: '+ новая категория'
                        }}
                        className="chips-categories"
                    />

                    <h6 className="settings-subtitle">Уведомления</h6>
                    <div className="settings-row">
                        <div className="switch">
                            <label>
                                Выкл
                                <input type="checkbox" />
                                <span className="lever"></span>
                                Вкл
                            </label>
                        </div>
                    </div>

                    <a className="waves-effect waves-light btn-small grey modal-trigger" href="#">Удалить аккаунт</a>
                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(Settings);