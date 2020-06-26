const initialState = {
    lists: null,
};
  
const actions = {
    'ADD_LISTS': addLists,
};
  
function addLists(state, action) {
    return {
        lists: action.payload
    }
}

export default {
    initialState,
    actions
}