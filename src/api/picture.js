/**
 * Created by Administrator on 2017/12/24.
 */
import request from '@/utils/request'

//分类列表
export function getPictureAll(data) {
    return request({
        url: 'auth/picture/all',
        method: 'get',
        data
    })
}


//分类删除
export function pictureDelete(data) {
    return request({
        url: 'auth/picture/delete',
        method: 'get',
        data
    })
}

//强制图片删除
export function pictureForceDelete(data) {
    return request({
        url: 'auth/picture/forceDelete',
        method: 'get',
        data
    })
}


//分类保存
export function pictureSave(data) {
    return request({
        url: 'auth/picture/save',
        method: 'post',
        data
    })
}
