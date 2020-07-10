import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Select } from 'react-materialize';

const Filter = (props) => {

    let { categories } = props.user,
        { filter }     = props.tasks;

    let [ filterCategory, setFilterCategory ] = useState(filter.category ? filter.category : ''),
        [ filterDate, setFilterDate ]         = useState(filter.date ? filter.date : ''),
        [ filterStatus, setFilterStatus ]     = useState(filter.status ? filter.status : '');

    function filterHandler(key, event) {
        let value = null;
        if(key === 'category') {
            setFilterCategory(event.target.value);
            if(event.target.value) value = event.target.value.toLowerCase();
        }

        if(key === 'date') {
            setFilterDate(event.target.value);
            if(event.target.value) value = event.target.value;
        }

        if(key === 'status') {
            setFilterStatus(event.target.value);
            if(event.target.value) value = parseInt(event.target.value, 10);
        }

        props.dispatch({
            type: 'UPDATE_FILTER',
            payload: {
                key: key,
                value: value
            }
        });
    }

    return (
        <div className="filter col s2 m4 xl8">
            <span 
                className={filter.category || filter.date || filter.status !== null ?
                          "filter-label active" :
                          "filter-label"}
            >
                <i className="fa fa-filter" aria-hidden="true"></i> 
                <span className="filter-label-text">Фильтр</span>
            </span>

            <div className="filter-inputs">
                <Select
                    id="select-filter-categories"
                    multiple={false}
                    value={filterCategory}
                    onChange={filterHandler.bind(this, 'category')}
                >
                    <option value="" selected>Все категории</option>
                    {categories && 
                        categories.map((cat, i) =>
                            <option key={i} value={cat}>
                                {cat[0].toUpperCase() + cat.slice(1)}
                            </option>                               
                        )
                    }
                </Select>

                <Select
                    id="select-filter-date"
                    multiple={false}
                    value={filterDate}
                    onChange={filterHandler.bind(this, 'date')}
                >
                    <option value="" selected>Все периоды</option>
                    <option value="today">Сегодня</option>
                    <option value="week">Ближайшие 7 дней</option>
                    <option value="month">Ближайшие 30 дней</option>
                </Select>

                <Select
                    id="select-filter-status"
                    multiple={false}
                    value={filterStatus}
                    onChange={filterHandler.bind(this, 'status')}
                >
                    <option value="" selected>Все статусы</option>
                    <option value="0">Выполнить</option>
                    <option value="1">Выполнена</option>
                </Select>
            </div>
        </div>        
    );
};

export default connect(state => state)(Filter);