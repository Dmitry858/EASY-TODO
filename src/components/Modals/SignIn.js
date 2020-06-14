import React from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox } from 'react-materialize';

const SignIn = (props) => {
    
    return (
        <Modal
            actions={[
                <div className="modal-close">
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
                <form action="" method="">
                    <div className="input-field">
                        <input id="login" type="text" name="login" className="validate" />
                        <label htmlFor="login">Логин</label>
                    </div>
                    <div className="input-field">
                        <input id="password" type="password" name="password" className="validate" />
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <div className="checkbox-wrap">
                        <Checkbox
                            checked
                            id="remember"
                            label="Запомнить"
                            value="remember"
                        />
                    </div>
                    <div className="submit-wrap">
                        <button className="modal-close waves-effect waves-green btn">Войти</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(SignIn);