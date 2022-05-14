<template>
  <div style="width:100%;"  class="sidebarcalss">
    <el-col :span="6" :offset="1"  align="center" class="leftshowclass">
      <span>云租箱平台</span>
    </el-col>
    <el-col :span="12"  >
      <el-menu
         :unique-opened = true
         :show-timeout="200"
         :default-activde="$route.path"
         mode="horizontal" 
         text-color="#545c64"
        active-text-color="#409EFF"
      
        class="menuclass"
        
      >
        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" 
        :base-path="route.path"/>
      </el-menu>
    </el-col>
    <el-col :span="6"  align="center" style="padding-top:20px">
      <el-dropdown v-if="name">
			<span class="el-dropdown-link">
				{{name}}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
						<el-dropdown-item><span @click="onupdatePasswordComp()" style="display:block;">修改密码</span></el-dropdown-item>
				
			</el-dropdown-menu>
		</el-dropdown>      
	    <el-link v-if="!name" type="primary" @click="onlogin()">{{"登录/注册"}}</el-link> 
		   <!-- <span style="padding-left:20px">APP下载</span>
		     <span style="padding-left:20px">关注我们</span> -->
    </el-col>
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper" class="sideBar"> -->
     
    <!-- </el-scrollbar> -->
      <!-- background-color="#304156" -->
        <update-password ref="updatePasswordComp" :pshow.sync="updatePasswordComp.show"  @on-save-success="onSaveSuccess"></update-password>
        <login ref="loginComp" 
        :pshow.sync="loginComp.show" 
       
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
					} 
				
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
					//location.reload(); // 为了重新实例化vue-router对象 避免bug
					this.$store.commit('CLEAN_VIEW')
					window.location.href = process.env.LOGOUT_URL
					location.reload();
					//this.$router.push({ path: '/login' })
					
				});
       },
     

		   
},
created(){
}

}
</script>
<style  rel="stylesheet/scss" lang="scss">
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {

      min-width: 80px!important;
      }
.sidebarcalss{
.leftshowclass{  
   padding-top: 20px; 
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