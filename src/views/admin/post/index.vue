<template>
    <div class="app-container manage-article-list">
        <div class="filter-container">
            <el-input @keyup.enter.native="onHandleFilter" style="width:200px;" placeholder="标题" class="filter-item" v-model="listQuery.search"></el-input>
            <el-select @change="onHandleFilter" style="width:200px;" placeholder="文章分类" class="filter-item" v-model="listQuery.categoryId">
                <el-option label="全部分类" value=""></el-option>
                <el-option v-for="(categoryItem, key) in categoryList" :key="key" :label="categoryItem.name" :value="categoryItem._id"></el-option>
            </el-select>
            <el-select @change="onHandleFilter" style="width:100px;" placeholder="类型" class="filter-item" v-model="listQuery.articleSourceType">
                <el-option label="原创" value="原创"></el-option>
                <el-option label="分享" value="分享"></el-option>
            </el-select>
            <el-checkbox class="filter-item" style='margin-left:15px;' v-model="listQuery.up">置顶</el-checkbox>
            <el-checkbox class="filter-item" style='margin-left:15px;' v-model="listQuery.recommend">热门</el-checkbox>
            <el-checkbox class="filter-item" style='margin-left:15px;' v-model="listQuery.status">有效</el-checkbox>
            
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="onHandleFilter" >搜索</el-button>
            <el-button class="filter-item" style="margin-left:10px;" type="primary" v-waves icon="el-icon-edit" @click="onCreateArticle" >添加文章</el-button>
        </div>
        <div class="manage-article-content">
            <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                style="width: 100%">
                
                <el-table-column align="left" label="标题" min-width="180px">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.type}}</el-tag>
                        <el-tag type="success" v-if="scope.row.up">已置顶</el-tag>
                        <el-tag type="success" v-if="scope.row.recommend">已推荐</el-tag>
                        <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.title}}</span>
                        
                    </template>             
                </el-table-column>
                <el-table-column width="90px" align="center" label="分类">
                    <template slot-scope="scope">
                        <span>{{scope.row._category.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150px" align="center" label="时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="70px" align="center" label="作者">
                    <template slot-scope="scope">
                        <span>{{scope.row._user.usernick}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="阅读数" width="65">
                    <template slot-scope="scope">
                        <span v-if="scope.row.pageviews" class="link-type">{{scope.row.pageviews}}</span>
                        <span v-else>无</span>
                    </template>
                </el-table-column>
                <el-table-column class-name="status-col" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status | statusFilter">{{scope.row.status?'发布':'草稿'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="380" class-name="small-padding">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.up!= 1" type="primary" size="mini" @click="onHandleUp(scope.row)">置顶</el-button>
                        <el-button v-if="scope.row.up!= 0" size="mini" @click="onHandleUp(scope.row)">不置顶</el-button>
                        <el-button v-if="scope.row.recommend!= 1" type="primary" size="mini" @click="onHandleRecommend(scope.row)">推荐</el-button>
                        <el-button v-if="scope.row.recommend!= 0" size="mini" @click="onHandleRecommend(scope.row)">不推荐</el-button>
                        <el-button type="primary" size="mini" @click="onHandleUpdate(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.status!= 1" size="mini" type="success" @click="onHandleModifyStatus(scope.row)">发布</el-button>
                        <el-button v-if="scope.row.status!= 0" size="mini" @click="onHandleModifyStatus(scope.row)">草稿</el-button>
                        <el-button size="mini" type="danger" @click="onHandleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-show="!listLoading && total>listQuery.pageSize" class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                    :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import * as postMethods from '../../../api/post'
import waves from '../../../directive/waves' // 水波纹指令
import { parseTime } from '../../../utils'
export default {
    name: 'artcleList',
    directives: {
        waves
    },
    data(){
        return {
            tableKey: 0,
            list: null,
            total: null,
            listLoading: true,
            listQuery:{
                page: 1,
                pageSize: 20,
                search: '',
                categoryId: '',
                up: '',
                recommend: '',
                articleSourceType: '',
                status: ''
            },
            categoryList:[],

        }
    },
    filters: {
        statusFilter(status) {
        const statusMap = {
            published: 'success',
            draft: 'info',
            deleted: 'danger'
        }
        return statusMap[status]
        },
        typeFilter(type) {
        return calendarTypeKeyValue[type]
        }
    },
    created(){
        this.getCategoryList();
    },
    mounted(){
        this.getList();
    },
    methods: {
        getList(){
            postMethods.getPostList(this.listQuery).then(res=>{
                this.total = res.count;
                this.list = res.articles
                this.listLoading = false;
            }).catch(res=>{
                this.total = 0;
                this.list = []
                this.listLoading = false;
            })
        },
        getCategoryList(){
            postMethods.getCategoryAll().then(res=>{
                this.categoryList = res.categoryList
            }).catch(res=>{this.categoryList = []})
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleCurrentChange(val) {
            this.listQuery.page = val
            this.getList()
        },
        onHandleFilter(){
            this.$nextTick(() => {
                this.getList()
            })
        },
        onCreateArticle(){
            this.$router.push({
                path: '/admin/p/post'
            })
        },
        onHandleUp(data){
            postMethods.postUp({id:data._id, up:data.up}).then(res=>{
                this.getList()
            }).catch(res=>{

            })
        },
        onHandleRecommend(data){
            postMethods.postRecommend({id:data._id, recommend:data.recommend}).then(res=>{
                this.getList()
            })
        },
        onHandleUpdate(data){
            this.$router.push({
                path: '/admin/p/post',
                query: {
                    id: data._id
                }
            })
        },
        onHandleModifyStatus(data){
            postMethods.postPublish({id:data._id, status:data.status}).then(res=>{
                this.getList()
            })
        },
        onHandleDelete(data){
            postMethods.postDelete({id:data._id}).then(res=>{
                this.getList()
            })
        },
    }
}
</script>
<style lang="sass" scoped>
    
</style>
