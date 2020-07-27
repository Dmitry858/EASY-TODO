import isIncludedInTimePeriod from '../utils/isIncludedInTimePeriod';

// return array of filtered tasks
function filterTasks(tasks, filter) {
    if(!tasks) return [];

    if(tasks && !filter) return tasks;

    return tasks.filter(task => {
        if(filter.listId && filter.listId !== null && filter.listId !== task.list_id) return false;
        if(filter.category && task.category === null) return false;
        if(filter.category && task.category && filter.category !== task.category.toLowerCase()) return false;
        if(filter.date && !isIncludedInTimePeriod(filter.date, task.date)) return false;
        if(filter.status !== null && filter.status !== task.status) return false;
        return true;
    });
}

export default filterTasks;