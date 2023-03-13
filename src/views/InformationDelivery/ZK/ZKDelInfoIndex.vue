<template>
  <div class="app-container zkinfodel">
    <el-form size="mini" label-width="100px" @submist.native.prevent class="ctntype">
      <el-row >
        <el-col :span="4">
          <el-form-item label="单号：" prop>
           <el-input placeholder="单号"    style="width:100%;" 
              v-model="search.BillNO"  size="mini" clearable 
               @input="search.BillNO = search.BillNO.toUpperCase()">
           </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="起运站：" prop label-width="90px">
            <big-data-select             
              :val.sync="search.StartStation"
              placeholder="起运站"
              style="width: 100%"
              size="mini"
              clearable
              filterable                
              :data="siteList"
              optionkey="displayText"
              optionValue="value"
            ></big-data-select>
          </el-form-item>
        </el-col>
         <el-col :span="3">
          <el-form-item label="航线：" prop label-width="80px">
            <el-select
              v-model="search.line"
              placeholder="航线"
              style="width:100%"
              clearable
              filterable
            >
              <el-option
                v-for="item in lineList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-form-item label="目的站：" prop>
            <el-select
              v-model="search.EndStation"
              placeholder="目的站"
              style="width:100%"
             clearable
              filterable
              multiple
              collapse-tags
            >
               <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        
        <el-col :span="3">
            <el-form-item label="是否启用：" >
             <el-select
              v-model="search.IsEnable"
              placeholder="是否启用"
              clearable
              filterable  
               style="width:100%"        
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="是否审核：" >
             <el-select
              v-model="search.IsVerify"
              placeholder="是否审核"
              clearable
              filterable    
               style="width:100%"      
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="是否完成：" >
             <el-select
              v-model="search.Finish"
              placeholder="是否完成"
              clearable
              filterable       
               style="width:100%"   
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="2">
          <el-form-item label prop label-width="20px">
            <el-button type="primary" style="width:100px;font-size:16px" size="mini" @click="onSearchBefore();getTableList()">搜 索</el-button>
            
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-card  class="cardset">
      <div class="btnrow">
        <el-button class="btn1" type="primary" size="mini" @click="createOrEdit()">新增</el-button>
            <el-button class="btn2" type="primary" size="mini" @click="onBatchDelete()">批量删除</el-button>
             <el-button class="btn2" type="primary" size="mini" @click="BatchOPEN(true)" :loading="btnloading">批量启用</el-button>
             <el-button class="btn2" type="primary" size="mini" @click="BatchOPEN(false)" :loading="btnloading">批量停用</el-button>
      </div>
     <div style="height:79%">
     <el-table
        :data="table.data"
        :cell-class-name="tableRowClassName"
        :row-key="getRowKeys"
        @selection-change="onSelectChange"
        border
        stripe
        highlight-current-row
        fit
        height="100%"
        style="width: 100%"
        ref="table"
        v-loading="table.loading"
        @sort-change="sortChange"
        @select="handleSelectionChange"
      >
        <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column>
        <el-table-column type="index" align="center" label="序号" width="50" fixed="left">
          <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="billNO"
          label="单号"
         width="120px"
          sortable="custom"
          show-overflow-tooltip
          fixed="left"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="startStation"
          label="起运站"
           width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
       
         <el-table-column
          align="center"
          prop="line"
          label="所属路线"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
         <el-table-column
          align="center"
          prop="endStation"
          label="目的站"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
          <el-table-column
          align="center"
          prop="xxcc"
          label="箱型尺寸"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="effectiveSTime"
          label="有效时间起"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        >
            <template slot-scope="scope">{{
              scope.row.effectiveSTime | parseTime('{y}-{m}-{d}')
            }}</template>
        </el-table-column>
           <el-table-column
          align="center"
          prop="effectiveETime"
          label="有效时间止"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        >
           <template slot-scope="scope">{{
              scope.row.effectiveETime | parseTime('{y}-{m}-{d}')
            }}</template>
        </el-table-column>
           <el-table-column
          align="center"
          prop="hopePrice"
          label="期望成交价"
           width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
         

        <el-table-column
          align="center"
          prop="inquiryNum"
          label="询价次数"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>

       <el-table-column
          align="center"
          prop="finish"
          label="是否完成"
           width="120px"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.finish?"是":"否"}}</span>
           </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="isEnable"
          label="是否启用"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        >
           <template slot-scope="scope">
                    <span>{{scope.row.isEnable?"是":"否"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="isVerify"
          label="是否审核"
           width="120px"
          sortable="custom"
          show-overflow-tooltip
        >
           <template slot-scope="scope">
              <span>{{scope.row.isVerify?"是":"否"}}</span>
            </template>
        </el-table-column>

       <el-table-column
          align="center"
          prop="verifyRem"
          label="审核评语"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        
        <el-table-column
          align="center"
          prop="remarks"
          label="备注"
           width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="creationTime"
          label="创建时间"
           width="120px"
          sortable="custom"
           show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.creationTime|parseTime()}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
              <div class="tableBtn" @click="OPENSINGE(!scope.row.isEnable,scope.row.id)"
               v-if=" scope.row.finish  !==true">
               {{scope.row.isEnable?"停用":"启用"}} 
                </div>
            <div class="tableBtn" @click="createOrEdit(scope.row.id)"
            v-if="scope.row.isVerify  !==true && scope.row.finish  !==true">编辑</div>
              <!-- <div class="tableBtn" @click="createOrEdit(scope.row.id)"
           >编辑</div> -->
            <div class="tableBtn" @click="deletecdelinfo(scope.row.id)"
             v-if="scope.row.isVerify  !==true && scope.row.finish  !==true">删除</div>
            
          </template>
        </el-table-column>
      </el-table>
    <el-pagination
        style="margin-top:10px;"
        align="center" 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        :page-sizes="page.pageSelectArr"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
   </div>
    </el-card>
    <!-- <el-row style="height:calc(100% - 130px)">
     
      
    </el-row> -->
    <creat-ZKDelInfo
      ref="creatZKDelInfoComp"
      :pshow="creatZKDelInfoComp.show"
      @on-show-change="onCreatCtnTypeContrastCompShowChange"
      @on-save-success="onSaveSuccess"
    ></creat-ZKDelInfo>

  </div>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import { warnMsg } from "utils/messageBox";
import creatZKDelInfo from "./creatZKDelInfo";
import {
  GetZKDelInfoList,
  BatchDelete,BatchOP
} from "api/InformationDelivery/ZK";
import { GetSiteList,GetLineList } from "api/publicBase/Combox";



export default {
  name: "ZKDelInfoIndex",
  mixins: [tableMixin],
  components: {
    creatZKDelInfo
  },
  data() {
    return {
      creatZKDelInfoComp: {
        show: false
      },
    
      search: {
        BillNO: "",
        StartStation: "",
        line: "",
        EndStation: [],
        IsEnable: undefined,
        IsVerify: undefined,
        Finish: undefined,
      },
      siteList: [], //站点
      lineList: [],//
      btnloading:false,
    
    };
  },
  methods: {
    getRowKeys(row) {
      return row.id.toString();
    },
     //获取站点
    getsiteList() {
      GetSiteList().then(res => {
        this.siteList = res.result;
      });
    },
      //获取航线
    getlineList() {
      GetLineList().then(res => {
        this.lineList = res.result;
      });
    },
   
    //获取列表
    getTableList() {
      this.tableData = [];
      let data=this.search;

      data.maxResultCount= this.page.pageSize;
      data.skipCount= (this.page.currentPage - 1) * this.page.pageSize;
      data.sorting= this.table.order.sort;


      this.tableData = [];
      this.table.loading = true;
      this.$refs.table.clearSelection();
      GetZKDelInfoList(data)
        .then(res => {
          this.table.loading = false;
          if (res.success) {
            this.table.data = res.result.items;
            this.table.data.forEach(item => {
              this.$set(item, "popShow", false);
            });
            this.page.total = res.result.totalCount;
          }
        })
        .catch(err => {
          this.table.loading = false;
        });
    },
 
    //打开添加或修改
    createOrEdit(id) {
       this.creatZKDelInfoComp.show = true;
       this.$refs.creatZKDelInfoComp.getsiteList();
       this.$refs.creatZKDelInfoComp.getcclist();
       this.$refs.creatZKDelInfoComp.getxxlist();
       this.$refs.creatZKDelInfoComp.getlineList();
       
      if (id) {       
        this.$refs.creatZKDelInfoComp.GetZKDelInfoSingle(id);             
      } 
    },
    onCreatCtnTypeContrastCompShowChange(val) {
      this.creatZKDelInfoComp.show = val;
    },
    //添加或修改成功事件
    onSaveSuccess() {
      this.getTableList();
    },
    //批量删除
    onBatchDelete() {
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要删除的数据");
        return;
      }
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.table.choosedRow.map(item => item.id);
        BatchDelete(arr).then(res => {
          this.batchDeleteSearch();
          this.$refs.table.clearSelection();
          this.getTableList();
        });
      });
    },
    //删除
    deletecdelinfo(id) {
       this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        BatchDelete([id]).then(res => {
        this.getTableList();
        this.batchDeleteSearch();
        this.$refs.table.clearSelection();
      });
      });
     
    },
    BatchOPEN(val)
    {
      var msg=val==true?'启用':'停用';
      if (this.table.choosedRow.length === 0) {
        warnMsg("请选择要"+msg+"的数据");
        return;
      }
       let arr = this.table.choosedRow.map(item => item.id);
       this.bathoene(val,msg,arr);
    },
    OPENSINGE(val,id)
    {
      var msg=val==true?'启用':'停用';    
       let arr = [];
       arr.push(id);
       this.bathoene(val,msg,arr);
    },
   bathoene(val,msg,arr) {
    
      this.$confirm("是否确定"+msg+"?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        this.btnloading=true;
        let data={
          ids:arr,
          IsEnable:val
        }
        BatchOP(data).then(res => {
          // this.batchDeleteSearch();
          this.btnloading=false;
          this.getTableList();
        })
        .catch(()=>{
           this.btnloading=false;
        });
      });
    },
    
  },
  //初始化
  created() {
 
    this.getsiteList();
    this.getlineList();
  }
};
</script>

<style lang="scss">
.zkinfodel {
  .cardset{
    height:calc(100% - 60px);
    margin-left: 20px;
    margin-right: 20px;
   
  }
  .el-card__body{
    height: 100%;
    padding: 0px !important;
    }
  .btnrow { 
    background-color:rgb(240, 248, 253);;
   padding:20px ;
  // padding-left:20px ;
  }
  .btn1{
    font-size: 16px;
    width: 80px;
  }
   .btn2{
    font-size: 16px;
    width: 120px;
  }
  .el-table th{
    background: #e1e4eb !important;
    color:black!important;}
}
</style>