const serverAddr = "http://127.0.0.1:8000";
const axios = require('axios');
var instance = axios.create({
    baseURL: serverAddr,
    timeout: 2500
});

export function login(data){
    return new Promise(function(resolve, reject) {
        instance.post('/login', {
            userId: data.userId,
            password: data.password
        }).then((value) => {
            if(value.data.loginData.loginStatus){
                resolve(value);
            }else{
                reject(value);
            }
        }).catch((err)=>{
            reject(err);
        })
    })
}

export function userRegister(data){
    console.log(data)
    return new Promise(function(resolve, reject) {
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
            if(value.data.registerData.registerStatus){
                resolve(value);
            }else{
                reject(value);
            }
        }).catch((err)=>{
            // console.log(Object.keys(err))
            // console.log(err.response);
            // console.log(err.isAxiosError);
            reject(err);
        })
    })
}