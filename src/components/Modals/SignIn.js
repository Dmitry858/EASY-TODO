import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox, Preloader } from 'react-materialize';
import config from '../../config';
import setCookie from '../../utils/setCookie';

const SignIn = (props) => {

    let [login, setLogin]               = useState(''),
        [password, setPassword]         = useState(''),
        [remember, setRemember]         = useState(true),
        [preloader, setPreloader]       = useState(false),
        [error, setError]               = useState(''),
        [submit, setSubmit]             = useState(false),
        [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!submit) return;
        let cleanupFunction = false;

        fetch(config.baseURL + '/web/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': login,
                'password': password
            })
        })
            .then( response => response.json() )
            .then( (data) => {
                setSubmit(false);

                if (data.access_token) {
                    let options = {
                        path: '/', 
                        // secure: true
                    };
                    if (remember) {
                        options['max-age'] = config.cookieMaxAge;
                    }
                    setCookie('token', data.access_token, options);
                    setCookie('userId', data.user_id, options);
                    setCookie('login', data.login, options);
                    localStorage.setItem('categories', data.categories);

                    props.history.push('/');

                    props.dispatch({
                        type: 'HAS_TOKEN',
                        payload: true
                    });
                    props.dispatch({
                        type: 'UPDATE_CATEGORIES',
                        payload: JSON.parse(data.categories)
                    });
                    if(!cleanupFunction) setPreloader(false); 
                }

                if (data.error) {
                    setError(data.error);
                    setPreloader(false);
                }
            })
            .catch( (err) => {
                console.log(err);
                setPreloader(false);
                setSubmit(false);
            });

        return () => cleanupFunction = true;
    }, [submit]);

    function resetForm() {
        setLogin('');
        setPassword('');
        setError('');
        setShowPassword(false);
    }

    function submitData(event) {
        event.preventDefault();
        setError('');
        setPreloader(true);
        setSubmit(true);
    }

    function showPasswordHandler() {
        showPassword ? setShowPassword(false) : setShowPassword(true);
    }

    return (
        <Modal
            actions={[
                <div className="modal-close">
                    <Preloader active={preloader} />
                    <div className="modal-error">{error}</div>
                    Ещё нет аккаунта? <a className="modal-trigger" href="#modal-signup">Зарегистрироваться</a>
                </div>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Вход"
            id="modal-signin"
            className="modal"
            open={false}
            options={{
                dismissible: true,
                endingTop: '10%',
                preventScrolling: false,
                startingTop: '4%',
                onCloseStart: resetForm,
            }}
        >
            <div className="modal-content">
                <form action="" method=""  onSubmit={submitData}>
                    <div className="input-field">
                        <input 
                            id="login" 
                            type="text" 
                            name="login" 
                            className="validate" 
                            value={login} 
                            onChange={event => setLogin(event.target.value)}
                        />
                        <label htmlFor="login">Логин</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="password" 
                            type={showPassword ? "text" : "password"}
                            name="password" 
                            className="validate" 
                            autoComplete="off"
                            value={password} 
                            onChange={event => setPassword(event.target.value)}
                        />
                        <label htmlFor="password">Пароль</label>
                        <i className={showPassword ? "fa fa-eye see-password" : "fa fa-eye-slash see-password"} aria-hidden="true" onClick={showPasswordHandler}></i>
                    </div>
                    <div className="checkbox-wrap">
                        <Checkbox
                            checked={remember}
                            id="remember"
                            name="remember"
                            label="Запомнить"
                            value="remember"
                            onChange={event => setRemember(event.target.checked)}
                        />
                    </div>
                    <div className="submit-wrap">
                        <button className="waves-effect btn">Войти</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(SignIn);