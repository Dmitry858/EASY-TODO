import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox, Preloader } from 'react-materialize';
import config from '../../config';
import setCookie from '../../utils/setCookie';
import regExp from '../../utils/regExp';

const SignUp = (props) => {

    let [login, setLogin]               = useState(''),
        [password, setPassword]         = useState(''),
        [agreement, setAgreement]       = useState(true),
        [preloader, setPreloader]       = useState(false),
        [error, setError]               = useState(''),
        [submit, setSubmit]             = useState(false),
        [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!submit) return;
        let cleanupFunction = false,
            now = new Date();

        fetch(config.baseURL + '/web/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': login,
                'password': password,
                'timezone': -now.getTimezoneOffset()/60
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
                    props.dispatch({
                        type: 'IS_USER_NEW',
                        payload: true
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
                if(!cleanupFunction) setPreloader(false);
                if(!cleanupFunction) setSubmit(false);
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

        if (password.length < 6) {
            setError('Слишком короткий пароль');
            return;
        }

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
                    Уже зарегистрированы? <a className="modal-trigger" href="#modal-signin">Войти в систему</a>
                </div>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Регистрация"
            id="modal-signup"
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
                <form action="" method="" onSubmit={submitData}>
                    <div className="input-field">
                        <input 
                            id="login-signup" 
                            type="text" 
                            name="login" 
                            className="validate" 
                            value={login} 
                            onChange={event => setLogin(event.target.value.replace(regExp.login, ''))}
                            required
                        />
                        <label htmlFor="login-signup">Логин</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="password-signup" 
                            type={showPassword ? "text" : "password"}
                            name="password" 
                            className="validate"
                            autoComplete="off"
                            value={password} 
                            onChange={event => setPassword(event.target.value.replace(regExp.password, ''))}
                            required
                        />
                        <label htmlFor="password-signup">Пароль</label>
                        <span className="helper-text">не менее 6 символов</span>
                        <i className={showPassword ? "fa fa-eye see-password" : "fa fa-eye-slash see-password"} aria-hidden="true" onClick={showPasswordHandler}></i>
                    </div>
                    <div className="checkbox-wrap">
                        <Checkbox
                            checked={agreement}
                            id="agree"
                            label="Согласен с Политикой конфиденциальности"
                            value="agree"
                            onChange={event => setAgreement(event.target.checked)}
                            required
                        />
                    </div>
                    <div className="submit-wrap">
                        <button className="waves-effect btn">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(SignUp);