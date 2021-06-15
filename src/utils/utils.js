const serverAddr = "http://127.0.0.1:8000";
const axios = require('axios');
var instance = axios.create({
    baseURL: serverAddr,
    timeout: 2500
});

export function login(data) {
    return new Promise(function (resolve, reject) {
        instance.post('/login', {
            userId: data.userId,
            password: data.password
        }).then((value) => {
            console.log(value);
            if (value.data.status) {
                resolve(value);
            } else {
                reject(value);
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

export function userRegister(data) {
    console.log(data)
    return new Promise(function (resolve, reject) {
        instance.post('/register', {
            userId: data.userId,
            password: data.password,
            userName: data.userName,
            userPermission: data.userPermission,
            userInfo: {
                xingbie: data.xingbie,
                hospitalName: data.hospitalName,
                keshi: data.keshi,
                zhicheng: data.zhicheng
            }
        }).then((value) => {
            console.log(value);
            if (value.data.status) {
                resolve(value);
            } else {
                reject(value);
            }
        }).catch((err) => {
            // console.log(Object.keys(err))
            // console.log(err.response);
            // console.log(err.isAxiosError);
            reject(err);
        })
    })
}

function getUserInfo() {
    let storage = JSON.parse(localStorage.getItem("userInfo"));
    let time = new Date().getTime();
    let result = null;
    console.log(storage);
    if (storage) {
        let obj = storage;
        if (time < obj.expire) {
            result = obj.res.data;
        } else {
            localStorage.removeItem("userInfo");
        }
    }
    return result;
}

export function updateUserInfo(data) {
    console.log(data)
    return new Promise(function (resolve, reject) {
        let res = getUserInfo();
        console.log(res);
        if (res) {
            instance.post('/user/updateinfo', data, {
                headers: {
                    'token': res.token
                }
            }).then((value) => {
                console.log(value);
                if (value.data.status) {
                    resolve(value);
                } else {
                    reject(value);
                }
            }).catch((err) => {
                // console.log(Object.keys(err))
                // console.log(err.response);
                // console.log(err.isAxiosError);
                reject(err);
            })
        } else {
            reject({
                data: {
                    status: false,
                    message: "会话不存在或已过期，请重新登录！"
                }
            })
        }
    })
}

export function getLoginStatus() {
    console.log("getLoginStatus");
    return new Promise(function (resolve, reject) {
        let res = getUserInfo();
        console.log(res);
        if (res) {
            instance.get('/login', { headers: { 'token': res.token } }).then((value) => {
                console.log(value);
                if (value.data.status) {
                    resolve(value);
                } else {
                    reject(value);
                }
            }).catch((err) => {
                reject(err);
            })
        } else {
            reject({
                data: {
                    status: false,
                    message: "会话不存在或已过期，请重新登录！"
                }
            })
        }
    })
}

export function getExpireTime() {
    let tmp = new Date().getTime() + 1000 * 60 * 30;
    return tmp;
}

export function queryRegistrationInfo() {
    console.log("queryRegistrationInfo");
    return new Promise(function (resolve, reject) {
        let res = getUserInfo();
        console.log(res);
        if (res) {
            instance.get('/registration', { headers: { 'token': res.token } }).then((value) => {
                console.log(value);
                if (value.data.status) {
                    resolve(value);
                } else {
                    reject(value);
                }
            }).catch((err) => {
                reject(err);
            })
        } else {
            reject({
                data: {
                    status: false,
                    message: "会话不存在或已过期，请重新登录！"
                }
            })
        }
    })
}

export function queryDoctor(data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        let res = getUserInfo();
        console.log(res);
        if (res) {
            instance.post('/doctor/query', data, {
                headers: { 'token': res.token }
            }).then((value) => {
                console.log(value);
                if (value.data.status) {
                    resolve(value);
                } else {
                    reject(value);
                }
            }).catch((err) => {
                reject(err);
            })
        } else {
            reject({
                data: {
                    status: false,
                    message: "会话不存在或已过期，请重新登录！"
                }
            })
        }
    })
}

export function queryNewDoctor() {
    return new Promise(function (resolve, reject) {
        let res = getUserInfo();
        console.log(res);
        if (res) {
            instance.get('/doctor/new', {
                headers: { 'token': res.token }
            }).then((value) => {
                console.log(value);
                if (value.data.status) {
                    resolve(value);
                } else {
                    reject(value);
                }
            }).catch((err) => {
                reject({
                    data: {
                        status: false,
                        message: "网络错误或权限不足"
                    }
                })
            })
        } else {
            reject({
                data: {
                    status: false,
                    message: "会话不存在或已过期，请重新登录！"
                }
            })
        }
    })
}

export function approveNewDoctor(data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        let res = getUserInfo();
        console.log(res);
        if (res) {
            instance.post('/doctor/new', data, {
                headers: { 'token': res.token }
            }).then((value) => {
                console.log(value);
                if (value.data.status) {
                    resolve(value);
                } else {
                    reject(value);
                }
            }).catch((err) => {
                reject(err);
            })
        } else {
            reject({
                data: {
                    status: false,
                    message: "会话不存在或已过期，请重新登录！"
                }
            })
        }
    })
}