function isIncludedInTimePeriod(period, date) {
    if(period === '-' && !date) return true;
    if(period === '-' && date) return false;
    if(!date) return false;

    let periodDate = new Date();
    if(period === 'today') {
        let month = (String(periodDate.getMonth()).length === 1) ? 
                    `0${periodDate.getMonth() + 1}` : 
                    periodDate.getMonth() + 1;
        let day = (String(periodDate.getDate()).length === 1) ? 
                  `0${periodDate.getDate()}` : 
                  periodDate.getDate();

        periodDate = `${periodDate.getFullYear()}-${month}-${day}`;

        return (periodDate === date.substring(0, 10)) ? true : false;
    }

    if(period === 'week' || period === 'month') {
        let today = new Date(),
            taskDate = new Date(date),
            increase = period === 'week' ? 7 : 30;

        today.setHours(0, 0);
        periodDate.setDate(periodDate.getDate() + increase);
        periodDate.setHours(23, 59);

        return (taskDate >= today && taskDate <= periodDate) ? true : false;
    }

    return true;
}

export default isIncludedInTimePeriod;