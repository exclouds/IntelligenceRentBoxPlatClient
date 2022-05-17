<template>
  <div>
    <el-dialog
      title="附件查看"
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
      <el-row style="height:100%">
        <el-col :span="8"  v-for="(item, index) in fileList"
        :key="index" style="padding:20px"
         > 
          <el-image :src="item.url"  :preview-src-list="[item.url]">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
          </el-image>
        </el-col>
      </el-row>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="windowShow = false" size="small">关 闭</el-button>   
      </span>
    </el-dialog>
  </div>
</template>
<script>

import { GetUPFile } from "api/publicBase/Attachment";
import { warnMsg } from "utils/messageBox";
import { tableMixin } from "mixin/commTable";

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
      if (!newValue) {
        //窗口关闭

        this.form={
           id: "",
          billno:"",
        }
        this.fileList=[];
         this.$emit("update:pshow", false);
         
      }
    }
  },
  data() {
    return {
     
      windowShow: this.pshow,
      btnLoading: false,
      formLoading: false,
      form:{
           id: "",
          billno:"",
      },
     
      fileList:[],
      //定义字段校验规则
      rules: { }
    };
  },
  methods: {

    getfileList()
    {
      if(this.form.id)
      {       
        this.formLoading=true;
        GetUPFile( this.form).then(res => {
            if (res.success) {          
             this.fileList=res.result;
              this.formLoading=false;
            }
          })
          .catch(()=>{
             this.formLoading=true;
          })
      }
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