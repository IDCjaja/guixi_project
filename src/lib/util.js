import axios from 'axios';
//配置axios实例
//URL（绝对的） = baseURL + url(相对的)
const service = axios.create({
    baseURL : "http://127.0.0.1:7000",
    timeout : 5000
})

export default service
