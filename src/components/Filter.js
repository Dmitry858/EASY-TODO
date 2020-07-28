import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Select } from 'react-materialize';
import config from '../config';

const Filter = (props) => {

    let { categories } = props.user,
        { lists }      = props.tasks,
        { filter }     = props.archived ? props.archive : props.tasks;

    let [ filterListId, setFilterListId ]         = useState(filter.listId ? filter.listId : ''),
        [ filterCategory, setFilterCategory ]     = useState(filter.category ? filter.category : ''),
        [ filterDate, setFilterDate ]             = useState(filter.date ? filter.date : ''),
        [ filterStatus, setFilterStatus ]         = useState(filter.status ? filter.status : ''),
        [ showMobileFilter, setShowMobileFilter ] = useState(false);

    function filterHandler(key, event) {
        let value = null;

        if(key === 'listId') {
            setFilterListId(event.target.value);
            if(event.target.value) value = parseInt(event.target.value, 10);
        }

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

        setShowMobileFilter(false);

        props.dispatch({
            type: props.archived ? 'UPDATE_ARCHIVE_FILTER' : 'UPDATE_FILTER',
            payload: {
                key: key,
                value: value
            }
        });

        if(props.changeOffset) props.changeOffset(config.offsetFactor);
    }

    function toggleMobileFilter() {
        if(document.body.clientWidth > 1360) return;
        showMobileFilter ? setShowMobileFilter(false) : setShowMobileFilter(true);
    }

    function isFilterActive() {
        if(props.archived) {
            return (filter.listId || filter.category || filter.status !== null) ? true : false;
        } else {
            return (filter.category || filter.date || filter.status !== null) ? true : false;
        }
    }

    return (
        <div className="filter col s2 m4 xl8">
            <span 
                className={ isFilterActive() ?
                          "filter-label active" :
                          "filter-label"}
                onClick={toggleMobileFilter}
            >
                <i className="fa fa-filter" aria-hidden="true"></i> 
                <span className="filter-label-text">Фильтр</span>
            </span>

            <div className={showMobileFilter ? "filter-inputs active" : "filter-inputs"}>
                {props.archived && 
                    <Select
                        id="select-filter-lists"
                        multiple={false}
                        value={String(filterListId)}
                        onChange={filterHandler.bind(this, 'listId')}
                    >
                        <option value="">Все списки</option>
                        {lists && 
                            lists.map((list, i) =>
                                <option key={i} value={list.list_id}>
                                    {list.name}
                                </option>                               
                            )
                        }
                    </Select>                
                }

                <Select
                    id="select-filter-categories"
                    multiple={false}
                    value={filterCategory}
                    onChange={filterHandler.bind(this, 'category')}
                >
                    <option value="">Все категории</option>
                    <option value="без категории">Без категории</option>
                    {categories && 
                        categories.map((cat, i) =>
                            <option key={i} value={cat}>
                                {cat[0].toUpperCase() + cat.slice(1)}
                            </option>                               
                        )
                    }
                </Select>

                {!props.archived && 
                    <Select
                        id="select-filter-date"
                        multiple={false}
                        value={filterDate}
                        onChange={filterHandler.bind(this, 'date')}
                    >
                        <option value="">Все даты</option>
                        <option value="-">Без даты</option>
                        <option value="today">Сегодня</option>
                        <option value="week">Ближайшие 7 дней</option>
                        <option value="month">Ближайшие 30 дней</option>
                    </Select>
                }

                <Select
                    id="select-filter-status"
                    multiple={false}
                    value={filterStatus}
                    onChange={filterHandler.bind(this, 'status')}
                >
                    <option value="">Все статусы</option>
                    <option value="0">Выполнить</option>
                    <option value="1">Выполнена</option>
                </Select>
            </div>
        </div>        
    );
};

export default connect(state => state)(Filter);