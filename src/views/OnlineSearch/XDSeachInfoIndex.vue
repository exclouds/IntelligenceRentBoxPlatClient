<template>
  <div class="app-container xdqueryclass">
    <!-- src\assets\images\u1.jpg -->
    <div id="query">
      <el-col :span="17" :offset="7">
          <table class="querytable">
             <tr>
                <td class="tdtitle" style="width:180px">单号</td>
                <td class="tdtitle" style="width:180px">提箱地</td>
                <td class="tdtitle" style="width:180px">还箱地</td>
                 <td class="tdtitle" style="width:150px">箱型箱量</td>
                <!-- <td class="tdtitle" style="width:150px">还箱地</td> -->
                <!-- <td class="tdtitle" style="width:150px">是否库存</td> -->
                <td class="tdtitle" colspan="2">用箱时间</td>
                <td class="tdtitle" style="width:100px"></td>
              </tr>
              <tr>
                 <td> 
                   <el-input placeholder="单号"    style="width:95%;" 
                    v-model="search.BillNO"  size="mini" clearable 
                    @input="search.BillNO = search.BillNO.toUpperCase()">
                    </el-input>
                  </td>
                  <td> 
                    <big-data-select             
                      :val.sync="search.StartStation"
                      placeholder="提箱地"
                      style="width: 95%"
                      size="mini"
                      clearable
                      filterable                
                      :data="siteList"
                      optionkey="displayText"
                      optionValue="value"
                    ></big-data-select>
                  </td>
                  <td> 
                     <!-- <el-select
                      v-model="search.EndStation"
                      placeholder="还箱地"
                      style="width:95%"
                    clearable
                      filterable
                    >
                       <el-option
                        v-for="item in siteList"
                        :key="item.value"
                        :label="item.displayText"
                        :value="item.value"
                      ></el-option>
                    </el-select> -->
                      <big-data-select             
                      :val.sync="search.EndStation"
                      placeholder="还箱地"
                      style="width: 95%"
                      size="mini"
                      clearable
                      filterable                
                      :data="siteList"
                      optionkey="displayText"
                      optionValue="value"
                    ></big-data-select>
                  </td>
                  <td> 
                      <!-- <el-select
                      v-model="search.ReturnStation"
                      placeholder="还箱地"
                      style="width:95%"
                    clearable
                      filterable
                    >
                      <el-option
                        v-for="item in siteList"
                        :key="item.value"
                        :label="item.displayText"
                        :value="item.value"
                      ></el-option>
                    </el-select> -->
                    <el-select                 
                    size="mini"
                    v-model="search.XXCC"
                    filterable
                    placeholder="箱型箱量"
                    style="width: 95%"
                    clearable
                                      
                  >
                  <div  style="width:280px" v-for="item in boxList" :key="item.xxcc">
                    <el-col :span="10">
                       <el-option             
                       :key="item.xxcc"
                       :label="item.lable+'  *  '+item.qty.toString()"
                       :value="item.xxcc+item.qty"
                    ></el-option>
                    </el-col>
                     <el-col :span="12">
                        <el-input-number
                          placeholder="箱量"
                          v-model="item.qty"
                          controls-position="right"                                                            
                          :step="1"
                          clearable
                          :min="0"
                          style="width:100%;padding-left:20px;"
                        
                          ></el-input-number>
                     </el-col>
                   
                    
                  </div>
                    <!-- <el-option
                      v-for="item in boxList"
                       :key="item.xxcc"
                      :label="item.lable+'*'+item.qty.toString()"
                      :value="item.xxcc+item.qty"
                    >
                   
                     <span style="float: left;">{{ item.lable+' * ' }}</span>
                     
                       <el-input-number
                          placeholder="箱量"
                          v-model="item.qty"
                          controls-position="right"                                                            
                          :step="1"
                          clearable
                          :min="0"
                          style="width:150px;padding-left:20px;"
                        
                          ></el-input-number>
                    
                   
                    </el-option>   -->
                   </el-select>  
                  </td>
                  <td>
                     <!-- <el-date-picker
                      v-model="search.EffectiveTime"
                      type="date"
                      clearable
                      placeholder="选择日期"
                       style="width:95%">
                    </el-date-picker> -->
                     <!-- <el-date-picker
                        v-model="search.EffectiveTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                          style="width: 100%">
                      </el-date-picker> -->
                        <el-date-picker
                          v-model="search.EffectiveSTime"
                          type="date"
                          placeholder="用箱时间起"
                          style="width:150px">
                        </el-date-picker>
                         </td>
                  <td>
                         <el-date-picker
                          v-model="search.EffectiveETime"
                          type="date"
                          placeholder="用箱时间止"
                          style="width:150px">
                        </el-date-picker>
                  </td>
                  <td>
                     <el-button type="primary" size="mini" class="btnset"
                     @click="onSearchBefore();getTableList()">
                     查询
                     </el-button>
                  </td>
              </tr>
        </table>
      </el-col>
        
      
    </div>  
         
   <!-- <el-row style="height:calc(100% - 200px)"> -->
     <div style="padding-top:30px;height:calc(100% - 200px)">
     <el-col  :span="4" :offset="3">
       <el-card style="margin-right:20px;padding-left:20px;height:450px">
        <el-col :span="24">
       <div style="font-size:16px;padding-bottom:20px">是否匹配</div>
       <div>      
        
           <div><el-checkbox  v-model="checked1" style="padding-bottom:20px;"  @change="Finishselect(1)">全部</el-checkbox></div> 
           <div><el-checkbox v-model="checked2" style="padding-bottom:20px;" @change="Finishselect(2)">已匹配</el-checkbox></div> 
          <div><el-checkbox v-model="checked3"  @change="Finishselect(3)">未匹配</el-checkbox></div>   
       </div>
         </el-col>
       <el-col :span="24" style="padding-bottom:20px;">
        <div style="font-size:16px;padding-bottom:20px;padding-top:20px">路线筛选</div>
        <el-col :span="8" >
         <el-button type="text" @click="onsearch('')" >
         <span>全部</span>
         </el-button>
        </el-col>
        <el-col :span="8"   v-for="(val, key) in lineList" :key="key" >
         <!-- <el-link :underline="false" @click="onsearch(val.value)" style="padding-bottom:20px;">
         <span :style="'color:'+val.code">{{val.displayText}}</span>
         </el-link> -->
         <el-button type="text" @click="onsearch(val.value)">
          <span :style="'color:'+val.code">
            {{val.displayText}}
            </span>
            </el-button>
        </el-col>
         
        
       </el-col>
       </el-card >
     </el-col>
      <el-col  :span="16"  style="height:calc(100% - 10px)">    
          <el-table
            :data="tableData"
            :cell-class-name="tableRowClassName"
            :row-key="getRowKeys"
            @selection-change="onSelectChange"         
            
            highlight-current-row
            fit
            height="100%"
            style="width: 100%,height:100%"
            ref="table"
            v-loading="table.loading"
            @sort-change="sortChange"
            @select="handleSelectionChange"
           
           
          >
       <!-- :row-style="rowStayle" -->
            <!-- <el-table-column type="index" align="center" label="序号" width="50" fixed="left">
              <template slot-scope="scope">{{countIndex(scope.$index)}}</template>
            </el-table-column> -->
            <el-table-column
              align="center"
              prop="billNO"
              label="单号"
            width="150px"
              sortable="custom"
              show-overflow-tooltip
             
            >
             <template slot-scope="scope">
            {{ scope.row.billNO
            }}
            <!-- <icon
              v-show="scope.row.finish === true"
              class="svg-icon"
              style="display: inline-block; cursor: pointer"
              icon-class="代收代付"
              scale="1.3"
            /> -->
          </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="startStation"
              label="提箱地/还箱地"
              width="360px"
              sortable="custom"
              
            >
             <template slot-scope="scope">
                <span>{{
                  scope.row.startStation+"  —("+scope.row.line+"路线至)——>"+scope.row.endStation
                  }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              align="center"
              prop="endStation"
              label="还箱地"
              width="120px"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column> -->
            <!-- <el-table-column
              align="center"
              prop="returnStation"
              label="还箱地"
              width="120px"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column> -->
            <!-- <el-table-column
              align="center"
              prop="line"
              label="所属路线"
              width="120px"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column> -->
            <el-table-column
              align="center"
              prop="xxcc"
              label="箱型尺寸"
              width="120px"
            
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="effectiveSTime"
              label="有效时间"
              width="260px"
              sortable="custom"
              show-overflow-tooltip
            >
                <template slot-scope="scope">
                  {{scope.row.effectiveSTime | parseTime('{y}-{m}-{d}')}}
                 ————>
              {{scope.row.effectiveETime | parseTime('{y}-{m}-{d}') }}</template>
            </el-table-column>
           
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
            <el-table-column align="center" label="操作" width="100px" fixed="right">
              <template slot-scope="scope">
                  <!-- <div class="tableBtn" @click="createOrEdit(scope.row.billNO)" >箱信息</div>
                  <div class="tableBtn" @click="showfile(scope.row)" >查看附件</div> -->
                    <el-button type="primary" size="mini" 
                     @click="opendetail(scope.row)">
                     查看详情
                     </el-button>
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
      </el-col>
  <!-- </el-row> -->
   </div>

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
import { GetSiteList,GetLineList,GetXXCCList } from "api/publicBase/Combox";
import ShowXDDelInfo from './ShowXDDelInfo'
import ShowFilePage from './ShowFilePage'
import { parseTime } from "utils";
import colorList from 'store/colorList';

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
        line: "",
        ReturnStation: "",    
        Finish: undefined,
        XXCC:"",
        EffectiveSTime:null,
        EffectiveETime:null,
      },
      Finish:[true,false],
      siteList: [], //站点
      lineList: [],//
      creatXDDelInfoComp: {
        show: false
      },
      ShowFilePageComp: {
        show: false
      },
      tableData: [],//
      checked1:true,
      checked2:false,
      checked3:false,
      boxList: [],//
    };
  },
  methods: {
    getRowKeys(row) {
      return row.id.toString();
    },
    //不路线不同颜色
    rowStayle(row , colum , rowIndex , columnIndex) { 
         if (row.row.lineID ==="" ||row.row.lineID ===null || row.row.lineID ===undefined ) 
         {       
           return "";   
         }    
         else{
          // var rowcolor=colorList[row.row.lineID];
          // return "color:white;background-color:"+rowcolor+"!important;";  
           var rowcolor=colorList[row.row.lineID];
          return "color:"+rowcolor+"!important;";  
         }
         
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
        this.lineList.forEach(item=>{
          var ccindex=Number(item.value);
          item.code=colorList[ccindex];
        })
      });
    },
              //箱型尺寸
    getxxcclist() {
       GetXXCCList({xxcc:this.search.XXCC }).then(res => {
           this.boxList = res.result;
        });
   
    },
    Finishselect(val)
    {
      if(val===1)
      {
        this.checked2=false;
        this.checked3=false;
        this.search.Finish=null;
      }
      else if(val===2)
      {
        this.checked1=false;
        this.checked3=false;
        this.search.Finish=true;
      }
      else 
      {
        this.checked2=false;
        this.checked1=false;
        this.search.Finish=false;
      }
     this.getTableList();

    },
    onsearch(line)
    {
      this.search.line=line;
      this.getTableList();
    },
    //获取列表
    getTableList() {
      this.tableData = [];
      let data=this.search;    
      
        // if (
        //       this.search.EffectiveTime != null &&
        //       this.search.EffectiveTime != undefined &&
        //       this.search.EffectiveTime.length > 0
        //     ) {
        //       data.EffectiveSTime = parseTime(this.search.EffectiveTime[0]);
        //       data.EffectiveETime = parseTime(this.search.EffectiveTime[1]);
        //     } else {
        //        data.EffectiveSTime = null;
        //        data.EffectiveETime = null;
             
        //     };

        if (
              this.search.EffectiveSTime != null &&
              this.search.EffectiveSTime != undefined &&
               this.search.EffectiveSTime != ""
            ) {
              data.EffectiveSTime = parseTime(this.search.EffectiveSTime);
            
            } else {
               data.EffectiveSTime = null;                        
            };
        if (
              this.search.EffectiveETime != null &&
              this.search.EffectiveETime != undefined &&
               this.search.EffectiveETime != ""
            ) {
              data.EffectiveETime = parseTime(this.search.EffectiveETime);
            
            } else {
               data.EffectiveETime = null;                        
            };




      data.maxResultCount= this.page.pageSize;
      data.skipCount= (this.page.currentPage - 1) * this.page.pageSize;
      data.sorting= this.table.order.sort;

      this.table.loading = true;
      GetXDDelInfoList(data)
        .then(res => {
          this.table.loading = false;
          if (res.success) {
            this.tableData = res.result.items;
            this.tableData.forEach(item => {
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
    createOrEdit(billno) {
       this.creatXDDelInfoComp.show = true;
       this.$refs.creatXDDelInfoComp.billno=billno;
        this.$refs.creatXDDelInfoComp.getTableList();     
    },
    onCreatCtnTypeContrastCompShowChange(val) {
      this.creatXDDelInfoComp.show = val;
    },  
    showfile(row){
       this.ShowFilePageComp.show = true;
       this.$refs.ShowFilePageComp.form.id=row.id;
        this.$refs.ShowFilePageComp.form.billno=row.billNO;
        this.$refs.ShowFilePageComp.getfileList(); 
    },
      opendetail(row){
        this.$router.push({
            path: "/InRecommond/DelivInfoDetail",
            query: { id: row.id,
                    type:"XD",
                   }
        });
     },
  },
  //初始化
  created() {
 
    this.getsiteList();
     this.getlineList();
    if(this.$route.query){
       
         this.search.StartStation=this.$route.query.StartStation; 
         this.search.EndStation=this.$route.query.EndStation;  
         //this.search.EffectiveTime=this.$route.query.EffectiveTime;  
         this.search.EffectiveSTime=this.$route.query.EffectiveSTime;
         this.search.EffectiveETime=this.$route.query.EffectiveETime;
         this.search.XXCC=this.$route.query.XXCC;
        this.getxxcclist();
        this.getTableList();       
      }

      else
      {
          this.getxxcclist();
      }
  }
};
</script>

<style lang="scss">
.xdqueryclass{
   .el-table__body tr:hover > td{
    color:black !important;
   //background-color: black !important;
   }     
  .el-table__body tr.current-row > td {
   color:black !important;
  }
 
background-color: rgb(248, 252, 254);
 #query {
    background: url("../../assets/images/u1.jpg");
    height: 180px;
  }
.querytable{
   font-size: 16px;  
   padding-top: 40px;
  //  padding-left: 450px;
  //   .el-input__inner{
  //      height: 40px;
  //  }
  .tdtitle{
   // width:300px;
   color: #FFFFFF;
    padding-bottom: 10px;
  }
  .btnset{
    background-color:#3b83f1!important;
    font-size: 16px;
    width: 120px;
  } 
}
}
</style>