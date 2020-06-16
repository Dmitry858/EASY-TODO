import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox } from 'react-materialize';
import config from '../../config';
import setCookie from '../../utils/setCookie';

const SignIn = (props) => {

    let [login, setLogin] = useState('');
    let [password, setPassword] = useState('');
    let [remember, setRemember] = useState(true);
    let [error, setError] = useState('');

    function submitData(event) {
        event.preventDefault();
        setError('');

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
                if (data.access_token) {
                    let options = {
                        path: '/', 
                        secure: true
                    };
                    if (remember) {
                        options['max-age'] = config.cookieMaxAge;
                    }
                    setCookie('token', data.access_token, options);
                    setCookie('userId', data.user_id, options);

                    props.dispatch({
                        type: 'HAS_TOKEN',
                        payload: true
                    });
                }

                if (data.error) {
                    setError(data.error);
                }
            })
            .catch( (err) => {
                console.log(err);
            });
    }

    return (
        <Modal
            actions={[
                <div className="modal-close">
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
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: false,
                startingTop: '4%'
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
                            type="password" 
                            name="password" 
                            className="validate" 
                            value={password} 
                            onChange={event => setPassword(event.target.value)}
                        />
                        <label htmlFor="password">Пароль</label>
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
                        <button className="waves-effect waves-green btn">Войти</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(SignIn);