<template>
  <div class="costmax-container">
    <div class="costmax-text-container">
      <ul>
        <li>
          本月最高收入账单：
          <span class="text-green">{{this.maxInProfile.describe}}</span>
        </li>
        <li>
          来源
          <span class="text-yellow">{{this.maxInProfile.costType}}</span>，收入金额：
          <span class="text-green">{{this.maxInProfile.cost}}</span>
        </li>
        <li class="text-right">
          本月最高支出账单：
          <span class="text-red">{{this.maxOutProfile.describe}}</span>
        </li>
        <li class="text-right">
          用于
          <span class="text-yellow">{{this.maxOutProfile.costType}}</span>，消费金额：
          <span class="text-red">{{Math.abs(this.maxOutProfile.cost)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxInProfile: {},
      maxOutProfile: {}
    };
  },
  computed: {
    mProfiles() {
      return this.$store.state.mProfiles;
    }
  },
  methods: {
    compare(property) {
      return (a, b) => {
        const value1 = a[property];
        const value2 = b[property];
        return value2 - value1;
      };
    },
    maxCostFn() {
      let sortArr = this.mProfiles;
      sortArr = this.mProfiles.sort(this.compare("cost"));
      // console.log(sortArr);
      this.maxInProfile = sortArr[0];
      this.maxOutProfile = sortArr[sortArr.length - 1];
    }
  },
  created() {
    this.maxCostFn();
  }
};
</script>

<style scoped>
.costmax-container {
  margin: 35px 10px;
  overflow: hidden;
}
.costmax-text-container {
  position: relative;
  padding: 0 90px 0 90px;
  margin-top: 20px;
}
.costmax-text-container ::before,
.costmax-text-container ::after {
  font-family: "黑体";
  font-size: 120px;
  font-weight: bolder;
  position: absolute;
  color: #909399;
}
.costmax-text-container ::before {
  content: "“";
  top: 0;
  left: -40px;
}
.costmax-text-container ::after {
  content: "”";
  bottom: -20px;
  right: -40px;
}
.text-right {
  text-align: right;
}
.costmax-text-container ul li {
  font-size: 22px;
  margin: 20px 5px;
  font-weight: bolder;
  color: #303133;
}
.costmax-text-container ul li span {
  font-size: 40px;
}
.text-red {
  color: #f56c6c;
}
.text-green {
  color: #67c23a;
}
.text-yellow {
  color: #e6a23c;
}
</style>