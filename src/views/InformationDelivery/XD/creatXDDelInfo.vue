<template>
  <div class="addxdset" v-loading="formLoading">
    <el-dialog
      :title="form.id==''?'箱东发布新信息':'箱东编辑发布信息'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="1800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false" 
         
    >
       <el-form
        size="mini"
        :model="form"
        ref="ruleForm"
        :rules="rules"
        v-loading="formLoading"
        label-width="100px"
      >
      <el-row>

          <el-col :span="4">
            <el-form-item label="单号：" prop="billNO">
               <el-input placeholder="单号"    style="width:100%;" 
               disabled
              v-model="form.billNO"  size="mini" clearable 
               @input="form.billNO = form.billNO.toUpperCase()">
             </el-input>
             
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="起运站：" prop="startStation">
             <big-data-select             
              :val.sync="form.startStation"
              placeholder="起运站"
               style="width:99%"
              size="mini"
              clearable
              filterable                
              :data="siteList"
              optionkey="displayText"
              optionValue="value"
            ></big-data-select>
            </el-form-item>
          </el-col>
        <!-- </el-row>
        <el-row> -->
        <el-col :span="4">
            <el-form-item label="所属路线：" prop="line">
              <el-select
                v-model="form.line"
                placeholder="请选择所属路线"
                style="width:100%"
                clearable
                filterable
                @change="getlinesiteList('')" 
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
          <el-col :span="6">
            <el-form-item label="还箱地：" prop="endStation">
            
               <el-select
              v-model="form.endStation"
              placeholder="还箱地"
              style="width:99%"
              clearable
              filterable
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in linesiteList"
                :key="item.value"
                :label="item.displayText"
                :value="item.value"
              ></el-option>
            </el-select>
            </el-form-item>
          </el-col>
            <!-- <el-col :span="4">
            <el-form-item label="还箱地：" prop="returnStation">
              <big-data-select             
              :val.sync="form.returnStation"
              placeholder="还箱地"
              style="width: 100%"
              size="mini"
              clearable
              filterable                                   
              :data="siteList"
              optionkey="displayText"
              optionValue="value"
            ></big-data-select>

            </el-form-item>
          </el-col> -->
           <el-col :span="4">
            <el-form-item label="租金：" prop="sellingPrice" >
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
             <!-- <el-col :span="4">
            <el-form-item label="预计到站时间：" prop="predictTime">
              <el-date-picker
                v-model="form.predictTime"
                type="date"                                           
                placeholder="预计到站时间"    
                style="width:100%"
              ></el-date-picker>  
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="4">
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
          </el-col> -->
          <el-col :span="4">
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
          <el-col :span="4">
            <el-form-item label="有效时间：" prop="effectiveSTime">
               <el-date-picker
                v-model="form.effectiveSTime"
                type="date"
                placeholder="有效时间起"
                style="width: 100%">
              </el-date-picker>
              <!-- <el-date-picker
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
              ></el-date-picker>   -->
            </el-form-item>
          </el-col>
            <el-col :span="4">
            <el-form-item label="有效时间止：" prop="effectiveETime">
            <el-date-picker
                v-model="form.effectiveETime"
                type="date"
                placeholder="有效时间止"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
            <el-col :span="24" >
            <el-form-item label="备注：" prop="remarks">
              <el-input
                type="textarea"
                v-model="form.remarks"
                placeholder="请输入备注"
               
                @input="form.remarks = form.remarks.toUpperCase()"
                style="width:100%"
                maxlength="500"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
     </el-row>
          <el-divider></el-divider>
    <el-row style="height:100%">
     <el-col :span="15" style="padding-left:30px">
        
          <div style="padding-bottom:40px">   
           <el-col :span="21" style="padding-top: 10px;" >   <span class="captitle">集装箱信息：</span></el-col>
            <el-col :span="2"  >     
              <el-button style="width:100px;padding:8px"  @click="addItem" type="primary">增加</el-button>
              </el-col>
          </div>  
               
              <el-table
              :cell-class-name="tableRowClassName"           
                :data="form.boxDetails"
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
                height="310px"
                style="width:100%"
                ref="table1"
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
                  width="130"    
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.box'" :rules='rules.box'  label-width="0px">
                  <el-select                 
                    size="mini"
                    v-model="scope.row.box"
                    filterable
                    placeholder="箱型"
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
                width="130"
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
                  label="最大载重"
                width="150"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.maxweight'" :rules='rules.boxAge'  label-width="0px">
                    <el-input-number
                    placeholder="最大载重"
                    v-model="scope.row.maxweight"
                     controls-position="right"                                                            
                    :step="0.01"
                    clearable
                    style="width: 100%"
                    ></el-input-number>
                    </el-form-item>             
                 </template>
                </el-table-column>
                 <el-table-column
                  align="center"
                  prop="freezerModel"
                  show-overflow-tooltip
                  label="冻柜型号"
                width="160"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.boxAge'" :rules='rules.freezerModel'  label-width="0px">
                     <el-select                 
                    size="mini"
                    v-model="scope.row.freezerModel"
                    filterable
                    placeholder="冻柜型号"
                    style="width: 100%"
                    clearable
                  >
                    <el-option value="69NT40-561-018">69NT40-561-018</el-option>  
                    <el-option value="69NT40-541-320">69NT40-541-320</el-option>
                   </el-select>  
                    </el-form-item>             
                 </template>
                </el-table-column>
                 <el-table-column
                  align="center"
                  prop="boxLabel"
                  show-overflow-tooltip
                  label="箱标"
                width="150"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.boxLabel'" :rules='rules.boxAge'  label-width="0px">
                     <el-select                 
                    size="mini"
                    v-model="scope.row.boxLabel"
                    filterable
                    placeholder="箱标"
                    style="width: 100%"
                  >
                    <el-option value="IICL">IICL国际标准</el-option> 
                    <el-option value="IICA">IICA适货标准</el-option>   
                   </el-select>  
                    </el-form-item>             
                 </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="boxTime"
                  show-overflow-tooltip
                  label="生产年限"
                width="150"
                  sortable="custom"
                >
                 <template slot-scope="scope">
                    <el-form-item label="" :prop="'boxDetails.'+(countIndex(scope.$index)-1) + '.boxTime'" :rules='rules.boxAge'  label-width="0px">
                     <el-date-picker
                      v-model="scope.row.boxTime"
                      type="month"
                      style="width:100%"
                      value-format="yyyy-MM-dd"
                      placeholder="生产年限">
                    </el-date-picker>
                    </el-form-item>             
                 </template>
                </el-table-column>
                <!-- <el-table-column
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
                </el-table-column> -->
                <el-table-column
                  align="center"
                  prop="remarks"
                  show-overflow-tooltip
                  label="备注"
                 width="200"
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
                             
                <el-table-column align="center" label="操作"  >
                    <template slot-scope="scope"  >
                        <div class="tableBtn"  @click="deleteItem((countIndex(scope.$index)-1))" 
                        v-if="(countIndex(scope.$index)-1) !== 0" 
                        >删除</div>                                
                    </template>
                  </el-table-column>
              </el-table>
           
     </el-col>
      <el-col :span="8" :offset="1" style="height:100%">      
       <el-row style="padding:10px">
          <el-col :span="8" style="padding-top: 10px;" >   
             <span class="captitle">附件信息</span>
             </el-col>         
            <el-col :span="5">
                 <el-button type="primary" @click="onBatchDelete()"
                 style="width:100px;padding:8px;background-color:#f32929 !important;"
                  :loading="delbtnLoading" size="small">批量删除</el-button>
          
             </el-col>
           <el-col :span="10">
                <el-upload
                class="upload-demo"
                action="/DBService/api/services/app/Attachment/AnnexUploaFile"
                ref="upload"            
                :auto-upload="false"
                :http-request="httpRequest"
                :multiple="true"
                :show-file-list="true">
                <el-button slot="trigger" size="small" type="primary">选取附件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传附件</el-button>
             -->
              </el-upload> 
          
          </el-col>
           
       </el-row>
         <el-row>  
            <el-col :span="22" :offset="1">

              <el-table
               :cell-class-name="tableRowClassName"
                v-loading="table.loading"
                :data="filelist"
                :row-key = "getRowKeys"
                border
                stripe
                highlight-current-row
                fit
                height="300px"
                style="width: 100%"
                ref="table"
              >
              <el-table-column :reserve-selection="true" type="selection" width="40"></el-table-column>
                <el-table-column type="index" align="center" label="序号" width="50">
                  <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="name"
                  show-overflow-tooltip
                  label="文件名称"
                               
                >   
                   <template slot-scope="scope">
           
                  <div
                    class="tableBtn"
                    @click="showimg(scope.row.url)"
                    v-if="                  
                      scope.row.url != '' &&
                      scope.row.url != null
                    "
                  >
                    {{ scope.row.name }}
                  </div>
                  <span v-else>{{ scope.row.url }}</span>
                </template>             
                </el-table-column>
              
                <el-table-column
                  align="center"
                  prop="creationTime"
                  label="上传时间"  
                  width="150"    
                 show-overflow-tooltip
                >
                  <template slot-scope="scope">{{scope.row.creationTime|parseTime()}}</template>
                </el-table-column>
              
                <el-table-column align="center" label="操作" width="100" >
                    <template slot-scope="scope"  >
                        <div class="tableBtn"  @click="deletefile(scope.row.id)" 
                     
                        >删除</div>                                
                    </template>
                  </el-table-column>
              </el-table>
        
            </el-col>
          </el-row>
     
     </el-col>
        
    </el-row>
    </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="save()" :loading="formLoading" size="small">确认发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDicListByDitType } from "api/publicBase/dictionaryMng";
