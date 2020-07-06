import deleteCookie from './deleteCookie';

const signOut = (event, history) => (dispatch) => {
    event.preventDefault();

    deleteCookie('token');
    deleteCookie('userId');

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

    history.push('/');
};

export default signOut;