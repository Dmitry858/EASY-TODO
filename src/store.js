import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tasksStoreConfig from './reducers/tasks';

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        return (handlers[action.type] && handlers[action.type](state, action)) || state;
    };
};

const tasksReducers = createReducer(tasksStoreConfig.initialState, tasksStoreConfig.actions);

const rootReducer = combineReducers({
    tasks: tasksReducers,
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));