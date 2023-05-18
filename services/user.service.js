import bcrypt from 'bcrypt';
import connection from '../config/connection';

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function formateT(params) {
    let result = params < 10 ? '0' + params : params;
    return result;
}

function timerJoin(params = '', split = '') {
    // params là truyền vào timespam còn split là truyền vào ngăn cách(-, :)
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    return years + split + months + split + days;
}

function add_time() {
    let date = new Date();
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());
    return days + '/' + months + '/' + years;
}

function timerJoin2(params = '') {
    let date = '';
    if (params) {
        date = new Date(Number(params));
    } else {
        date = new Date();
    }
    let years = formateT(date.getFullYear());
    let months = formateT(date.getMonth() + 1);
    let days = formateT(date.getDate());

    let hours = formateT(date.getHours());
    let minutes = formateT(date.getMinutes());
    let seconds = formateT(date.getSeconds());
    return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
}

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const Login = async () => {
    const users = await connection.Users.findAll();
    console.log(users);
};

module.exports = {
    Login,
};
