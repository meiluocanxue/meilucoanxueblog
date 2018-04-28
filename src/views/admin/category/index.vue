<template>
    <div class="app-container manage-category-list">
        <div class="filter-container">
            <el-input @keyup.enter.native="onHandleFilter" style="width:200px;" placeholder="标题" class="filter-item" v-model="listQuery.search"></el-input>
            
            <el-checkbox class="filter-item" style='margin-left:15px;' v-model="listQuery.status">有效</el-checkbox>
            
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="onHandleFilter" >搜索</el-button>
            <el-button class="filter-item" style="margin-left:10px;" type="primary" v-waves icon="el-icon-edit" @click="onCreateCategory(false)" >添加分类</el-button>
        </div>
        <div class="manage-article-content">
            <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
                style="width: 100%">
                
                <el-table-column align="left" label="标题" min-width="180px">
                    <template slot-scope="scope">
                        <span class="link-type">{{scope.row.name}}</span>
                    </template>             
                </el-table-column>
                <el-table-column width="150px" align="center" label="分类配图">
                    <template slot-scope="scope">
                        <img :src="scope.row.catpic | pictureFullUrlFilter" height="120">
                    </template>
                </el-table-column>
                <el-table-column width="70px" align="center" label="order">
                    <template slot-scope="scope">
                        <span>{{scope.row.order}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150px" align="center" label="时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.updated_at | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column class-name="status-col" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status | statusFilter">{{scope.row.status?'有效':'无效'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="380" class-name="small-padding">
                    <template slot-scope="scope">
                        <el-button type="primary" v-waves size="mini" @click="onCreateCategory(scope.row)">编辑</el-button>
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

        <!--编辑添加分类-->
        <el-dialog :title="dialogtitle" :visible.sync="dialogEditCategory">
            <el-form :rules="rules" ref="categoryForm" :model="categoryItem" label-position="left" label-width="70px" style='width: 500px; margin-left:50px;'>
                
                
                <el-form-item label="分类名字" prop="name" label-width="90px">
                    <el-input v-model="categoryItem.name"></el-input>
                </el-form-item>
                <el-form-item label-width="90px"  label="配图:" prop="catpic">
                    <Upload v-model="categoryItem.catpic" :uploadType="'category'" :hideOne="true"></Upload>
                </el-form-item>
                <el-form-item label="排序" prop="order" label-width="90px">
                    <el-input v-model="categoryItem.order"></el-input>
                </el-form-item>
                <el-form-item label="生效" prop="order" label-width="90px">
                    <el-checkbox label="生效" v-model="categoryItem.status"></el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="dialogtitle=='添加分类'" v-waves type="primary" @click="onUpdateCategory">添加</el-button>
                <el-button v-else type="primary" v-waves @click="onUpdateCategory">修改</el-button>
                <el-button @click="dialogEditCategory = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import * as categoryMethods from '../../../api/category'
import waves from '../../../directive/waves' // 水波纹指令
import { parseTime } from '../../../utils'
import Upload from '../../../components/Upload/singleImage3'

export default {
    name: 'categoryList',
    directives: {
        waves
    },
    components:{Upload}, 
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
            dialogEditCategory: false,
            categoryItem: {
                id: '',
                name: '',
                catpic: '/upload/category/cat-default.jpg',
                order: 1,
                status: 1
            },
            rules: {
                name: [{ required: true, message: '分类名字必须填写', trigger: 'change' }],
                catpic: [{ required: true, message: '配图需要填写', trigger: 'change' }]
            }

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
        this.getList();
    },
    methods: {
        getList(){
            categoryMethods.getCategoryAll(this.listQuery).then(res=>{
                this.total = res.count;
                this.list = res.category
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
        onCreateCategory(data){

            this.dialogEditCategory = true;
            this.dialogtitle = data ? '编辑分类' : '添加分类'
            if(data){
                this.categoryItem.id = data._id
                this.categoryItem.name = data.name
                this.categoryItem.catpic = data.catpic
                this.categoryItem.order = data.order
                this.categoryItem.status = data.status
            }else{
                this.categoryItem.id = ''
                this.categoryItem.name = ''
                this.categoryItem.catpic = '/upload/category/cat-default.jpg'
                this.categoryItem.order = 1
                this.categoryItem.status = false
            }
        },
        onUpdateCategory(){
            this.$refs.categoryForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    categoryMethods.categorySave(this.categoryItem).then(res=>{
                        this.$notify({
                            title: '成功',
                            message: '更新分类成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.loading = false
                        this.dialogEditCategory = false;
                        this.getList()
                        //this.$router.push({path: '/admin/p/index'})
                    }).catch(res => {
                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
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
            categoryMethods.categoryStatus({id:data._id, status:data.status}).then(res=>{
                this.getList()
            })
        },
        onHandleDelete(data){
            categoryMethods.categoryDelete({id:data._id}).then(res=>{
                this.getList()
            })
        },
    }
}
</script>
<style lang="sass" scoped>
    
</style>
