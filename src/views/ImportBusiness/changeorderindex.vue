<template>
 <el-scrollbar style="height:100%"  class="page-component__scroll"> 
  <div  class="app-container jkhdclass" v-loading="loading">

      <el-card style="height:80px">  
       <el-col :span="4" >
           <div class="tltle">进口换单</div>
            <el-divider class="u11_div"></el-divider>
           <!-- <div class="u11_div"></div> -->
       </el-col>
        <el-col :span="1" >
            <el-divider direction="vertical"></el-divider>
        </el-col>
         <el-col :span="7" >
              <el-input placeholder="请输入要换单的提单号"  
                            style="width:100%;" 
                              v-model="form.billNo"
                              size="mini" clearable ></el-input>
         </el-col>
           <el-col :span="2" style="padding-left:15px">
                <el-button type="primary" 
                style="width:100px;height:40px;" 
                 size="small" class="btn">
                 <span style="font-size:18px">搜索</span>
                 </el-button>
         </el-col>
      </el-card >
     <el-card style="height:230px;margin:20px"> 
         <div class="secondtitle">换单流程</div>
         <div class="secondconten">1、核实提单类型（电放/正本/海单）</div>
         <div class="secondconten">2、准备相关单据保函</div>
         <div class="secondconten">3、核实换单费用</div>
        <div class="secondconten">4、付换单费，电汇或支票（付美元需预借美金发票）</div>
     </el-card>
     <div style="margin:20px;margin-top:40px">
       <el-col :span="24">
         
         <div class="secondtitle">海运中心保函查询</div>
        
         <div class="secondconten">1、押金条丢失情况说明</div>
        
         <div class="secondconten">2、押金抵扣超期费情况说明</div>     
      
        <div class="secondconten">3、长荣电放&海单保函</div>

        <div class="secondconten">4、长荣第三行换单提货保函</div>

        <div class="secondconten">5、宏海进口电放SEAWAYBILL保函</div>

        <div class="secondconten">6、押金条丢失情况说明</div>

        <div class="secondconten">7、押金抵扣超期费情况说明</div>

        <div class="secondconten">8、长荣电放&海单保函</div>

        <div class="secondconten">9、长荣第三行换单提货保函</div>

        <div class="secondconten">10、宏海进口电放SEAWAYBILL保函</div>
    
       </el-col>
        <el-col :span="6" :offset="18">
          <img  :src="require('@/views/GJT/images/u20.png')" />
        </el-col>
     </div>
   
     
   <!-- <div style="height:100%;">
       <img  class="img " :src="require('@/views/GJT/images/u20.png')" />
    </div> -->
  </div>
 </el-scrollbar>
</template>
<style lang="scss">
.jkhdclass {
  //height: 100%;
  min-height:1100px;
  padding: 20px; 
  background-color: white;
 
  .tltle {   
        font-weight: 700;
        font-size: 18px; 
        padding-left: 20px;  
        padding-right: 20px;      
  }
  .u11_div {
    margin-left: 30px;  
   margin-top: 10px; 
    width: 50px;
    height: 8px;
    background: -webkit-linear-gradient(
    350.909723079178deg, rgba(106, 155, 251, 1) 0%, rgba(11, 110, 227, 1) 99%);
    background: -moz-linear-gradient(99.0902769208223deg, rgba(106, 155, 251, 1) 0%, rgba(11, 110, 227, 1) 99%);
    background: linear-gradient(
    99.0902769208223deg, rgba(106, 155, 251, 1) 0%, rgba(11, 110, 227, 1) 99%);
    border: none;
    border-radius: 4px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.u11_div1 {
    border-width: 0px;
    position: absolute;
    left: 70px;
    top: 70px;
    width: 50px;
    height: 8px;
    background: -webkit-linear-gradient(
     350.909723079178deg, rgba(106, 155, 251, 1) 0%, rgba(11, 110, 227, 1) 99%);
    background: -moz-linear-gradient(99.0902769208223deg, rgba(106, 155, 251, 1) 0%, rgba(11, 110, 227, 1) 99%);
    background: linear-gradient(
     99.0902769208223deg, rgba(106, 155, 251, 1) 0%, rgba(11, 110, 227, 1) 99%);
    border: none;
    border-radius: 4px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
}
  .el-row{
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    
  }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 3em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
   }
   .el-input__inner{
       height: 40px;
   }
   .secondtitle{
      font-weight: 700; 
       font-size: 18px;
   }
    .secondconten{
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 16px;
   }
     .img{
     border-width:0px;
      position:absolute;
      right:200px;
      top:20px;
    //  bottom:100px;
     // width:100%;
    //  height:70px;
      display:flex;
      z-index: 99;
  }
}
</style>

<script>

import { tableMixin } from "mixin/commTable";
import { parseTime } from "utils";
import { warnMsg } from "utils/messageBox";


export default {
  name: "changeorderindex",
  mixins: [tableMixin],
  components: {},
  data() {
    return {
     
      btnLoading: false,
      form: {
          billNo:""
      },
    
    };
  },
  mounted() {},
  
  methods: {
   
   
  },
  //页面创建方法
  created() {
   
   
  }
};
</script>