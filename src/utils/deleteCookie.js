function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    });
}