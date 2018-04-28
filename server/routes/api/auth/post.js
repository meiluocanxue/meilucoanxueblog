var async = require("async");
var utils = require('utility');

var config = require('../../../config');
var dbHelper = require('../../../models/dbHelper');
var CategoryDao = require('../../../models/categoryDao');
var articleDao = require('../../../models/articleDao');

var Article = dbHelper.Article;
var Category = dbHelper.Category;

var lodash = require('lodash');

var getTags = function (value) {
  return lodash.split(value,',');
};

function getPostsByCategory(catId,searchStr, page, pageSize, status, up, recommend, type, callback) {
    
    if(!page) page = 1;
    var pageSize = Number(pageSize) || config.article.pageSize;
  
    var queryParams = {};
    if(catId) queryParams._category = catId;
    if(status===true) queryParams.status = true;
    if(up===true) queryParams.up = up; 
    if(type) queryParams.type = type; 
    if(recommend===true) queryParams.recommend = recommend;
    if(searchStr){
      var titleReg = new RegExp(''+ searchStr +'');
      queryParams.title = titleReg;
    }
  
    dbHelper.Methods.pageQuery(page,pageSize,Article,'_user _category',queryParams,{'created_time':'desc'},function (err, pageInfo) {
      callback(err,pageInfo);
    });
}

//文章列表
var getPostList = function (req, res, next) {
    var page = req.query.page || 1;
    var pageSize = req.query.pageSize || '';
    var catId = req.query.categoryId || '';
    var search = req.query.search || '';
    var up = req.query.up == 'true' ? true : '';
    var recommend = req.query.recommend == 'true' ? true : '';
    var type = req.query.articleSourceType || '';
    var status = req.query.status == 'true' ? true : '';
    if(req.query.status)  status = req.query.status;
    getPostsByCategory(catId,search, page, pageSize, status, up, recommend, type, function(err,pageInfo){
      if(err){
        res.json({status:0,errorNum:100,message:err});
      }else{
        if(pageInfo.results &&　pageInfo.results.length){
          res.json({
            status: 1,
            errorNum: 0,
            result: {
              articles:pageInfo.results,
              page:page,
              pageCount:pageInfo.pageCount,
              count:pageInfo.count,
            }
          });
        }else{
          res.json({status:0,errorNum:100,message:"没有数据"});
        }
        
      }
    })
}
//置顶文章
var upArticle = function(req, res, next){
  var id = req.query.id;
  var up = req.query.up;
  up = up && up == 'true' ? false : true;
  if(!id){
    res.json({status:0,errorNum:99,message:"请求参数不足！"});
  } 
  Article.update({_id: id}, {up: up}, function (err, doc) {
      if(err){
        res.json({status:0,errorNum:98,message:error.message});
      }else{
        //res.redirect('/admin/p');
        res.json({status:1,errorNum:0,result:'ok!'});
      }
  });
}
//推荐文章
var recommendArticle = function(req, res, next){
  var id = req.query.id;
  var recommend = req.query.recommend;
  recommend = recommend && recommend == 'true' ? false : true;
  if(!id){
    res.json({status:0,errorNum:99,message:"请求参数不足！"});
  } 
  Article.update({_id: id}, {recommend: recommend}, function (err, doc) {
      if(err){
        res.json({status:0,errorNum:98,message:error.message});
      }else{
        //res.redirect('/admin/p');
        res.json({status:1,errorNum:0,result:'ok!'});
      }
  });
}
//草稿发布修改
var publishArticle = function(req, res, next){
  var id = req.query.id;
  var status = req.query.status;
  status = status && status == 'true' ? false : true;
  if(!id){
    res.json({status:0,errorNum:99,message:"请求参数不足！"});
  } 
  Article.update({_id: id}, {status: status}, function (err, doc) {
      if(err){
        res.json({status:0,errorNum:98,message:error.message});
      }else{
        //res.redirect('/admin/p');
        res.json({status:1,errorNum:0,result:'ok'});
      }
  });
}
//删除文章
var deleteArticle = function(req, res, next){
  var id = req.query.id;
  if(!id){
    res.json({status:0,errorNum:99,message:"请求参数不足！"});
  } 
  Article.findById(id, function (err, doc) {
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
//获取文章
var getSingleArticle = function(req, res, next){
  var id = req.query.id
  if(id){
    Article.findById(id, function (err, doc) {
      if(err){
        res.json({status:0,errorNum:100,message:"没有数据"});
      }else{
        res.json({
          status: 1,
          errorNum: 0,
          result: {
            article:doc,
            count:1,
          }
        });
      }
    })
  }else{
    res.json({status:0,errorNum:1,message:"没有id"});
  }
  
}
//编辑添加文章
var saveSingleArticle = function(req, res, next){
  var article = req.body;
  article.tags = getTags(article.articleTags);
  article._user = req.session.user._id;
  article._category = article.category;
  //article.html = md.render(article.content);
  articleDao.saveOrUpdate(article,function (err, doc) {
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
//全部有效分类
var getCategoryList = function(req, res, next){
    CategoryDao.findCategoryUsed(function(doc){
      if(doc && doc.length){
        res.json({
          status: 1,
          errorNum: 0,
          result: {
            categoryList:doc,
            count:doc.length,
          }
        });
      }else{
        res.json({status:0,errorNum:100,message:"没有数据"});
      }
    });
}
  
  

  
  
  
  module.exports = {
    getPostList: getPostList,
    getCategoryList: getCategoryList,
    upArticle: upArticle,
    recommendArticle: recommendArticle,
    publishArticle: publishArticle,
    deleteArticle: deleteArticle,
    getSingleArticle: getSingleArticle,
    saveSingleArticle: saveSingleArticle
  }