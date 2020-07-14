import deleteCookie from './deleteCookie';

const signOut = (event, history) => (dispatch) => {
    if(event) event.preventDefault();

    deleteCookie('token');
    deleteCookie('userId');
    deleteCookie('login');

    history.push('/');

    dispatch({
        type: 'HAS_TOKEN',
        payload: false
    });
    dispatch({
        type: 'UPDATE_CATEGORIES',
        payload: []
    });
    dispatch({
        type: 'ADD_LISTS',
        payload: null
    });
};

export default signOut;