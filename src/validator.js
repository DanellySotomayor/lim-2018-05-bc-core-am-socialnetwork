window.login = (email, password) => {
    let regExpress = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let start = {
        email: false,
        password: false
    }

    start.email = email !== "" && regExpress.test(email);
    start.password = password !== "" && password !== null;
    return start;
}


window.register = (email, password) => {
    let regExpress = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let start = {
        email: false,
        password: false
    }

    start.email = email !== "" && regExpress.test(email);
    start.password = password !== "" && password !== null;
    return start;
}
