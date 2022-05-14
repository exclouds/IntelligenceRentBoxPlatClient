<template>
  <div class="app-container">
    <el-form size="mini" label-width="110px" @submist.native.prevent class="ctntype">
      <el-row style="margin-bottom:10px;">
        <el-col :span="4">
          <el-form-item label="船公司：" prop class="item1">
            <el-select
              v-model="search.shipperId"
              placeholder="船公司"
              style="width:95%"
              clearable
              filterable
              @change="onSearchBefore();getTableList()"
              @focus="getoComboBox('ship')"
            >
              <el-option
                v-for="item in shipCompanyList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="标准尺寸：" prop>
            <el-select
              v-model="search.sizeCode"
              placeholder="标准尺寸"
              style="width:99%"
              @change="onSearchBefore();getTableList()"
              @focus="getoComboBox('sizeCode')"
              clearable
              filterable
            >
              <el-option
                v-for="item in sizeCodeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="标准箱型：" prop>
            <el-select
              v-model="search.typeCode"
              placeholder="标准箱型"
              style="width:99%"
              @change="onSearchBefore();getTableList()"
              @focus="getoComboBox('typeCode')"
              clearable
              filterable
            >
              <el-option
                v-for="item in typeCodeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
        <el-col :span="4">
          <el-form-item label="箱型代码：" prop>
            <el-input
            style="width:99%"
              placeholder="船公司箱型代码"
              v-model="search.shipperCode"
              @input="search.shipperCode = search.shipperCode.toUpperCase()"
              @keyup.enter.native="onSearchBefore();getTableList()"
              @change="onSearchBefore();getTableList()"
              size="mini"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label prop>
            <el-button type="primary" size="mini" @click="onSearchBefore();getTableList()">搜索</el-button>
            <el-button type="primary" size="mini" @click="createOrEdit()">新增</el-button>
            <el-button type="primary" size="mini" @click="onBatchDelete()">批量删除</el-button>
             <el-button type="primary" size="mini" @click="copyinfo()">复制</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="height:calc(100% - 110px)">
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
        <el-table-column type="index" align="center" label="序号" width="50">
          <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="shipperName"
          label="船公司"
          min-width="15%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="sizeName"
          label="标准尺寸"
          min-width="8%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="typeName"
          label="标准箱型"
          min-width="8%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="shipperCode"
          label="船公司箱型代码"
          min-width="10%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remarks"
          label="备注"
          min-width="20%"
          sortable="custom"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          align="center"
          prop="creationTime"
          label="创建时间"
          min-width="10%"
          sortable="custom"
        >
          <template slot-scope="scope">{{scope.row.creationTime|parseTime()}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="10%">
          <template slot-scope="scope">
            <div class="tableBtn" @click="createOrEdit(scope.row.id)">编辑</div>
            <el-popover placement="top" width="160" v-model="scope.row.popShow">
              <p>是否确认删除？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.popShow = false">取消</el-button>
                <el-button type="danger" size="mini" @click="deletectnTypeContrast(scope.row.id)">删除</el-button>
              </div>
              <div class="tableBtn" slot="reference">删除</div>
            </el-popover>
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
  getCtnTypeContrastList,
  batchDelete
} from "api/publicBase/ctnTypeContrast";
import { GetSiteList,GetLineList } from "api/publicBase/Combox";



export default {
  name: "ctnTypeContrastIndex",
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
        shipperId: "",
        typeCode: "",
        sizeCode: "",
        shipperCode: ""
      },
      siteList: [], //站点
      lineList: [],//
    
    };
  },
  methods: {
    getRowKeys(row) {
      return row.id.toString();
    },
     //获取站点
    getsiteList() {
      getShipCompanyForCarrier().then(res => {
        this.siteList = res.result.customName;
      });
    },
      //获取航线
    getlineList() {
      getShipCompanyForCarrier().then(res => {
        this.lineList = res.result.customName;
      });
    },
    //获取船公司箱型对照表列表
    getTableList() {
      this.tableData = [];
      let data = {
        maxResultCount: this.page.pageSize,
        skipCount: (this.page.currentPage - 1) * this.page.pageSize,
        sorting: this.table.order.sort,
        shipperId: this.search.shipperId,
        typeCode: this.search.typeCode,
        sizeCode: this.search.sizeCode,
        shipperCode: this.search.shipperCode
      };
      this.tableData = [];
      this.table.loading = true;
      getCtnTypeContrastList(data)
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
 
    //打开添加或修改船公司箱型对照表
    createOrEdit(id) {
      if (id) {
        this.creatZKDelInfoComp.show = true;
        this.$refs.creatZKDelInfoComp.getCtnTypeContrastSingle(id);
        this.$refs.creatZKDelInfoComp.getDicListByDitType();
        this.$refs.creatZKDelInfoComp.getshipCompany();
      } else {
        this.creatZKDelInfoComp.show = true;
        this.$refs.creatZKDelInfoComp.getDicListByDitType();
        this.$refs.creatZKDelInfoComp.getshipCompany();
      }
    },
    onCreatCtnTypeContrastCompShowChange(val) {
      this.creatZKDelInfoComp.show = val;
    },
    //添加或修改船公司箱型对照表成功事件
    onSaveSuccess() {
      this.getTableList();
    },
    //批量删除船公司箱型对照表
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
        batchDelete(arr).then(res => {
          this.batchDeleteSearch();
          this.$refs.table.clearSelection();
          this.getTableList();
        });
      });
    },
    //删除船公司箱型对照表
    deletectnTypeContrast(id) {
      batchDelete([id]).then(res => {
        this.getTableList();
        this.batchDeleteSearch();
        this.$refs.table.clearSelection();
      });
    },
   
    
  },
  //初始化
  created() {
 
    this.GetsiteList();
   
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