/**
 * Created by Administrator on 2017/12/24.
 */
import request from '@/utils/request'

//用户列表
export function getUsersAll(data) {
    return request({
        url: 'auth/user/all',
        method: 'get',
        data
    })
}
//用户列表
export function getUserOne(data) {
    return request({
        url: 'auth/user/one',
        method: 'get',
        data
    })
}

//用户发布
export function userStatus(data) {
    return request({
        url: 'auth/user/effect',
        method: 'get',
        data
    })
}
//用户删除
export function userDelete(data) {
    return request({
        url: 'auth/user/delete',
        method: 'get',
        data
    })
}

//用户保存
export function userSave(data) {
    return request({
        url: 'auth/user/save',
        method: 'post',
        data
    })
}
