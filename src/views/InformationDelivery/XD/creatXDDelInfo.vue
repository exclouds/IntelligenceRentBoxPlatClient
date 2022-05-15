<template>
  <div>
    <el-dialog
      :title="form.id==''?'新增箱东信息发布':'编辑箱东信息发布'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="1200px"
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
        <el-row>
          <el-col :span="8">
            <el-form-item label="单号：" prop="billNO">
               <el-input placeholder="单号"    style="width:100%;" 
               disabled
              v-model="form.billNO"  size="mini" clearable 
               @input="form.billNO = form.billNO.toUpperCase()">
             </el-input>
             
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="起运站：" prop="startStation">
              <el-select
              v-model="form.startStation"
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
        <!-- </el-row>
        <el-row> -->
          <el-col :span="8">
            <el-form-item label="目的站：" prop="endStation">
               <el-select
              v-model="form.endStation"
              placeholder="目的站"
              style="width:99%"
              clearable
              filterable
              @change="getlineList('')" 
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
           <el-col :span="8">
            <el-form-item label="所属路线：" prop="line">
              <el-select
                v-model="form.line"
                placeholder="请选择所属路线"
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
            <el-col :span="8">
            <el-form-item label="还箱地：" prop="returnStation">
              <el-select
                v-model="form.returnStation"
                placeholder="请选择还箱地"
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
           <el-col :span="8">
            <el-form-item label="租金：" prop="sellingPrice">
                <el-input-number
                    placeholder="租金"
                    v-model="form.sellingPrice"
                    controls-position="right"                                                            
                    :step="1"
                    clearable
                    style="width: 100%"
                    ></el-input-number>
            </el-form-item>
            </el-col>
             <el-col :span="8">
            <el-form-item label="预计到站时间：" prop="predictTime">
              <el-date-picker
                v-model="form.predictTime"
                type="date"                                           
                placeholder="预计到站时间"    
                style="width:100%"
              ></el-date-picker>  
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否库存：" >
             <el-select
              v-model="form.isInStock"
              placeholder="是否库存"           
              filterable 
               style="width:100%"         
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否启用：" >
             <el-select
              v-model="form.isEnable"
              placeholder="是否启用"           
              filterable  
               style="width:100%"        
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
        <!-- </el-row>       
         <el-row> -->
          <el-col :span="12">
            <el-form-item label="有效时间：" prop="submitDateRange">
              <el-date-picker
                v-model="form.submitDateRange"
                type="daterange"
                align="right"                
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerRangeOptions"
                clearable
                style="width: 100%"
              ></el-date-picker>  
            </el-form-item>
          </el-col>
          
        </el-row>
          <el-row>
           <el-form-item label="集装箱信息：" prop="boxDetails">
             <el-button   @click="addItem" type="primary">增加</el-button>
           </el-form-item>
          </el-row>
         <el-row>
          
          <el-col :span="22" :offset="1">
              <el-table
              :cell-class-name="tableRowClassName"
                v-loading="table.loading"
                :data="form.boxDetails"
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
                height="260px"
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
                   width="150"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                  <el-input             
                    placeholder="箱号"
                    v-model="scope.row.boxNO"
                    size="mini"
                    clearable
                    style="width: 100%"
                  ></el-input>                   
                 </template>
                </el-table-column>
              
                <el-table-column
                  align="center"
                  prop="box"
                  label="箱型"  
                  width="150"    
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.box'" :rules='rules.box'  label-width="0px">
                  <el-select                 
                    size="mini"
                    v-model="scope.row.box"
                    filterable
                    placeholder="尺寸"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in boxList"
                       :key="item.value"
                      :label="item.displayText"
                      :value="item.value"
                    ></el-option>  
                   </el-select>  
                    </el-form-item>                   
                 </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="size"
                  show-overflow-tooltip
                  label="尺寸"
                width="150"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.size'" :rules='rules.size'  label-width="0px">
                   <el-select                 
                    size="mini"
                    v-model="scope.row.size"
                    filterable
                    placeholder="尺寸"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in sizeList"
                       :key="item.value"
                      :label="item.displayText"
                      :value="item.value"
                    ></el-option>  
                   </el-select>  
                    </el-form-item>              
                 </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="quantity"
                  show-overflow-tooltip
                  label="箱量"
                width="150"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.quantity'" :rules='rules.quantity'  label-width="0px">
                   <el-input-number
                    placeholder="箱量"
                    v-model="scope.row.quantity"
                     controls-position="right"                                                            
                    :step="1"
                    clearable
                    style="width: 100%"
                    ></el-input-number>   
                    </el-form-item>           
                 </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="boxAge"
                  show-overflow-tooltip
                  label="箱龄"
                width="120"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.boxAge'" :rules='rules.boxAge'  label-width="0px">
                    <el-input-number
                    placeholder="箱龄"
                    v-model="scope.row.boxAge"
                     controls-position="right"                                                            
                    :step="1"
                    clearable
                    style="width: 100%"
                    ></el-input-number>
                    </el-form-item>             
                 </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="remarks"
                  show-overflow-tooltip
                  label="备注"
                
                  sortable="custom"
                >
                 <template slot-scope="scope">
                  <el-input             
                    placeholder="备注"
                    v-model="scope.row.remarks"
                    size="mini"
                    clearable
                    style="width: 100%"
                  ></el-input>                   
                 </template>
                </el-table-column>
                             
                <el-table-column align="center" label="操作" width="130" >
                    <template slot-scope="scope"  >
                        <div class="tableBtn"  @click="deleteItem((countIndex(scope.$index)-1))" 
                        v-if="(countIndex(scope.$index)-1) !== 0" 
                        >删除</div>                                
                    </template>
                  </el-table-column>
              </el-table>
        
          </el-col>
           </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remarks">
              <el-input
                type="textarea"
                v-model="form.remarks"
                placeholder="请输入备注"
                :autosize="{ minRows: 2, maxRows: 6}"
                @input="form.remarks = form.remarks.toUpperCase()"
                style="width:100%"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save()" :loading="btnLoading" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import { tableMixin } from "mixin/commTable";
