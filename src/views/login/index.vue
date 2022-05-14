<template>
    <div class="login">
        <div style="height:108px;"></div>
        <div class="w">

         <el-card class="login-center" 
         >
             <!-- <div > -->
 
                <div class="login-center-win">
                  <el-col :span="8" :offset="6" align="center">
                 <div style=" height:550px;background: linear-gradient(200.559deg, rgb(6, 88, 185) 12%, rgb(73, 90, 255) 94%);">             
                      <div style="padding-top:150px;padding-bottom:40px;font-weight: 700;font-size: 48px;color: rgb(255, 255, 255);">  logo</div>
                      <div style="padding-bottom:10px;font-weight: 700;font-size:26px;color: rgb(255, 255, 255);">   云租箱平台</div>
                      <div style="font-weight: 400;font-size: 16px;color: rgb(255, 255, 255);">   platform login</div>


                    </div>
                  </el-col>
                <el-col :span="8" >
                   <div class="login-center-opt">
                    
                      <div style="font-weight: 700;font-size:20px;margin-left:20px;margin-top:15px; 
                      color: rgb(153, 153, 153);">
                         用户登录 / USER LOGIN</div>
                      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"  @submit.native.prevent >
                        <div  class="login-center-opt-marg">
                            <div style="margin-top:25px;">
                               <div class="login-input">
                                    <img src="../../../static/img/username.png" style="margin-left:10px;margin-top:12px;float:left;">
                                    <div class="spacer"></div>
                                    <div style="float:left;width: calc(100% - 50px);">
                                      <el-form-item prop="userNameOrEmailAddress">
                                        <el-input  style="width:100%;"  v-model="loginForm.userNameOrEmailAddress" autoComplete="on" placeholder="请输入用户名"></el-input>
                                      </el-form-item>
                                    </div>
                                </div>
                               <div class="login-input">
                                    <img src="../../../static/img/password.png" style="margin-left:10px;margin-top:12px;float:left;">
                                    <div class="spacer"></div>
                                    <div style="float:left;width: calc(100% - 50px);margin-top: -2px;">
                                      <el-form-item prop="password">
                                        <el-input type="password" id="password"  @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码">
                                        </el-input>
                                      </el-form-item>
                                    </div>
                                </div>
                                <div style="margin-top:10px;">
                                    <el-checkbox  label="记住密码" v-model="checked" name="type" class="checkboxpass"></el-checkbox>
                                </div>
                                <div style="margin-top:30px;width:100%;">
                                    <el-button  style="width:100%;background: linear-gradient(200.559deg, rgb(6, 88, 185) 12%, rgb(73, 90, 255) 94%);" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
                                 
                                </div>
                                <div style="margin-top:10px;width:100%;">
                                    <el-button  style="width:100%;background: linear-gradient(200.559deg, rgb(6, 88, 185) 12%, rgb(73, 90, 255) 94%);" type="primary" :loading="loadingRegister" @click.native.prevent="handleRegister">注册</el-button>
                                   
                                </div>
                            </div>
                        </div>
                      </el-form>
                    </div>
                </el-col>
                   
                         
                   
                </div>

            <!-- </div> -->
         </el-card>  
          
            <!-- <div style="height:50px;line-height:50px;width:100%;text-align:center;">
                <span style="font-size:14px;color:#777777;">版本号：1.0.0</span>
            </div> -->
        </div>
    </div>
</template>

