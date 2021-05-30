const serverAddr = "http://121.41.171.65:3000";
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
            resolve(value);
        }).catch((err)=>{
            reject(err);
        })
    })
}