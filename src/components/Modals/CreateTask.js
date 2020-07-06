import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Preloader } from 'react-materialize';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import '../../css/react-datepicker.css';
import config from '../../config';
import getCookie from '../../utils/getCookie';
import regExp from '../../utils/regExp';

registerLocale('ru', ru);

const CreateTask = (props) => {

    let { categories } = props.user;

    let [name, setName]               = useState(''),
        [category, setCategory]       = useState(''),
        [date, setDate]               = useState(''),
        [time, setTime]               = useState(''),
        [preloader, setPreloader]     = useState(false),
        [error, setError]             = useState(''),
        [submit, setSubmit]           = useState(false),
        [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if(!submit) return;
        let cleanupFunction = false;

        let dateStr = null;
        if(date) {
            let month = (String(date.getMonth()).length === 1) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            dateStr = `${date.getFullYear()}-${month}-${date.getDate()}`;
            if(time) {
                let hours = (String(time.getHours()).length === 1) ? `0${time.getHours()}` : time.getHours();
                let min = (String(time.getMinutes()).length === 1) ? `0${time.getMinutes()}` : time.getMinutes();
                dateStr = dateStr + `T${hours}:${min}`;
            } 
        }

        const newTask = {
            'user_id': parseInt(getCookie('userId'), 10),
            'list_id': parseInt(props.listId, 10),
            'name': name,
            'category': (category === '0' || category === '') ? null : category,
            'date': dateStr,
            'status': 0
        }

        fetch(config.baseURL + '/web/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(newTask)
        })
            .then( response => response.json() )
            .then( (data) => {
                setSubmit(false);

                if(data.task_id) {
                    props.dispatch({
                        type: 'ADD_NEW_ITEM',
                        payload: {
                            list_id: parseInt(props.listId, 10),
                            task: data
                        }
                    });

                    setPreloader(false);
                    setIsModalOpen(false);
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
        setCategory('');
        setDate('');
        setTime('');
        setError('');
    }

    function submitData(event) {
        event.preventDefault();
        let formatName = name.replace(/\s/g, '');
        if(formatName.length === 0) {
            setError('Заполните поле "Задача"');
            return;
        }

        if(name.length > 200) {
            setError('Название задачи не должно превышать 200 символов');
            return;
        }

        setError('');
        setPreloader(true);
        setSubmit(true);
        setIsModalOpen(true);
    }

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
            header="Новая задача"
            id="modal-create-task"
            className="modal"
            open={isModalOpen}
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
                            id="create-task-name" 
                            type="text" 
                            name="name" 
                            className="validate"
                            value={name}
                            onChange={event => setName(event.target.value.replace(regExp.desc, ''))}
                            required
                        />
                        <label htmlFor="create-task-name" className={name ? "active" : ""}>Задача</label>
                    </div>

                    <div className="input-group">
                        <DatePicker
                            locale="ru"
                            dateFormat="dd.MM.yyyy"
                            placeholderText="Дата"
                            selected={date}
                            onChange={newDate => setDate(newDate)}
                        />

                        <DatePicker
                            locale="ru"
                            dateFormat="HH:mm"
                            placeholderText="Время"
                            timeCaption="Время"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={5}
                            selected={time}
                            onChange={newTime => setTime(newTime)}
                        />
                    </div>

                    <div className="input-field">
                        <Select
                            id="Select-9"
                            multiple={false}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false
                                }
                            }}
                            value={category}
                            onChange={event => setCategory(event.target.value)}
                        >
                            <option value="" disabled>
                                Категория
                            </option>
                            <option value="0">
                                Без категории
                            </option>
                            {categories && 
                                categories.map((cat, i) =>
                                    <option key={i} value={cat}>
                                        {cat[0].toUpperCase() + cat.slice(1)}
                                    </option>                               
                                )
                            }
                        </Select>
                    </div>

                    <div className="input-field tasks-list-name">
                        <input disabled value={props.listName} id="tasks-list-name" type="text" className="validate" />
                        <label htmlFor="tasks-list-name" className="active">Список задач</label>
                    </div>

                    <div className="submit-wrap">
                        <button className="waves-effect waves-green btn">Создать</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(CreateTask);