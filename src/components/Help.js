import React from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';

const Help = (props) => {

    return (
        <React.Fragment>
            <Topbar history={props.history} />

            <div className="content content-inner">
                <div className="container">
                    <div className="title-wrap">
                        <h1>Помощь</h1>
                    </div>

                    <p>Если у вас возникли какие-либо сложности или вопросы в процессе работы с приложением, напишите нам на <a href="mailto:support@easy-todo.ru">support@easy-todo.ru</a>.</p> 
                </div>
            </div>
        </React.Fragment>
    );

};

export default connect(state => state)(Help);