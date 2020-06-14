import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';

const CreateList = (props) => {

    return (
        <Modal
            actions={[]}
            bottomSheet={false}
            fixedFooter={false}
            header="Новый список задач"
            id="modal-create-list"
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
                        <input id="list-name" type="text" name="name" className="validate" />
                        <label htmlFor="list-name">Название</label>
                        <span className="helper-text">не более 15 символов</span>
                    </div>
                    <div className="input-field">
                        <input id="list-desc" type="text" name="description" className="validate" />
                        <label htmlFor="list-desc">Описание</label>
                    </div>
                    <p>Открыть доступ для других пользователей</p>
                    <div className="switch">
                        <label>
                            Off
                            <input type="checkbox" />
                            <span className="lever"></span>
                            On
                        </label>
                    </div>
                    <div className="submit-wrap">
                        <button className="modal-close waves-effect waves-green btn">Создать</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(CreateList);