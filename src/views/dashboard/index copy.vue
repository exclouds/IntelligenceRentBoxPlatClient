<template>
  <div class="page-container" style="width:100%">
    <div>
      
       <img src="../../../static/img/index.jpg" style="width:100%">
    </div>
    <div style="padding-top:20px;background-color: rgba(240, 243, 246, 1);height:500px">
      
       <el-col :span="20" :offset="2"  style="background-color: rgba(240, 243, 246, 1) ">
            <el-col :span="20">
              <div><span style="font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
                font-weight: 700;
                font-style: normal;
                font-size: 22px;
                text-align: center;">任务池</span>
              </div>
            </el-col>
            <el-col :span="4" align="right">
              <div><span style="box-shadow: none;
                font-size: 16px;
                color: #0658B8;">更多任务</span>
              </div>
            </el-col>
          
        <el-divider></el-divider>
         <el-col :span="8"   class="taskclass">
            <el-card            
              >            
              <el-row style="height:40px">
                <el-col :span="6" class="tasktitle"> <span>提空任务</span> </el-col>
                <el-col :span="6" :offset="12" class="taskamt"><span>￥500.00</span> </el-col>
              </el-row>
            
              <el-row style="height:60px">
                <el-col :span="8"> <span>堆场</span></el-col>
                <el-col :span="8">
                  <div class="not_has_more">
                    40GB/1个  </div>
                    </el-col> 
                     
                 <el-col :span="8" align="right"> <span >某出口加工厂</span></el-col>
              </el-row>
             <el-row style="height:40px">
               <el-col :span="24"><span>提箱时间：2021-12-26 10:00</span></el-col>                       
              </el-row>
                         
          </el-card>
          </el-col>
         
          <el-col :span="8"   class="taskclass">
            <el-card            
              >            
              <el-row style="height:40px">
                <el-col :span="6" class="tasktitle"> <span>疏港任务</span> </el-col>
                <el-col :span="6" :offset="12" class="taskamt"><span>￥500.00</span> </el-col>
              </el-row>
            
              <el-row style="height:60px">
                <el-col :span="8"> <span>码头内堆场</span></el-col>
                <el-col :span="8">
                  <div class="not_has_more">
                   433个  </div>
                    </el-col> 
                     
                 <el-col :span="8"  align="right"> <span>某堆场</span></el-col>
              </el-row>
             <el-row style="height:40px">
               <el-col :span="24"><span>疏港时间：2021-12-26 22:00</span></el-col>                       
              </el-row>
                         
          </el-card>
          </el-col>
       
        <el-col :span="8"   class="taskclass">
            <el-card            
              >            
              <el-row style="height:40px">
                <el-col :span="6" class="tasktitle"> <span>送货任务</span> </el-col>
                <el-col :span="6" :offset="12" class="taskamt"><span>￥500.00</span> </el-col>
              </el-row>
            
              <el-row style="height:60px">
                <el-col :span="8"> <span>某出口加工厂</span></el-col>
                <el-col :span="8">
                  <div class="not_has_more">
                    -  </div>
                    </el-col> 
                     
                 <el-col :span="8" align="right"> <span>站装中心</span></el-col>
              </el-row>
             <el-row style="height:40px">
               <el-col :span="24"><span>装箱时间：2021-12-26 10:00</span></el-col>                       
              </el-row>
                         
          </el-card>
          </el-col>
          
            <el-col :span="8"   class="taskclass">
            <el-card            
              >            
              <el-row style="height:40px">
                <el-col :span="6" class="tasktitle"> <span>送货任务</span> </el-col>
                <el-col :span="6" :offset="12" class="taskamt"><span>￥500.00</span> </el-col>
              </el-row>
            
              <el-row style="height:60px">
                <el-col :span="8" > <span>某出口加工厂

              </span></el-col>
                <el-col :span="8">
                  <div class="not_has_more">
                    - </div>
                    </el-col> 
                     
                 <el-col :span="8" align="right"> <span>站装中心</span></el-col>
              </el-row>
             <el-row style="height:40px">
               <el-col :span="24"><span>装箱时间：2021-12-26 10:00</span></el-col>                       
              </el-row>
                         
          </el-card>
          </el-col>
            <el-col :span="8"   class="taskclass">
            <el-card            
              >            
              <el-row style="height:40px">
                <el-col :span="6" class="tasktitle"> <span>提空任务</span> </el-col>
                <el-col :span="6" :offset="12" class="taskamt"><span>￥500.00</span> </el-col>
              </el-row>
            
              <el-row style="height:60px">
                <el-col :span="8"> <span>堆场</span></el-col>
                <el-col :span="8">
                  <div class="not_has_more">
                    40GB/1个  </div>
                    </el-col> 
                     
                 <el-col :span="8" align="right"> <span>某出口加工厂</span></el-col>
              </el-row>
             <el-row style="height:40px">
               <el-col :span="24"><span>提箱时间：2021-12-26 10:00</span></el-col>                       
              </el-row>
                         
          </el-card>
          </el-col>
             
            <el-col :span="8"   class="taskclass">
            <el-card            
              >            
              <el-row style="height:40px">
                <el-col :span="6" class="tasktitle"> <span>疏港任务</span> </el-col>
                <el-col :span="6" :offset="12" class="taskamt"><span>￥500.00</span> </el-col>
              </el-row>
            
              <el-row style="height:60px">
                <el-col :span="8"> <span>码头内堆场</span></el-col>
                <el-col :span="8">
                  <div class="not_has_more">
                    433个  </div>
                    </el-col> 
                     
                 <el-col :span="8"  align="right"> <span>某堆场</span></el-col>
              </el-row>
             <el-row style="height:40px">
               <el-col :span="24"><span>提箱时间：2021-12-26 10:00</span></el-col>                       
              </el-row>
                         
          </el-card>
          </el-col>



       </el-col>
      
    </div>
    <div style="height:380px">
      
       <el-col :span="20" :offset="2" style="padding-top:15px;padding-bottom:20px" >
            <el-col :span="20">
              <div><span style="font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
                font-weight: 700;
                font-style: normal;
                font-size: 22px;
                text-align: center;">行业新闻</span>
              </div>
            </el-col>
            <el-col :span="4" align="right">
              <div><span style="box-shadow: none;
                font-size: 16px;
                color: #0658B8;">更多动态</span>
              </div>
            </el-col>
          
        <el-divider></el-divider>
          <el-col :span="6"  class="newsclass">
             
            <div >
             <div>  <img src="../../svg/news1.svg" style="width:100%"></div>
           <div class="newstitle">2022年物流“提质增效”再进阶</div>
           <div style="height:50px">时隔5年，2021年的资本市场再度迎来物流行业的上市“大年”。这一年，中国物流行业…</div>
           <div class="newcontent">More</div>
           
            </div>
         
          </el-col>

           <el-col :span="6"  class="newsclass">
             
            <div >
             <div>  <img src="../../svg/news2.svg" style="width:100%"></div>
           <div class="newstitle">冷链物流驶上发展“快车道”</div>
           <div style="height:50px">日，随着首批从智利航运至中国的1200吨车厘子抵达广州，京东生鲜平台的车厘进入…</div>
           <div class="newcontent">More</div>
           
            </div>
         
          </el-col>
           <el-col :span="6"  class="newsclass">
             
            <div >
             <div>  <img src="../../svg/news3.svg" style="width:100%"></div>
           <div class="newstitle">2022年物流“提质增效”再进阶</div>
           <div style="height:50px">时隔5年，2021年的资本市场再度迎来物流行业的上市“大年”。这一年，中国物流行业…</div>
           <div class="newcontent">More</div>
           
            </div>
         
          </el-col>
           <el-col :span="6"  class="newsclass">
             
            <div >
             <div>  <img src="../../svg/news4.svg" style="width:100%"></div>
           <div class="newstitle">冷链物流驶上发展“快车道”</div>
           <div style="height:50px">日，随着首批从智利航运至中国的1200吨车厘子抵达广州，京东生鲜平台的车厘进入…</div>
           <div class="newcontent">More</div>
           
            </div>
         
          </el-col>
       

       </el-col>
    </div>
    <div class="siteclass"  style="height:200px">
     
      
      <el-col :span="8" >
        <div class="txtcss" style=" padding-top: 40px;"> 云堆场</div>
      </el-col>
      <el-col :span="12" class="txtclass">   
         <div s>
           云堆场移动支付服务功能可帮助各大堆场方便地建立基于客户交易、行为习惯的大数据库,并对各类数据进行精细化分析,从而进一步优化堆场自身的服务。 云堆场移动支付服务功能可帮助各大堆场方便地建立基于客户交易、行为习惯的大数据库,并对各类数据进行精细化分析,从而进一步优化堆场自身的服务。
         </div>
         </el-col>
    </div>
    <div style="line-height: 50px;padding-top:50px">
      <el-col :span="24"   align="center">
    <span style="font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 22px;">我们的合作伙伴</span>
      </el-col>
       <el-col :span="1" :offset="1" style="padding-top:80px">
        <img src="../../../static/img/c0.png" style="width:100%">
      </el-col>
      <el-col :span="5" >
        <img src="../../../static/img/c1.png" style="width:100%">
      </el-col>
       <el-col :span="15" >
         <img src="../../../static/img/c2.png" style="width:100%">
      </el-col>
      <el-col :span="1" style="padding-top:80px">
        <img src="../../../static/img/c4.png" style="width:100%">
      </el-col>
    </div>
  </div>
