function cleanLocalStorage() {
    localStorage.removeItem('lists');
    localStorage.removeItem('listsDateExpired');
    localStorage.removeItem('categories');
}

export default cleanLocalStorage;