<template>
  <div class="container">
    <h1 class="title">
      <i class="el-icon-s-order"></i> 数据月报
    </h1>
    <div class="return-btn" v-if="!mrForm.showForm">
      <el-button @click="mrForm.showForm = true" size="medium">
        <i class="el-icon-back"></i>
        返回月份选择
      </el-button>
    </div>
    <el-divider></el-divider>
    <!-- 月份选择表单 -->
    <div class="form-container" v-if="mrForm.showForm">
      <el-form :inline="true" :model="mrForm" ref="mrForm">
        <el-form-item label="时间：" prop="date">
          <el-date-picker v-model="mrForm.date" type="month" placeholder="选择月份"></el-date-picker>
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
      <div class="notfound-container" v-if="mrForm.showNotfound">
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
        <!-- 收支统计 -->
        <MDataSum></MDataSum>
        <el-divider></el-divider>
        <!-- 收支最高单项 -->
        <MCostMax></MCostMax>
        <!-- 分类图表 -->
        <h2>用途类型收支总览</h2>
        <MCostTypeChart :ctProfiles="ctProfiles"></MCostTypeChart>
        <!-- 收支趋势图表 -->
        <h2>收支金额每日趋势</h2>
        <DayCostChart :dayData="dayData" :dayTypeData="dayTypeData"></DayCostChart>
      </div>
    </div>
  </div>
</template>

<script>
import MDataSum from "../components/mReport/MDataSum";
import MCostTypeChart from "../components/mReport/MCostTypeChart";
import MCostMax from "../components/mReport/MCostMax";
import DayCostChart from "../components/mReport/DayCostChart";

export default {
  data() {
    return {
      mrForm: {
        showForm: true,
        showNotfound: false,
        date: ""
      },
      mProfiles: [],
      typeProfiles: [],
      ctProfiles: [],
      dayData: [],
      dayTypeData: [],
      radioValue: "收入",
      imgSrc: require("../assets/notFoundData.png")
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
    MDataSum,
    MCostTypeChart,
    MCostMax,
    DayCostChart
  },
  methods: {
    async handleSubmit() {
      this.mrForm.showNotfound = false;
      this.radioValue = "收入";
      if (this.mrForm.date) {
        // console.log(this.mrForm.date);
        await this.getProfile();
        this.chooseMProfiles(this.mrForm.date);
        // console.log(this.mProfiles);
      } else {
        this.$message({
          message: "请选择具体月份！",
          type: "error"
        });
      }
    },
    async getProfile() {
      // 获取表格数据
      this.mProfiles = [];
      let res = await this.$http
        .get(`/api/profiles/${this.user.id}`)
        .catch(err => console.log(err));
      // console.log(res);
      this.$store.dispatch("setProfiles", res.data);
    },
    chooseMProfiles(date) {
      // 提取某月数据
      const year = date.getYear();
      const month = date.getMonth();
      // console.log(month);
      this.mProfiles = this.profiles.filter(item => {
        let iyear = new Date(item.date).getYear();
        let imonth = new Date(item.date).getMonth();
        if (iyear === year && imonth === month) {
          return item;
        }
      });
      this.$store.dispatch("setMProfiles", this.mProfiles);
      // console.log(this.mProfiles);

      // 数据加工
      this.dataProcessInit();

      // 显示隐藏相关操作
      this.showFormFn();
    },
    showFormFn() {
      // 显示隐藏相关操作
      this.mrForm.showForm = false;
      if (!this.mrForm.showForm && this.mProfiles.length === 0) {
        this.mrForm.showNotfound = true;
      }
    },
    compare(property) {
      return (a, b) => {
        const value1 = a[property];
        const value2 = b[property];
        return value2 - value1;
      };
    },
    dataProcessInit() {
      // typeProfiles操作
      this.typeProfiles = this.typeDataProcess(this.mProfiles, this.radioValue);
      // ctProfiles操作
      this.ctProfiles = this.costTypeDataProcess(this.typeProfiles);
      // dayCostData操作
      this.dayData = this.dayCostDataFn(this.mProfiles);
      this.dayTypeData = this.dayCostDataFn(this.typeProfiles);
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
    dayCostDataFn(data) {
      // 每日收支金额求和
      let arr = data;
      let newArr = [];
      arr.forEach(item => {
        let date = new Date(item.date);
        item.dayNum = date.getDate();
      });
      arr.sort(this.compare("dayNum"));
      arr.forEach(item => {
        if (newArr[item.dayNum]) {
          newArr[item.dayNum].value += item.cost;
        } else {
          newArr[item.dayNum] = {
            name: item.dayNum,
            value: item.cost
          };
        }
      });
      // 数组去空值
      newArr = newArr.filter(item => item);
      // 取绝对值
      newArr.forEach(item => {
        item.value = Math.abs(item.value);
      });
      return newArr;
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