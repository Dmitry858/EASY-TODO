const regExp = {
    login: /[\s><?\.,'`"~!@№#$%^&\*)(\+=/\\|\]\[}{:;]/g,
    password: /[\s><.,'":;]/g,
    name: /[\s><?\.,'`"~!@№#$%^&\*)(\+=/\\|\]\[}{:;]/g,
    desc: /[><'`"~#^/\\|\]\[}{;]/g
};

export default regExp;