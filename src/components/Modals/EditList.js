import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Preloader } from 'react-materialize';
import config from '../../config';
import getCookie from '../../utils/getCookie';
import regExp from '../../utils/regExp';

const EditList = (props) => {

    let guestsLogins = '';

    if(props.guests) {
        guestsLogins = JSON.parse(props.guests);
        guestsLogins = guestsLogins.join();
    }

    let [name, setName] = useState(props.name);
    let [description, setDescription] = useState(props.description);
    let [isPrivate, setIsPrivate] = useState(Boolean(props.is_private));
    let [guests, setGuests] = useState(guestsLogins);
    let [preloader, setPreloader] = useState(false);
    let [error, setError] = useState('');
    let [success, setSuccess] = useState('');
    let [submit, setSubmit] = useState(false);

    useEffect(() => {
        if (!submit) return;

        const changes = {};

        if (name !== props.name) changes.name = name;
        if (description !== props.description) changes.description = description;
        if (isPrivate !== Boolean(props.is_private)) {
            changes.is_private = Number(isPrivate);
            if (isPrivate) {
                setGuests('');
                changes.guests = JSON.stringify([]);
            }
        }
        if (guests !== guestsLogins) {
            let guestsArr = guests.split(',');
            changes.guests = JSON.stringify(guestsArr);
        }

        fetch(config.baseURL + `/web/lists/${props.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(changes)
        })
            .then( response => response.json() )
            .then( (data) => {
                setSubmit(false);

                if (data.list_id) {
                    let newLists = props.tasks.lists;
                    let i = newLists.findIndex(item => item.list_id == data.list_id);
                    newLists.splice(i, 1, data);

                    sessionStorage.setItem('lists', JSON.stringify(newLists));

                    props.dispatch({
                        type: 'ADD_LISTS',
                        payload: newLists
                    });

                    setPreloader(false);
                    setSuccess('Изменения успешно сохранены');
                }
            })
            .catch( (err) => {
                console.log(err);
                setPreloader(false);
                setSubmit(false);
            });
    }, [submit]);

    function submitData(event) {
        event.preventDefault();
        setSuccess('');

        if (name.length > 15) {
            setError('Превышена максимальная длина названия списка');
            return;
        }

        setError('');
        setPreloader(true);
        setSubmit(true);
    }

    return (
        <Modal
            actions={[
                <>
                    <Preloader active={preloader} />
                    <div className="modal-error">{error}</div>
                    <div className="modal-success">{success}</div>
                </>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header={`Редактирование списка задач «${props.name}»`}
            id={`modal-edit-list${props.id}`}
            className="modal"
            open={false}
            options={{
                dismissible: true,
                endingTop: '10%',
                preventScrolling: false,
                startingTop: '4%',
                onCloseStart: () => setSuccess(''),
            }}
        >
            <div className="modal-content">
                <form action="" method="" onSubmit={submitData}>
                    <div className="input-field">
                        <input 
                            id={`list${props.id}-name`} 
                            type="text" 
                            name="name" 
                            className="validate"
                            value={name}
                            onChange={event => setName(event.target.value.replace(regExp.name, ''))}
                            required
                        />
                        <label className={name ? "active" : ""} htmlFor={`list${props.id}-name`}>Название</label>
                        <span className="helper-text">не более 15 символов</span>
                    </div>
                    <div className="input-field">
                        <input 
                            id={`list${props.id}-desc`} 
                            type="text" 
                            name="description" 
                            className="validate"
                            value={description}
                            onChange={event => setDescription(event.target.value.replace(regExp.desc, ''))}
                        />
                        <label className={description ? "active" : ""} htmlFor={`list${props.id}-desc`}>Описание</label>
                    </div>
                    <p>Открыть доступ для других пользователей</p>
                    <div className="switch">
                        <label>
                            Off
                            <input 
                                type="checkbox" 
                                checked={!isPrivate}
                                onChange={event => setIsPrivate(!event.target.checked)}
                            />
                            <span className="lever"></span>
                            On
                        </label>
                    </div>

                    {!isPrivate &&
                        <input 
                            type="text" 
                            value={guests} 
                            placeholder="Введите логины пользователей через запятую"
                            onChange={event => setGuests(event.target.value.replace(/\s/g, ''))}
                        />
                    }

                    <div className="submit-wrap">
                        <button className="waves-effect waves-green btn">Подтвердить</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(EditList);