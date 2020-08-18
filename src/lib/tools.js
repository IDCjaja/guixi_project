import request from './util'

export function fetch(){
    return request({
        url : '/',
        method: 'get'
    })
}
