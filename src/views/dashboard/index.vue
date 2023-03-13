<template>
<el-scrollbar style="height:100%"  class="page-component__scroll"> 
  <div class="page-container abclass">
  <!-- <el-carousel indicator-position="outside" >
    <el-carousel-item v-for="item in 4" :key="item" > 
   
    </el-carousel-item>
  </el-carousel> -->
 <div style="height:500px" id="query"> 
   <el-col :span="13" :offset="9" style="padding-top:160px">
     <el-card id="querycard" >
       <table class="querytable">
             <tr>
              <td class="tdtitle">起运站</td>
              <!-- <td class="tdtitle">航线</td> -->
               <td class="tdtitle">目的站</td>
              <td class="tdtitle">箱型箱量</td>             
               <!-- <td class="tdtitle">箱量</td> -->
               <td class="tdtitle" style="min-width:360px">用箱时间</td>
               <!-- <td class="tdtitle" ></td> -->
              <td class="tdtitle"></td>
              </tr>
              <tr>
                <td>
                 <big-data-select             
                      :val.sync="search.StartStation"
                      placeholder="起运站"
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
                   <big-data-select             
                      :val.sync="search.EndStation"
                      placeholder="目的站"
                      style="width: 95%"
                      size="mini"
                      clearable
                      filterable                
                      :data="siteList"
                      optionkey="displayText"
                      optionValue="value"
                    ></big-data-select>
                </td>
                <td id="xxclass">
                   <!-- <el-input placeholder="单号"    style="width:95%;" 
                    v-model="search.BillNO"  size="mini" clearable 
                    @input="search.BillNO = search.BillNO.toUpperCase()">
                </el-input> -->
                <div  >
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
                </div>
                </td>
               
                   <!-- <td>
                      <el-input-number
                    placeholder="箱量"
                    v-model="search.quantity"
                     controls-position="right"
                     :min="0"                                                           
                    :step="1"
                    clearable
                    style="width: 95%"
                    ></el-input-number>   
                   </td> -->
                    <td> 
                        <el-date-picker
                        v-model="search.EffectiveTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                          style="width: 100%">
                      </el-date-picker>
                       <!-- <el-date-picker
                      v-model="search.EffectiveSTime"
                      type="date"
                      clearable
                      placeholder="用箱时间起"
                       style="width:95%">
                    </el-date-picker> -->
                    
                    </td>
                    <!-- <td> 
                     <el-date-picker
                      v-model="search.EffectiveETime"
                      type="date"
                      clearable
                      placeholder="用箱时间止"
                       style="width:95%">
                    </el-date-picker>
                     </td> -->
                <td>
                  <div style="padding-left: 20px;">
                     <el-button  class="btnset" 
                     type="primary" size="mini" @click="searchinfo">查 询</el-button>
                  </div>
                </td>
              </tr>
            </table> 
     </el-card>
   </el-col>
   
     <!-- <el-carousel indicator-position="outside"   style="height:500px">
    <el-carousel-item style="height:500px"> 
      <img id="u0_img" class="img" width="100%" height="100%" :src="require('@/views/dashboard/css/images/u1.jpg')" />    
    </el-carousel-item>
     <el-carousel-item style="height:500px"> 
      <img id="u0_img" class="img" width="100%" height="100%" :src="require('@/views/dashboard/css/images/u2.jpg')" />    
    </el-carousel-item> 
  </el-carousel>-->
    <!-- <img id="u0_img" class="img" width="100%" height="100%" :src="require('@/views/dashboard/css/images/u2.jpg')" />     -->
