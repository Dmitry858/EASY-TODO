import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-materialize';
import Topbar from './Topbar';
import Notice from './Notice';
import ConfirmDeleteAccount from './Modals/ConfirmDeleteAccount';
import getCookie from '../utils/getCookie';
import regExp from '../utils/regExp';
import config from '../config';

const Settings = (props) => {

    let [newPassword, setNewPassword]       = useState(''),
        [showPassInput, setShowPassInput]   = useState(false),
        [showPassword, setShowPassword]     = useState(false),
        [newCategory, setNewCategory]       = useState(''),
        [categoriesList, setCategoriesList] = useState(props.user.categories),
        [error, setError]                   = useState(''),
        [success, setSuccess]               = useState(''),
        [submit, setSubmit]                 = useState(false);

    useEffect(() => {
        if(!submit) return;

        const changes = {};

        if(newPassword.length >= 6) changes.password = newPassword;
        if(JSON.stringify(categoriesList) !== JSON.stringify(props.user.categories)) changes.categories = JSON.stringify(categoriesList).toLowerCase();

        fetch(config.baseURL + `/web/users/${getCookie('userId')}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(changes)
        })
            .then( response => response.json() )
            .then( (data) => {
                setSubmit(false);
                if(data.error) setError(data.error);
                if(data.success) setSuccess(data.success);
                if(data.categories) {
                    localStorage.setItem('categories', data.categories);
                    props.dispatch({
                        type: 'UPDATE_CATEGORIES',
                        payload: JSON.parse(data.categories)
                    });
                }
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

    function addNewCategory(event) {
        event.preventDefault();
        setNewCategory('');
        if(newCategory.length === 0 || categoriesList.includes(newCategory)) return;
        if(newPassword !== '') {
            setNewPassword('');
            setShowPassInput(false);
        }
        setCategoriesList([...categoriesList, newCategory]);
    }

    function deleteCategory(item) {
        if(newPassword !== '') {
            setNewPassword('');
            setShowPassInput(false);
        }
        let filteredList = categoriesList.filter(cat => cat !== item);
        setCategoriesList(filteredList);
    }

    function submitData(event) {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (event.currentTarget.classList.contains('new-password-form') && newPassword.length < 6) {
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
                            <form className="new-password-form" action="" method="" onSubmit={submitData}>
                                <div className="input-field new-password-wrap">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        className="validate"
                                        placeholder="Новый пароль"
                                        autoComplete="off"
                                        value={newPassword} 
                                        onChange={event => setNewPassword(event.target.value.replace(regExp.password, ''))}
                                    />
                                    <i className={showPassword ? "fa fa-eye see-password" : "fa fa-eye-slash see-password"} aria-hidden="true" onClick={showPasswordHandler}></i>
                                </div>
                                <input className="waves-effect waves-light btn-small" type="submit" value="Сохранить" />
                                <a className="waves-effect waves-light btn-small grey btn-cancel" href="#" onClick={cancelChangePassword}>Отмена</a>
                                <div className="error">{error}</div>
                                <div className="success">{success}</div>
                            </form>
                        }

                        {!showPassInput && 
                            <a className="waves-effect waves-light btn-small blue darken-2" href="#" onClick={showPassInputHandler}>Изменить</a> 
                        }
                    </div>

                    <h6 className="settings-subtitle">Категории задач</h6>
                    <div className="settings-row mb0">
                        {categoriesList &&
                            categoriesList.map(item => 
                                <span key={item} className="category-item">
                                    {item[0].toUpperCase() + item.slice(1)}
                                    <i className="fa fa-times" aria-hidden="true" onClick={deleteCategory.bind(this, item)}></i>
                                </span>
                            )
                        }
                    </div>
                    <form className="add-category-form" action="" method="" onSubmit={submitData}>
                        <div className="settings-row">
                            <div className="input-field">
                                <input 
                                    type="text"
                                    name="category" 
                                    className="validate"
                                    placeholder="Новая категория"
                                    autoComplete="off"
                                    value={newCategory} 
                                    onChange={event => setNewCategory(event.target.value.replace(regExp.name, ''))}
                                />
                            </div>
                            <a className="waves-effect waves-light btn-small blue darken-2" href="#" onClick={addNewCategory}>Добавить</a>
                        </div>

                        {JSON.stringify(categoriesList) !== JSON.stringify(props.user.categories) &&
                            <button className="waves-effect waves-light btn-small save-categories-btn" type="submit">Сохранить изменения</button>
                        }
                    </form>

                    <Notice />

                    <a className="waves-effect waves-light btn-small grey modal-trigger" href="#modal-delete-account">
                        Удалить аккаунт
                    </a>
                    <ConfirmDeleteAccount history={props.history} />
                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(Settings);