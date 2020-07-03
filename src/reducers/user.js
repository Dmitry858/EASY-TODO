import getCookie from '../utils/getCookie';

const initialState = {
    hasToken: getCookie('token') ? true : false,
    categories: localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : []
};
  
const actions = {
    'HAS_TOKEN': changeTokenStatus,
    'UPDATE_CATEGORIES': updateCategories
};
  
function changeTokenStatus(state, action) {
    return {
        hasToken: action.payload,
        categories: state.categories
    }
}

function updateCategories(state, action) {
    return {
        hasToken: state.hasToken,
        categories: action.payload
    }
}

export default {
    initialState,
    actions
}