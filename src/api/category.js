/**
 * Created by Administrator on 2017/12/24.
 */
import request from '@/utils/request'

//分类列表
export function getCategoryAll(data) {
    return request({
        url: 'auth/category/all',
        method: 'get',
        data
    })
}

//分类发布
export function categoryStatus(data) {
    return request({
        url: 'auth/category/effect',
        method: 'get',
        data
    })
}
//分类删除
export function categoryDelete(data) {
    return request({
        url: 'auth/category/delete',
        method: 'get',
        data
    })
}

//分类保存
export function categorySave(data) {
    return request({
        url: 'auth/category/save',
        method: 'post',
        data
    })
}
