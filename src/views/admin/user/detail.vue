<template>
    <div class="createPost-container manage-article-container">
        <el-form class="form-container" label-position="left" :rules="rules" ref="userForm" :model="userItem">

            <sticky :className="'sub-navbar '+userItem.status">
                <template v-if="fetchSuccess">
                    <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="onSubmitForm(1)">{{pageText}}
                    </el-button>
                </template>
                <template v-else>
                    <el-tag>发送异常错误,刷新页面,或者联系程序员</el-tag>
                </template>
            </sticky>

            <div class="createPost-main-container">
                <el-form-item label="用户名" prop="username" label-width="90px">
                    <el-input v-model="userItem.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="usernick" label-width="90px">
                    <el-input v-model="userItem.usernick"></el-input>
                </el-form-item>
                <el-form-item label-width="90px"  label="用户图像" prop="userpic">
                    <Upload v-model="userItem.userpic" :uploadType="'userpic'" :hideOne="true"></Upload>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="90px">
                    <el-input v-model="userItem.password"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex" label-width="90px">
                    <el-radio-group v-model="userItem.sex">
                        <el-radio :label="'男'">男</el-radio>
                        <el-radio :label="'女'">女</el-radio>
                        <el-radio :label="'保密'">保密</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age" label-width="90px">
                    <el-input v-model="userItem.age"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email" label-width="90px">
                    <el-input v-model="userItem.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile" label-width="90px">
                    <el-input v-model="userItem.mobile"></el-input>
                </el-form-item>
                <el-form-item label="网站" prop="website" label-width="90px">
                    <el-input v-model="userItem.website">
                        <template slot="prepend">Http://</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="微博" prop="weibo" label-width="90px">
                    <el-input v-model="userItem.weibo"></el-input>
                </el-form-item>
                <el-form-item label="github" prop="github" label-width="90px">
                    <el-input v-model="userItem.github"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address" label-width="90px">
                    <el-input v-model="userItem.address"></el-input>
                </el-form-item>
                <el-form-item label="工作" prop="job" label-width="90px">
                    <el-input v-model="userItem.job"></el-input>
                </el-form-item>
                <el-form-item label="签名" prop="signature" label-width="90px">
                    <el-input type="textarea" autosize v-model="userItem.signature"></el-input>
                </el-form-item>
                <el-form-item label="生效" prop="order" label-width="90px">
                    <el-checkbox label="生效" v-model="userItem.status"></el-checkbox>
                </el-form-item>

                
            </div>
        </el-form>
    </div>
</template>
<script>
import Upload from '../../../components/Upload/singleImage3'
import Sticky from '../../../components/Sticky' // 粘性header组件
import {validateURL} from '../../../utils/validate'
import { getUserOne, userSave } from '../../../api/user'

export default {
    name: 'userDetail',
    components: { Upload, Sticky},
    data() {
        return {
            userItem: {
                id: '',
                username: '',
                usernick: '',
                newPassword: '',
                userpic: '/upload/userpic/default.jpg',
                role: 'user',
                sex: '秘密',
                age: 18,
                email: '',
                mobile: '',
                website: '',
                weibo: '',
                address: '',
                github: '',
                signature: '',
                job: '',
                status: 1
            },
            rules: {
                username: [{ required: true, message: '用户名必须填写', trigger: 'change' }],
                userpic: [{ required: true, message: '用户图像', trigger: 'change' }]
            },
            fetchSuccess: true,
            loading: false,
            pageText:''
        }
    },
    mounted() {

        this.id = this.$route.query.id || ''
        this.me = this.$route.query.me || ''
        if(this.me){
            this.pageText = '更新我的信息'
            this.fetchData({me: 'self'})
        }else{
            if (this.id) {
                this.pageText = '修改用户'
                //this.postForm = [];
                this.fetchData({id: this.id})
            } else {
                this.pageText = '添加用户'
                //this.postForm = Object.assign({}, defaultForm)
            }
        }
        
    },
    methods:{
        
        fetchData(obj) {
            let option = {};
            if(obj.me){
                option.me = me;
            }else if(obj.id){
                option.id = obj.id
            }else{
                return
            }            
            getUserOne(option).then(response => {
                this.postForm = response.user;

                this.userItem.id = response.user._id;
                this.userItem.username = response.user.username;
                this.userItem.usernick = response.user.usernick;
                this.userItem.userpic = response.user.userpic;
                this.userItem.role = response.user.role;
                this.userItem.sex = response.user.sex;
                this.userItem.age = response.user.age;
                this.userItem.email = response.user.email;
                this.userItem.mobile = response.user.mobile;
                this.userItem.website = response.user.website;
                this.userItem.weibo = response.user.weibo;
                this.userItem.address = response.user.address;
                this.userItem.github = response.user.github;
                this.userItem.signature = response.user.signature;
                this.userItem.job = response.user.job;
                this.userItem.status = response.user.status;

                this.fetchSuccess = true
            }).catch(err => {
                this.fetchSuccess = false
                console.log(err)
            })
        },
        onSubmitForm(status) {
            
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    userSave(this.userItem).then(res=>{
                        this.$notify({
                            title: '成功',
                            message: '更新用户成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.loading = false
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