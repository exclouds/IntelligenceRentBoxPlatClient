<template>
	<div id="app" style="width:100%;height:100%;">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- <template v-if="$route.meta.keepAlive"> 
      <keep-alive>
          <router-view v-if="isRouterAlive"></router-view>
      </keep-alive>
    </template>
    <template v-else>
      <router-view v-if="isRouterAlive"></router-view>
    </template> -->
	</div>
</template>

<script>
  export default {
    name: 'APP',
    provide(){
        return{
            reload:this.reload
        }
    },
    data () {
      return {
        isRouterAlive: true,
      }
    },
    methods:{
        
    },
    created(){
      
    },
    mounted() {
      
      // let socketIO = new SocketIO(`ws://10.135.123.51:3000?token=${this.$store.getters.gsWorkNo}`)
      // socketIO.on('connect', () => {
      //   console.log('')
      // });
      //this.$store.commit('SETSOCKET', socketIO)
      
      // socketIO.on('disconnect', (reason) => {
      //   console.log('断开连接', reason)
      // })
    }
  }
</script>


<style lang="scss">
  html,body,#app{
 
 height: 100%;
 
}
</style>
