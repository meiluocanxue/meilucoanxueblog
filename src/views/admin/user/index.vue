<template>
    <div class="app-container manage-user-list">
        <div class="filter-container">
            <el-input style="width:200px;" placeholder="用户名" class="filter-item" v-model="listQuery.userName"></el-input>
            <el-input style="width:200px;" placeholder="昵称" class="filter-item" v-model="listQuery.userNick"></el-input>
            <el-select @change="onHandleFilter" style="width:100px;" placeholder="用户角色" class="filter-item" v-model="listQuery.userRole">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="用户" value="user"></el-option>
            </el-select>
            <el-checkbox class="filter-item" style='margin-left:15px;' v-model="listQuery.status">有效</el-checkbox>
            
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="onHandleFilter" >搜索</el-button>
            <el-button class="filter-item" style="margin-left:10px;" type="primary" v-waves icon="el-icon-edit" @click="onCreateUser(false)" >添加分类</el-button>
        </div>
        <div class="manage-article-content">
            <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                style="width: 100%">
                
                <el-table-column align="left" label="用户名" min-width="90px">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.username}}</span>
                    </template>             
                </el-table-column>
                <el-table-column align="center" label="昵称" min-width="100px">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.usernick}}</span>
                    </template>             
                </el-table-column>
                <el-table-column width="110px" align="center" label="用户图像">
                    <template slot-scope="scope">
                        <img :src="scope.row.userpic | pictureFullUrlFilter" height="90">
                    </template>
                </el-table-column>
                <el-table-column width="70px" align="center" label="角色">
                    <template slot-scope="scope">
                        <span>{{scope.row.role == 'admin'? '管理员' : '普通用户'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" label="手机号" min-width="90px">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.mobile}}</span>
                    </template>             
                </el-table-column>
                <el-table-column align="left" label="邮箱" min-width="100px">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.email}}</span>
                    </template>             
                </el-table-column>
                <el-table-column align="left" label="网站" min-width="100px">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.website}}</span>
                    </template>             
                </el-table-column>
                <el-table-column align="left" label="github" min-width="100px">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.github}}</span>
                    </template>             
                </el-table-column>
                
                <el-table-column class-name="status-col" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status | statusFilter">{{scope.row.status?'有效':'无效'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="280" class-name="small-padding">
                    <template slot-scope="scope">
                        <el-button type="primary" v-waves size="mini" @click="onCreateUser(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.status!= 1" size="mini" type="success" @click="onHandleModifyStatus(scope.row)">生效</el-button>
                        <el-button v-if="scope.row.status!= 0" size="mini" @click="onHandleModifyStatus(scope.row)">禁用</el-button>
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
import * as userMethods from '../../../api/user'
import waves from '../../../directive/waves' // 水波纹指令
import { parseTime } from '../../../utils'

export default {
    name: 'userList',
    directives: {
        waves
    },
    components:{}, 
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
                status: ''
            },
            dialogtitle: '',
            dialogEditUser: false,
            isEdit: false,
            editData: null

        }
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                1: 'success',
                0: 'danger'
            }
            return statusMap[status]
        },
        pictureFullUrlFilter(src) {
            return process.env.PIC_HOST + src
        }
    },
    created(){
        this.getList();
    },
    mounted(){
        //this.getList();
    },
    methods: {
        getList(){
            userMethods.getUsersAll(this.listQuery).then(res=>{
                this.total = res.count;
                this.list = res.users
                this.listLoading = false;
            }).catch(res=>{
                this.total = 0;
                this.list = []
                this.listLoading = false;
            })
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
        onCreateUser(data){
            if(data){
                //this.dialogtitle = '编辑用户'
                //this.isEdit = true
                //this.editData = data
                this.$router.push({path:'/admin/u/user',query:{id:data._id}})
            }else{
                //this.editData = false
                //this.dialogtitle = '添加用户'
                //this.editData = null
                this.$router.push({path:'/admin/u/user'})
            }
        },
        onHandleModifyStatus(data){
            userMethods.userStatus({id:data._id, status:data.status}).then(res=>{
                this.getList()
            })
        },
        onHandleDelete(data){
            userMethods.userDelete({id:data._id}).then(res=>{
                this.getList()
            })
        },
    }
}
</script>
<style lang="sass" scoped>
    
</style>