</template>
<script>
import {setCookie, getCookie, delCookie} from 'utils/cookie'

export default {
  name: 'dashboard',
  data() {
    return {
      num: '',
      protList: []
    }
  },
  methods: {
 
  },
  created() {
   //location.reload();
  }
}
</script>
<style lang="scss">
.taskclass{
  padding:15px ;
  font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
  .tasktitle{
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
  }
  .taskamt{
        font-size: 16px;
    color: #0658B8;
    text-align: right;
  }
  .not_has_more{
    //  margin: 40px 0;
    // line-height: 50px;
     text-align: center;
   
    // position: relative;
    // height: 33px;
    // font-size: 24px;
    // font-family: PingFangSC-Regular, PingFang SC;
    // font-weight: 400;
    //color: rgba(140, 142, 165, 1);
   
    line-height: 10px;
    &::after,
    &::before {
      position: absolute;
      width: 60px;
      height: 0.5px;
      background: #0c0b0b;
      content: '';
      top: 10px;
    }
    &::after {
      left: 30%;
    }
    &::before {
      right: 40%;
    }
  }
 
  
}
.siteclass{
  color: #FFFFFF;
    background-image: url('../../../static/img/yun.jpg');
    width: 100%;
    //  -webkit-filter: grayscale(70%); /* Chrome, Safari, Opera */
    // filter: grayscale(70%);
    
  .not_has_more{
     //line-height: 40px;
     text-align: center;
    font-size: 22px;
    color: #FFFFFF;
    
    &::after,
    &::before {
      position: absolute;
      width: 80px;
      height: 3px;
      background: #fffefe;
      content: '';
      top: 80px;
    }
    &::after {
      left: 13%;
    }
    &::before {
      //right: 10%;
    }
  }
   .txtcss{
      //line-height: 40px;
     text-align: center;
    font-size: 22px;
    color: #FFFFFF;
    
    
    
  }
  .txtclass{
    padding-top: 20px;
    line-height: 40px;
    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #FFFFFF;
   
  }
}
.newsclass{
  padding-right: 20px;
   
  .newstitle{
    padding:10px 15px;
   text-align: center;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
  }
  .newcontent {
    padding-top:15px ;

    font-size: 18px;
    color: #0658B8;
    text-align: left;

  }
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
