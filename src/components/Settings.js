import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Chip, Toast } from 'react-materialize';
import Topbar from './Topbar';
import getCookie from '../utils/getCookie';
import regExp from '../utils/regExp';
import config from '../config';

const Settings = (props) => {

    let [newPassword, setNewPassword]     = useState(''),
        [showPassInput, setShowPassInput] = useState(false),
        [showPassword, setShowPassword]   = useState(false),
        [error, setError]                 = useState(''),
        [success, setSuccess]             = useState(''),
        [submit, setSubmit]               = useState(false);

    useEffect(() => {
        if(!submit) return;

        fetch(config.baseURL + `/web/users/${getCookie('userId')}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({
                'password': newPassword
            })
        })
            .then( response => response.json() )
            .then( (data) => {
                setSubmit(false);
                if(data.error) setError(data.error);
                if(data.success) setSuccess(data.success);
            })
            .catch( (err) => {
                console.log(err);
                setSubmit(false);
            });

    }, [submit]);

    function showPasswordHandler() {
        showPassword ? setShowPassword(false) : setShowPassword(true);
    }

    function showPassInputHandler(event) {
        event.preventDefault();
        setShowPassInput(true);
        setSuccess('');
    }

    function cancelChangePassword(event) {
        event.preventDefault();
        setShowPassInput(false);
        setError('');
        setNewPassword('');
    }

    function changePassword(event) {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword.length < 6) {
            setError('Слишком короткий пароль');
            return;
        }
        setSubmit(true);
    }

    return (
        <React.Fragment>
            <Topbar history={props.history} />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>Настройки</h1>
                    </div>

                    <h6 className="settings-subtitle">Регистрационные данные</h6>

                    <div className="settings-row">
                        <p className="setting-label">Логин</p>
                        <p>{getCookie('login')}</p> 
                    </div>
                    <div className="settings-row">
                        <p className="setting-label">Пароль</p>
                        {showPassInput &&
                            <>
                                <div className="input-field new-password-wrap">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        className="validate"
                                        placeholder="Новый пароль"
                                        value={newPassword} 
                                        onChange={event => setNewPassword(event.target.value.replace(regExp.password, ''))}
                                    />
                                    <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true" onClick={showPasswordHandler}></i>
                                </div>
                                <a className="waves-effect waves-light btn-small" href="#" onClick={changePassword}>Сохранить</a>
                                <a className="waves-effect waves-light btn-small grey btn-cancel" href="#" onClick={cancelChangePassword}>Отмена</a>
                                <div className="error">{error}</div>
                                <div className="success">{success}</div>
                            </>
                        }

                        {!showPassInput && 
                            <a className="waves-effect waves-light btn-small" href="#" onClick={showPassInputHandler}>Изменить</a> 
                        }
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
                        <Toast
                            options={{
                                html: 'Данная функция в разработке'
                            }}
                        >
                            <div className="switch">
                                <label>
                                    Выкл
                                    <input type="checkbox" disabled />
                                    <span className="lever"></span>
                                    Вкл
                                </label>
                            </div>
                        </Toast> 
                    </div>

                    <a className="waves-effect waves-light btn-small grey modal-trigger" href="#">Удалить аккаунт</a>
                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(Settings);