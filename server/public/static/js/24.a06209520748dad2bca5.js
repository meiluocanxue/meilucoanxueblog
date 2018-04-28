webpackJsonp([24],{h4TW:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("KQHe"),a=s("cAgV"),l=s("vMJZ"),r={name:"userForm",components:{Upload:i.a},props:{editData:{type:Object,default:null},callback:{type:Function,default:null},isEdit:{type:Boolean,default:!0},closeDialog:{type:Function,default:null}},directives:{waves:a.a},data:function(){return{userItem:{id:"",username:"",usernick:"",newPassword:"",userpic:"/upload/userpic/default.jpg",role:"user",sex:"秘密",age:18,email:"",mobile:"",website:"",weibo:"",address:"",github:"",signature:"",job:"",status:1},rules:{username:[{required:!0,message:"用户名必须填写",trigger:"change"}],userpic:[{required:!0,message:"用户图像",trigger:"change"}]}}},updated:function(){console.log(this.isEdit),this.initData()},methods:{initData:function(){"null"!=typeof this.editData&&this.isEdit&&(this.userItem.id=this.editData._id,this.userItem.username=this.editData.username,this.userItem.usernick=this.editData.usernick,this.userItem.userpic=this.editData.userpic,this.userItem.role=this.editData.role,this.userItem.sex=this.editData.sex,this.userItem.age=this.editData.age,this.userItem.email=this.editData.email,this.userItem.mobile=this.editData.mobile,this.userItem.website=this.editData.website,this.userItem.weibo=this.editData.weibo,this.userItem.address=this.editData.address,this.userItem.github=this.editData.github,this.userItem.signature=this.editData.signature,this.userItem.job=this.editData.job,this.userItem.status=this.editData.status)},onUpdateUser:function(){var e=this;this.$refs.userForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,Object(l.d)(e.userItem).then(function(t){e.$notify({title:"成功",message:"更新用户成功",type:"success",duration:2e3}),"null"!=typeof e.callback&&e.callback()}).catch(function(t){e.onDialogClose()})})},onDialogClose:function(){"null"!=typeof this.closeDialog&&this.closeDialog()}}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-form"},[s("el-form",{ref:"userForm",staticStyle:{width:"600px","margin-left":"50px"},attrs:{rules:e.rules,model:e.userItem,"label-position":"left","label-width":"90px"}},[s("el-form-item",{attrs:{label:"用户名",prop:"username","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.username,callback:function(t){e.$set(e.userItem,"username",t)},expression:"userItem.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"昵称",prop:"usernick","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.usernick,callback:function(t){e.$set(e.userItem,"usernick",t)},expression:"userItem.usernick"}})],1),e._v(" "),s("el-form-item",{attrs:{"label-width":"90px",label:"用户图像",prop:"userpic"}},[s("Upload",{attrs:{uploadType:"userpic",hideOne:!0},model:{value:e.userItem.userpic,callback:function(t){e.$set(e.userItem,"userpic",t)},expression:"userItem.userpic"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码",prop:"password","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.password,callback:function(t){e.$set(e.userItem,"password",t)},expression:"userItem.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"性别",prop:"sex","label-width":"90px"}},[s("el-radio-group",{model:{value:e.userItem.sex,callback:function(t){e.$set(e.userItem,"sex",t)},expression:"userItem.sex"}},[s("el-radio",{attrs:{label:"男"}},[e._v("男")]),e._v(" "),s("el-radio",{attrs:{label:"女"}},[e._v("女")]),e._v(" "),s("el-radio",{attrs:{label:"保密"}},[e._v("保密")])],1)],1),e._v(" "),s("el-form-item",{attrs:{label:"年龄",prop:"age","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.age,callback:function(t){e.$set(e.userItem,"age",t)},expression:"userItem.age"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"email",prop:"email","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.email,callback:function(t){e.$set(e.userItem,"email",t)},expression:"userItem.email"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"手机",prop:"mobile","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.mobile,callback:function(t){e.$set(e.userItem,"mobile",t)},expression:"userItem.mobile"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"网站",prop:"website","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.website,callback:function(t){e.$set(e.userItem,"website",t)},expression:"userItem.website"}},[s("template",{slot:"prepend"},[e._v("Http://")])],2)],1),e._v(" "),s("el-form-item",{attrs:{label:"微博",prop:"weibo","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.weibo,callback:function(t){e.$set(e.userItem,"weibo",t)},expression:"userItem.weibo"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"github",prop:"github","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.github,callback:function(t){e.$set(e.userItem,"github",t)},expression:"userItem.github"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"地址",prop:"address","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.address,callback:function(t){e.$set(e.userItem,"address",t)},expression:"userItem.address"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"工作",prop:"job","label-width":"90px"}},[s("el-input",{model:{value:e.userItem.job,callback:function(t){e.$set(e.userItem,"job",t)},expression:"userItem.job"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"签名",prop:"signature","label-width":"90px"}},[s("el-input",{attrs:{type:"textarea",autosize:""},model:{value:e.userItem.signature,callback:function(t){e.$set(e.userItem,"signature",t)},expression:"userItem.signature"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"生效",prop:"order","label-width":"90px"}},[s("el-checkbox",{attrs:{label:"生效"},model:{value:e.userItem.status,callback:function(t){e.$set(e.userItem,"status",t)},expression:"userItem.status"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e.isEdit?s("el-button",{attrs:{type:"primary"},on:{click:e.onUpdateUser}},[e._v("修改")]):s("el-button",{attrs:{type:"primary"},on:{click:e.onUpdateUser}},[e._v("添加")]),e._v(" "),s("el-button",{on:{click:e.onDialogClose}},[e._v("取消")])],1)],1)},staticRenderFns:[]},o=s("VU/8")(r,u,!1,null,null,null);t.default=o.exports}});
//# sourceMappingURL=24.a06209520748dad2bca5.js.map