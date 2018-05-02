/**
 * Created by Administrator on 2017/12/7.
 */
var express = require('express');
var router = express.Router();
var async = require("async");

var config = require('../../../config');
var dbHelper = require('../../../models/dbHelper');

var svgCaptcha = require('svg-captcha');

var post = require('./post');
var category = require('./category');
var user = require('./user');
var picture = require('./picture');




router.get('/', function(req, res, next){
    res.json({status:0,errorNum:304,message:"大爷，你没这权限2222，嘿嘿！"});
});

router.get('/post/list', post.getPostList);
router.get('/post/up', post.upArticle);
router.get('/post/recommend', post.recommendArticle);
router.get('/post/publish', post.publishArticle);
router.get('/post/delete', post.deleteArticle);
router.get('/post/single', post.getSingleArticle);
router.post('/post/save', post.saveSingleArticle);
router.get('/category/list', post.getCategoryList);
router.get('/category/all', category.getCategoryAll);
router.get('/category/effect', category.effectiveCategory);
router.get('/category/delete', category.deleteCategory);
router.post('/category/save', category.saveCategory);

router.get('/user/all', user.getUserAll);
router.get('/user/one', user.getSingleUser);

router.get('/user/effect', user.effectiveUser);
router.get('/user/delete', user.deleteUser);
router.post('/user/save', user.saveUser);

router.get('/picture/all', picture.getPictureAll);
router.get('/picture/delete', picture.deletePicture);
router.get('/picture/forceDelete', picture.deleteForcePicture);
router.post('/picture/save', picture.savePicture);

module.exports = router;
