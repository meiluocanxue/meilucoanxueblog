/**
 * Created by Administrator on 2017/12/24.
 */
import request from '@/utils/request'


//图片删除
export function pictureDelete(data) {
    return request({
        url: 'upload/delete',
        method: 'get',
        data
    })
}
//图片信息
export function getPictureInfo(data) {
    return request({
        url: 'upload/picture',
        method: 'get',
        data
    })
}