<template>
    <div class="createPost-container manage-article-container">
        <el-form class="form-container" label-position="left" :model="postForm" :rules="rules" ref="postForm">

            <sticky :className="'sub-navbar '+postForm.status">
                <template v-if="fetchSuccess">
                    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="onSubmitForm(1)">发布
                    </el-button>
                    <el-button v-loading="loading" type="warning" @click="onSubmitForm(0)">草稿</el-button>
                </template>
                <template v-else>
                    <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                </template>
            </sticky>

            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="21">
                        <el-form-item style="margin-bottom: 40px;" prop="title">
                            <MDinput name="title" v-model="postForm.title" required :maxlength="100">
                                标题
                            </MDinput>
                            <span v-show="postForm.title.length>=26" class='title-prompt'>app可能会显示不全</span>
                        </el-form-item>

                        <div class="postInfo-container">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label-width="45px" label="类型" class="postInfo-container-item" prop="type">
                                        <el-select style="width:100px;" placeholder="类型" class="filter-item" v-model="postForm.type">
                                            <el-option label="原创" value="原创"></el-option>
                                            <el-option label="分享" value="分享"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label-width="45px" label="分类" class="postInfo-container-item" prop="category">
                                        <el-select style="width:160px;" placeholder="选择分类" class="filter-item" name="category" v-model="postForm.category">
                                            <el-option v-for="(categoryItem, key) in categoryList" :key="key" :label="categoryItem.name" :value="categoryItem._id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="8">
                                    <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                                        <el-date-picker v-model="postForm.updated_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                
                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
                    <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.description">
                    </el-input>
                    <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="标签:">
                    <el-input type="textarea" class="article-textarea" :rows="1"  placeholder="标签以,分开" v-model="postForm.tags">
                    </el-input>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="外链:" prop="source">
                    <el-input type="textarea" class="article-textarea" :rows="1" placeholder="请输入链接" v-model="postForm.source">
                    </el-input>
                </el-form-item>
                
                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="配图:" prop="picurl">
                    <Upload v-model="postForm.picurl" :uploadType="'article'"></Upload>
                </el-form-item>

                <el-form-item style="margin-bottom: 40px;" label-width="45px" label="正文:" prop="content">
                    <div class="editor-container">
                        <tinymce :height=500 ref="editor" v-model="postForm.content"></tinymce>
                    </div>
                </el-form-item>

                
            </div>
        </el-form>
    </div>
</template>
<script>
import Tinymce from '../../../components/Tinymce'
import Upload from '../../../components/Upload/singleImage3'
import MDinput from '../../../components/MDinput'
import Sticky from '../../../components/Sticky' // 粘性header组件
import { getPostById, savePostInfo, getCategoryAll } from '../../../api/post'
import {validateURL} from '../../../utils/validate'
const defaultForm = {
    status: '0',
    title: '', // 文章题目
    content: '', // 文章内容
    description: '', // 文章摘要
    source: '', // 文章外链
    picurl: '', // 文章图片
    url: '',
    user: '', // 文章外部作者
    category: '',
    tags:'',
    updated_time: undefined, // 前台展示时间
    id: undefined
}
export default {
    name: 'articleDetail',
    components: { Tinymce, MDinput, Upload, Sticky},
    data() {
        const validateRequire = (rule, value, callback) => {
            if (value === '') {
                this.$message({
                    message: rule.field + '为必传项',
                    type: 'error'
                })
                callback(new Error(rule.field + '为必传项'))
            } else {
                callback()
            }
        }
        const validateSourceUri = (rule, value, callback) => {
            if (value) {
                if (validateURL(value)) {
                    callback()
                } else {
                    this.$message({
                        message: '外链url填写不正确',
                        type: 'error'
                    })
                    callback(new Error('外链url填写不正确'))
                }
            } else {
                callback(false)
            }
        }
        return {
            postForm: Object.assign({}, defaultForm),
            fetchSuccess: true,
            loading: false,
            userLIstOptions: [],
            categoryList: [],
            contentShortLength:0,
            rules: {
                category:[{ validator: validateRequire }],
                picurl: [{ validator: validateRequire }],
                title: [{ validator: validateRequire }] //,
                //content: [{ validator: validateRequire }],
                //source: [{ validator: validateSourceUri, trigger: 'blur' }]
            }
        }
    },
    created(){
        this.getCategoryList()
    },
    mounted() {

        this.id = this.$route.query.id || ''
        
        if (this.id) {
            //this.postForm = [];
            this.fetchData(this.id)
        } else {
            this.postForm = Object.assign({}, defaultForm)
        }
    },
    methods:{
        getCategoryList(){
            getCategoryAll().then(res=>{
                this.categoryList = res.categoryList
            }).catch(res=>{this.categoryList = []})
        },
        fetchData(id) {
            if(!id) return
            getPostById({id}).then(response => {
                this.postForm = response.article;
                this.postForm.id = response.article._id
                this.postForm.category = response.article._category
                this.postForm.tags = response.article.tags.join(',')
                this.fetchSuccess = true
            }).catch(err => {
                this.fetchSuccess = false
                console.log(err)
            })
        },
        onSubmitForm(status) {
            //this.postForm.updated_time = parseInt(this.updated_time / 1000)
            this.postForm.status = status || 0
            //console.log(this.postForm)
            //return
            this.$refs.postForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    savePostInfo(this.postForm).then(res=>{
                        this.$notify({
                            title: '成功',
                            message: '发布文章成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.loading = false
                        this.$router.push({path: '/admin/p/index'})
                    }).catch(res => {

                        this.loading = false
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
<style lang="sass" scoped>
    
</style>