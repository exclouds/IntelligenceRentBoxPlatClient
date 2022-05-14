<template>
    <div class="createUser">
        <el-dialog :title="pageType === 'insert' ? '新增用户信息' : '编辑用户信息'" 
        v-dialogDrag
        :visible.sync="windowShow" 
        width="800px" 
        :close-on-click-modal="false" 
        :close-on-press-escape="false">
            <el-form size="mini" :model="form" ref="ruleForm" :rules="rules" label-width="100px" >
                <el-row>
                    <el-col :span=12>
                        <el-form-item label="真实姓名：" prop="name">
                            <el-input size="mini" maxlength="10" v-model="form.name" placeholder="请输入真实姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span=12>
                        <el-form-item label="登陆账户：" prop="userName">
                            <el-input size="mini" v-model="form.userName" maxlength="20" placeholder="请输入登陆账户"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>            
                <el-row>
                     <el-col :span=12>
                         <el-form-item label="角色：" prop="userNature">
                            <el-radio v-model="form.userNature" :label="0" >箱东</el-radio>
                            <el-radio v-model="form.userNature" :label="1"> 租客</el-radio>
                        </el-form-item>
                    </el-col>     
                    
                    <el-col :span=12>
                        <el-form-item label="性别：" prop="sex">
                            <el-radio v-model="form.sex" :label="0" ><icon name="男" scale="1.5"/></el-radio>
                            <el-radio v-model="form.sex" :label="1"><icon name="女" scale="1.5"/></el-radio>
                        </el-form-item>
                    </el-col>                   
                </el-row>         

                <el-row>
                   
                    <el-col :span=12>
                        <el-form-item label="邮箱：" prop="emailAddress">
                            <el-input size="mini" v-model="form.emailAddress" placeholder="请输入邮箱" clearable></el-input>
                        </el-form-item>
                    </el-col>              
                    <el-col :span=12>
                        <el-form-item label="联系方式：" prop="phoneNumber">
                            <el-input size="mini" v-model="form.phoneNumber" placeholder="请输入手机号码" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                  
             
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="windowShow = false" size="small">取 消</el-button>
                <el-button type="primary" @click="save()" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="scss">
.createUser{
  .orgForm{
    .el-form-item__content{
      height:28px;
    }
  }
    .chsEqp{
            width:100%;
            .textPromt{float:left;}
            .chsEqp-select{height:26px;line-height: 24px;}
            i{float: right;margin-top: 6px;}
        }
        .editOrgComp-row-tree{
                position:absolute;
                top:40px;
                left:0;
                background-color: #fff;
                z-index: 10;
                padding:0;
                margin:0;
                width:300px;
                height:450px;
                clear: both;

                
            }
}
    
</style>
<script>
import treeSelect from 'components/treeSelect/treeSelect'
import tree from 'components/tree/tree'
import {getRoleSelectList} from 'api/user/roles'
 import {PersonRegist} from 'api/publicBase/register'
 
import {mobile, telephone, email} from 'utils/validate'
import {warnMsg,successMsg} from 'utils/messageBox'
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import {getUserInfoById} from 'api/user/user'


export default {
    components:{
        treeSelect,
        tree
    },
    props:{
        pshow: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        pshow(newValue, oldValue){
            this.windowShow = newValue;
            
        },
        windowShow(newValue, oldValue){
            if(this.$refs["ruleForm"])
                this.$refs["ruleForm"].resetFields();   //清空验证

            if(!newValue)  //窗口关闭
            {
                this.form = {
                     id: '',                       
                userName: '',       
                name: '',
                emailAddress: '',           
                phoneNumber: '',
                sex:0,
                isActive:true,          
                userNature: 0,
                }
                this.treeComp.choosedTreeNodeId = []
                this.$emit("on-show-change",newValue);
            }
        }
    },
    data() {
        return {
            pageType: '',    //insert update
            windowShow: this.pshow,
            form: {
                id: '',                       
                userName: '',       
                name: '',
                emailAddress: '',           
                phoneNumber: '',
                sex:0,
                isActive:true,          
                userNature: 0,
            },         
            rules: {
               name: [{required: true,message: '姓名不能为空',trigger: 'blur'}],      
                userName: [{required: true,message: '登录用户名不能为空',trigger: 'blur'}],
                //password: [{required: true,message: '密码不能为空',trigger: 'blur'}],
                EmailAddress: [{required: true,message: '邮箱不能为空',trigger: 'blur'},
                         { pattern: email, message: "请输入正确格式的邮箱" }],
                PhoneNumber: [{required: true,message: '联系电话不能为空',trigger: 'blur'}],                                  
                sex: [
                    { required: true, message: '请选择性别', trigger: 'change' },
                ],
            },
                    
        }
    },
    methods: {
   
        

        //获取单个用户
        getUserInfoById(userId) {
            getUserInfoById({id: userId}).then(res => {
                this.form.id = res.result.id                              
                 this.form.userName= res.result.userName;     
                 this.form.name= res.result.name; 
                 this.form.emailAddress= res.result.emailAddress;            
                 this.form.phoneNumber= res.result.phoneNumber; 
                 this.form.sex= res.result.sex; 
                         
                 this.form.userNature= res.result.userNature;                                                                      
               
            })
        },
        //提交
        save() {
            this.$refs["ruleForm"].validate((valid) => {
                if (valid) {
                        let data = {
                           id:  this.form.id,                       
                            userName:  this.form.userName,       
                            name:  this.form.name,
                            emailAddress:  this.form.emailAddress,           
                            phoneNumber:  this.form.phoneNumber,
                            sex: this.form.sex,                                       
                            companyType:  this.form.userNature,
                        }
                         if(this.pageType == 'insert') {
                            data.password= '123456';
                            data.isActive=true; 
                         }
                        PersonRegist(data).then(res => {
                            this.windowShow = false
                            this.$emit("on-save-success");
                        })
                   
                    
                }
            })
        },
    },
    created() {
      
   },
}
</script>