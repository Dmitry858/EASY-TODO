import React from 'react';
import { connect } from 'react-redux';
import { Modal, Checkbox } from 'react-materialize';

const SignUp = (props) => {

    return (
        <Modal
            actions={[
                <div className="modal-close">
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
                        <input id="login-signup" type="text" name="login" className="validate" />
                        <label htmlFor="login-signup">Логин</label>
                    </div>
                    <div className="input-field">
                        <input id="password-signup" type="password" name="password" className="validate" />
                        <label htmlFor="password-signup">Пароль</label>
                    </div>
                    <div className="checkbox-wrap">
                        <Checkbox
                            checked
                            id="agree"
                            label="Согласен с Политикой конфиденциальности"
                            value="agree"
                        />
                    </div>
                    <div className="submit-wrap">
                        <button className="modal-close waves-effect waves-green btn">Зарегистрироваться</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(SignUp);