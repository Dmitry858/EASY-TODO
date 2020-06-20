import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox, Preloader } from 'react-materialize';
import config from '../../config';
import setCookie from '../../utils/setCookie';

const SignUp = (props) => {

    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');
    let [agreement, setAgreement] = useState(true);
    let [preloader, setPreloader] = useState(false);
    let [error, setError] = useState('');

    const loginRegExp = /[\s><\?\.,\'\"`~!@№#$%\^&\*)(\+=/\\|\]\[\{\}:;]/g,
          passwordRegExp = /[\s><.,\'\":;]/g;

    function resetForm() {
        setLogin('');
        setPassword('');
        setError('');
    }

    function submitData(event) {
        event.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Слишком короткий пароль');
            return;
        }

        setPreloader(true);

        fetch(config.baseURL + '/web/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'username': login,
                'password': password
            })
        })
            .then( response => response.json() )
            .then( (data) => {
                if (data.access_token) {
                    let options = {
                        path: '/', 
                        secure: true
                    };
                    setCookie('token', data.access_token, options);
                    setCookie('userId', data.user_id, options);

                    props.dispatch({
                        type: 'HAS_TOKEN',
                        payload: true
                    });
                    setPreloader(false);
                }

                if (data.error) {
                    setError(data.error);
                    setPreloader(false);
                }
            })
            .catch( (err) => {
                console.log(err);
                setPreloader(false);
            });
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
                            onChange={event => setLogin(event.target.value.replace(loginRegExp, ''))}
                            required
                        />
                        <label htmlFor="login-signup">Логин</label>
                    </div>
                    <div className="input-field">
                        <input 
                            id="password-signup" 
                            type="password" 
                            name="password" 
                            className="validate"
                            value={password} 
                            onChange={event => setPassword(event.target.value.replace(passwordRegExp, ''))}
                            required
                        />
                        <label htmlFor="password-signup">Пароль</label>
                        <span className="helper-text">не менее 6 символов</span>
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
                        <button className="waves-effect waves-green btn">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(SignUp);