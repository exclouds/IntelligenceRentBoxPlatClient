<template>
  <div>
    <el-dialog
      :title="form.id==''?'新增船公司箱型对照表':'编辑船公司箱型对照表'"
      v-dialogDrag
      :visible.sync="windowShow"
      width="800px"
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
          <el-col :span="12">
            <el-form-item label="船公司：" prop="shipperId">
              <el-select
                v-model="form.shipperId"
                placeholder="请选择船公司"
                style="width:100%"
                clearable
                filterable
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
          <el-col :span="12">
            <el-form-item label="船公司箱型代码：" prop="shipperCode">
              <el-input
                placeholder="请输入船公司箱型代码"
                v-model="form.shipperCode"
                @input="form.shipperCode = form.shipperCode.toUpperCase()"
                size="mini"
                maxlength="10"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标准尺寸：" prop="sizeCode">
              <el-select
                v-model="form.sizeCode"
                placeholder="请选择标准尺寸"
                style="width:100%"
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
           <el-col :span="12">
            <el-form-item label="标准箱型：" prop="typeCode">
              <el-select
                v-model="form.typeCode"
                placeholder="请选择标准箱型"
                style="width:100%"
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
import { englishOrNumber } from "utils/validate";
import {
  ctnTypeContrastAddEdit,
  getCtnTypeContrastSingle
} from "api/publicBase/ctnTypeContrast";
import {
  getCustomComboBox,
  getShipCompanyForCarrier
} from "api/publicBase/shipBase/contactions/shipCompanyContact";
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
      if (this.$refs["ruleForm"]) this.$refs["ruleForm"].resetFields(); //清空验证
      if (!newValue) {
        //窗口关闭
        this.form = {
          id: "",
          shipperId: "", //船公司
          typeCode: "", //标准箱型
          sizeCode: "", //标准尺寸
          shipperCode: "", //船公司代码
          remarks: "" //备注
        };
        flag: true;
        (this.shipCompanyList = []),
          (this.typeCodeList = []),
          (this.sizeCodeList = []),
          (this.shipperCode = []),
          (this.packStanderCodeList = []);
        this.$emit("on-show-change", newValue);
      }
    }
  },
  data() {
    return {
      windowShow: this.pshow,
      btnLoading: false,
      formLoading: false,
      form: {
        id: "",
        shipperId: "", //船公司
        typeCode: "", //标准箱型
        sizeCode: "", //标准尺寸
        shipperCode: "", //船公司代码
        remarks: "" //备注
      },
      flag: true,
      shipCompanyList: [],
      typeCodeList: [],
      sizeCodeList: [],
      shipperCode: [],
      //定义字段校验规则
      rules: {
        shipperId: [{ required: true, message: "请选择船公司" }],
        typeCode: [{ required: true, message: "请选择标准尺寸" }],
        sizeCode: [{ required: true, message: "请选择标准尺寸" }],
        shipperCode: [
          { required: true, message: "请输入船公司箱型代码", trigger: "blur" },
          { pattern: englishOrNumber, message: "只允许输入英文和数字" }
        ]
      }
    };
  },
  methods: {
    //根据Id获取包装类型对照表
    getCtnTypeContrastSingle(id) {
      this.formLoading = true;
      getCtnTypeContrastSingle({ id: id })
        .then(res => {
          this.form = res.result;
          this.formLoading = false;
        })
        .catch(e => {
          this.formLoading = false;
        });
    },
    //获取箱型尺寸字典
    getDicListByDitType() {
      getDicListByDitType({ typeCode: "XX" }).then(res => {
        if (res.success) {
          this.typeCodeList = res.result;
        }
      });
      getDicListByDitType({ typeCode: "XCC" }).then(res => {
        if (res.success) {
          this.sizeCodeList = res.result;
        }
      });
    },
    //获取船公司下拉
    getshipCompany() {
      getShipCompanyForCarrier().then(res => {
        this.shipCompanyList = res.result.customName;
      });
    },
    //提交包装类型对照表
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let msg = this.form.id
            ? "编辑船公司箱型对照表"
            : "新增船公司箱型对照表";
          this.btnLoading = true;
          ctnTypeContrastAddEdit(
            {
              CtnTypeContrastDetailsDto: this.form
            },
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