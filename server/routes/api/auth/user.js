var async = require("async");
var utils = require('utility');

var config = require('../../../config');
var dbHelper = require('../../../models/dbHelper');
var UserDao = require('../../../models/userDao');

var User = dbHelper.User;

//全部分类
var getUserAll = function(req, res, next){
    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || '';
    var userNick = req.query.userNick || '';
    var userName = req.query.userName || '';
    var userRole = req.query.role || '';
    var status = req.query.status == 'true' ? true : false;


    if(!page) page = 1;
    pageSize = Number(pageSize) || 30;
  
    var queryParams = {};
    if(status===true) queryParams.status = true;
    if(userRole) queryParams.role = userRole;
    if(userNick){
      var nickReg = new RegExp(''+ userNick +'');
      queryParams.usernick = nickReg;
    }
    if(userName){
      var nameReg = new RegExp(''+ userName +'');
      queryParams.username = nameReg;
    }
  
    dbHelper.Methods.pageQuery(page,pageSize,User,'',queryParams,{'created_time':'desc'},function (err, pageInfo) {
      //callback(err,pageInfo);
      if(err){
        res.json({status:0,errorNum:100,message:err});
      }else{
        if(pageInfo.results &&　pageInfo.results.length){
          res.json({
            status: 1,
            errorNum: 0,
            result: {
              users:pageInfo.results,
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

//获取文章
var getSingleUser = function(req, res, next){
  var id = req.query.id
  var me = req.query.me
  if(me){
    id = req.session.user._id 
  }
  if(id){
    User.findById(id, function (err, doc) {
      if(err){
        res.json({status:0,errorNum:100,message:"没有数据"});
      }else{
        res.json({
          status: 1,
          errorNum: 0,
          result: {
            user:doc,
            count:1,
          }
        });
      }
    })
  }else{
    res.json({status:0,errorNum:1,message:"没有id"});
  }
  
}

//分类有效修改
var effectiveUser = function(req, res, next){
    var id = req.query.id;
    var status = req.query.status;
    status = status && status == 'true' ? false : true;
    if(!id){
      res.json({status:0,errorNum:99,message:"请求参数不足！"});
    } 
    User.update({_id: id}, {status: status}, function (err, doc) {
        if(err){
          res.json({status:0,errorNum:98,message:error.message});
        }else{
          //res.redirect('/admin/p');
          res.json({status:1,errorNum:0,result:'ok'});
        }
    });
  }
//删除分类
var deleteUser = function(req, res, next){
    var id = req.query.id;
    if(!id){
        res.json({status:0,errorNum:99,message:"请求参数不足！"});
    } 
    User.findById(id, function (err, doc) {
        if(doc){
            doc.remove(function (err,doc) {
                if(err){
                  res.json({status:0,errorNum:98,message:error.message});
                }else{
                  res.json({status:1,errorNum:0,result:'ok'});
                }
            })
        }else{
            res.json({status:0,errorNum:98,message:error.message});
        }
    });
}
//编辑添加分类
var saveUser = function(req, res, next){
    var userItem = req.body;
    if(userItem.newPassword) userItem.password = userItem.newPassword
    UserDao.saveOrUpdateUser(userItem,function (err, doc) {
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
    getUserAll: getUserAll,
    getSingleUser: getSingleUser,
    effectiveUser: effectiveUser,
    deleteUser: deleteUser,
    saveUser: saveUser
  }