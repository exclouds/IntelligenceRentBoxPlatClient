<template>
<el-scrollbar style="height:100%"  class="page-component__scroll"> 
  <div class="app-container inrecclass">
  <el-col :span="16" :offset="4">
    <div style="padding:20px;height: 100%;" >
       <el-col :span="21" >
              <div class="cptitle">智能推荐</div>           
          </el-col>
       <el-col :span="3" style="text-align:right;padding-right:20px">
              <el-link type="primary" @click="openmore">
                <span class="cptitle">更多信息></span>
                </el-link>           
          </el-col>
      
    <div >
          <el-col :span="8"
            v-for="(item, index) in datalist"
                :key="index"     
            >
            <el-card class="cardclass">
            <div class="title">
              {{item.startStation+" 至  "+item.line+" 航线"}}</div>
        
            <div>单号：{{item.billNO}}    </div>
            <div>{{"起运港："+item.startStation}}    </div>
            <div>航线：{{item.line}}</div>
            <div >集装箱信息：{{item.xxcc}}</div>       
          <div>有效时间：{{item.effectiveSTime+" 至  "+item.effectiveETime}}</div>
            <div>
              <!-- <el-col :span="21" >
                  <span>{{item.name}}</span>
              </el-col> -->
              <el-col :span="3" :offset="21">
                <el-link type="primary" @click="opendetail(item)">更多</el-link>           
              </el-col>
            
            </div>
            </el-card>
          </el-col>
      </div>
      <div >
         
      </div>
    </div>
  </el-col>

  </div>
</el-scrollbar>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import { warnMsg } from "utils/messageBox";
import {GetIntelligRcommendList} from 'api/InteRecommend'
import { getCookie} from 'utils/cookie'


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
     openmore(){
        var type="";
      if(getCookie("AbpCompanyType"))
        type = getCookie("AbpCompanyType");
        if(type=="1" || type=="3")
        {        
          this.$router.push({
            path: "/ZKSeachInfo/ZKSeachInfo",
            query: this.search
        });
        }
        else{
           this.$router.push({
            path: "/XDSeachInfo/XDSeachInfo",
            query: this.search
          });
        }
      
     },
     opendetail(row){
        this.$router.push({
            path: "/InRecommond/DelivInfoDetail",
            query: { id: row.id,
                    type:row.type,
                   }
        });
     },
       
  },
  //初始化
  created() {
 
    this.GetIntelligRcommendList();
   
  }
};
</script>

<style lang="scss">
.inrecclass{
    background-color: rgb(240, 248, 253);
    height: 100%;
    .cardclass{
    height:240px;
    margin:15px;
    line-height:30px
  }
  .cptitle{
    font-size: 16px;
    font-weight: 700;
    color: rgb(6, 88, 185);
    padding-left: 20px;
  }
  .title{
    font-weight: 400;
    font-size: 16px;
    color: #0658B9;
  }
}

</style>