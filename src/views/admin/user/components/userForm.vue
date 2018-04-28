<template>
    <div class="user-form">
        <el-form :rules="rules" ref="userForm" :model="userItem" label-position="left" label-width="90px" style='width: 600px; margin-left:50px;'>
          
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
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-if="isEdit" type="primary" @click="onUpdateUser">修改</el-button>
            <el-button v-else type="primary" @click="onUpdateUser">添加</el-button>
            <el-button @click="onDialogClose">取消</el-button>
        </div>
    </div>
</template>
<script>
import Upload from '../../../../components/Upload/singleImage3'
import waves from '../../../../directive/waves' // 水波纹指令
import { userSave } from '../../../../api/user'

export default {
    name: 'userForm',
    components: {Upload},
    props: {
        editData: {
            type: Object,
            default: null
        },
        callback: {
            type: Function,
            default: null   //userpic category article
        },
        isEdit: {
            type: Boolean,
            default: true   //userpic category article
        },
        closeDialog: {
            type: Function,
            default: null   //userpic category article
        },

	},
    directives: {
        waves
    },
    data(){
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
            }
        }
    },
    updated(){
        console.log(this.isEdit)
        this.initData();
    },
    methods:{
        initData(){
            if(typeof this.editData !== 'null' && this.isEdit){
                this.userItem .id = this.editData._id;
                this.userItem .username = this.editData.username;
                this.userItem .usernick = this.editData.usernick;
                this.userItem .userpic = this.editData.userpic;
                this.userItem .role = this.editData.role;
                this.userItem .sex = this.editData.sex;
                this.userItem .age = this.editData.age;
                this.userItem .email = this.editData.email;
                this.userItem .mobile = this.editData.mobile;
                this.userItem .website = this.editData.website;
                this.userItem .weibo = this.editData.weibo;
                this.userItem .address = this.editData.address;
                this.userItem .github = this.editData.github;
                this.userItem .signature = this.editData.signature;
                this.userItem .job = this.editData.job;
                this.userItem .status = this.editData.status;
            }
        },
        onUpdateUser(){
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
                        if(typeof this.callback !== 'null') 　this.callback()
                    }).catch(res => {
                        //this.loading = false
                        this.onDialogClose()
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        onDialogClose(){
            if(typeof this.closeDialog !== 'null'){
                this.closeDialog();
            }
        }
    }
}
</script>
