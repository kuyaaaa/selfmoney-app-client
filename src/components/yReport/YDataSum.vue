<template>
  <div class="sum-container">
    <el-row>
      <el-col :span="8">
        <p>
          收入：
          <countTo :startVal="startVal" :endVal="this.inMoney" :duration="500" class="in-font"></countTo>
        </p>
      </el-col>
      <el-col :span="8">
        <p>
          支出：
          <countTo :startVal="startVal" :endVal="this.outMoney" :duration="1000" class="out-font"></countTo>
        </p>
      </el-col>
      <el-col :span="8">
        <p>
          净收入：
          <countTo :startVal="startVal" :endVal="this.netMoney" :duration="1500" class="net-font"></countTo>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
  data() {
    return {
      startVal: 0,
      inMoney: 0,
      outMoney: 0,
      netMoney: 0
    };
  },
  components: { countTo },
  props: {
    yProfiles: Array
  },
  methods: {
    sumFn() {
      this.inMoney = 0;
      this.outMoney = 0;
      this.yProfiles.map(item => {
        if (item.cost > 0) {
          this.inMoney += item.cost;
        } else {
          this.outMoney += item.cost;
        }
      });
      this.netMoney = this.inMoney + this.outMoney;
    }
  },
  created() {
    this.sumFn();
  }
};
</script>

<style scoped>
.sum-container {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #606266;
  margin: 15px 0;
}
.in-font,
.out-font,
.net-font {
  font-size: 32px;
  font-weight: bolder;
}
.in-font {
  color: #67c23a;
}
.out-font {
  color: #f56c6c;
}
.net-font {
  color: #409eff;
}
</style>