function isActualDataInLocalStorage(key) {
    if(!localStorage.getItem(key)) return false;

    if(localStorage.getItem(`${key}DateExpired`)) {
        let date = new Date(localStorage.getItem(`${key}DateExpired`)),
            now  = new Date();

        return date >= now ? true : false;
    }

    return true;
}

export default isActualDataInLocalStorage;