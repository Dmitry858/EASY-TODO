import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tasksStoreConfig from './reducers/tasks';
import userStoreConfig from './reducers/user';
import archiveStoreConfig from './reducers/archive';

const createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        return (handlers[action.type] && handlers[action.type](state, action)) || state;
    };
};

const tasksReducers = createReducer(tasksStoreConfig.initialState, tasksStoreConfig.actions);
const userReducers = createReducer(userStoreConfig.initialState, userStoreConfig.actions);
const archiveReducers = createReducer(archiveStoreConfig.initialState, archiveStoreConfig.actions);

const rootReducer = combineReducers({
    tasks: tasksReducers,
    user: userReducers,
    archive: archiveReducers
});

export default createStore(rootReducer, {}, applyMiddleware(thunk));