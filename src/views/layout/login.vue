<template>
    <div class="loginclass">
        <el-dialog title="" 
        v-dialogDrag
        :visible.sync="windowShow" 
        width="400px" 
        :close-on-click-modal="false" 
        :close-on-press-escape="false">
    <el-form  :model="loginForm" :rules="loginRules" ref="loginForm" 
    label-width="0px"  @submit.native.prevent >
    <div style="font-weight: 700;font-size:20px;margin-left:20px;margin-top:15px; 
            color: rgb(153, 153, 153);margin-bottom:20px">
                用户登录 / USER LOGIN</div>
                <el-row>
                    <el-col :span="24">
                    <el-form-item prop="userNameOrEmailAddress">
                            <el-input  style="width:100%;"  v-model="loginForm.userNameOrEmailAddress" autoComplete="on" placeholder="请输入用户名称"></el-input>
                            </el-form-item>
                    </el-col>
                    <el-col :span="24">
                     <el-form-item prop="password">
                            <el-input type="password" id="password"  @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入登录密码">
                            </el-input>
                            </el-form-item>
                    </el-col>
                </el-row>
             <div style="margin-top:10px;">
                <el-checkbox  label="记住密码" v-model="checked" name="type" class="checkboxpass"></el-checkbox>
            </div>
            <div style="margin-top:30px;width:100%;">
                <el-button  style="width:100%;background: linear-gradient(200.559deg, rgb(6, 88, 185) 12%, rgb(73, 90, 255) 94%);" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
                
            </div>
            <div style="margin-top:10px;width:100%;">
                <el-button  style="width:100%;background: linear-gradient(200.559deg, rgb(6, 88, 185) 12%, rgb(73, 90, 255) 94%);" type="primary" :loading="loadingRegister" @click.native.prevent="handleRegister">注册</el-button>
                
            </div>
        
         </el-form>
    </el-dialog>
    </div>
</template>
<script>
  import {setCookie, getCookie, delCookie} from 'utils/cookie'

  import {loginByEmail,logout,getInfo} from 'api/login';
  
  export default {
    components: {
      
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
                    userNameOrEmailAddress: '',
                    password: '',
                    rememberClient: false,
                }
                this.$emit('update:pshow',false)
            }
        }
    },
    data() {
      const validatePass = (rule, value, callback) => {
        // if (value.length < 5) {
        //   callback(new Error('密码不能小于5位'));
        // }
         if (value.length < 1) {
          callback(new Error('密码不能小于1位'));
        }
         else {
          callback();
        }
      };
      return {
         windowShow:false,
        loginForm: {
          userNameOrEmailAddress: '',
          password: '',
          rememberClient: false,
          //tenantId:''
        },
        loginRules: {
          userNameOrEmailAddress: [{
            required: true,
            message: '用户名称不能为空',
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
                this.$store.commit('CLEAN_VIEW') ;
                setCookie("AbpAuthToken", res.result.accessToken, 360);
                setCookie("AbpUserId", res.result.userId, 360);    
                setCookie('AbpCompanyType',res.result.companyType);
                setCookie('ABPName',res.result.name);          
               
               // setCookie("Abp.SystemUser", res.result.systemUser, 360);
               this.windowShow=false;
               this.$emit("on-save-success");
              //  this.$router.push({
              //     path: '/dashboard'
              //   });
                
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
        this.windowShow = false;
       // this.$emit("on-save-success");
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

<style lang="scss">
   .loginclass{
        // width:100%;
        // height:400px;
        // background-color: #fff;
            
 }
    
</style>
