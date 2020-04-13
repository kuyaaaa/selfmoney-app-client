<template>
  <div id="YSBarChart"></div>
</template>

<script>
export default {
  data() {
    return {
      seasonCostSum: []
    };
  },
  props: {
    monthCostSum: Array
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      let YSBarChart = this.$echarts.init(
        document.getElementById("YSBarChart")
      );
      // 绘制图表
      YSBarChart.setOption({
        xAxis: {
          type: "category",
          data: ["第一季度", "第二季度", "第三季度", "第四季度"]
        },
        yAxis: {
          type: "value",
          min: function(value) {
            if (value.min - 1000 > 0) {
              return value.min - 1000;
            } else {
              return 0;
            }
          },
          max: function(value) {
            return value.max + 1000;
          }
        },
        series: [
          {
            data: this.seasonCostSum,
            type: "bar",
            barWidth: "40%",
            label: {
              show: true,
              color: "#3B7D5E",
              fontWeight: "bolder",
              fontSize: 18,
              position: "top"
            }
          }
        ]
      });
    },
    seasonData(data) {
      let arr = [0, 0, 0, 0];
      arr[0] = data[0] + data[1] + data[2];
      arr[1] = data[3] + data[4] + data[5];
      arr[2] = data[6] + data[7] + data[8];
      arr[3] = data[9] + data[10] + data[11];
      return arr;
    }
  },
  created() {
    this.seasonCostSum = this.seasonData(this.monthCostSum);
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    monthCostSum() {
      this.seasonCostSum = this.seasonData(this.monthCostSum);
      this.drawLine();
    }
  }
};
</script>

<style scoped>
#YSBarChart {
  width: 100%;
  height: 400px;
}
</style>