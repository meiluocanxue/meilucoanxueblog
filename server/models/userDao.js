/**
 * Created by Administrator on 2017/12/3.
 */
var dbHelper = require('./dbHelper');
var User = dbHelper.User;

module.exports = {
    findCategoryUsed: function (callback) {
        User.find({status:true}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        })
    },
    findUserAll: function (callback) {
        User.find({}).sort({'created_time':'desc'}).then(function (doc) {
            callback(doc);
        })
    },
    findUserByID: function (id, callback) {
        User.find({_id:id}).then(function (doc) {
            callback(doc);
        })
    },
    saveOrUpdateUser: function (userItem, callback) {
        if(userItem.id){
            User.update({_id:userItem.id},userItem,function (err,doc) {
                callback(err,doc);
            })
        }else{
            User.create(userItem, function (err, doc) {
                callback(err,doc);
            })
        }
    }
};