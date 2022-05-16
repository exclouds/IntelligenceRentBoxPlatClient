<template>
  <div class="app-container">
    <div style="font-size:20px;color:blue;padding-bottom:10px">租客信息：</div>
    <el-form size="mini" label-width="80px" @submist.native.prevent class="ctntype">
      <el-row style="margin-bottom:10px;">
        <el-col :span="4">
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
              style="width:100%"
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
              style="width:100%"
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
         <el-col :span="5">
            <el-form-item label="期望成交价范围起：" label-width="150px" >
               <el-input-number
                    placeholder="期望成交价起"
                    v-model="search.startprice"
                    controls-position="right"                                                            
                    :step="1"
                    clearable
                    style="width: 100%"
                    ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="期望成交价范围止："  label-width="150px">
               <el-input-number
                    placeholder="期望成交价止"
                    v-model="search.endprice"
                    controls-position="right"                                                            
                    :step="1"
                    clearable
                    style="width: 100%"
                    ></el-input-number>
            </el-form-item>
          </el-col>
        <el-col :span="1">
          <el-form-item label prop label-width="15px">
        <el-button type="primary" size="mini" @click="onSearchBefore();getTableList()">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="height:calc(100% - 120px)">
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
        min-width="15%"
          sortable="custom"
          show-overflow-tooltip
          fixed="left"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="startStation"
          label="起运站"
          min-width="15%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="endStation"
          label="目的站"
          min-width="15%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
         <el-table-column
          align="center"
          prop="line"
          label="所属路线"
          min-width="15%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        
        <el-table-column
          align="center"
          prop="effectiveSTime"
          label="有效时间起"
          min-width="12%"
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
          min-width="12%"
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
          min-width="12%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
       <el-table-column
          align="center"
          prop="finish"
          label="是否完成"
          min-width="10%"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span>{{scope.row.finish?"是":"否"}}</span>
           </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="creationTime"
          label="创建时间"
          min-width="12%"
          sortable="custom"
           show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.creationTime|parseTime('{y}-{m}-{d}')}}
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
    

  </div>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import { warnMsg } from "utils/messageBox";

import {GetZKDelInfoList} from "api/OnlineSearch";
import { GetSiteList,GetLineList } from "api/publicBase/Combox";



export default {
  name: "ZKSeachInfoIndex",
  mixins: [tableMixin],
  components: {},
  data() {
    return {
    
      search: {
        BillNO: "",
        StartStation: "",
        EndStation: "",   
         startprice: null, 
        endprice: null,         
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