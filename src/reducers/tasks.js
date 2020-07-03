const initialState = {
    lists: sessionStorage.getItem('lists') ? JSON.parse(sessionStorage.getItem('lists')) : null,
    items: []
};
  
const actions = {
    'ADD_LISTS': addLists,
    'ADD_NEW_LIST': addNewList,
    'ADD_ITEMS': addItems,
    'ADD_NEW_ITEM': addNewItem,
};
  
function addLists(state, action) {
    return {
        lists: action.payload,
        items: state.items
    }
}

function addNewList(state, action) {
    return {
        lists: [...state.lists, action.payload],
        items: state.items
    }
}

function addItems(state, action) {
    let foundEl = state.items.find(item => item.list_id == action.payload.list_id);
    if(foundEl) return state;
    
    return {
        lists: state.lists,
        items: [...state.items, action.payload]
    }
}

function addNewItem(state, action) {
    const modifiedItems = state.items.map(item => {
        if(item.list_id == action.payload.list_id) item.tasks.push(action.payload.task);
        return item;
    });

    return {
        lists: state.lists,
        items: modifiedItems
    }
}

export default {
    initialState,
    actions
}