import axios from 'axios'
import Qs from 'qs'
axios.defaults.timeout = 15000
axios.interceptors.request.use(
    config => {
        config.baseURL = './'
        // config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
        config.timeout = 6000
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, Qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
