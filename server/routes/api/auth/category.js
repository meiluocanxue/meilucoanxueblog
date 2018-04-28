var async = require("async");
var utils = require('utility');

var config = require('../../../config');
var dbHelper = require('../../../models/dbHelper');
var CategoryDao = require('../../../models/categoryDao');
var articleDao = require('../../../models/articleDao');

var Category = dbHelper.Category;

//全部分类
var getCategoryAll = function(req, res, next){
    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || '';
    var search = req.query.search || '';
    var status = req.query.status == 'true' ? true : false;


    if(!page) page = 1;
    pageSize = Number(pageSize) || 30;
  
    var queryParams = {};
    if(status===true) queryParams.status = true;
    if(search){
      var titleReg = new RegExp(''+ search +'');
      queryParams.name = titleReg;
    }
  
    dbHelper.Methods.pageQuery(page,pageSize,Category,'',queryParams,{'created_time':'desc'},function (err, pageInfo) {
      //callback(err,pageInfo);
      if(err){
        res.json({status:0,errorNum:100,message:err});
      }else{
        if(pageInfo.results &&　pageInfo.results.length){
          res.json({
            status: 1,
            errorNum: 0,
            result: {
              category:pageInfo.results,
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

//分类有效修改
var effectiveCategory = function(req, res, next){
    var id = req.query.id;
    var status = req.query.status;
    status = status && status == 'true' ? false : true;
    if(!id){
      res.json({status:0,errorNum:99,message:"请求参数不足！"});
    } 
    Category.update({_id: id}, {status: status}, function (err, doc) {
        if(err){
          res.json({status:0,errorNum:98,message:error.message});
        }else{
          //res.redirect('/admin/p');
          res.json({status:1,errorNum:0,result:'ok'});
        }
    });
  }
//删除分类
var deleteCategory = function(req, res, next){
    var id = req.query.id;
    if(!id){
        res.json({status:0,errorNum:99,message:"请求参数不足！"});
    } 
    Category.findById(id, function (err, doc) {
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
var saveCategory = function(req, res, next){
    var category = req.body;
    CategoryDao.saveOrUpdateCategory(category,function (err, doc) {
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
    getCategoryAll: getCategoryAll,
    effectiveCategory: effectiveCategory,
    deleteCategory: deleteCategory,
    saveCategory: saveCategory
  }