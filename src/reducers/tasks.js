const initialState = {
    lists: sessionStorage.getItem('lists') ? JSON.parse(sessionStorage.getItem('lists')) : null,
};
  
const actions = {
    'ADD_LISTS': addLists,
    'ADD_NEW_LIST': addNewList,
};
  
function addLists(state, action) {
    return {
        lists: action.payload
    }
}

function addNewList(state, action) {
    return {
        lists: [...state.lists, action.payload],
    }
}

export default {
    initialState,
    actions
}