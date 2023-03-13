<template>
<el-scrollbar style="height:100%"  class="page-component__scroll"> 
  <div class="app-container inreinfocclass">
  <el-col :span="18" :offset="4">
    <div class="title">{{type===""?"箱东信息":"租客信息"}}</div>   
    <el-form
        size="mini"
        :model="form"
        ref="ruleForm"    
        v-loading="formLoading"
        label-width="120px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="单号：">
                {{form.billNO}}          
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起运站：" >
                 {{form.startStation}}
             
            </el-form-item>
          </el-col>
        
           <el-col :span="8">
            <el-form-item label="所属路线：" >
                {{form.line}}
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="目的站：" >
                {{form.endStation}}
            </el-form-item>
          </el-col>
            <el-col :span="8">
            <el-form-item label="还箱地：" v-if="type==='XD'">
                {{form.returnStation}}
            </el-form-item>
          </el-col>
          
             
          <!-- <el-col :span="8">
            <el-form-item label="是否库存："  v-if="type==='XD'">
               {{form.isInStock}}            
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计到站时间："  v-if="type==='XD'">
               {{form.predictTime}} 
            </el-form-item>
          </el-col>        -->
          <el-col :span="8">
            <el-form-item label="有效时间：" >
                {{form.effectiveSTime +" 至 "+ form.effectiveETime}} 
            </el-form-item>
          </el-col>
          
        </el-row>
         <div class="title">集装箱信息：</div>       
           <el-row>
          
          <el-col :span="23" :offset="1">
              <el-table
              :cell-class-name="tableRowClassName"           
                :data="form.boxDetails"
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
                height="260px"
                style="width:100%"
                ref="table1"
              >
             <el-table-column type="index" align="center" label="序号" width="50">
            <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="boxNO"
                show-overflow-tooltip
                label="箱号"
                min-width="15%"
                sortable="custom"
            >
            </el-table-column>            
            <el-table-column
                align="center"
                prop="box"
                label="箱型"  
                min-width="12%"  
                sortable="custom"
            > </el-table-column>
            <el-table-column
                align="center"
                prop="size"
                show-overflow-tooltip
                label="尺寸"
            min-width="12%"  
                sortable="custom"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="quantity"
                show-overflow-tooltip
                label="箱量"
            min-width="12%"  
                sortable="custom"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="maxWeight"
                show-overflow-tooltip
                label="最大载重"
            min-width="12%"  
                sortable="custom"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="freezerModel"
                show-overflow-tooltip
                label="冻柜型号"
            min-width="12%"  
                sortable="custom"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="boxLabel"
                show-overflow-tooltip
                label="箱标"
            min-width="12%"  
                sortable="custom"
            ></el-table-column>
            <el-table-column
                align="center"
                prop="boxAge"
                show-overflow-tooltip
                label="箱龄"
            min-width="12%"  
                sortable="custom"
            ></el-table-column>
                </el-table>
        
          </el-col>     
        </el-row>
    <el-row>
 
 <div class="title">附件信息：</div>    
   <el-col :span="22" :offset="1">
      <el-col :span="8"  v-for="(item, index) in form.fileList"
        :key="index" style="padding:20px"
         > 
          <el-image :src="item.url"  :preview-src-list="[item.url]">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
          </el-image>
        </el-col>
             
        
   </el-col>
        
    </el-row>
    </el-form>
    </el-col>
  </div>
</el-scrollbar>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import { warnMsg } from "utils/messageBox";
import {GetSingleInfo} from 'api/InteRecommend'



export default {
  name: "DelivInfoDetailIndex",
  mixins: [tableMixin],
  components: {},
  data() {
    return { 
      formLoading:false,
      type:"",
      id:0, 
      form: {},    
    
    };
  },
  methods: {
    GetSingleInfo()
     {
        let data=
        {
            id: this.id,
            type: this.type, 
        };
 
      this.form = {};
     this.formLoading=true;
      GetSingleInfo(data)
        .then(res => {
         
          if (res.success) {
            this.form = res.result;   
             this.formLoading=false;     
          }
        })
        .catch(()=>{
             this.formLoading=false;   
        });

     },

  },
  //初始化
  created() {
   if(this.$route.query){
        this.id=this.$route.query.id;
        this.type=this.$route.query.type;       
        this.GetSingleInfo();       
      }
    //this.GetIntelligRcommendList();
   
  },
  // activated(){
     
  //     if(this.$route.query){
  //       this.id=this.$route.query.id;
  //       this.type=this.$route.query.type;       
  //       this.GetSingleInfo();       
  //     }
  //  },
};
</script>

<style lang="scss">
.inreinfocclass{
    height: 100%;
    //background-color: rgba(248, 251, 255, 1);
    .title{
       padding-top:20px;
       padding-bottom:20px;
     // text-align: center;
      font-weight: 700;
      font-size: 20px;
      color: #0658B9;
    }

}

</style>