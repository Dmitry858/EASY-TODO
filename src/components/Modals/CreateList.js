import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Preloader } from 'react-materialize';
import config from '../../config';
import getCookie from '../../utils/getCookie';

const CreateList = (props) => {

    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [isPrivate, setIsPrivate] = useState(true);
    let [guests, setGuests] = useState('');
    let [preloader, setPreloader] = useState(false);
    let [error, setError] = useState('');
    let [submit, setSubmit] = useState(false);
    let [isCreated, setIsCreated] = useState(false);

    const nameRegExp = /[\s><\?\.,\'\"`~!@№#$%\^&\*)(\+=/\\|\]\[\{\}:;]/g,
          descRegExp = /[><\'\"`~#\^/\\|\]\[\{\};]/g;

    useEffect(() => {
        if(!submit) return;
        let cleanupFunction = false;

        let guestsLogins = JSON.stringify([]);

        if(guests.length > 0 && !isPrivate) {
            let guestsArr = guests.split(',');
            guestsLogins = JSON.stringify(guestsArr);
        }

        fetch(config.baseURL + '/web/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({
                'user_id': getCookie('userId'),
                'name': name,
                'description': description,
                'is_private': Number(isPrivate),
                'guests': guestsLogins
            })
        })
            .then( response => response.json() )
            .then( (data) => {
                setSubmit(false);

                if (data.user_id) {

                    let newLists = [...props.tasks.lists, data];
                    sessionStorage.setItem('lists', JSON.stringify(newLists));

                    props.dispatch({
                        type: 'ADD_NEW_LIST',
                        payload: data
                    });

                    if(!cleanupFunction) setPreloader(false);
                    setIsCreated(true);
                }
            })
            .catch( (err) => {
                console.log(err);
                setPreloader(false);
                setSubmit(false);
            });

        return () => cleanupFunction = true;
    }, [submit]);

    function resetForm() {
        setName('');
        setDescription('');
        setIsPrivate(true);
        setGuests('');
        setError('');
    }

    function submitData(event) {
        event.preventDefault();

        if (name.length > 15) {
            setError('Превышена максимальная длина названия списка');
            return;
        }

        setError('');
        setPreloader(true);
        setSubmit(true);
    }

    if(isCreated) return null;

    return (
        <Modal
            actions={[
                <>
                    <Preloader active={preloader} />
                    <div className="modal-error">{error}</div>
                </>
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Новый список задач"
            id="modal-create-list"
            className="modal"
            open={false}
            options={{
                dismissible: true,
                endingTop: '10%',
                preventScrolling: false,
                startingTop: '4%',
                onCloseStart: resetForm
            }}
        >
            <div className="modal-content">
                <form action="" method="" onSubmit={submitData}>
                    <div className="input-field">
                        <input 
                            id="create-list-name" 
                            type="text" 
                            name="name" 
                            className="validate" 
                            value={name}
                            onChange={event => setName(event.target.value.replace(nameRegExp, ''))}
                        />
                        <label htmlFor="create-list-name">Название</label>
                        <span className="helper-text">не более 15 символов</span>
                    </div>
                    <div className="input-field">
                        <input 
                            id="create-list-desc" 
                            type="text" 
                            name="description" 
                            className="validate" 
                            value={description}
                            onChange={event => setDescription(event.target.value.replace(descRegExp, ''))}
                        />
                        <label htmlFor="create-list-desc">Описание</label>
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
                        <button className="waves-effect waves-green btn">Создать</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(CreateList);