import getCookie from '../utils/getCookie';

const initialState = {
    hasToken: getCookie('token') ? true : false
};
  
const actions = {
    'HAS_TOKEN': changeTokenStatus,
};
  
function changeTokenStatus(state, action) {
    return {
        hasToken: action.payload
    }
}

export default {
    initialState,
    actions
}