var async = require("async");
var utils = require('utility');
var fs = require('fs');
var path = require('path');

var config = require('../../../config');
var dbHelper = require('../../../models/dbHelper');
var PictureDao = require('../../../models/pictureDao');
var Picture = dbHelper.Picture;



//全部分类
var getPictureAll = function(req, res, next){
    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || '';
    //var search = req.query.search || '';
    var status = req.query.status == 'true' ? true : false;

    var userFor = req.query.userfor || '';
    var user = req.query.userId || '';

    if(!page) page = 1;
    pageSize = Number(pageSize) || 30;
  
    var queryParams = {};

    if(userFor){
        queryParams.usefor = userFor;
    }
    if(user){
        queryParams.user = user;
    }
    // if(search){
    //   var titleReg = new RegExp(''+ search +'');
    //   queryParams.name = titleReg;
    // }
  
    dbHelper.Methods.pageQuery(page,pageSize,Picture,'_user',queryParams,{'created_time':'desc'},function (err, pageInfo) {
      //callback(err,pageInfo);
      if(err){
        res.json({status:0,errorNum:100,message:err});
      }else{
        if(pageInfo.results &&　pageInfo.results.length){
          res.json({
            status: 1,
            errorNum: 0,
            result: {
                picture:pageInfo.results,
                page:page,
                pageCount:pageInfo.pageCount,
                count:pageInfo.count,
            }
          });
        }else{
          res.json({status:0,errorNum:100,message:"没有数据"});
        }
        
      }
    });
}


var deleteForcePicture = function(req, res, next){
    var id = req.query.id;
    if(!id){
        res.json({status:0,errorNum:99,message:"请求参数不足！"});
    } 
    Picture.findById(id, function (err, doc) {
        if(doc){
            doc.remove(function (err,doc) {
                if(err){
                    res.json({status:0,errorNum:98,message:error.message});
                }else{
                    let picPath = path.join( __dirname , '../../public' +  doc.picUrl);
                    fs.exists(picPath, function(exists) {
                        if(exists) fs.unlink(picPath);
                    });
                    res.json({status:1,errorNum:0,result:{doType: 'delete',status: true}});
                }
            })
        }else{
            res.json({status:0,errorNum:98,message:error.message});
        }
    })
}
//删除图片
var deletePicture = function(req, res, next){
    var id = req.query.id;
    if(!id){
        res.json({status:0,errorNum:99,message:"请求参数不足！"});
    } 
    Picture.findById(id, function (err, doc) {
        if(doc){
            switch(doc.usefor){
                case 'userpic':
                    PictureDao.findPictureInUser(doc.picurl,function(userPicture){
                        if(userPicture){
                            PictureDao.saveOrUpdate({id: doc._id, status: true},function(err, updateRecord){
                                if(err){
                                    res.json({status:0,errorNum:98,message:error.message});
                                }else{
                                    res.json({status:1,errorNum:0,result:{doType: 'update',status: true}});
                                }
                            })
                        }else{
                            doc.remove(function (err,doc) {
                                if(err){
                                    res.json({status:0,errorNum:98,message:error.message});
                                }else{
                                    let picPath = path.join( __dirname , '../../public' +  doc.picUrl);
                                    fs.exists(picPath, function(exists) {
                                        if(exists) fs.unlink(picPath);
                                    });
                                    res.json({status:1,errorNum:0,result:{doType: 'delete',status: true}});
                                }
                            })
                        }
                    })
                    break;
                case 'category':
                    PictureDao.findPictureInCategory(doc.picurl,function(userPicture){
                        console.log(userPicture)
                        if(userPicture){
                            PictureDao.saveOrUpdate({id: doc._id, status: true},function(err, updateRecord){
                                if(err){
                                    res.json({status:0,errorNum:98,message:error.message});
                                }else{
                                    res.json({status:1,errorNum:0,result:{doType: 'update',status: true}});
                                }
                            })
                        }else{
                            doc.remove(function (err,doc) {
                                if(err){
                                    res.json({status:0,errorNum:98,message:error.message});
                                }else{
                                    let picPath = path.join( __dirname , '../../public' +  doc.picUrl);
                                    fs.exists(picPath, function(exists) {
                                        if(exists) fs.unlink(picPath);
                                    });
                                    res.json({status:1,errorNum:0,result:{doType: 'delete',status: true}});
                                }
                            })
                        }
                    })
                    break;
                case 'article':
                    PictureDao.findPictureInArticle(doc.picurl,function(userPicture){
                        
                        if(userPicture){
                            PictureDao.saveOrUpdate({id: doc._id, status: true},function(err, updateRecord){
                                if(err){
                                    res.json({status:0,errorNum:98,message:error.message});
                                }else{
                                    res.json({status:1,errorNum:0,result:{doType: 'update',status: true}});
                                }
                            })
                        }else{
                            doc.remove(function (err,doc) {
                                if(err){
                                    res.json({status:0,errorNum:98,message:error.message});
                                }else{
                                    let picPath = path.join( __dirname , '../../public' +  doc.picUrl);
                                    fs.exists(picPath, function(exists) {
                                        if(exists) fs.unlink(picPath);
                                    });
                                    res.json({status:1,errorNum:0,result:{doType: 'delete',status: true}});
                                }
                            })
                        }
                    })
                    break;
                default:
                    doc.remove(function (err,doc) {
                        if(err){
                            res.json({status:0,errorNum:98,message:error.message});
                        }else{
                            let picPath = path.join( __dirname , '../../public' +  doc.picUrl);
                            fs.exists(picPath, function(exists) {
                                if(exists) fs.unlink(picPath);
                            });
                            res.json({status:1,errorNum:0,result:{doType: 'delete',status: true}});
                        }
                    })
                    break
            }
            // doc.remove(function (err,doc) {
            //     if(err){
            //         res.json({status:0,errorNum:98,message:error.message});
            //     }else{
            //         res.json({status:1,errorNum:0,result:'ok'});
            //     }
            // })
        }else{
            res.json({status:0,errorNum:98,message:error.message});
        }
    });
}
//编辑添加分类
var savePicture = function(req, res, next){
    var picForm = req.body;
    PictureDao.saveOrUpdateCategory(picForm,function (err, doc) {
        if(err){
          res.json({status:0,errorNum:100,message:"更新失败！"});
        }else{
          res.json({
            status: 1,
            errorNum: 0,
            result:'更新成功'
          });
        }
    })
}

module.exports = {
    getPictureAll: getPictureAll,
    deletePicture: deletePicture,
    deleteForcePicture: deleteForcePicture,
    savePicture: savePicture
  }