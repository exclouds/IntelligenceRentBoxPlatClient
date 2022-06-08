<template>
    <div class="login">
        <div class="w">

            <div class="register-title">
                <div style="width: 1200px;margin: 0 auto;">
                    <span style="font-size:24px;">云租箱平台</span>
                    <el-button round style="float: right;margin-top: 10px;color: #409EFF;" @click="loginUrl">返回登陆</el-button>
                </div>
            </div>
            <div class="register-center">
                <div>
                    <div style="padding: 0 20px;">
                      <div style="margin: 30px auto;width: 200px;">
                        <el-radio-group v-model="tabPosition" @change="switchShow">
                          <el-radio-button label="gs">公司注册</el-radio-button>
                          <el-radio-button label="gr">个人注册</el-radio-button>
                        </el-radio-group>
                      </div>
                      <div style="width: 500px;margin: 0 auto;" v-show="gsShow">
                        <el-form autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-width="150px" label-position="right" @submit.native.prevent >
                          <el-form-item label="公司名称：" style="position:relative" prop="name">
                              <el-input :disabled="nameDisabled" size="mini" style="width:70%" v-model="registerForm.name" @blur="blurText" placeholder="请输入公司全名"></el-input>
                            </el-form-item>
                            <el-form-item label="公司简称：" style="position:relative" prop="shortName">
                              <el-input size="mini" style="width:70%" v-model="registerForm.shortName" placeholder="请输入公司中文简称"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名：" style="position:relative" prop="userName">
                              <el-input size="mini" style="width:70%" v-model="registerForm.userName" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                             <el-form-item label="角色：" prop="CompanyType">
                            <el-radio v-model="registerForm.CompanyType" :label="0" >箱东</el-radio>
                            <el-radio v-model="registerForm.CompanyType" :label="1"> 租客</el-radio>
                            </el-form-item>                                                 
                            <el-form-item label="电话：" style="position:relative" prop="PhoneNumber">
                              <el-input size="mini" style="width:70%" v-model="registerForm.PhoneNumber" placeholder="请输入电话"></el-input>
                            </el-form-item>
                            
                            <el-form-item label="邮箱：" style="position:relative" prop="EmailAddress">
                              <el-input size="mini" style="width:70%" v-model="registerForm.EmailAddress" placeholder="请输入邮箱"></el-input>                            </el-form-item>
                            
                            <el-form-item label="密码：" style="position:relative" prop="password">
                              <el-input size="mini" style="width:70%" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                             <el-form-item label="确认密码：" style="position:relative" prop="againPassword">
                              <el-input size="mini" style="width:70%" v-model="registerForm.againPassword" placeholder="请输入密码"></el-input>
                            </el-form-item>
                         
                            <el-form-item label="营业执照：" style="position:relative" prop="BusinessLicense">
                              <el-upload
                                class="upload-demo"
                                action="/DBService/api/services/app/Annex/AnnexUpload"
                                ref="upload"
                                :limit="1"
                                :auto-upload="false"
                                :http-request="httpRequest"
                                :show-file-list="true">
                                <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                              </el-upload>
                            </el-form-item>
                         
                            <el-form-item>
                              <el-button type="primary" @click="onSubmitRigisterGs" :loading="loading">立即注册</el-button>
                            </el-form-item>
                      </el-form>
                      </div>
                      <div style="width: 500px;margin: 0 auto;" v-show="grShow">
                        <el-form autoComplete="on" :model="registerGrForm" :rules="registerGrRules" ref="registerGrForm" label-width="150px" label-position="right" @submit.native.prevent >
                            <el-form-item label="姓名：" style="position:relative" prop="name">
                              <el-input size="mini" style="width:70%" v-model="registerGrForm.name" placeholder="请输入名"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名：" style="position:relative" prop="userName">
                              <el-input size="mini" style="width:70%" v-model="registerGrForm.userName" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                             <el-form-item label="角色：" prop="CompanyType">
                            <el-radio v-model="registerGrForm.CompanyType" :label="0" >箱东</el-radio>
                            <el-radio v-model="registerGrForm.CompanyType" :label="1"> 租客</el-radio>
                            </el-form-item>  
                            <el-form-item label="性别：" prop="sex">
                            <el-radio v-model="registerGrForm.sex" :label="0" ><icon name="男" scale="1.5"/></el-radio>
                            <el-radio v-model="registerGrForm.sex" :label="1"><icon name="女" scale="1.5"/></el-radio>
                            </el-form-item>
                            <el-form-item label="电话：" style="position:relative" prop="PhoneNumber">
                              <el-input size="mini" style="width:70%" v-model="registerGrForm.PhoneNumber" placeholder="请输入电话"></el-input>
                            </el-form-item>
                         
                            <el-form-item label="邮箱：" style="position:relative" prop="EmailAddress">
                              <el-input size="mini" style="width:70%" v-model="registerGrForm.EmailAddress" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="密码：" style="position:relative" prop="password">
                              <el-input size="mini" style="width:70%" v-model="registerGrForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>
                             <el-form-item label="确认密码：" style="position:relative" prop="againPassword">
                              <el-input size="mini" style="width:70%" v-model="registerGrForm.againPassword" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            
                            <el-form-item>
                              <el-button type="primary" @click="onSubmitRigisterGr" :loading="loading">立即注册</el-button>
                            </el-form-item>
                      </el-form>
                      </div>
                    </div>
                </div>

            </div>
            <div style="height:50px;line-height:50px;width:100%;text-align:center;">
                <span style="font-size:14px;color:#777777;">版本号：1.0.0</span>
            </div>
        </div>
    </div>
