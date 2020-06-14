const initialState = {
    lists: [],
};
  
const actions = {
    'ADD_LIST': addList,
};
  
function addList(state, action) {
    return {
        lists: [...state.lists, action.payload],
    }
}

export default {
    initialState,
    actions
}