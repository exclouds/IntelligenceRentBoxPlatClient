<template>
	<div class="app-wrapper" >
	
	<el-col :span="24"   style="height:100%">
		<el-container style="height:100%">
			<el-header style="height: 70px;width:100%;" > 
				<sidebar class="sidebar-container"></sidebar> 
			</el-header>
		<!-- background-color: rgba(248, 251, 255, 1); -->
			<el-main  style="padding:0px !important">
				
				<el-col :span="24"     style="height:100%">
					<!-- <navbar></navbar> -->
					<el-scrollbar style="height:100%"  class="page-component__scroll"> 
					<app-main></app-main> 
					</el-scrollbar>
				</el-col>
	          	
			</el-main>	
			<el-footer style="height:120px;padding:0px!important" >
			      		
			<div class="botomconten" style="height:70px;">    
			<el-col :span="11" style=" text-align:right;background-color: rgb(232, 241, 246);">
			<img id="u0_img" class="img"  
			:src="require('@/views/dashboard/css/images/logo.png')" />   
			</el-col>
				<el-col :span="12" style="height:100%;padding-top:20px;background-color: rgb(232, 241, 246);"> 
			<span  style="font-weight:700;margin-right:50px;">云租箱平台</span>
			<span> 联系电话：4001-556-956 工作日 9:00-12:00、13:00-19:00</span>
				</el-col>
			</div>

             
	    	<div align="center" class="lastclass">{{'Copyright 2021-'+(new Date()).getFullYear()+' 拼箱平台'}}</div>							        
			<!-- </div>			 -->
			</el-footer>
		</el-container>	 
	
	</el-col>		
	</div>	
</template>

<script>
  import {mapGetters} from 'vuex';
  import Stomp from 'stompjs'
  import { Navbar, Sidebar, AppMain } from 'views/layout';
   import {setCookie, getCookie, delCookie} from 'utils/cookie'
     import {LogOut} from 'api/user/tenant'
	
  export default {
    name: 'layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
		},
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
			},
			...mapGetters([
				'userId',
				'name',
			])
		},
		data () {
			return {
				sock: undefined,
				stomp: undefined, //Stomp.over(this.sock),
				msg: undefined,
				exchangePath: undefined,
				updatePasswordComp: {
						show: false
					} 
				
			}
		},
		created () {
			//this.reconnect();
			// if(this.$route.query && this.$route.query.salno){
			// 	this.salname=this.$route.query.salno;
			// }
			//  else if(getCookie("platsalno"))
			//  {
			// 	 this.salname=getCookie("platsalno");

			//  }
			
		},
		methods: {
			onConnected: function (frame) {
				this.exchangePath = `/exchange/userNotify/${this.userId}`
				if (this.stomp) {
					this.stomp.subscribe(this.exchangePath, this.onmessage)
				}
			},
			onError: function (frame) {
				//错误信息
				console.error('onError: ' + frame)
				this.reconnect();
			},
			onmessage: function (frame) {
				//接收消息
				if (frame.headers.destination == this.exchangePath || frame.headers.destination == '/exchange/userNotify') {
					if (frame.headers.destination == this.exchangePath) {
						this.$notify.info({
							title: '消息',
							message: frame.body,
							duration: 2000
						});
					} else {
						if (frame.body.length > 20) {
							this.$notify.info({
								title: '系统消息',
								message: `${frame.body.substr(0,20)}...，详情请到消息中心查看。`,
								duration: 0
							});
						} else {
							this.$notify.info({
								title: '系统消息',
								message: frame.body,
								duration: 0
							});
						}
					}
					this.$store.dispatch('GetMessage');
				}
			},
			reconnect () {
				this.sock = new WebSocket('ws://10.35.5.123:15674/ws');
				this.stomp = Stomp.over(this.sock);
				this.stomp.heartbeat.outgoing = 0;
				this.stomp.heartbeat.incoming = 0;
				this.connect();
			},
			connect: function () {
				//连接服务器
				if (this.stomp) {
					this.stomp.connect('customer', 'customer', this.onConnected, this.onError);
				}
			},
			onlogin(){
				 this.$router.push({
                  path: '/login'
                  });
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
			
		}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
   
	 .app-wrapper {
		@include clearfix;
		//position: relative;
		height: 100%;
		width: 100%;
	   
		.lastclass{
			background: rgba(242, 242, 242, 1);
			color: #999999;
			//height: 100px;		   
			font-weight: 400;
			font-size: 16px;
			line-height: 30px;
			padding-top:10px ;
			padding-bottom:10px ;

		}	
		.botomconten{
            padding-top:15px!important;
			vertical-align: middle;
			background-color: rgb(232, 241, 246);
		}
		.sidebar-container {
			border-width: 0px;
			position: absolute;
			left: 0px;
			//top: 40px;
			//width: 100%;
		
			display: flex;		
		}
		.main-container {
			//min-height: 700px;
			//transition: margin-left 0.28s;
			//margin-left: 210px;
			// height:calc(100%-210px);
		}
		 
	}
</style>