<!--     
       <el-card style="background-color:white;opacity: 0.95;">
            <el-form
              ref="filter"
              :inline="true"
              :model="form"
              class="demo-form-inline"
              size="small"
            >
            
            </el-form>
          </el-card> -->
   
  </div>
   <div class="autocommond">
     <span>智能推荐</span>
     </div>
  <div style="padding:20px;">
    <el-col :span="18" :offset="4">
     <div style="height:520px">
        <el-col :span="8"
          v-for="(item, index) in datalist"
              :key="index"     
          >
          <el-card class="cardclass">
          <div class="title">
           <span  :style="'color:'+item.linecolor"> {{item.startStation+" 至 " +item.line+' 航线'}}
            </span>
           </div>
       
          <div>单号：{{item.billNO}}</div>
          <div>起运港：{{item.startStation}}</div>
          <!-- <div>目的港：{{item.endStation}}</div> -->
          <div>航线：{{item.line}}</div>
          <div >集装箱信息：{{item.xxcc}}</div>
       
          <div>有效时间：{{item.effectiveSTime+" 至  "+item.effectiveETime}}</div>
          <div>
            <!-- <el-col :span="22" >
                 <span>{{item.name}}</span> 
            </el-col>-->
             <el-col :span="2" :offset="22" >
              <el-link type="primary" @click="opendetail(item)">更多</el-link>           
            </el-col>
          
          </div>
          </el-card>
         </el-col>
     </div>
     <!-- <div >
        <el-col :span="2" :offset="22">
            <el-link type="primary" @click="openmore">更多</el-link>           
        </el-col>
     </div> -->
   </el-col>
     <!-- <el-tabs style="height:100%"  v-model="activeName"   >
      <el-tab-pane  name="first" v-if="datalist.xdlist.length>0">
         <span slot="label" class="tablable"> 箱东信息</span>
           <el-col :span="8"
          v-for="(item, index) in datalist.xdlist"
              :key="index"     
          >
          <el-card class="cardclass">
          <div class="title">{{item.billNO}}</div>
          <div>起运港：{{item.startStation}}</div>
          <div>目的港：{{item.endStation}}</div>
          <div >集装箱信息：{{item.xxcc}}</div>
       
          <div>有效时间：{{item.effectiveSTime+" 至  "+item.effectiveETime}}</div>
          </el-card>
          </el-col>
           <el-col :span="2" :offset="22">
               <el-link type="primary" @click="openmoreXD">更多</el-link>
            
              </el-col>
      </el-tab-pane>
      <el-tab-pane  name="second" v-if="datalist.zklist.length>0">
         <span slot="label" class="tablable"> 租客信息</span>
           <el-col :span="8"
          v-for="(item, index) in datalist.zklist"
              :key="index"     
          >
          <el-card class="cardclass">
          <div class="title">{{item.billNO}}</div>
          <div>起运港：{{item.startStation}}</div>
          <div>目的港：{{item.endStation}}</div>
          <div >集装箱信息：{{item.xxcc}}</div>        
        
          <div>有效时间：{{item.effectiveSTime+" 至  "+item.effectiveETime}}</div>
          </el-card>
          </el-col>
          <el-col :span="2" :offset="22">
            <el-link type="primary" @click="openmoreZK">更多</el-link>
            
              </el-col>
      </el-tab-pane>
     </el-tabs>
   -->
   
  </div>
     <div >    
      
      <img id="u0_img" style="padding-top:50px" class="img" width="100%"  :src="require('@/views/dashboard/css/images/u3.jpg')" />    
   <!-- <div style="background:url('views/dashboard/css/images/u3.jpg') no-repeat;height:400px">租箱智能推荐</div>
  </div> -->
    </div> 
  </div>
  
</el-scrollbar>
</template>
<script>
import {setCookie, getCookie, delCookie} from 'utils/cookie'
import {GetIntelligRcommendList} from 'api/InteRecommend'
import { GetSiteList,GetLineList,GetXXCCList } from "api/publicBase/Combox";
import colorList from 'store/colorList';