import { tableMixin } from "mixin/commTable";
import {XDDelInfoAddEdit,GetXDDelInfoSingle} from "api/InformationDelivery/XD";
import { GetSiteList,GetLineList,GetLineSiteList } from "api/publicBase/Combox";
import { pickerRangeOptions } from "consts/common";
import { parseTime } from "utils";
import upload from "components/upload/upload";
import { GetUploaFile,GetUPFile,BathDeltefile } from "api/publicBase/Attachment";
import { warnMsg ,successMsg} from "utils/messageBox";

export default {
  components: {
    upload
  },
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
          endStation: [], 
          returnStation: "", 
          effectiveSTime: null,  
          effectiveETime: null,
          hopePrice: 0,
          line: "8",
          isEnable:true,
         // isInStock:true,
          remarks: "", //备注
          submitDateRange:[],
         // predictTime:undefined,
          sellingPrice:0,
          boxDetails:[{
            id: "",
            boxTenantInfo:  "",
            boxNO:  "",
            box:  "",
            size:  "",
            quantity: 0,      
            boxAge: 0,
            remarks:  "",
            boxTime:null,
            boxLabel:"",
            maxweight:"",
            freezerModel:""
          }],
         
        };
        this.lineList=[];
        this.filelist=[];
        this.filecontent=[];
        this.linesiteList=[];
       
        this.$emit("on-show-change", newValue);
      }
    }
  },
  data() {
    return {
      pickerRangeOptions,
      windowShow: this.pshow,
      btnLoading: false,
      delbtnLoading: false,
      formLoading: false,
      IsVerify: false,   //用于  
      form: {
        id: "",
        billNO: "", 
        startStation: "", 
        endStation:[],
        returnStation: "", 
        effectiveSTime: null,  
        effectiveETime: null,
        hopePrice: 0,
        line: "8",
        isEnable:true,
       // isInStock:true,
        remarks: "", //备注
        submitDateRange:[],
        //predictTime:undefined,
        sellingPrice:0,
        boxDetails:[{
          id: "",
          boxTenantInfo:  "",
          box:  "",
          size:  "",
          quantity: 0,
          boxNO:  "",
          boxAge: 0,
          remarks:  "",
            boxTime:null,
            boxLabel:"",
            maxweight:"",
            freezerModel:""
        }],
        
      },
      filelist: [],
      flag: true,
      siteList: [],
      lineList: [],
      linesiteList: [],
      boxList: [],
      sizeList: [],
      filecontent:[],
      //定义字段校验规则
      rules: {
        //billNO: [{ required: true, message: "请选择船公司" }],
        startStation: [{ required: true, message: "请选择起运地" ,trigger: "change"}],
        endStation: [{ required: true, message: "请选择还箱地" ,trigger: "change"}],
         line: [{ required: true, message: "请选择航线" ,trigger: "change"}],
        //returnStation: [{ required: true, message: "请选择还箱地" ,trigger: "change"}],
        submitDateRange: [
        { required: true, message: '请选择有效时间'},
        {validator: this.validatetime},
        ],
        sellingPrice: [{ required: true, message: "请输入租金", trigger: "blur" }],
        boxDetails: [ {validator: this.validatedetail}],
        box: [{ required: true, message: "请选择箱型" ,trigger: "change"}],
        size: [{ required: true, message: "请选择尺寸" ,trigger: "change"}],
        quantity: [{ required: true, message: "请输入箱量", trigger: "blur" }],
         effectiveSTime: [{ required: true, message: "请选择有效时间起" }],
         effectiveETime: [{ required: true, message: "请选择有效时间止" }],
      //boxAge: [{ required: true, message: "请输入箱龄", trigger: "blur" }],
      }

    };
  },
  methods: {
      getRowKeys(row) {
      return row.id.toString();
    },
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
    getlineList() {
      GetLineList({IsEnable:true}).then(res => {
        this.lineList = res.result;
      
      });
    },
     //获取航线站点
    getlinesiteList(endStation) {
      this.form.endStation=[];
      this.linesiteList=[];
      if(this.form.line)
      {
         GetLineSiteList({line:this.form.line,IsEnable:true}).then(res => {
          this.linesiteList = res.result;     
        });
        if(endStation !=='' && endStation!==null && endStation!==undefined)
        {
            this.form.endStation=endStation.split(',');
        }  
      }
        
     
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
          this.form.line = res.result.boxInfo.line.toString();
        
        //  var submitDateRange=[];        
        // submitDateRange.push(res.result.boxInfo.effectiveSTime);
        // submitDateRange.push(res.result.boxInfo.effectiveETime);
        // this.$set(this.form, 'submitDateRange', submitDateRange);

        this.form.boxDetails=res.result.boxDetails;
         this.filelist=res.result.fileList;
           this.getlinesiteList(res.result.boxInfo.endStation);
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
          remarks:  "",
            boxTime:null,
            boxLabel:"",
            maxweight:"",
            freezerModel:""
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
          //this.btnLoading = true;
          let data=this.form;
           data.effectiveSTime=parseTime( this.form.effectiveSTime);
          data.effectiveETime=parseTime( this.form.effectiveETime);
          //  if (
          //     this.form.submitDateRange != null &&
          //     this.form.submitDateRange != undefined &&
          //     this.form.submitDateRange.length > 0
          //   ) {
          //     data.EffectiveSTime = parseTime(this.form.submitDateRange[0]);
          //     data.EffectiveETime = parseTime(this.form.submitDateRange[1]);
          //   } else {
          //     // data.settleTimebegin = null;
          //     // data.settlenTimeend = null;
          //     warnMsg("请选择有效时间");
          //     return;
          //   };
          this.formLoading = true;  
          XDDelInfoAddEdit(
            data,
            msg
          )
            .then(res => {
              if(res.success)
              {
                 //this.btnLoading = false;
              // this.windowShow = false;
              // this.$emit("on-save-success");
                // if(!this.form.id){
                //      this.form.id=res.result.id;
                //      this.form.billNO=res.result.billNO;
                // }
               //this.GetXDDelInfoSingle(res.result.id);
                 this.formLoading = false;           
                    this.GetXDDelInfoSingle(res.result.id);  
                      successMsg('信息发布成功!');   
                
                //  var files = this.$refs.upload.uploadFiles;
                //   var  upfilecount=files.length;            
                //   var  IsALLSuccess= true;
                //   if(upfilecount>0)
                //   {
                //     // this.formLoading = false; 
                //     //  this.$refs.upload.submit();     
                //     files.forEach((item,index) => {           
                //       let formData = new FormData();
                //         formData.append("files", item.raw);
                //         formData.append("type", "XD");
                //         formData.append("billno", res.result.billNO);
                //         formData.append("id",res.result.id);
                //         GetUploaFile(formData).then(res2 => {
                //           if (res2.success) {  
                //           // successMsg(this.upfilecount+'/'+this.upsuccess)
                //             if(upfilecount===(index+1))      
                //             { 
                //               if(IsALLSuccess)
                //               {
                //                 successMsg('信息发布成功!');
                //               }
                //               else{
                //                 warnMsg('信息发布成功,部分附件上传失败!');     
                //               }

                //               this.$refs.upload.clearFiles();
                //                 //this.getfileList();
                //                 this.formLoading = false;           
                //                 this.GetXDDelInfoSingle(res.result.id); 
                          
                //             }
                          
                //           }
                //         })
                //         .catch(err=>{
                //           IsALLSuccess= false;
                //           if(upfilecount===(index+1)) {
                //             warnMsg('信息发布成功,部分附件上传失败!');                
                //             this.formLoading = false;           
                //             this.$refs.upload.clearFiles();
                //             this.GetXDDelInfoSingle(res.result.id);
                //           }
                        
                //         })
                //     });            
                //   }
                //   else{
                //     this.formLoading = false;           
                //     this.GetXDDelInfoSingle(res.result.id);  
                //       successMsg('信息发布成功!');    
                //   }
              }
              
            })
            .catch(err => {
              this.formLoading = false;
            });
        }
      });
    },
        // 附件上传
      submitUpload() {
        if(this.form.id === '' || this.form.id ===null || this.form.id ===undefined) {
          warnMsg("请先保存信息后再上传附件");
          return;
        } else {
         this.$confirm('您是否确定马上上传附件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((action) => {
        if(action === 'confirm'){
          this.$refs.upload.submit();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
        }
      },
    httpRequest(param){
      
      let formData = new FormData();
          formData.append("files", param.file);
          formData.append("type", "XD");
          formData.append("billno", this.form.billNO);
          formData.append("id", this.form.id);
          GetUploaFile(formData).then(res => {
            if (res.success) {         
              this.$message.success('文件上传成功!');
              this.getfileList();
            }
          })
    },
   
    getfileList()
    {
      if(this.form.id)
      {
        this.$refs.table.clearSelection();
        this.table.loading=true;
        GetUPFile({id:this.form.id,billno:this.form.billNO}).then(res => {
            if (res.success) {          
             this.filelist=res.result;
              this.table.loading=false;
            }
          })
          .catch(()=>{
             this.table.loading=true;
          })
      }
    },
    deletefile(id)
    {
       this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        BathDeltefile([id]).then(res => {
        this.getfileList();        
      });
      });
    },
    //批量删除
    onBatchDelete() {
      if (this.$refs.table.selection.length === 0) {
        warnMsg("请选择要删除的数据");
        return;
      }
      this.$confirm("是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(({ value }) => {
        let arr = this.$refs.table.selection.map(item => item.id);
        this.delbtnLoading=true;
        BathDeltefile(arr).then(res => {
           this.delbtnLoading=false;
          this.getfileList();  
        })
        .catch(()=>{
          this.delbtnLoading=false;
        });
      });
    },
    showimg(eleurl){
        if (eleurl === "" || eleurl === null) {
        warnMsg("未找相关附件地址");
        return;
      }
      window.open(eleurl, "_blank");
    }
    
  }
};
</script>

<style  lang="scss">
.addxdset{
  .el-dialog__title{
      font-weight: 700;
      font-style: normal;
      color: rgb(6, 88, 185);
      font-size: 18px;
  }
  .captitle{
      
       font-weight: 700;   
      font-size: 16px;
  }
}
</style>