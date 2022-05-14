<template>
 <el-scrollbar style="height:100%" 
  class="page-component__scroll"
  view-style="height:100%"
  > 
  <div  class="app-container jkyxclass" style="height:100%" v-loading="loading">
     <el-form size="mini" :model="form" ref="ruleForm" :rules="rules" label-width="100px" >

      <el-card style="height:80px">  
       <el-col :span="4" >
           <div class="tltle">进口押箱</div>
            <el-divider class="u11_div"></el-divider>
           <!-- <div class="u11_div"></div> -->
       </el-col>
        <el-col :span="1" >
            <el-divider direction="vertical"></el-divider>
        </el-col>
         <el-col :span="7" >
              <el-input placeholder="请输入要换单的提单号"  
                            style="width:100%;" 
                              v-model="seach.billNo"
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
    <div style="height:calc(100%-90px); padding-top: 40px;">
         <div class="secondtitle">基础信息</div>
         <el-row>
           <el-col :span="8">
             <el-form-item label="提单号：" prop label-width="100px">                            
                     {{form.billNo}}
              </el-form-item>
           </el-col>
            <el-col :span="8">
             <el-form-item label="船名：" prop label-width="140px">                            
                     {{form.shipname}}
              </el-form-item>
           </el-col>
         </el-row>
          <el-row>
           <el-col :span="8">
             <el-form-item label="航次：" prop label-width="100px">                            
                     {{form.imvoy}}
              </el-form-item>
           </el-col>
            <el-col :span="8">
             <el-form-item label="是否可退押：" prop label-width="140px">                            
                     {{form.isjq}}
              </el-form-item>
           </el-col>
         </el-row>
          <el-row>
            <el-col :span="16">
             <el-form-item label="提示信息：" prop label-width="100px">                            
                  <span style="color: #E14E26;">   {{form.rem}}</span>
              </el-form-item>
           </el-col>
          </el-row>

     <el-table
      :cell-class-name="tableRowClassName"
        v-loading="table.loading"
        :data="TableDataList"
         :row-key = "getRowKeys"
        border
        stripe
        highlight-current-row
        fit     
        height="340px"
        style="width:760px"
        ref="table"
     
      >
       <!-- <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column> -->
        <el-table-column type="index" align="center" label="序号" width="50">
          <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
        </el-table-column>
       
        <el-table-column
          align="center"
          prop="feename"
          label="费目"  
           width="200"    
          
        ></el-table-column>
        <el-table-column
          align="center"
          prop="rmbamt"
          show-overflow-tooltip
          label="人民币金额"
        width="150"
      
        ></el-table-column>
        <el-table-column
          align="center"
          prop="usdamt"
          show-overflow-tooltip
          label="美元金额"
         width="150"
        
        ></el-table-column>
        <el-table-column
          align="center"
          prop="rem"
          show-overflow-tooltip
          label="备注"
         width="200"
         
        ></el-table-column>
      
      </el-table>
    </div>  
     
    
     </el-form>   
       <img  class="img " :src="require('@/views/GJT/images/u20.png')" />
   <!-- <div style="height:100%;">
     
    </div>   -->
  
  </div>
 </el-scrollbar>
</template>
<style lang="scss">
.jkyxclass {
  //height: 100%;
 // padding: 20px; 
  background-color: white;
 .el-scrollbar__view{
   height: 100%;
 }
 .el-input__inner{
  height: 40px;
}
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

  // .el-row{
  //   margin-bottom: 20px;
  //   display: flex;
  //   flex-wrap: wrap;
    
  // }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 3em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
   }
  
   .secondtitle{
       font-weight: 700;
      font-size: 18px;
      text-align: left;
       color: #0658B8;
       padding-bottom: 20px;
       
   }
    .secondconten{
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 16px;
   }
    .img{
     border-width:0px;
      position:absolute;
      right:60px;
      bottom:10px;
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
  name: "importyxindex",
  mixins: [tableMixin],
  components: {},
  data() {
    return {
     
      btnLoading: false,
      seach: {
          billNo:"GTG0312094"
      },
      form: {
          billNo:"GTG0312094",
          shipname:"长隆/EVER GLORY",
          imvoy:"E012",
          isjq:"否",
          rem:"已扣单！箱号FSCU4572106扣单，扣单场站：港联捷总站；"
      },
      TableDataList:[
        // {
        //   feename:"箱使费",
        //   rmbamt:"-",
        //   usdamt:"-",
        //   rem:"箱子未返空"
        // }
        //  {
        //   feename:"修洗费",
        //   rmbamt:"-",
        //   usdamt:"-",
        //   rem:"场站结算修洗"
        // },
        //  {
        //   feename:"其他费用",
        //   rmbamt:"0",
        //   usdamt:"0",
        //   rem:""
        // }
      ]
    
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