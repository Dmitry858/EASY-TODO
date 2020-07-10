const initialState = {
    lists: sessionStorage.getItem('lists') ? JSON.parse(sessionStorage.getItem('lists')) : null,
    items: [],
    filter: {
        category: null,
        date: null,
        status: null
    }
};
  
const actions = {
    'ADD_LISTS': addLists,
    'ADD_NEW_LIST': addNewList,
    'ADD_ITEMS': addItems,
    'ADD_NEW_ITEM': addNewItem,
    'DELETE_ITEM': deleteItem,
    'UPDATE_ITEM': updateItem,
    'UPDATE_FILTER': updateFilter
};
  
function addLists(state, action) {
    return {
        lists: action.payload,
        items: state.items,
        filter: state.filter
    }
}

function addNewList(state, action) {
    return {
        lists: [...state.lists, action.payload],
        items: state.items,
        filter: state.filter
    }
}

function addItems(state, action) {
    let foundEl = state.items.find(item => item.list_id == action.payload.list_id);

    if(foundEl) {
        if(JSON.stringify(foundEl.tasks) === JSON.stringify(action.payload.tasks)) return state;

        const modifiedItems = state.items.map(item => {
            if(item.list_id === action.payload.list_id) {
                item.tasks = action.payload.tasks;
            }
            return item;
        });

        return {
            lists: state.lists,
            items: modifiedItems,
            filter: state.filter
        }        
    }
    
    return {
        lists: state.lists,
        items: [...state.items, action.payload],
        filter: state.filter
    }
}

function addNewItem(state, action) {
    const modifiedItems = state.items.map(item => {
        if(item.list_id == action.payload.list_id) item.tasks.push(action.payload.task);
        return item;
    });

    return {
        lists: state.lists,
        items: modifiedItems,
        filter: state.filter
    }
}

function deleteItem(state, action) {
    const modifiedItems = state.items.map(item => {
        if(item.list_id == action.payload.list_id) {
            let i = item.tasks.findIndex(task => task.task_id === action.payload.task_id);
            if(i !== -1) item.tasks.splice(i, 1);
        }
        return item;
    });

    return {
        lists: state.lists,
        items: modifiedItems,
        filter: state.filter
    }
}

function updateItem(state, action) {
    const modifiedItems = state.items.map(item => {
        if(item.list_id === action.payload.list_id) {
            let i = item.tasks.findIndex(task => task.task_id === action.payload.task.task_id);
            if(i !== -1) item.tasks.splice(i, 1, action.payload.task);
        }
        return item;
    });

    return {
        lists: state.lists,
        items: modifiedItems,
        filter: state.filter
    }
}

function updateFilter(state, action) {
    let newFilter = state.filter;
    newFilter[action.payload.key] = action.payload.value;

    return {
        lists: state.lists,
        items: state.items,
        filter: newFilter
    }
}

export default {
    initialState,
    actions
}