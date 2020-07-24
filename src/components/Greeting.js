import React from 'react';
import { connect } from 'react-redux';

const Greeting = (props) => {

    function changeUserStatus() {
        props.dispatch({
            type: 'IS_USER_NEW',
            payload: false
        });
    }

    return (
        <div className="greeting">
            <div className="greeting-content">
                <h6>Поздравляем с успешной регистрацией!</h6>
                <p>Создайте свой первый список задач и управляйте делами с приложением EASY TODO.</p>
                <button className="waves-effect waves-light btn-small white" onClick={changeUserStatus}>Ок</button>
            </div>
        </div>
    );

};

export default connect(state => state)(Greeting);
