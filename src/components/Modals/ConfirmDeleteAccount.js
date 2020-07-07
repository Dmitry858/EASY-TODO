import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';
import config from '../../config';
import getCookie from '../../utils/getCookie';
import signOut from '../../utils/signOut';

const ConfirmDeleteAccount = (props) => {

    let [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (!confirm) return;

        fetch(config.baseURL + `/web/users/${getCookie('userId')}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`
            }
        })
            .then((response) => {
                if(response.status === 204) {
                    props.dispatch(signOut(null, props.history));
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, [confirm]);

    function deleteAccount(event) {
        event.preventDefault();
        setConfirm(true);
    }

    return (
        <Modal
            actions={[]}
            bottomSheet={false}
            fixedFooter={false}
            header="Внимание!"
            id="modal-delete-account"
            className="modal"
            open={false}
            options={{
                dismissible: true,
                endingTop: '10%',
                preventScrolling: false,
                startingTop: '4%',
            }}
        >
            <div className="modal-content">
                <p className="center-align">Удаление аккаунта приведёт к удалению всех данных, связанных с ним, без возможности их восстановления.</p>
                <div className="buttons-group">
                    <button className="waves-effect btn" onClick={deleteAccount}>Удалить</button>
                    <button className="waves-effect btn grey modal-close">Отмена</button>
                </div>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(ConfirmDeleteAccount);