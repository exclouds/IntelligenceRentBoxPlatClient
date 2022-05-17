<template>
  <div class="app-container xdqueryclass">
  <div style="font-size:20px;color:blue;padding-bottom:10px">箱东信息：</div>
    <el-form size="mini" label-width="100px" @submist.native.prevent class="ctntype">
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
          </el-row>
          <el-row>
           <el-col :span="4">
            <el-form-item label="租金范围起：" >
               <el-input-number
                    placeholder="租金起"
                    v-model="search.startprice"
                    controls-position="right"                                                            
                    :step="1"
                    clearable
                    style="width: 100%"
                    ></el-input-number>
            </el-form-item>
          </el-col>
      
          <el-col :span="4">
            <el-form-item label="租金范围止：" >
               <el-input-number
                    placeholder="租金止"
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
    <el-row style="height:calc(100% - 160px)">
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
          prop="creationTime"
          label="创建时间"
           width="120px"
          sortable="custom"
           show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.creationTime|parseTime('{y}-{m}-{d}')}}
            </template>
        </el-table-column>   
        <el-table-column align="center" label="操作" width="160px" fixed="right">
          <template slot-scope="scope">
              <div class="tableBtn" @click="createOrEdit(scope.row.id)" >箱信息</div>
              <div class="tableBtn" @click="showfile(scope.row)" >查看附件</div>
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
     <ShowXDDelInfo
      ref="creatXDDelInfoComp"
      :pshow="creatXDDelInfoComp.show"
      @on-show-change="onCreatCtnTypeContrastCompShowChange"
      @on-save-success="getTableList()"
    ></ShowXDDelInfo>
    <ShowFilePage
      ref="ShowFilePageComp"
      :pshow.sync="ShowFilePageComp.show"
     
    ></ShowFilePage>
  </div>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import { warnMsg } from "utils/messageBox";
import {GetXDDelInfoList} from "api/OnlineSearch";
import { GetSiteList,GetLineList } from "api/publicBase/Combox";
import ShowXDDelInfo from './ShowXDDelInfo'
import ShowFilePage from './ShowFilePage'

export default {
  name: "XDSeachInfoIndex",
  mixins: [tableMixin],
  components: {ShowXDDelInfo,ShowFilePage},
  data() {
    return {
      search: {
        BillNO: "",
        StartStation: "",
        EndStation: "",
        ReturnStation: "",    
        IsInStock: undefined,
        startprice: "", 
        endprice: "", 
      },
      siteList: [], //站点
      lineList: [],//
      creatXDDelInfoComp: {
        show: false
      },
      ShowFilePageComp: {
        show: false
      },
    
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
       this.$refs.creatXDDelInfoComp.id=id;
        this.$refs.creatXDDelInfoComp.getTableList(id);     
    },
    onCreatCtnTypeContrastCompShowChange(val) {
      this.creatXDDelInfoComp.show = val;
    },  
    showfile(row){
       this.ShowFilePageComp.show = true;
       this.$refs.ShowFilePageComp.form.id=row.id;
        this.$refs.ShowFilePageComp.form.billno=row.billNO;
        this.$refs.ShowFilePageComp.getfileList(); 
    }
  },
  //初始化
  created() {
 
    this.getsiteList();
   
  }
};
</script>

<style lang="scss">
.xdqueryclass{
//background-color: white;
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
}
</style>