</template>

<script>
import {Message,MessageBox} from 'element-ui';
  import {setCookie, getCookie, delCookie} from 'utils/cookie'
  import {CompanyRegist, PersonRegist, getCompanyByCompanyCNName, getAnnexUpload} from 'api/publicBase/register'
  import {warnMsg,successMsg} from 'utils/messageBox'
  import {mobile, telephone, email} from 'utils/validate'
  //import {getTenantList, IsTenantAvailable} from 'api/user/tenant/index';
  export default {
    components: {},
    name: 'register',
    data() {
       // 重复密码验证
    const pwdAgainCheck = async(rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if(this.registerForm.password != this.registerForm.againPassword &&  this.registerForm.againPassword!==''){    
        return callback(new Error('两次输入密码不一致！'));
      }else{    
        callback()
      }
    };
    const grpwdAgainCheck = async(rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if(this.registerGrForm.password != this.registerGrForm.againPassword &&  this.registerGrForm.againPassword!==''){       
        return callback(new Error('两次输入密码不一致！'));
      }else{    
        callback()
      }
    };
      return {
        nameDisabled: false,
        tabPosition: 'gs', // 切换
        gsShow: true,
        grShow: false,
        registerForm: { // 公司注册 
          Id: '',       
          name: '',
          shortName:'',
          userName: '',
          password: '',
          PhoneNumber: '',
          CompanyType: 0,
          EmailAddress: '',
          BusinessLicense: '',
          againPassword: '',

        },
        registerGrForm: { // 个人注册 
          Id: '',           
          userName: '',       
          name: '',
          EmailAddress: '',
          password: '',
          PhoneNumber: '',
          sex:0,
          IsActive:false,
          againPassword: '',
           CompanyType: 0,
        },
        registerRules: { // 公司注册
          name: [{required: true,message: '公司名称不能为空',trigger: 'blur'}],
         // shortName: [{required: true,message: '公司简称不能为空',trigger: 'blur'}],
          userName: [{required: true,message: '登录用户名不能为空',trigger: 'blur'}],
          CompanyType : [{required: true,message: '角色不能为空',trigger: 'change'}], 
          PhoneNumber: [{required: true,message: '联系电话不能为空',trigger: 'blur'}],
          password: [{required: true,message: '密码不能为空',trigger: 'blur'},
                   {validator: pwdAgainCheck, trigger: 'blur' }],     
          againPassword: [
            {required: true,message: '密码不能为空',trigger: 'blur'},
            {validator: pwdAgainCheck, trigger: 'blur' }
           ],  
          EmailAddress: [{required: true,message: '邮箱不能为空',trigger: 'blur'},
                         { pattern: email, message: "请输入正确格式的邮箱" }],
          BusinessLicense: [{required: true,message: '请上传营业执照',trigger: 'blur'}],
            
          
         },
        registerGrRules: { // 个人注册
          name: [{required: true,message: '姓名不能为空',trigger: 'blur'}],      
          userName: [{required: true,message: '登录用户名不能为空',trigger: 'blur'}],
          //password: [{required: true,message: '密码不能为空',trigger: 'blur'}],
          EmailAddress: [{required: true,message: '邮箱不能为空',trigger: 'blur'},
                         { pattern: email, message: "请输入正确格式的邮箱" }],
          PhoneNumber: [{required: true,message: '联系电话不能为空',trigger: 'blur'}],
           password: [
            {required: true,message: '密码不能为空',trigger: 'blur'},
            {validator: grpwdAgainCheck, trigger: 'blur' }
           ], 
            againPassword: [
            {required: true,message: '密码不能为空',trigger: 'blur'},
            {validator: grpwdAgainCheck, trigger: 'blur' }
           ], 
         
      },     
        loading: false,
        loadingRegister: false,

      }
    },
    methods: {
      
      switchShow(value){
        if(value === 'gs'){
          this.gsShow = true
          this.grShow = false
        } else {
          this.gsShow = false
          this.grShow = true
        }
      },
      // 验证公司名是否存在
      blurText() {
        getCompanyByCompanyCNName({companyCNName: this.registerForm.name}).then(res => {
          if(res.result === false) {
            warnMsg("该公司名已存在，请重新填写")
          }
        })
      },
      // 附件上传
      submitUpload() {
        if(this.registerForm.name === '') {
          warnMsg("请先填写公司中文全名")
        } else {
         this.$confirm('您是否确定马上上传附件？上传附件后公司名称将不可修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        if(action === 'confirm'){
          this.$refs.upload.submit();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
        }
      },
    httpRequest(param){
      
      let formData = new FormData();
          formData.append("files", param.file);
          //formData.append("bookingCode", this.registerForm.name);
          getAnnexUpload(formData).then(res => {
            if (res.success) {
              this. registerForm.BusinessLicense = res.result;
              //this.nameDisabled = true
              this.$message.success('文件上传成功!');

            }
          })
    },

      // 公司注册
      onSubmitRigisterGs() {
       
        this.$refs["registerForm"].validate(valid => {
          if (valid) {
           this.loading = true;
           let data = this.registerForm;
              CompanyRegist(data).then(res => {
                  if (res.success) {
                    this.loading = false;
                    //跳转到登陆页
                         Message({
                          message: '注册成功！请等待审核！',
                          duration:0,
                          showClose:true,
                          type: 'success'
                        });
                    this.$router.push({
                      path: '/login'
                    });
                  } else {
                    this.loading = false;
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'error'
                    });
                  }
                })
                .catch(e => {
                  this.loading = false;
                });
           }
      });
      },
      loginUrl() {
        this.$router.push({
          path: '/login'
        });
      },
      // 用户注册
      onSubmitRigisterGr() {
          this.$refs["registerGrForm"].validate(valid => {
             if (valid) {
                this.loading = true;;
                let data =this.registerGrForm;       
                PersonRegist(data).then(res => {
                  if (res.success) {
                    this.loading = false;
                    //跳转到登陆页
                    Message({
                      message: '注册成功,请等待审核!',
                      type: 'success',
                      duration: 5 * 1000
                    });
                    this.$router.push({
                      path: '/login'
                    });
                  
                  } else {
                    debugger
                    this.loading = false;
                    this.$message({
                      showClose: true,
                      message: res.msg,
                      type: 'error'
                    });
                  }
                })
                .catch(e => {
                  this.loading = false;
                });
             }
        });
      }
    },
    created() {
      localStorage.clear();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
   .register{
        width:100%;
        height:100%;
        background-color: #fff;
        position: relative;}
    .w{
        width:100%;
        margin: 0 auto;
    }
    .register-title{
        width:100%;
        height:60px;
        line-height: 60px;
        background-color: #fff;
        border-bottom: 1px dashed #DCDFE6;
    }
    .register-center{
        width:900px;
        margin:0 auto;
    }

</style>
