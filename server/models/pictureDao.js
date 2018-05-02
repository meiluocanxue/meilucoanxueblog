/**
 * Created by Administrator on 2017/12/2.
 */
var dbHelper = require('./dbHelper');
var Picture = dbHelper.Picture;
var Article = dbHelper.Article;
var Category = dbHelper.Category;
var User = dbHelper.User;

module.exports = {
    findPictureByID: function (id, callback) {
        Picture.find({_id:id}).then(function (doc) {
            callback(doc);
        })
    },
    findPictureByUser: function (userId,callback) {
        Picture.find({_user: userId}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        });
    },
    findPictureByPath: function (path,callback) {
        var urlPath = new RegExp(''+ path +'')
        Picture.find({picurl: urlPath}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        });
    },
    findPictureInArticle:function(path,callback){
        var urlPath = new RegExp(''+ path +'')
        Article.find({picurl: urlPath}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        });
    },
    findPictureInUser: function(path,callback){
        var urlPath = new RegExp(''+ path +'')
        User.find({userpic: urlPath}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        });
    },    
    findPictureInCategory: function(path,callback){
        var urlPath = new RegExp(''+ path +'')
        Category.find({catpic: urlPath}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        });
    },
    checkAllPicture: function(){
        Picture.find({}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        });
    },
    saveOrUpdate: function (pic,callback) {
        if(pic.id){
            pic.updated_time = new Date();
            Picture.update({
                _id:pic.id
            },pic,function (err,doc) {
                callback(err, doc);
            });
        }else{
            Picture.create(pic,function (err, doc) {
                callback(err, doc);
            });
        }
    }
};