export default {

  name: 'dashboard',
  data() {
    return {
      num: '',
     datalist: [],
      siteList: [], //站点
      lineList: [],//
       activeName: "first",
       search:{},
        boxList: [
          // {
          //   value:"20GP",
          //   displayText:"20GP*1"
          // },
          //  {
          //   value:"40GP",
          //   displayText:"40GP*2"
          // }
        ],
      sizeList: [],
    }
  },
  methods: {
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
             //箱型尺寸
    getxxcclist() {
       GetXXCCList().then(res => {
            this.boxList = res.result;
        });
   
    },
   
     GetIntelligRcommendList()
     {
        let data=
        {
            maxResultCount: 6,
            skipCount:  0, 
        };
 
      this.datalist = [];
   
      GetIntelligRcommendList(data)
        .then(res => {
         
          if (res.success) {
            this.datalist = res.result;
             this.datalist.forEach(item=>{
              //item.lineId
              var ccindex=Number(item.lineID);                        
              this.$set(item, "linecolor", colorList[ccindex]);
              
            })  
                  
          }
        })
        .catch(()=>{});

     },
     openmore(){
        this.$router.push({
            path: '/InRecommond/InteRecommend'
          
            });
     },
     opendetail(row){
        this.$router.push({
            path: "/InRecommond/DelivInfoDetail",
            query: { id: row.id,
                    type:row.type,
                   }
        });
     },
     
     openmoreXD(){
        this.$router.push({
            path: '/OnlineSeach/XDSeachInfo'
          
            });
     },
       openmoreZK(){
         this.$router.push({
            path: '/OnlineSeach/ZKSeachInfo'
          
            });
     },
     searchinfo()
     {
        var type="";
      if(getCookie("AbpCompanyType"))
        type = getCookie("AbpCompanyType");
        if(type=="1" || type=="3")
        {        
          this.$router.push({
            path: "/ZKSeachInfo/ZKSeachInfo",
            query: this.search
        });
        }
        else{
           this.$router.push({
            path: "/XDSeachInfo/XDSeachInfo",
            query: this.search
          });
        }
      
     }
  },
  mounted() {
     this.getsiteList();
     this.GetIntelligRcommendList();
      this.getxxcclist();
      this.getlineList();
    //  this.getcclist();
  }
}
</script>
<style lang="scss">
.abclass{
  background-color: white;
  .cardclass{
    height:260px;
    margin:20px;
    line-height:30px
  }
  .title{
    font-weight: 400;
    font-size: 16px;
    //color: #0658B9;
  }
  .autocommond{
    padding-top:50px;
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    color: #0658B9;
  }

  #query {
    background: url("css/images/u2.jpg");
    // border-width: 0px;
    // position: absolute;
    // left: 390px;
    // top: 360px;
    // //width: 100%;
    // height: 200px;
    // display: -webkit-box;
    // display: -ms-flexbox;
    // display: flex;
    // z-index: 99;
  }
  .querytable{
    font-size: 16px;
    
  }
  .tdtitle{
    width:300px;
    color: gray;
    padding-bottom: 10px;
  }
  #querycard {
    padding: 20px;
   // opacity: 0.8;
    // background-color: #f7f7f7;
    background:rgba(247,247,247,0.9);
    border-width: 0px;
   
    width: 1100px;
    height: 168px;
     .el-input__inner{
       height: 40px;
   }
   .el-date-editor .el-range-separator {   
    width: 10% !important;
    
   }
  }
  .btnset{
    padding: 10px;
    background-color:rgba(6, 88, 185, 1);
    width:100px;
    height:40px;
    font-size: 16px;
  }
  // #xxclass{
  //   // .el-select .el-select-dropdown__item
  //   // {
  //   //   width: 400px !important;
  //   //   height: 54px !important;
  //   //   line-height: 54px !important;
  //   // }
    
  // }
  // .showinput{
  //   .el-input__inner {
  //     height: 36px !important;
  //   }
  // }
}

.page-container{min-height: 100vh;}
.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: "";
    clear: both;
    height: 0;
}
.top{margin-bottom: 15px;}
.cont-div{
  box-shadow: 0 2px 5px #ccc;
  height: 306px;
  box-sizing: border-box;
  float: left;
}
.main-div{width: 29%;font-size: 20px;line-height: 70px;color: #676a6c;padding: 0 20px;}
.main-div2{width: 36%;margin-left: 1%;}
.main-div2-title{line-height: 44px;color: #676a6c;font-size: 14px;box-sizing: border-box;padding: 0 20px;border-bottom: 1px solid #cdcccc;}
.more{color: #0060e2;float: right;}
.main-div2-img{text-align: center;padding-top: 50px;}
.main-div3-img{background: #eef5ff;text-align: center;}
.main-div3-btn{margin-top: 37px;text-align: center;}
.main-div3{width: 33%;margin-left: 1%;}
.main2-div{box-shadow: 0 2px 5px #ccc;box-sizing: border-box;float: left;width: 66%;padding: 20px;}
.main2-div2{box-shadow: 0 2px 5px #ccc;box-sizing: border-box;float: left;width: 33%;margin-left: 1%;}
.main2-div-title{font-size: 20px;font-weight: bold;color: #676a6c;margin-bottom: 15px;}
.main2-div2-title{line-height: 44px;color: #fff;font-size: 14px;box-sizing: border-box;padding: 0 20px;border-bottom: 1px solid #cdcccc;background: #0060e2;}
.more2{color: #fff;float: right;}
</style>
