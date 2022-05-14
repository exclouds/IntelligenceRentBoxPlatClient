<template>
  <div class="gjt" style="height:2880px">
      <div id="menue"> 
         <el-menu
         :unique-opened = true
         :show-timeout="200"
         :default-activde="$route.path"
         mode="horizontal" 
         text-color="#545c64"
        active-text-color="#409EFF"
      
        class="menuclass"
        
      >
        <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" 
        :base-path="route.path"/>
      </el-menu>
      </div>
      <div id="loginfo">
     <el-dropdown v-if="name">
			<span class="el-dropdown-link">
			<span style="color:#fff">	{{name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
						<el-dropdown-item><span @click="onupdatePasswordComp()" style="display:block;">修改密码</span></el-dropdown-item>
				
			</el-dropdown-menu>
		</el-dropdown>      
	    <el-link v-if="!name" type="primary" @click="onlogin()"><span style="color:#fff">{{"登录/注册"}}</span></el-link> 
      </div>
    <div id="query">
      
      <el-card style="background-color:white;opacity: 0.95;">
      
      <el-tabs v-model="activeTab">
        <el-tab-pane label="海运订舱" name='first'>
          <el-card>
            <el-form
              ref="filter"
              :inline="true"
              :model="filter"
              class="demo-form-inline"
              size="small"
            >
              <el-form-item style="left-padding:15px">
                <el-input v-model="filter.ADD_BGN" clearable placeholder="起始地" />          
              </el-form-item>
              <el-form-item>
                <el-input v-model="filter.ADD_END" clearable placeholder="目的地" />
              </el-form-item>
              <el-form-item>
                <el-date-picker v-model="filter.MK_DD" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="filter.CCXX" clearable placeholder="尺寸箱型" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch()">查询</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="铁路订舱" name='second'>
          <el-card>
            <el-form
              ref="filter"
              :inline="true"
              :model="filter"
              class="demo-form-inline"
              size="small"
            >
              <el-form-item style="left-padding:15px">
                <el-input v-model="filter.ADD_BGN" clearable placeholder="起始地" />          
              </el-form-item>
              <el-form-item>
                <el-input v-model="filter.ADD_END" clearable placeholder="目的地" />
              </el-form-item>
              <el-form-item>
                <el-date-picker v-model="filter.MK_DD" type="daterange" align="right" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="filter.CCXX" clearable placeholder="尺寸箱型" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch()">查询</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      </el-card>
    </div>
    <div id="base" class="">

      <!-- Unnamed (图片 ) -->
      <div id="u0" class="ax_default _图片_">
        <img id="u0_img" class="img " :src="require('@/views/GJT/images/u01.png')" />
        <div id="u0_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (PC版权信息) -->

      <!-- Unnamed (矩形) -->
      <div id="u2" class="ax_default _默认样式">
        <img id="u2_img" class="img " :src="require('@/views/GJT/images/u2.svg')" />
        <div id="u2_text" class="text ">
          <p><span>Copyright © </span><a id="u3" class="link" title="点击打开www.Exclouds.com.cn"><span>www.Exclouds.com.cn</span></a><span>, All Rights Reserved.</span></p><p><span>致力于打造符合中国国情的智慧物流</span></p>
        </div>
      </div>
      <div id="u1" style="display:none; visibility:hidden;"></div>
      
        <!-- Unnamed (矩形) -->
      <!-- <div id="u4_div">
      
        <div id="u4" class="ax_default box_2">
          <div id="u4_div" class=""></div>
          <div id="u4_text" class="text " style="display:none; visibility: hidden">
            <p></p>
          </div>
        </div>
      </div> -->
      <!-- Unnamed (矩形) -->
      <div id="u5" class="ax_default _三级标题">
        <div id="u5_div" class=""></div>
        <div id="u5_text" class="text ">
          <p><span>我们的合作伙伴</span></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u6" class="ax_default _图片_">
        <img id="u6_img" class="img " :src="require('@/views/GJT/images/u6.png')"/>
        <div id="u6_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u7" class="ax_default _图片_">
        <img id="u7_img" class="img " :src="require('@/views/GJT/images/u7.png')"/>
        <div id="u7_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u8" class="ax_default _图片_">
        <img id="u8_img" class="img " :src="require('@/views/GJT/images/u8.jpg')"/>
        <div id="u8_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u9" class="ax_default _图片_">
        <img id="u9_img" class="img " :src="require('@/views/GJT/images/u8.jpg')"/>
        <div id="u9_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u10" class="ax_default _图片_">
        <img id="u10_img" class="img " :src="require('@/views/GJT/images/u10.png')"/>
        <div id="u10_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u11" class="ax_default label">
        <div id="u11_div" class=""></div>
        <div id="u11_text" class="text ">
          <p><span>更多动态</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u12" class="ax_default _三级标题">
        <div id="u12_div" class=""></div>
        <div id="u12_text" class="text ">
          <p><span>行业新闻</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u13" class="ax_default box_2">
        <div id="u13_div" class=""></div>
        <div id="u13_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u14" class="ax_default _三级标题">
        <div id="u14_div" class=""></div>
        <div id="u14_text" class="text ">
          <p><span>Industry News</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u15" class="ax_default _三级标题">
        <div id="u15_div" class=""></div>
        <div id="u15_text" class="text ">
          <p><span>2022年物流“提质增效”再进阶</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u16" class="ax_default _文本段落">
        <div id="u16_div" class=""></div>
        <div id="u16_text" class="text ">
          <p><span>时隔5年，2021年的资本市场再度迎来物流行业的上市“大年”。这一年，中国物流行业…</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u17" class="ax_default primary_button">
        <div id="u17_div" class=""></div>
        <div id="u17_text" class="text ">
          <p><span>More</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u18" class="ax_default _三级标题">
        <div id="u18_div" class=""></div>
        <div id="u18_text" class="text ">
          <p><span>2022年物流“提质增效”再进阶</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u19" class="ax_default _文本段落">
        <div id="u19_div" class=""></div>
        <div id="u19_text" class="text ">
          <p><span>时隔5年，2021年的资本市场再度迎来物流行业的上市“大年”。这一年，中国物流行业…</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u20" class="ax_default primary_button">
        <div id="u20_div" class=""></div>
        <div id="u20_text" class="text ">
          <p><span>More</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u21" class="ax_default _三级标题">
        <div id="u21_div" class=""></div>
        <div id="u21_text" class="text ">
          <p><span>冷链物流驶上发展“快车道”</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u22" class="ax_default _文本段落">
        <div id="u22_div" class=""></div>
        <div id="u22_text" class="text ">
          <p><span>日，随着首批从智利航运至中国的1200吨车厘子抵达广州，京东生鲜平台的车厘进入…</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u23" class="ax_default primary_button">
        <div id="u23_div" class=""></div>
        <div id="u23_text" class="text ">
          <p><span>More</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u24" class="ax_default _三级标题">
        <div id="u24_div" class=""></div>
        <div id="u24_text" class="text ">
          <p><span>冷链物流驶上发展“快车道”</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u25" class="ax_default _文本段落">
        <div id="u25_div" class=""></div>
        <div id="u25_text" class="text ">
          <p><span>日，随着首批从智利航运至中国的1200吨车厘子抵达广州，京东生鲜平台的车厘子进入…</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u26" class="ax_default primary_button">
        <div id="u26_div" class=""></div>
        <div id="u26_text" class="text ">
          <p><span>More</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u28" class="ax_default _三级标题">
        <div id="u28_div" class=""></div>
        <div id="u28_text" class="text ">
          <p><span>云租箱平台</span></p>
        </div>
      </div>

      <!-- Tabs (组合) -->
      <div id="u54" class="ax_default" data-label="Tabs" data-left="360" data-top="367" data-width="914" data-height="170">
        
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u68" class="ax_default _图片_">
        <img id="u68_img" class="img " :src="require('@/views/GJT/images/u68.png')"/>
        <div id="u68_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- 提空预约按钮 -->
      <div id="u69" class="ax_default _图片_">
        <el-button circle plain style="width:100%;border:0px;" @click="login()">
          <img id="u69_img" class="img " :src="require('@/views/GJT/images/u69.svg')" />
        </el-button>
        <div id="u69_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u70" class="ax_default link_button">
        <div id="u70_div" class=""></div>
        <div id="u70_text" class="text ">
          <p><span>提空预约</span></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u71" class="ax_default _图片_">
        <el-button circle plain style="width:100%;border:0px;" @click="login()">
          <img id="u71_img" class="img " :src="require('@/views/GJT/images/u71.svg')"/>
        </el-button>
        <div id="u71_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u72" class="ax_default _图片_">
        <el-button circle plain style="width:100%;border:0px;" @click="login()">
          <img id="u72_img" class="img " :src="require('@/views/GJT/images/u72.svg')"/>
        </el-button>
        <div id="u72_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u73" class="ax_default _图片_">
        <el-button circle plain style="width:100%;border:0px;" @click="login()">
          <img id="u73_img" class="img " :src="require('@/views/GJT/images/u73.svg')"/>
        </el-button>
        <div id="u73_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u74" class="ax_default _图片_">
        <el-button circle plain style="width:100%;border:0px;" @click="login()">
          <img id="u74_img" class="img " :src="require('@/views/GJT/images/u74.svg')"/>
        </el-button>
        <div id="u74_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u75" class="ax_default link_button">
        <div id="u75_div" class=""></div>
        <div id="u75_text" class="text ">
          <p><span>暂落箱预约</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u76" class="ax_default link_button">
        <div id="u76_div" class=""></div>
        <div id="u76_text" class="text ">
          <p><span>送货预约</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u77" class="ax_default link_button">
        <div id="u77_div" class=""></div>
        <div id="u77_text" class="text ">
          <p><span>换单压箱</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u78" class="ax_default link_button">
        <div id="u78_div" class=""></div>
        <div id="u78_text" class="text ">
          <p><span>海关查验</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u79" class="ax_default box_2">
        <div id="u79_div" class=""></div>
        <div id="u79_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u80" class="ax_default _三级标题">
        <div id="u80_div" class=""></div>
        <div id="u80_text" class="text ">
          <p><span>业务预约</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u81" class="ax_default box_2">
        <div id="u81_div" class=""></div>
        <div id="u81_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u82" class="ax_default _三级标题">
        <div id="u82_div" class=""></div>
        <div id="u82_text" class="text ">
          <p><span>Business Appointment</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u83" class="ax_default _三级标题">
        <div id="u83_div" class=""></div>
        <div id="u83_text" class="text ">
          <p><span>Our Business Partner</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u84" class="ax_default box_2">
        <div id="u84_div" class=""></div>
        <div id="u84_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u85" class="ax_default _图片_">
        <!-- <img id="u85_img" class="img " :src="require('@/views/GJT/images/u85.png')"/> -->
        <div id="u85_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u86" class="ax_default box_3">
        <div id="u86_div" class=""></div>
        <div id="u86_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u87" class="ax_default _图片_">
        <img id="u87_img" class="img " :src="require('@/views/GJT/images/u87.png')"/>
        <div id="u87_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u88" class="ax_default _三级标题">
        <div id="u88_div" class=""></div>
        <div id="u88_text" class="text ">
          <p><span>云堆场</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u89" class="ax_default _文本段落">
        <div id="u89_div" class=""></div>
        <div id="u89_text" class="text ">
          <p><span style="letter-spacing:1px;">&nbsp;&nbsp; &nbsp; &nbsp; </span><span style="letter-spacing:1.5px;">云堆场移动支付服务功能可帮助各大堆场方便地建立基于客户交易、行为习惯的大数据库,并对各类数据进行精细化分析,从而进一步优化堆场自身的服务。 </span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u90" class="ax_default button">
        <div id="u90_div" class=""></div>
        <div id="u90_text" class="text ">
          <p><span>加入我们</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u91" class="ax_default button">
        <div id="u91_div" class=""></div>
        <div id="u91_text" class="text ">
          <p><span>发布场地</span></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u92" class="ax_default box_2">
        <div id="u92_div" class=""></div>
        <div id="u92_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u93" class="ax_default box_1">
        <div id="u93_div" class=""></div>
        <div id="u93_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u94" class="ax_default box_1">
        <div id="u94_div" class=""></div>
        <div id="u94_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u95" class="ax_default _图片_">
        <img id="u95_img" class="img " :src="require('@/views/GJT/images/u95.png')"/>
        <div id="u95_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u96" class="ax_default _图片_">
        <img id="u96_img" class="img " :src="require('@/views/GJT/images/u96.png')"/>
        <div id="u96_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u97" class="ax_default box_1">
        <div id="u97_div" class=""></div>
        <div id="u97_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u98" class="ax_default _图片_">
        <img id="u98_img" class="img " :src="require('@/views/GJT/images/u98.png')"/>
        <div id="u98_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u99" class="ax_default box_1">
        <div id="u99_div" class=""></div>
        <div id="u99_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u100" class="ax_default _图片_">
        <img id="u100_img" class="img " :src="require('@/views/GJT/images/u100.jpg')"/>
        <div id="u100_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u101" class="ax_default box_1">
        <div id="u101_div" class=""></div>
        <div id="u101_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u102" class="ax_default _图片_">
        <img id="u102_img" class="img " :src="require('@/views/GJT/images/u102.jpg')"/>
        <div id="u102_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u103" class="ax_default box_1">
        <div id="u103_div" class=""></div>
        <div id="u103_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u104" class="ax_default _图片_">
        <img id="u104_img" class="img " :src="require('@/views/GJT/images/u104.png')"/>
        <div id="u104_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u105" class="ax_default box_1">
        <div id="u105_div" class=""></div>
        <div id="u105_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u106" class="ax_default box_1">
        <div id="u106_div" class=""></div>
        <div id="u106_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u107" class="ax_default _图片_">
        <img id="u107_img" class="img " :src="require('@/views/GJT/images/u107.png')"/>
        <div id="u107_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u108" class="ax_default box_1">
        <div id="u108_div" class=""></div>
        <div id="u108_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u109" class="ax_default box_1">
        <div id="u109_div" class=""></div>
        <div id="u109_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u110" class="ax_default _图片_">
        <img id="u110_img" class="img " :src="require('@/views/GJT/images/u110.png')"/>
        <div id="u110_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u111" class="ax_default _图片_">
        <img id="u111_img" class="img " :src="require('@/views/GJT/images/u111.png')"/>
        <div id="u111_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u112" class="ax_default _图片_">
        <img id="u112_img" class="img " :src="require('@/views/GJT/images/u112.png')"/>
        <div id="u112_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (图片 ) -->
      <div id="u113" class="ax_default _图片_">
        <el-button circle plain style="width:100%;border:0px;" @click="login()">
          <img id="u113_img" class="img " :src="require('@/views/GJT/images/u113.png')"/>
        </el-button>
        <div id="u113_text" class="text " style="display:none; visibility: hidden">
          <p></p>
        </div>
      </div>

      <!-- Unnamed (矩形) -->
      <div id="u114" class="ax_default link_button">
        <div id="u114_div" class=""></div>
        <div id="u114_text" class="text ">
          <p><span>预约集港</span></p>
        </div>
      </div>

      
    </div>
     <update-password ref="updatePasswordComp" :pshow.sync="updatePasswordComp.show"  @on-save-success="onSaveSuccess"></update-password>
        <login ref="loginComp" 
        :pshow.sync="loginComp.show" 
         >
         </login>
  </div>
</template>


<script>
 import { mapGetters } from 'vuex' 
 import SidebarItem from './SidebarItem'
 import updatePassword from '@/views/layout/updatePassword'
 import login from '@/views/layout/login'
  import {LogOut} from 'api/user/tenant'

export default {
  name: 'GJT',
   components: {    
     SidebarItem,
     updatePassword,login
		},
    computed: {
  ...mapGetters([
    'permission_routers',
    	'name'
  ]),
  
},
  data() {
    return {
      filter: {
        ADD_BGN:'',
        ADD_END:'',
        MK_DD:'',
        CCXX:''
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime())
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近两天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近两个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      activeTab: 'first',
      updatePasswordComp: {
          show: false
        } ,
        loginComp: {
          show: false
        } 
    }
  },
  created() {
    
    this.InitDictItem()
  },
  methods: {
    /**
     * 初始化数据
     */
    InitDictItem() {
      //gjtload();
    },
    handleSearch(){
    },
    login(){
      this.$alert('请先登录', '提示')
    },
    	//显示详情页面
			onupdatePasswordComp() {
			this.updatePasswordComp.show = true;
			},
      onlogin(){
        	this.loginComp.show = true;
      },
			//修改密码成功
				onSaveSuccess(){
					this.logout()
				},
         logout() {
				this.$store.dispatch('FedLogOut')
				.then(() => {
					//console.log(getToken)
					LogOut().then(res => {
					})
					//location.reload(); // 为了重新实例化vue-router对象 避免bug
					this.$store.commit('CLEAN_VIEW')
					window.location.href = process.env.LOGOUT_URL
					location.reload();
					//this.$router.push({ path: '/login' })
					
				});
			}
  }
}
</script>
<style lang="scss" scoped>
 @import url("css/gjt.css");
//@import url("src/views/dashboard/css/gjt.css");
.gjt{

  margin:0px;
  background-image:none;
  position:relative;
  left:0px;
  width:100%;
  margin-left:auto;
  margin-right:auto;
  text-align:left;
  .el-menu {
    // border-right: solid 1px #e6e6e6;
    // list-style: none;
    // position: relative;
    // margin: 0;
    // padding-left: 0;
   
   background-color:transparent!important;

   .el-menu--horizontal>.el-submenu:focus .el-submenu__title, .el-menu--horizontal>.el-submenu:hover .el-submenu__title {
   
    background-color: bisque !important;
}
   
}

 .el-menu--horizontal .el-menu-item:hover{
    background-color: rgb(201, 224, 250)!important;
 }
 


  .panel-group {
  margin-top: 18px;
  .card-panel-col {
      margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
  }
  @media (max-width:550px) {
    .card-panel-description {
        display: none;
    }
    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;
      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
  .systeminfo{
    line-height: 25px;
    float: left;
    width: 50%;
    margin-bottom: 20px;
    .lidiv{
      line-height: 25px;
    }
  }
  .form_sketch {
  border-color:transparent;
  background-color:transparent;
  }
  #base {
    position:absolute;
    z-index:0;
  }
  #query {
    border-width: 0px;
    position: absolute;
    left: 390px;
    top: 360px;
    //width: 100%;
    height: 200px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    z-index: 99;
  }
  .el-tabs__item {
    background-color: white;
    border-radius: 10px;
  }
  #u69_img:hover {
    content: url(~@/views/GJT/images/u69_mouseOver.svg);
  }
  #u71_img:hover {
    content: url(~@/views/GJT/images/u71_mouseOver.svg);
  }
  #u72_img:hover {
    content: url(~@/views/GJT/images/u72_mouseOver.svg);
  }
  #u73_img:hover {
    content: url(~@/views/GJT/images/u73_mouseOver.svg);
  }
  #u74_img:hover {
    content: url(~@/views/GJT/images/u74_mouseOver.svg);
  }
  #menue{
    border-width:0px;
    position:absolute;
    left:600px;
    top:0px;
    
    height:70px;
    display:flex;
    z-index: 99;
  }
  #loginfo{
     border-width:0px;
      position:absolute;
      right:100px;
      top:20px;
     // width:100%;
    //  height:70px;
      display:flex;
      z-index: 99;
  }
   
}
</style>

