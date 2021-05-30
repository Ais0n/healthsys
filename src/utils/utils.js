const serverAddr = "http://127.0.0.1:8000";
const axios = require('axios');
var instance = axios.create({
    baseURL: serverAddr,
    timeout: 2500
});

export function login(data){
    return new Promise(function(resolve, reject) {
        instance.post('/login', {
            accountId: data.accountId,
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