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

const EditTask = (props) => {

    let { categories }     = props.user,
        { task, listName } = props;

    let [name, setName]           = useState(task.name),
        [category, setCategory]   = useState(task.category ? task.category: ''),
        [date, setDate]           = useState(task.date ? new Date(task.date) : ''),
        [time, setTime]           = useState((task.date && task.date.length > 10) ? new Date(task.date) : ''),
        [status, setStatus]       = useState(String(task.status)),
        [preloader, setPreloader] = useState(false),
        [error, setError]         = useState(''),
        [submit, setSubmit]       = useState(false),
        [isModalOpen, setIsModalOpen] = useState(false);

    if(category && !categories.includes(category)) categories = [category, ...categories];

    useEffect(() => {
        if(!submit) return;

        let dateStr = null;
        if(date) {
            let month = (String(date.getMonth()).length === 1) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
            let day = (String(date.getDate()).length === 1) ? `0${date.getDate()}` : date.getDate();
            dateStr = `${date.getFullYear()}-${month}-${day}`;
            if(time) {
                let hours = (String(time.getHours()).length === 1) ? `0${time.getHours()}` : time.getHours();
                let min = (String(time.getMinutes()).length === 1) ? `0${time.getMinutes()}` : time.getMinutes();
                dateStr = dateStr + `T${hours}:${min}`;
            } 
        }

        const changes = {};

        if(name !== task.name) changes.name = name;
        if(category !== task.category) changes.category = category;
        changes.date = dateStr;
        if(status !== task.status) changes.status = parseInt(status, 10);

        fetch(config.baseURL + `/web/tasks/${task.task_id}`, {
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

                if (data.task_id) {
                    props.dispatch({
                        type: 'UPDATE_ITEM',
                        payload: {
                            list_id: data.list_id,
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

    }, [submit]);

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
            header="Редактирование задачи"
            id={`modal-edit-task${task.task_id}`}
            className="modal"
            open={isModalOpen}
            options={{
                dismissible: true,
                endingTop: '10%',
                preventScrolling: false,
                startingTop: '4%'
            }}
        >
            <div className="modal-content"> 
                <form action="" method="" onSubmit={submitData}>
                    <div className="input-field">
                        <input 
                            id={`task${task.task_id}-name`} 
                            type="text" 
                            name="name" 
                            className="validate"
                            value={name}
                            onChange={event => setName(event.target.value.replace(regExp.desc, ''))}
                            required
                        />
                        <label htmlFor="task-name" className="active">Задача</label>
                    </div>

                    <div className="input-group input-group-date">
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
                            id={`Select-task${task.task_id}`}
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
                            <option value="0" disabled>
                                Категория
                            </option>
                            <option value="">
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

                    <div className="input-field status-select">
                        <Select
                            id={`status-task${task.task_id}`}
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
                            value={status}
                            onChange={event => setStatus(event.target.value)}
                        >
                            <option value="0">
                                Выполнить
                            </option>
                            <option value="1">
                                Выполнена
                            </option>
                        </Select>
                    </div>

                    <div className="input-field tasks-list-name">
                        <input disabled value={listName} id={`list-name-task${task.task_id}`} type="text" className="validate" />
                        <label htmlFor={`list-name-task${task.task_id}`} className="active">Список задач</label>
                    </div>

                    <div className="submit-wrap">
                        <button className="waves-effect waves-green btn">Подтвердить</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(EditTask);