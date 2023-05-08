<template>
  <div style="width:100%;"  class="sidebarcalss">
    <el-col :span="8" :offset="1"  class="leftshowclass">
      <el-col :span="11" style=" text-align:right;">
         <img id="u0_img" class="img"  
          :src="require('@/views/dashboard/css/images/logo.png')" />
      </el-col>
      <el-col :span="11" style="padding-top:10px">
        <span>云租箱平台</span>
      </el-col>
      
      
    </el-col>
    <!-- <el-col :span="5" :offset="1"  align="center" class="leftshowclass">
      <img id="u0_img" class="img"  
          :src="require('@/views/dashboard/css/images/logo.png')" />    
      <span style="padding-top:-20px">云租箱平台</span>            
    </el-col> -->
    
    <el-col :span="11"  >
      <el-menu
         :unique-opened = true
         :show-timeout="200"
         :default-activde="$route.path"
         mode="horizontal" 
         text-color="#545c64"
          active-text-color="#409EFF"
     
        class="menuclass"
        
      > 
        <el-menu-item index="0">
         <router-link  to="/dashboard">首页</router-link> 
         </el-menu-item>
         <el-menu-item index="1">
            <router-link v-if="type==='1' ||type==='3' "   to="/XDDelInfo/XDDelInfo">信息发布</router-link> 
           <router-link v-else to="/ZKDelInfo/ZKDelInfo">信息发布</router-link>
           </el-menu-item>      
         <!-- <el-menu-item index="1">
            <router-link   to="/XDDelInfo/XDDelInfo">箱东信息发布</router-link> 
          </el-menu-item>  

           <el-menu-item index="2">
           <router-link  to="/ZKDelInfo/ZKDelInfo">租客信息发布</router-link>
           </el-menu-item>   -->

         <el-menu-item index="2"> 
           <router-link v-if="type==='1' ||type==='3' " to="/ZKSeachInfo/ZKSeachInfo">在线查询</router-link>
          <router-link v-else to="/XDSeachInfo/XDSeachInfo">在线查询</router-link> 
           </el-menu-item>

           <!-- <el-menu-item index="3"> 
           <router-link  to="/ZKSeachInfo/ZKSeachInfo">租客在线查询</router-link>
         
           </el-menu-item>
           <el-menu-item index="4">         
               <router-link  to="/XDSeachInfo/XDSeachInfo">箱东在线查询</router-link> 
           </el-menu-item> -->
        
         <el-menu-item index="3">
         <router-link  to="/InRecommond/InteRecommend">智能查询</router-link> 
           </el-menu-item>
         
        <!-- <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" 
        :base-path="route.path"/> -->
      </el-menu>
    </el-col>
    <el-col :span="4"  align="center" style="padding-top:20px">
      <el-dropdown v-if="name">
			<span class="el-dropdown-link">
				{{'您好，'+name}}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
						<el-dropdown-item><span @click="onupdatePasswordComp()" style="display:block;">修改密码</span></el-dropdown-item>
					<el-dropdown-item v-if="type==='2' ||type==='3' ">
            <span @click="addnewusr" style="display:block;">用户注册</span>
            </el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>      
	    <el-link v-if="!name" type="primary" @click="onlogin()">{{"登录/注册"}}</el-link> 
		   <!-- <span style="padding-left:20px">APP下载</span>
		     <span style="padding-left:20px">关注我们</span> -->
     
           
      
    </el-col>
      <el-col :span="1"  align="center" >
        <!-- <el-tooltip content="客服电话：8888888" placement="top" effect="light">          -->
        <a href="http://47.103.117.243:1922/consumer" target="_blank">  
        <img id="u0_img"  class="img" 
           src="../../assets/images/u87.png" />
        </a>
          <!-- </el-tooltip> -->
        
        
      </el-col>
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper" class="sideBar"> -->
     
    <!-- </el-scrollbar> -->
      <!-- background-color="#304156" -->
        <update-password ref="updatePasswordComp" :pshow.sync="updatePasswordComp.show"  @on-save-success="onSaveSuccess"></update-password>
        <login ref="loginComp" 
        :pshow.sync="loginComp.show" 
         @on-save-success="loginSuccess"
         >
         </login>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
 import updatePassword from './updatePassword'
 import login from './login'
 import {LogOut} from 'api/user/tenant'
 import {getCookie} from 'utils/cookie'

export default {
components: { SidebarItem ,updatePassword,login},
computed: {
  ...mapGetters([
    'permission_routers',
    	'name'
  ]),
  
},
	data () {
			return {		
				updatePasswordComp: {
						show: false
					} ,
         loginComp: {
						show: false
					} ,
				type:"",
			}
		},
methods: {
  		//显示详情页面
			onupdatePasswordComp() {
			this.updatePasswordComp.show = true;
			},
      onlogin(){
        	this.loginComp.show = true;
        //  this.$router.push({
        //   path: '/login'
        //  });
      },
			//修改密码成功
				onSaveSuccess(){
					this.logout()
				},
         logout() {
				this.$store.dispatch('FedLogOut')
				.then(() => {
					//console.log(getToken)
					LogOut().then(res => {
					})
          this.$store.commit('CLEAN_VIEW');
					location.reload(); // 为了重新实例化vue-router对象 避免bug
				
          //this.$router.push({ path: '/login' });
					//window.location.href = process.env.LOGOUT_URL
					//
					//this.$router.push({ path: '/login' })
					
				});
       },
     loginSuccess(){
       location. reload();
     },
     addnewusr()
     {
        this.$router.push({ path: '/Users/userManage' })
     }

		   
},
created(){
   this.type="";
      if(getCookie("AbpCompanyType"))
      {
        this.type=getCookie("AbpCompanyType");
      }
}

}
</script>
<style  rel="stylesheet/scss" lang="scss">
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {

      min-width: 80px!important;
      }
.sidebarcalss{
.leftshowclass{  
   padding-top: 10px; 
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
    color: #0658B8;
}

.menuclass{
  .mui-bar-tab .mui-tab-item {
    text-align: right;
    }
}

// .sideBar{
//   .el-scrollbar__view{height:100%;}

//   height:100%;
//   .el-scrollbar__wrap{overflow-x: hidden;}

//   .el-menu{height: 100%;}
// }
// .sidebarLogoFade-enter-active {
//   transition: opacity 1.5s;
// }

// .sidebarLogoFade-enter,
// .sidebarLogoFade-leave-to {
//   opacity: 0;
// }

// .sidebar-logo-container {
//   position: relative;
//   //width: 100%;
//   height: 50px;
//   line-height: 50px;
//   background: #2b2f3a;
//   text-align: center;
//   overflow: hidden;

//   & .sidebar-logo-link {
//     height: 100%;
//    // width: 100%;

//     & .sidebar-logo {
//       width: 32px;
//       height: 32px;
//       vertical-align: middle;
//       margin-right: 12px;
//     }

//     & .sidebar-title {
//       display: inline-block;
//       margin: 0;
//       color: #fff;
//       font-weight: 600;
//       line-height: 50px;
//       font-size: 14px;
//       font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
//       vertical-align: middle;
//     }
//   }
//}
}
</style>