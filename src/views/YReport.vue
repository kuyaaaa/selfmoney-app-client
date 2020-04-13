<template>
  <div class="container">
    <h1 class="title">
      <i class="el-icon-data-line"></i> 年度数据
    </h1>
    <div class="return-btn" v-if="!yrForm.showForm">
      <el-button @click="yrForm.showForm = true" size="medium">
        <i class="el-icon-back"></i>
        返回年份选择
      </el-button>
    </div>
    <el-divider></el-divider>
    <!-- 年份选择表单 -->
    <div class="form-container" v-if="yrForm.showForm">
      <el-form :inline="true" :model="yrForm" ref="yrForm">
        <el-form-item label="时间：" prop="date">
          <el-date-picker v-model="yrForm.date" type="year" placeholder="选择年份"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="medium" @click="handleSubmit">
            <i class="el-icon-thumb" style="margin-right: 5px"></i>
            查看
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 图表数据 -->
    <div v-else>
      <!-- 找不到数据 -->
      <div class="notfound-container" v-if="yrForm.showNotfound">
        <el-image :src="imgSrc"></el-image>
      </div>
      <!-- 找得到数据显示图表等信息 -->
      <div class="data-container" v-else>
        <!-- 收入or支出单选框 -->
        <div class="radio-container">
          <el-radio-group v-model="radioValue" size="medium" @change="radioChange">
            <el-radio-button label="收入"></el-radio-button>
            <el-radio-button label="支出"></el-radio-button>
          </el-radio-group>
        </div>
        <!-- 总收支统计 -->
        <YDataSum :yProfiles="yProfiles"></YDataSum>
        <el-divider></el-divider>
        <!-- 统计数据 -->
        <h2>年度用途类型总额度统计</h2>
        <YTypeDataSum :ctProfiles="ctProfiles"></YTypeDataSum>
        <!-- 月份折线表 -->
        <h2>每月总金额情况</h2>
        <YMChart :monthCostSum="monthCostSum"></YMChart>
        <!-- 每月净收入表 -->
        <h2>每月净收入对比情况</h2>
        <YNetChart :monthNetSum="monthNetSum" :monthCostSum="monthCostSum"></YNetChart>
        <!-- 季度数据表 -->
        <h2>各季度账单情况</h2>
        <YSBarChart :monthCostSum="monthCostSum"></YSBarChart>
      </div>
    </div>
  </div>
</template>

<script>
import YTypeDataSum from "../components/yReport/YTypeDataSum";
import YDataSum from "../components/yReport/YDataSum";
import YMChart from "../components/yReport/YMChart";
import YSBarChart from "../components/yReport/YSBarChart";
import YNetChart from "../components/yReport/YNetChart";

export default {
  data() {
    return {
      yrForm: {
        showForm: true,
        showNotfound: false,
        date: ""
      },
      yProfiles: [],
      typeProfiles: [],
      ctProfiles: [],
      monthCostSum: [],
      monthNetSum: [],
      imgSrc: require("../assets/notFoundData.png"),
      radioValue: "收入"
    };
  },
  computed: {
    profiles() {
      return this.$store.state.profiles;
    },
    user() {
      return this.$store.state.user;
    },
    type_cost_list() {
      return this.$store.state.type_cost_list;
    }
  },
  components: {
    YDataSum,
    YTypeDataSum,
    YMChart,
    YNetChart,
    YSBarChart
  },
  methods: {
    async handleSubmit() {
      this.yrForm.showNotfound = false;
      this.radioValue = "收入";
      if (this.yrForm.date) {
        // console.log(this.yrForm.date);
        await this.getProfile();
        this.chooseyProfiles(this.yrForm.date);
        // console.log(this.yProfiles);
      } else {
        this.$message({
          message: "请选择具体年份！",
          type: "error"
        });
      }
    },
    async getProfile() {
      // 获取表格数据
      this.yProfiles = [];
      let res = await this.$http
        .get(`/api/profiles/${this.user.id}`)
        .catch(err => console.log(err));
      // console.log(res);
      this.$store.dispatch("setProfiles", res.data);
    },
    chooseyProfiles(date) {
      // 提取某年数据
      const year = date.getYear();
      // console.log(month);
      this.yProfiles = this.profiles.filter(item => {
        let iyear = new Date(item.date).getYear();
        if (iyear === year) {
          return item;
        }
      });
      // vuex更新
      this.$store.dispatch("setYProfiles", this.yProfiles);
      // console.log(this.yProfiles);

      // 数据加工
      this.dataProcessInit();

      // 显示隐藏相关操作
      this.showFormFn();
    },
    dataProcessInit() {
      // typeProfiles操作
      this.typeProfiles = this.typeDataProcess(this.yProfiles, this.radioValue);
      // ctProfiles操作
      this.ctProfiles = this.costTypeDataProcess(this.typeProfiles);
      // monthCostSum操作
      this.monthCostSum = this.sliceMonthData(this.typeProfiles, true);
      // monthNetSum操作
      this.monthNetSum = this.sliceMonthData(this.yProfiles, false);
    },
    sliceMonthData(data, isABS) {
      // 提取每月金额总额
      let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (const item of data) {
        const m = new Date(item.date).getMonth();
        isABS ? (arr[m] += Math.abs(item.cost)) : (arr[m] += item.cost);
      }
      return arr;
    },
    showFormFn() {
      // 显示隐藏相关操作
      this.yrForm.showForm = false;
      if (!this.yrForm.showForm && this.yProfiles.length === 0) {
        this.yrForm.showNotfound = true;
      }
    },
    compare(property) {
      return (a, b) => {
        const value1 = a[property];
        const value2 = b[property];
        return value2 - value1;
      };
    },
    typeDataProcess(dataArr, type) {
      // 收入or支出筛选方法
      let arr = [];
      arr = dataArr.filter(item => {
        if (item.type === type) {
          return item;
        }
      });
      return arr;
    },
    costTypeDataProcess(dataArr) {
      // 用途类型筛选方法
      let arr = [];
      // 创建同类型名长度的数组，便于金额对应
      for (let i = 0; i < this.type_cost_list.length; i++) {
        arr.push({
          name: this.type_cost_list[i],
          value: 0
        });
      }
      // 遍历数据，将金额对号入座
      let ctype = "";
      let tindex = 0;
      dataArr.forEach(item => {
        ctype = item.costType;
        tindex = this.type_cost_list.findIndex(item => item === ctype);
        arr[tindex].value += Math.abs(item.cost);
      });
      arr.sort(this.compare("value"));

      // 删除金额为0的部分
      let emptyIndex = 0;
      emptyIndex = arr.findIndex(item => item.value === 0);
      arr = arr.slice(0, emptyIndex);

      return arr;
    },
    radioChange() {
      // 单选框变化事件
      this.dataProcessInit();
    }
  }
};
</script>

<style scoped>
.container {
  margin: 10px 20px;
  padding: 20px 30px;
  background-color: #fff;
  border: #000 5px double;
  position: relative;
}
.title {
  color: #000;
  font-family: "微软雅黑";
  font-size: 38px;
  text-align: center;
  font-weight: bolder;
}
.form-container {
  text-align: center;
}
.return-btn {
  position: absolute;
  top: 25px;
  left: 30px;
}
.notfound-container {
  text-align: center;
}
.radio-container {
  position: fixed;
  z-index: 9999;
  top: 100px;
  right: 70px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
h2 {
  font-weight: bolder;
  font-size: 16px;
  color: #212121;
  margin: 10px 0;
}
</style>