<script>
  import {setCookie, getCookie, delCookie} from 'utils/cookie'
  import socialSign from './socialsignin';
  import {loginByEmail,logout,getInfo} from 'api/login';
  export default {
    components: {
      socialSign
    },
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('密码不能小于1位'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          userNameOrEmailAddress: '',
          password: '',
          rememberClient: false,
          //tenantId:''
        },
        loginRules: {
          userNameOrEmailAddress: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePass
          }],
          // tenantId: [{
          //   required: true,
          //   trigger: 'blur',
          //   message: '请选择租户'
          // }]
        },
        checked:true,
        loading: false,
        loadingRegister: false,
        showDialog: false,
        //租户选择
        //tenants: [],
        tenantForm: {}
      }
    },
    methods: {
     
      handleLogin() {
        let that = this
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            localStorage.clear();

            //判断复选框是否被勾选
            if (this.checked==true) {
            //存入账号名，密码和保存天数三个参数
                setCookie("userName", this.loginForm.userNameOrEmailAddress, 360);
                setCookie("passWord", this.loginForm.password, 360);
            }
            else{
                //清空Cookie
                delCookie("passWord");
            }

            this.$store.dispatch('LoginByEmail', this.loginForm).then(res => {
              console.log(res)
              if (res.success) {
                this.loading = false;
                this.$store.commit('CLEAN_VIEW')
                // setCookie("Abp.AuthToken", res.result.accessToken, 360);
                // setCookie("Abp.UserId", res.result.userId, 360);
                // setCookie("Abp.SystemUser", res.result.systemUser, 360);
                //  setCookie("Abp.SystemUser", res.result.systemUser, 360);
                setCookie("AbpAuthToken", res.result.accessToken, 360);
                setCookie("AbpUserId", res.result.userId, 360);    
                setCookie('AbpCompanyType',res.result.companyType);
                setCookie('ABPName',res.result.name);       
               
               that.$router.push({
                  path: '/dashboard'
                });
                
              } else {
                this.loading = false;
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: 'error'
                });
              }
              // this.showDialog = true;
            }).catch(err => {
              console.log('err',err)
              this.loading = false;
            });

          } else {
            return false;
          }
        });
      },
      handleRegister() {
        this.$router.push({
            path: '/register',
          })
      }
    },
    created() {
      localStorage.clear();
      //this.getTenants();

      if(getCookie("userName"))
        this.loginForm.userNameOrEmailAddress = getCookie("userName")

      if(getCookie("passWord"))
        this.loginForm.password = getCookie("passWord")
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
   .login{
        width:100%;
        height:100%;
        background-color: #fff;
        //background-image: url('../../../static/img/login/背景.jpg');
        position: relative;
        //background-size: 100% 100%;
        //-moz-background-size: 100% 100%;
        //-webkit-background-size: 100% 100%;
    }
    .w{

        width:100%;
        height:700px;
        margin: 0 auto;
    }
    .login-title{
        width:100%;
        height:45px;
        background-color: #fff;

    }
    .login-center{
      .el-card__body{
        padding-top: 0px!important;
      }
      // border-color: darkcyan;
      //  border-top-width: thin;
      //  border-top-style: solid;
      
      //  border-bottom-width: thin;
      //  border-bottom-style: solid;
        margin-top:20px;
        height:500px;
        //background-image: url('../../../static/img/1.jpg');
        -moz-background-size: 100% 100%;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
    }
    .login-center-win{
        width:1200px;
        height:600px;
        margin:0 auto;
    }
    .login-center-img{

        width:620px;
        height:600px;
        float:left;
    }
    .login-center-opt{
         
        background-color:rgba(255,255,255,1);
        border-radius:5px;
        float:right;
        margin-top:90px;
        margin-left:22px;
        width:350px;
        height:370px;
        //background-image: url('../../../static/img/登录框.png');
        background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;
    }
    .login-center-opt-marg{margin:35px 20px 35px 20px;}
    .logintext{
        color:#1c67de;
        font-size:22px;
    }
    .spacer{
        overflow: hidden;
        margin: 11px 5px 0 11px;
        width: 1px;
        height: 18px;
        background-color: #ccc;
        float:left;
    }
    .login-center-opt-marg .el-input__inner{
        background-color:#f1f1f1 !important;
        border:0 !important;
        padding:0 5px !important;
    }
    .login-center-opt-marg .el-checkbox__label{color:#000!important;font-size:12px!important;}


    .login-input {
      background-color:#f1f1f1;width:100%;height:41px;line-height:41px;margin-top:20px;border: 1px solid #e9e9e9;border-radius: 2px;
      .el-form-item__error{
        left: -40px;
      }
    }

</style>
