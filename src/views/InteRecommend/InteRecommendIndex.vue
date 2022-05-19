<template>
<el-scrollbar style="height:100%"  class="page-component__scroll"> 
  <div class="app-container inrecclass">
<div style="padding:20px;height: 100%;" >
  
   <el-tabs style="height:100%"  v-model="activeName"  >
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
           <div >集装箱信息：{{item.xxcc}}</div>       
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
    

  </div>
</el-scrollbar>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import { warnMsg } from "utils/messageBox";
import {GetIntelligRcommendList} from 'api/InteRecommend'



export default {
  name: "InteRecommendIndex",
  mixins: [tableMixin],
  components: {},
  data() {
    return {  
      datalist: {
          xdlist:[],
          zllist:[]
      },
       activeName: "first",
    
    };
  },
  methods: {
    GetIntelligRcommendList()
     {
        let data=
        {
            maxResultCount: 45,
            skipCount:  0, 
        };
 
      this.datalist = [];
   
      GetIntelligRcommendList(data)
        .then(res => {
         
          if (res.success) {
            this.datalist = res.result;        
          }
        });

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
  //初始化
  created() {
 
    this.GetIntelligRcommendList();
   
  }
};
</script>

<style lang="scss">
.inrecclass{
    background-color: white;
    height: 100%;
    .cardclass{
    height:220px;
    margin-left:20px;
    line-height:30px
  }
}
.ctntype {
  .item1 {
    .el-form-item__label {
      width: 65px !important;
    }
    .el-form-item__content {
      margin-left: 68px !important;
    }
  }
}
</style>