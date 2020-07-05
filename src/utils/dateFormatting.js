function dateFormatting(date) {
    if(!date) return '-';

    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }
    if(date.length > 10) {
        options.hour = 'numeric';
        options.minute = 'numeric';
    }

    return new Date(date).toLocaleString('ru', options);
} 

export default dateFormatting;