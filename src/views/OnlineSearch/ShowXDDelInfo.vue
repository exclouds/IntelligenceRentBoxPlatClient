<template>
  <div>
    <el-dialog
      title="集装箱信息"
      v-dialogDrag
      :visible.sync="windowShow"
      width="1000px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form
        size="mini"
        :model="form"
        ref="ruleForm"
        :rules="rules"
        v-loading="formLoading"
        label-width="120px"
      >
       <el-table
        :cell-class-name="tableRowClassName"
          v-loading="table.loading"
          :data="boxDetails"
          :row-key = "getRowKeys"
          border
          stripe
          highlight-current-row
          fit
          height="300px"
          style="width: 100%"
          ref="table"
        >
        <!-- <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column> -->
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
            prop="boxAge"
            show-overflow-tooltip
            label="箱龄"
         min-width="12%"  
            sortable="custom"
          ></el-table-column>
          
          
        </el-table>
      
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowShow = false" size="small">关 闭</el-button>
       
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { tableMixin } from "mixin/commTable";
import {GetXDBoxDetail} from "api/OnlineSearch";

export default {
  props: {
    pshow: {
      type: Boolean,
      default: false
    }
  },
   mixins: [tableMixin],
  watch: {
    pshow(newValue, oldValue) {
      this.windowShow = newValue;
    },
    windowShow(newValue, oldValue) {
      // if (this.$refs["ruleForm"]) 
      //  this.$refs["ruleForm"].resetFields(); //清空验证
      if (!newValue) {     
       this.id="";
        this.boxDetails=[];
        this.$emit("on-show-change", newValue);
      }
    }
  },
  data() {
    return {     
      windowShow: this.pshow,    
      formLoading: false,      
       id:"",
       boxDetails:[],
       form:{},
       rules:{},
                  
    };
  },
  methods: {
     
    //根据Id信息
    getTableList() {
      this
      this.formLoading = true;
      GetXDBoxDetail({ id: this.id })
        .then(res => {
          this.boxDetails = res.result;           
          this.formLoading = false;
        })
        .catch(e => {
          this.formLoading = false;
        });
    },
  }
};
</script>