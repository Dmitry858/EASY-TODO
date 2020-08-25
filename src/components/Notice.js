import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-materialize';

const Notice = (props) => {

    let [notify, setNotify] = useState(false),
        [email, setEmail]   = useState('');

    function submitData(event) {
        event.preventDefault();
    }

    return (
        <>
            <h6 className="settings-subtitle">Уведомления</h6>
            <div className="settings-row">
                <div className="switch switch-notice">
                    <label>
                        Выкл
                        <input 
                            type="checkbox" 
                            checked={notify}
                            onChange={event => setNotify(event.target.checked)}
                        />
                        <span className="lever"></span>
                        Вкл
                    </label>
                </div>

                {notify &&
                    <form className="change-email-form" action="" method="" onSubmit={submitData}>
                        <input 
                            type="text" 
                            value={email} 
                            placeholder="Введите email"
                            onChange={event => setEmail(event.target.value.replace(/\s/g, ''))}
                        />
                        <input className="waves-effect waves-light btn-small" type="submit" value="Сохранить" />
                    </form>
                }
            </div>            
        </>
    );
    
};

export default connect(state => state)(Notice);