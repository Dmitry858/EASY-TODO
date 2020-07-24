import getCookie from '../utils/getCookie';

const initialState = {
    hasToken: getCookie('token') ? true : false,
    categories: localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [],
    isNew: false
};
  
const actions = {
    'HAS_TOKEN': changeTokenStatus,
    'UPDATE_CATEGORIES': updateCategories,
    'IS_USER_NEW': changeUserStatus,
};
  
function changeTokenStatus(state, action) {
    return {
        hasToken: action.payload,
        categories: state.categories,
        isNew: state.isNew
    }
}

function updateCategories(state, action) {
    return {
        hasToken: state.hasToken,
        categories: action.payload,
        isNew: state.isNew
    }
}

function changeUserStatus(state, action) {
    return {
        hasToken: state.hasToken,
        categories: state.categories,
        isNew: action.payload
    }
}

export default {
    initialState,
    actions
}