<template>
  <div class="app-container">
    <el-form size="mini" label-width="100px" @submist.native.prevent class="ctntype">
      <el-row style="margin-bottom:10px;">
        <el-col :span="5">
          <el-form-item label="单号：" prop>
           <el-input placeholder="单号"    style="width:100%;" 
              v-model="search.BillNO"  size="mini" clearable 
               @input="search.BillNO = search.BillNO.toUpperCase()">
           </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="起运站：" prop>
            <el-select
              v-model="search.StartStation"
              placeholder="起运站"
              style="width:99%"
              clearable
              filterable
            >
              <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="目的站：" prop>
            <el-select
              v-model="search.EndStation"
              placeholder="目的站"
              style="width:99%"
            clearable
              filterable
            >
               <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="还箱地：" prop>
            <el-select
              v-model="search.ReturnStation"
              placeholder="目的站"
              style="width:99%"
            clearable
              filterable
            >
               <el-option
                v-for="item in siteList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
         <el-col :span="4">
            <el-form-item label="是否库存：" >
             <el-select
              v-model="search.IsInStock"
              placeholder="是否库存"
              clearable
              filterable          
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="4">
            <el-form-item label="是否启用：" >
             <el-select
              v-model="search.IsEnable"
              placeholder="是否启用"
              clearable
              filterable          
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否审核：" >
             <el-select
              v-model="search.IsVerify"
              placeholder="是否审核"
              clearable
              filterable          
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="是否完成：" >
             <el-select
              v-model="search.Finish"
              placeholder="是否完成"
              clearable
              filterable          
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        <el-col :span="10">
          <el-form-item label prop label-width="15px">
            <el-button type="primary" size="mini" @click="onSearchBefore();getTableList()">搜索</el-button>
            <el-button type="primary" size="mini" @click="createOrEdit()">新增</el-button>
            <el-button type="primary" size="mini" @click="onBatchDelete()">批量删除</el-button>
             <el-button type="primary" size="mini" @click="BatchOPEN(true)" :loading="btnloading">批量启用</el-button>
             <el-button type="primary" size="mini" @click="BatchOPEN(false)" :loading="btnloading">批量停用</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="height:calc(100% - 130px)">
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
        style="width: 100%,height:100%"
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
          prop="endStation"
          label="目的站"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="returnStation"
          label="还箱地"
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
          prop="xxcc"
          label="箱型尺寸"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        
         <el-table-column
          align="center"
          prop="isInStock"
          label="是否库存"
           width="100px"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.isInStock?"是":"否"}}</span>
           </template>
        </el-table-column>
        
         <el-table-column
          align="center"
          prop="predictTime"
          label="预计到站时间"
          width="120px"
          sortable="custom"
          show-overflow-tooltip
        >
            <template slot-scope="scope">{{
              scope.row.predictTime | parseTime('{y}-{m}-{d}')
            }}</template>
        </el-table-column>
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
          prop="sellingPrice"
          label="租金"
           width="120px"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
         

      

       <el-table-column
          align="center"
          prop="finish"
          label="是否完成"
           width="100px"
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
          width="100px"
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
           width="100px"
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
            <div class="tableBtn" @click="deletecdelinfo(scope.row.id)"
             v-if="scope.row.isVerify  !==true && scope.row.finish  !==true">删除</div>
            
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        :page-sizes="page.pageSelectArr"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-row>
    <creat-XDDelInfo
      ref="creatXDDelInfoComp"
      :pshow="creatXDDelInfoComp.show"
      @on-show-change="onCreatCtnTypeContrastCompShowChange"
      @on-save-success="onSaveSuccess"
    ></creat-XDDelInfo>

  </div>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import { warnMsg } from "utils/messageBox";
import creatXDDelInfo from "./creatXDDelInfo";
import {
  GetXDDelInfoList,
  BatchDelete,BatchOP
} from "api/InformationDelivery/XD";
import { GetSiteList,GetLineList } from "api/publicBase/Combox";



export default {
  name: "XDDelInfoIndex",
  mixins: [tableMixin],
  components: {
    creatXDDelInfo
  },
  data() {
    return {
      creatXDDelInfoComp: {
        show: false
      },
    
      search: {
        BillNO: "",
        StartStation: "",
        EndStation: "",
        ReturnStation: "",
        IsEnable: undefined,
        IsVerify: undefined,
        Finish: undefined,
        IsInStock: undefined,
      },
      siteList: [], //站点
      lineList: [],//
      btnloading:false
    
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
      GetXDDelInfoList(data)
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
       this.creatXDDelInfoComp.show = true;
       this.$refs.creatXDDelInfoComp.getsiteList();
       this.$refs.creatXDDelInfoComp.getcclist();
       this.$refs.creatXDDelInfoComp.getxxlist();
      if (id) {
       
        this.$refs.creatXDDelInfoComp.GetXDDelInfoSingle(id);
              
      } 
    },
    onCreatCtnTypeContrastCompShowChange(val) {
      this.creatXDDelInfoComp.show = val;
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
   
  }
};
</script>

<style lang="scss">
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