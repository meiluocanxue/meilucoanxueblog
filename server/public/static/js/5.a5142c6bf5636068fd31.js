webpackJsonp([5,21],{KR8f:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("vLgD");var r=s("NYxO"),l={data:function(){return{siteName:"梅落残雪",keyword:""}},computed:Object(r.c)({user:function(t){return t.user&&0!=t.user.length||this.$store.dispatch("updateUserFromLs"),t.user}}),components:{},mounted:function(){}},i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("header",{staticClass:"afly-header"},[s("div",{staticClass:"afly-header-top"}),t._v(" "),s("div",{staticClass:"afly-layout"},[s("div",{staticClass:"afly-logo-box"},[s("div",{},[s("h1",[t._v(t._s(t.siteName)+" "),s("small",[t._v(" 路，就在脚下")])])]),t._v(" "),s("div",{staticClass:"afly-search"},[s("form",{staticClass:"form-inline",attrs:{id:"search-form",action:"/search",method:"post"}},[s("div",{staticClass:"form-group"},[s("label",{staticClass:"sr-only",attrs:{for:"search"}},[t._v("搜索")]),t._v(" "),s("input",{staticClass:"form-control input-sm",attrs:{type:"text",name:"keyword",id:"search",placeholder:"输入关键字"},domProps:{value:t.keyword}})]),t._v(" "),s("button",{staticClass:"btn btn-black btn-sm js-search",attrs:{type:"submit"}},[t._v("搜索")]),t._v(" "),t.user?t._e():s("a",{staticClass:"btn btn-black btn-sm",attrs:{role:"button",href:"/login"}},[t._v("登录")]),t._v(" "),t.user?s("a",{staticClass:"btn btn-black btn-sm dropdown-toggle afly-user-btn",staticStyle:{position:"relative"},attrs:{href:"#","data-toggle":"dropdown"}},[s("img",{staticClass:"afly-user-image",attrs:{src:t.user||t.user.userPic,width:"20",alt:"User Image"}}),t._v(" "),s("span",{},[t._v(t._s(t.user||t.user.userNick))])]):t._e(),t._v(" "),t.user?s("ul",{staticClass:"dropdown-menu dropdown-menu-right afly-user-drop"},[s("li",{staticClass:"user-header"},[s("img",{staticClass:"img-circle",attrs:{src:t.user||t.user.userPic,alt:"User Image"}}),t._v(" "),s("p",[t._v(t._s(t.user||t.user.userNick)+" ")]),t._v(" "),t._m(0)]),t._v(" "),s("li",{staticClass:"user-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"text-center small"},[t._v("\n                    "+t._s(t.user||t.user.signature)+"\n                  ")])])])]),t._v(" "),t._m(1)]):t._e()])])]),t._v(" "),t._m(2)])])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("p",[a("small",[a("b",[this._v("谢谢")]),this._v(" 加入本站")])])},function(){var t=this.$createElement,a=this._self._c||t;return a("li",{staticClass:"user-footer"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("a",{staticClass:"btn btn-black",attrs:{href:"/user/edit"}},[this._v("修改信息")])]),this._v(" "),a("div",{staticClass:"col-md-6"},[a("a",{staticClass:"btn btn-default btn-block",attrs:{href:"/logout"}},[a("i",{staticClass:"fa fa-sign-out"}),this._v(" 退 出")])])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"navbar navbar-afly"},[s("div",{staticClass:"navbar-header"}),t._v(" "),s("div",{staticClass:"collapse navbar-collapse"},[s("ul",{staticClass:"nav navbar-nav"},[s("li",{staticClass:"active"},[s("a",{staticClass:"navbar-link afly-nav-link",attrs:{href:"/"}},[t._v("网站首页")])]),t._v(" "),s("li",{staticClass:"dropdown"},[s("a",{staticClass:"dropdown-toggle afly-nav-link",attrs:{href:"javascript:void(0);","data-toggle":"dropdown",role:"button","aria-haspopup":"true","aria-expanded":"false"}},[t._v("关于我"),s("span",{staticClass:"caret"})]),t._v(" "),s("ul",{staticClass:"dropdown-menu"},[s("li",[s("a",{attrs:{href:"/aboutme"}},[t._v("我的简介")])]),t._v(" "),s("li",[s("a",{attrs:{href:"/my"}},[t._v("我的相册")])])])]),t._v(" "),s("li",{staticClass:"dropdown"},[s("a",{staticClass:"dropdown-toggle afly-nav-link",attrs:{href:"javascript:void(0);","data-toggle":"dropdown",role:"button","aria-haspopup":"true","aria-expanded":"false"}},[t._v("我的生活"),s("span",{staticClass:"caret"})]),t._v(" "),s("ul",{staticClass:"dropdown-menu"},[s("li",[s("a",{attrs:{href:"/c/"}})])])]),t._v(" "),s("li",{staticClass:"dropdown"},[s("a",{staticClass:"dropdown-toggle afly-nav-link",attrs:{href:"javascript:void(0);","data-toggle":"dropdown",role:"button","aria-haspopup":"true","aria-expanded":"false"}},[t._v("技术知识"),s("span",{staticClass:"caret"})]),t._v(" "),s("ul",{staticClass:"dropdown-menu"},[s("li",[s("a",{attrs:{href:""}})])])]),t._v(" "),s("li",{},[s("a",{staticClass:"afly-nav-link",attrs:{href:"javascript:alert('大爷，不好意思，该板块正在开发！');"}},[t._v("给我留言")])])])])])}]},n=s("VU/8")(l,i,!1,null,null,null).exports,o={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("footer",{staticClass:"afly-footer"},[a("div",{staticClass:"afly-layout"},[a("p",{staticClass:"text-center"},[this._v("All Rights Reserved 版权所有："),a("a",{attrs:{href:"http://www.loveyedie.xin"}},[this._v("梅落残雪个人博客")])]),this._v(" "),a("p",{staticClass:"text-center"},[this._v("Design by 梅落残雪")])])])}]},c=s("VU/8")({data:function(){return{}}},o,!1,null,null,null).exports,d=s("NlKZ"),v={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"afly-pager",attrs:{"aria-label":"Page navigation"}},[s("ul",{staticClass:"pagination"},[s("li",[s("router-link",{attrs:{to:"/home?p="+t.pager.page>1?t.pager.page-1:1,"aria-label":"Previous"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])],1),t._v(" "),t._l(t.pager.pageArr,function(a,e){return s("li",{class:a==t.pager.page?t.active:""},[s("router-link",{attrs:{to:t.pager.page==a?"javascript:void(0);":"/home?p="+a}},[t._v("\n        "+t._s(a)+"\n      ")])],1)}),t._v(" "),s("li",[s("router-link",{attrs:{to:"/home?p="+t.pager.pageCount>t.pager.page?t.pager.page+1:t.pager.pageCount,"aria-label":"Previous"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])],1)],2)])},staticRenderFns:[]},u=s("VU/8")({prop:["pager"],data:function(){return{}},components:{},mounted:function(){}},v,!1,null,null,null).exports,p={data:function(){return{name:"梅落残雪",list:[],pager:{}}},components:{NavHeader:n,PostList:d.default,NavPager:u,NavFooter:c},mounted:function(){var t,a=this;(t={catId:"",p:""},Object(e.a)({url:"/category",method:"get",params:{data:t}})).then(function(t){console.log(t),a.list=t.articles,a.pager={page:t.page,pageArr:t.pageArr,pageCount:t.pageCount,pageUrl:t.pageUrl,count:t.count}}).catch(function(t){console.log(t)})}},_={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"afly-router-home"},[s("div",{staticClass:"afly-index-top"}),t._v(" "),s("el-row",{staticClass:"afly-index-body afly-layout"},[s("el-col",{staticClass:"afly-main",attrs:{span:16}},[s("post-list",{attrs:{list:t.list}})],1),t._v(" "),s("el-col",{staticClass:"afly-slidebar",attrs:{span:8}},[s("div",{staticClass:"afly-wedget"},[s("h4",{staticClass:"afly-wedget-title clearfix",attrs:{slot:"header"},slot:"header"},[t._v("关注我")]),t._v(" "),s("el-row",{staticClass:"afly-wedget-content afly-wedget-me"},[s("el-col",{attrs:{span:6}},[s("a",{staticClass:"block tel",attrs:{href:"javascript:void(0);",title:"保密"}},[t._v("我的电话")])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("a",{staticClass:"email",attrs:{href:"mailto:admin@admin.com",target:"_blank"}},[t._v("我的邮箱")])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("a",{staticClass:"qq",attrs:{href:"javascript:void(0);",title:"11360431"}},[t._v("我的QQ")])]),t._v(" "),s("el-col",{attrs:{span:6}},[s("a",{staticClass:"prize",attrs:{href:"https://github.com/loveyedie"}},[t._v("github")])])],1)],1),t._v(" "),s("div",{staticClass:"afly-wedget"},[s("div",{staticClass:"afly-wedget-title clearfix",attrs:{slot:"header"},slot:"header"},[t._v("推荐图文")]),t._v(" "),s("el-row",{staticClass:"afly-wedget-content"})],1),t._v(" "),s("div",{staticClass:"afly-wedget"},[s("div",{staticClass:"afly-wedget-title clearfix",attrs:{slot:"header"},slot:"header"},[t._v("热门排行")]),t._v(" "),s("el-row",{staticClass:"afly-wedget-content"})],1)])],1),t._v(" "),s("div",{staticClass:"afly-index-bottom"})],1)},staticRenderFns:[]};var f=s("VU/8")(p,_,!1,function(t){s("ewt9")},"data-v-db27bd24",null);a.default=f.exports},NlKZ:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("section",t._l(t.list,function(a){return s("article",{staticClass:"afly-index-post"},[s("h4",[s("router-link",{staticClass:"afly-link-post",attrs:{to:"p/"+a._id}},[t._v(t._s(a.title))])],1),t._v(" "),s("div",{staticClass:"row afly-post-body"},[s("div",{staticClass:"col-md-3"},[s("img",{staticClass:"afly-post-pic",attrs:{src:"http://localhost:/"+(a.picurl||a._category.catpic),alt:"pic"}})]),t._v(" "),s("div",{staticClass:"col-md-9"},[s("p",{staticClass:"afly-post-content"},[t._v(t._s(a.content))]),t._v(" "),s("router-link",{staticClass:"btn btn-black afly-link-more pull-right",attrs:{to:"p/"+a._id}},[t._v("阅读全文")])],1)]),t._v(" "),s("footer",{staticClass:"afly-post-footer"},[s("span",[t._v(t._s(a.updated_time))]),t._v(" "),s("span",[t._v("作者："+t._s(a._user.usernick))]),t._v(" "),s("span",[t._v("个人博客：["),s("router-link",{attrs:{to:"c/"+a._category._id}},[t._v(t._s(a._category.name))]),t._v("]")],1)])])}))},staticRenderFns:[]},r=s("VU/8")({props:["list"],data:function(){return{}},components:{},mounted:function(){}},e,!1,null,null,null);a.default=r.exports},ewt9:function(t,a){}});
//# sourceMappingURL=5.a5142c6bf5636068fd31.js.map