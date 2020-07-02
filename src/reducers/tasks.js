const initialState = {
    lists: sessionStorage.getItem('lists') ? JSON.parse(sessionStorage.getItem('lists')) : null,
    items: []
};
  
const actions = {
    'ADD_LISTS': addLists,
    'ADD_NEW_LIST': addNewList,
    'ADD_ITEMS': addItems,
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

export default {
    initialState,
    actions
}