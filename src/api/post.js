/**
 * Created by Administrator on 2017/12/24.
 */
import request from '@/utils/request'

//文章列表
export function getPostList(data) {
    return request({
        url: 'auth/post/list',
        method: 'get',
        data
    })
}
//文章置顶
export function postUp(data) {
    return request({
        url: 'auth/post/up',
        method: 'get',
        data
    })
}
//文章推荐
export function postRecommend(data) {
    return request({
        url: 'auth/post/recommend',
        method: 'get',
        data
    })
}
//文章发布
export function postPublish(data) {
    return request({
        url: 'auth/post/publish',
        method: 'get',
        data
    })
}
//文章删除
export function postDelete(data) {
    return request({
        url: 'auth/post/delete',
        method: 'get',
        data
    })
}
//文章信息
export function getPostById(data) {
    return request({
        url: 'auth/post/single',
        method: 'get',
        data
    })
}
//文章信息
export function savePostInfo(data) {
    return request({
        url: 'auth/post/save',
        method: 'post',
        data
    })
}
//分类列表
export function getCategoryAll() {
    return request({
        url: 'auth/category/list',
        method: 'get'
    })
}