<template>
<el-scrollbar style="height:100%"  class="page-component__scroll"> 
  <div class="page-container abclass">
  <!-- <el-carousel indicator-position="outside" >
    <el-carousel-item v-for="item in 4" :key="item" > 
   
    </el-carousel-item>
  </el-carousel> -->
 <div style="height:500px">  
     <el-carousel indicator-position="outside"   style="height:500px">
    <el-carousel-item style="height:500px"> 
      <img id="u0_img" class="img" width="100%" height="100%" :src="require('@/views/dashboard/css/images/u1.jpg')" />    
    </el-carousel-item>
     <el-carousel-item style="height:500px"> 
      <img id="u0_img" class="img" width="100%" height="100%" :src="require('@/views/dashboard/css/images/u2.jpg')" />    
    </el-carousel-item>
  </el-carousel>
   
  </div>
   <div style="padding:20px;font-size:20px;color:blue">
     <span>智能推荐</span>
     </div>
  <div style="padding:20px">
     <el-tabs style="height:100%"  v-model="activeName"   >
      <el-tab-pane  name="first" v-if="datalist.xdlist.length>0">
         <span slot="label" class="tablable"> 箱东信息</span>
           <el-col :span="8"
          v-for="(item, index) in datalist.xdlist"
              :key="index"     
          >
          <el-card class="cardclass">
          <div class="title">{{item.billNO}}</div>
          <div>起运港：{{item.startStation}}</div>
          <div>目的港：{{item.endStation}}</div>
          <div >集装箱信息：{{item.xxcc}}</div>
          <div>期望成交价：{{item.price}}</div>
          <div>有效时间：{{item.effectiveSTime+" 至  "+item.effectiveETime}}</div>
          </el-card>
          </el-col>
           <el-col :span="2" :offset="22">
               <el-link type="primary" @click="openmoreXD">更多</el-link>
            
              </el-col>
      </el-tab-pane>
      <el-tab-pane  name="second" v-if="datalist.zklist.length>0">
         <span slot="label" class="tablable"> 租客信息</span>
           <el-col :span="8"
          v-for="(item, index) in datalist.zklist"
              :key="index"     
          >
          <el-card class="cardclass">
          <div class="title">{{item.billNO}}</div>
          <div>起运港：{{item.startStation}}</div>
          <div>目的港：{{item.endStation}}</div>        
          <div>租金：{{item.price}}</div>
          <div>有效时间：{{item.effectiveSTime+" 至  "+item.effectiveETime}}</div>
          </el-card>
          </el-col>
          <el-col :span="2" :offset="22">
            <el-link type="primary" @click="openmoreZK">更多</el-link>
            
              </el-col>
      </el-tab-pane>
     </el-tabs>
  
   
  </div>
     <div style="height:400px;"> 
       <div style="position:absolute;z-indent:2;left:0;top:1000;">
      租箱智能推荐
      </div> 
      <img id="u0_img" style="padding-top:50px" class="img" width="100%" height="100%" :src="require('@/views/dashboard/css/images/u3.jpg')" />    
  
   <!-- <div style="background:url('views/dashboard/css/images/u3.jpg') no-repeat;height:400px">租箱智能推荐</div>
  </div> -->
    </div> 
  </div>
  
</el-scrollbar>
</template>
<script>
import {setCookie, getCookie, delCookie} from 'utils/cookie'
import {GetIntelligRcommendList} from 'api/InteRecommend'


export default {
  name: 'dashboard',
  data() {
    return {
      num: '',
     datalist: {
          xdlist:[],
          zllist:[]
      },
       activeName: "first",
    }
  },
  methods: {
     GetIntelligRcommendList()
     {
        let data=
        {
            maxResultCount: 9,
            skipCount:  0, 
        };
 
      this.datalist = [];
   
      GetIntelligRcommendList(data)
        .then(res => {
         
          if (res.success) {
            this.datalist = res.result;        
          }
        })
        .catch(()=>{});

     },
     openmoreXD(){
        this.$router.push({
            path: '/OnlineSeach/XDSeachInfo'
          
            });
     },
       openmoreZK(){
         this.$router.push({
            path: '/OnlineSeach/ZKSeachInfo'
          
            });
     }
  },
  mounted() {
   this.GetIntelligRcommendList()
  }
}
</script>
<style lang="scss">
.abclass{
background-color: white;
  .cardclass{
    height:220px;
    margin-left:20px;
    line-height:30px
  }
}

.page-container{padding: 20px;min-height: 100vh;}
.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: "";
    clear: both;
    height: 0;
}
.top{margin-bottom: 15px;}
.cont-div{
  box-shadow: 0 2px 5px #ccc;
  height: 306px;
  box-sizing: border-box;
  float: left;
}
.main-div{width: 29%;font-size: 20px;line-height: 70px;color: #676a6c;padding: 0 20px;}
.main-div2{width: 36%;margin-left: 1%;}
.main-div2-title{line-height: 44px;color: #676a6c;font-size: 14px;box-sizing: border-box;padding: 0 20px;border-bottom: 1px solid #cdcccc;}
.more{color: #0060e2;float: right;}
.main-div2-img{text-align: center;padding-top: 50px;}
.main-div3-img{background: #eef5ff;text-align: center;}
.main-div3-btn{margin-top: 37px;text-align: center;}
.main-div3{width: 33%;margin-left: 1%;}
.main2-div{box-shadow: 0 2px 5px #ccc;box-sizing: border-box;float: left;width: 66%;padding: 20px;}
.main2-div2{box-shadow: 0 2px 5px #ccc;box-sizing: border-box;float: left;width: 33%;margin-left: 1%;}
.main2-div-title{font-size: 20px;font-weight: bold;color: #676a6c;margin-bottom: 15px;}
.main2-div2-title{line-height: 44px;color: #fff;font-size: 14px;box-sizing: border-box;padding: 0 20px;border-bottom: 1px solid #cdcccc;background: #0060e2;}
.more2{color: #fff;float: right;}
</style>
