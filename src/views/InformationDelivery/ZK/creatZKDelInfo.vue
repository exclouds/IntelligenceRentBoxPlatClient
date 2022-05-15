<template>
  <div>
    <el-dialog
      :title="form.id==''?'新增租客信息发布':'编辑租客信息发布'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="600px"
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
          <el-col :span="22">
            <el-form-item label="单号：" prop="billNO">
               <el-input placeholder="单号"    style="width:100%;" 
               disabled
              v-model="form.billNO"  size="mini" clearable 
               @input="form.billNO = form.billNO.toUpperCase()">
             </el-input>
             
            </el-form-item>
          </el-col>
          <el-col :span="22">
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
          <el-col :span="22">
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
           <el-col :span="22">
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
        <!-- </el-row>       
         <el-row> -->
            <el-col :span="22">
            <el-form-item label="期望成交价：" prop="hopePrice">
                <el-input-number
                    placeholder="价格"
                    v-model="form.hopePrice"
                  controls-position="right"                                                            
                    :step="1"
                    clearable
                    style="width: 100%"
                    ></el-input-number>
            </el-form-item>
            </el-col>
          <el-col :span="22">
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
             <el-col :span="22">
            <el-form-item label="是否启用：" >
             <el-select
              v-model="form.isEnable"
              placeholder="是否启用"           
              filterable          
            >
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="22">
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

import {ZKDelInfoAddEdit,GetZKDelInfoSingle} from "api/InformationDelivery/ZK";
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
  watch: {
    pshow(newValue, oldValue) {
      this.windowShow = newValue;
    },
    windowShow(newValue, oldValue) {
      //if (this.$refs["ruleForm"]) this.$refs["ruleForm"].resetFields(); //清空验证
      if (!newValue) {
        //窗口关闭
        this.form = {
          id: "",
          billNO: "", 
          startStation: "", 
          endStation: "", 
          // effectiveSTime: "", 
          // effectiveETime: "",
          hopePrice: 0,
          line: "",
          isEnable:true,
          remarks: "", //备注
          submitDateRange:[]
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
        // effectiveSTime: "", 
        // effectiveETime: "",
        hopePrice: 0,
        line: "",
        isEnable:true,
        remarks: "", //备注
        submitDateRange:[]
      },
      flag: true,
      siteList: [],
      lineList: [],
     
      //定义字段校验规则
      rules: {
        //billNO: [{ required: true, message: "请选择船公司" }],
        startStation: [{ required: true, message: "请选择起运地" ,trigger: "change"}],
        endStation: [{ required: true, message: "请选择目的站" ,trigger: "change"}],
        submitDateRange: [
        { required: true, message: '请选择有效时间'},
        {validator: this.validatetime},
        ],
        hopePrice: [{ required: true, message: "请输入期望成交价", trigger: "blur" }]
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
    //根据Id信息
    GetZKDelInfoSingle(id) {
      this.formLoading = true;
      GetZKDelInfoSingle({ id: id })
        .then(res => {
          this.form = res.result;
         var submitDateRange=[];
        
        submitDateRange.push(res.result.effectiveSTime);
        submitDateRange.push(res.result.effectiveETime);
        this.$set(this.form, 'submitDateRange', submitDateRange)
        //this.form.submitDateRange=submitDateRange;
          this.formLoading = false;
        })
        .catch(e => {
          this.formLoading = false;
        });
    },
   
    
    //提交包装类型对照表
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let msg = this.form.id
            ? "编辑租客信息发布"
            : "新增租客信息发布";
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
          ZKDelInfoAddEdit(
            data,
            msg
          )
            .then(res => {
              this.btnLoading = false;
              if (this.flag) {
                this.windowShow = false;
              }
              this.$emit("on-save-success");
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