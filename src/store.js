import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tasksStoreConfig from './reducers/tasks';
import userStoreConfig from './reducers/user';

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        return (handlers[action.type] && handlers[action.type](state, action)) || state;
    };
};

const tasksReducers = createReducer(tasksStoreConfig.initialState, tasksStoreConfig.actions);
const userReducers = createReducer(userStoreConfig.initialState, userStoreConfig.actions);

const rootReducer = combineReducers({
    tasks: tasksReducers,
    user: userReducers
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));