import {XDDelInfoAddEdit,GetXDDelInfoSingle} from "api/InformationDelivery/XD";
import { GetSiteList,GetLineList } from "api/publicBase/Combox";
import { pickerRangeOptions } from "consts/common";
import { parseTime } from "utils";
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
        //窗口关闭
        this.form = {
          id: "",
          billNO: "", 
          startStation: "", 
          endStation: "", 
          returnStation: "", 
          // effectiveETime: "",
          hopePrice: 0,
          line: "",
          isEnable:true,
          isInStock:true,
          remarks: "", //备注
          submitDateRange:[],
          predictTime:undefined,
          sellingPrice:0,
          boxDetails:[{
            id: "",
            boxTenantInfo:  "",
            boxNO:  "",
            box:  "",
            size:  "",
            quantity: 0,      
            boxAge: 0,
            remarks:  ""
          }],
        };
        this.lineList=[];
        this.$emit("on-show-change", newValue);
      }
    }
  },
  data() {
    return {
      pickerRangeOptions,
      windowShow: this.pshow,
      btnLoading: false,
      formLoading: false,
      form: {
        id: "",
        billNO: "", 
        startStation: "", 
        endStation: "", 
        returnStation: "", 
        // effectiveSTime: "", 
        // effectiveETime: "",
        hopePrice: 0,
        line: "",
        isEnable:true,
        isInStock:true,
        remarks: "", //备注
        submitDateRange:[],
        predictTime:undefined,
        sellingPrice:0,
        boxDetails:[{
          id: "",
          boxTenantInfo:  "",
          box:  "",
          size:  "",
          quantity: 0,
          boxNO:  "",
          boxAge: 0,
          remarks:  ""
        }],
        
      },
      flag: true,
      siteList: [],
      lineList: [],
      boxList: [],
      sizeList: [],
     
      //定义字段校验规则
      rules: {
        //billNO: [{ required: true, message: "请选择船公司" }],
        startStation: [{ required: true, message: "请选择起运地" ,trigger: "change"}],
        endStation: [{ required: true, message: "请选择目的站" ,trigger: "change"}],
        returnStation: [{ required: true, message: "请选择还箱地" ,trigger: "change"}],
        submitDateRange: [
        { required: true, message: '请选择有效时间'},
        {validator: this.validatetime},
        ],
        sellingPrice: [{ required: true, message: "请输入租金", trigger: "blur" }],
        boxDetails: [ {validator: this.validatedetail}],
        box: [{ required: true, message: "请选择箱型" ,trigger: "change"}],
        size: [{ required: true, message: "请选择尺寸" ,trigger: "change"}],
        quantity: [{ required: true, message: "请输入箱量", trigger: "blur" }],
        boxAge: [{ required: true, message: "请输入箱龄", trigger: "blur" }],
      }

    };
  },
  methods: {
     //校验时间
        validatetime(rule, value, callback) {
          
          if(this.form.submitDateRange != null &&
              this.form.submitDateRange != undefined &&
              this.form.submitDateRange.length > 0) {
                 console.log('no error')
               callback();
          }
          else {
             console.log('error')
                  callback(new Error('请选择有效时间'));
            
          }
            
        },
    //校验箱信息
    validatedetail(rule, value, callback) {
          
          if(this.form.boxDetails.length > 0) {
                 console.log('no error')
               callback();
          }
          else {
             console.log('error')
                  callback(new Error('请选择输入集装箱信息'));
            
          }
            
        },
   //获取站点
    getsiteList() {
      GetSiteList({IsEnable:true}).then(res => {
        this.siteList = res.result;
      });
    },
      //获取航线
    getlineList(line) {
      this.form.line=line;
      GetLineList({Code:this.form.endStation,IsEnable:true}).then(res => {
        this.lineList = res.result;
      
      });
    }, 
    //箱型
    getxxlist() {
       getDicListByDitType({ BaseKeyValueTypeCode: "XX", Code: "", Name: ""  }).then(res => {
            this.boxList = res.result.comboxs;
        });
   
    },
    //尺寸
    getcclist() {
       getDicListByDitType({ BaseKeyValueTypeCode: "CC", Code: "", Name: ""  }).then(res => {
            this.sizeList = res.result.comboxs;
        });
     
    },
    //根据Id信息
    GetXDDelInfoSingle(id) {
      this.formLoading = true;
      GetXDDelInfoSingle({ id: id })
        .then(res => {
          this.form = res.result.boxInfo;
        
         var submitDateRange=[];
        
        submitDateRange.push(res.result.boxInfo.effectiveSTime);
        submitDateRange.push(res.result.boxInfo.effectiveETime);
        this.$set(this.form, 'submitDateRange', submitDateRange);
        this.form.boxDetails=res.result.boxDetails;
        //this.form.submitDateRange=submitDateRange;
          this.formLoading = false;
        })
        .catch(e => {
          this.formLoading = false;
        });
    },
   addItem()
   {
     let newdata={
       id: "",
          boxTenantInfo:  "",
          box:  "",
          size:  "",
          quantity: 0,
          boxNO:  "",
          boxAge: 0,
          remarks:  ""
     };
     this.form.boxDetails.push(newdata);

   },
    deleteItem( index) {
            this.form.boxDetails.splice(index, 1);
         //   console.log(this.form.dynamicItem, "删除");
    },
    
    //提交包装类型对照表
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let msg = this.form.id
            ? "编辑箱东信息发布"
            : "新增箱东信息发布";
          this.btnLoading = true;
          let data=this.form;
           if (
              this.form.submitDateRange != null &&
              this.form.submitDateRange != undefined &&
              this.form.submitDateRange.length > 0
            ) {
              data.EffectiveSTime = parseTime(this.form.submitDateRange[0]);
              data.EffectiveETime = parseTime(this.form.submitDateRange[1]);
            } else {
              // data.settleTimebegin = null;
              // data.settlenTimeend = null;
              warnMsg("请选择有效时间");
              return;
            }
          XDDelInfoAddEdit(
            data,
            msg
          )
            .then(res => {
              if(res.success)
              {
                this.btnLoading = false;
              this.windowShow = false;
              this.$emit("on-save-success");
              }
              
            })
            .catch(err => {
              this.btnLoading = false;
            });
        }
      });
    }
  }
};
</script>