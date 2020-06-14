import React from 'react';
import { connect } from 'react-redux';
import { Modal, Select, DatePicker, TimePicker } from 'react-materialize';

const CreateTask = (props) => {

    return (
        <Modal
            actions={[]}
            bottomSheet={false}
            fixedFooter={false}
            header="Новая задача"
            id="modal-create-task"
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
                        <input id="task-name" type="text" name="name" className="validate" />
                        <label htmlFor="task-name">Задача</label>
                    </div>
                    <div className="input-field">
                        <Select
                            id="Select-9"
                            multiple={false}
                            onChange={function noRefCheck(){}}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    outDuration: 250
                                }
                            }}
                            value=""
                        >
                            <option value="" disabled>
                                Категория
                            </option>
                            <option value="0">
                                Без категории
                            </option>
                            <option value="1">
                                Срочное
                            </option>
                            <option value="2">
                                Важное
                            </option>
                        </Select>
                    </div>

                    <div className="input-group">
                        <DatePicker
                            id="DatePicker-5"
                            options={{
                                autoClose: false,
                                container: null,
                                defaultDate: null,
                                disableDayFn: null,
                                disableWeekends: false,
                                events: [],
                                firstDay: 1,
                                format: 'dd.mm.yyyy',
                                i18n: {
                                    cancel: 'Cancel',
                                    clear: 'Clear',
                                    done: 'Ok',
                                    months: [
                                        'Январь',
                                        'Февраль',
                                        'Март',
                                        'Апрель',
                                        'Май',
                                        'Июнь',
                                        'Июль',
                                        'Август',
                                        'Сентябрь',
                                        'Октябрь',
                                        'Ноябрь',
                                        'Декабрь'
                                    ],
                                    monthsShort: [
                                        'янв',
                                        'фев',
                                        'мар',
                                        'апр',
                                        'май',
                                        'июн',
                                        'июл',
                                        'авг',
                                        'сен',
                                        'окт',
                                        'ноя',
                                        'дек'
                                    ],
                                    nextMonth: '›',
                                    previousMonth: '‹',
                                    weekdays: [
                                        'Воскресенье',
                                        'Понедельник',
                                        'Вторник',
                                        'Среда',
                                        'Четверг',
                                        'Пятница',
                                        'Суббота'
                                    ],
                                    weekdaysAbbrev: [
                                        'В',
                                        'П',
                                        'В',
                                        'С',
                                        'Ч',
                                        'П',
                                        'С'
                                    ],
                                    weekdaysShort: [
                                        'ВС',
                                        'ПН',
                                        'ВТ',
                                        'СР',
                                        'ЧТ',
                                        'ПТ',
                                        'СБ'
                                    ]
                                },
                                isRTL: false,
                                maxDate: null,
                                minDate: null,
                                onClose: null,
                                onDraw: null,
                                onOpen: null,
                                onSelect: null,
                                parse: null,
                                setDefaultDate: false,
                                showClearBtn: false,
                                showDaysInNextAndPreviousMonths: false,
                                showMonthAfterYear: false,
                                yearRange: 10
                            }}
                            placeholder="Дата"
                        />

                        <TimePicker
                            id="TimePicker-13"
                            options={{
                                autoClose: false,
                                container: null,
                                defaultTime: 'now',
                                duration: 350,
                                fromNow: 0,
                                i18n: {
                                    cancel: 'Cancel',
                                    clear: 'Clear',
                                    done: 'Ok'
                                },
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                onSelect: null,
                                showClearBtn: false,
                                twelveHour: false,
                                vibrate: true
                            }}
                            placeholder="Время"
                        />
                    </div>

                    <div className="input-field tasks-list-name">
                        <input disabled value="Работа" id="tasks-list-name" type="text" className="validate" />
                        <label htmlFor="tasks-list-name">Список задач</label>
                    </div>

                    <div className="submit-wrap">
                        <button className="modal-close waves-effect waves-green btn">Создать</button>
                    </div>
                </form>
            </div>
        </Modal>     
    );
};

export default connect(state => state)(CreateTask);