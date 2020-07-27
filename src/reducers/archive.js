const initialState = {
    items: [],
    filter: {
        listId: null,
        category: null,
        status: null
    }
};
  
const actions = {
    'UPDATE_ARCHIVE_ITEMS': updateArchiveItems,
    'ADD_ARCHIVE_ITEMS': addArchiveItems,
    'DELETE_ARCHIVE_ITEM': deleteArchiveItem,
    'UPDATE_ARCHIVE_FILTER': updateArchiveFilter
};

function updateArchiveItems(state, action) {
    return {
        items: action.payload,
        filter: state.filter
    }
}

function addArchiveItems(state, action) {
    return {
        items: [...state.items, ...action.payload],
        filter: state.filter
    }
}

function deleteArchiveItem(state, action) {
    const modifiedItems = state.items.filter(item => item.task_id !== action.payload);

    return {
        items: modifiedItems,
        filter: state.filter
    }
}

function updateArchiveFilter(state, action) {
    let newFilter = state.filter;
    newFilter[action.payload.key] = action.payload.value;

    return {
        items: state.items,
        filter: newFilter
    }
}

export default {
    initialState,
    actions
}