<template>
  <div id="YMChart"></div>
</template>

<script>
export default {
  props: {
    monthCostSum: Array
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      let YMChart = this.$echarts.init(document.getElementById("YMChart"));
      // 绘制图表
      YMChart.setOption({
        xAxis: {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec"
          ]
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
            data: this.monthCostSum,
            type: "line",
            symbolSize: 8,
            lineStyle: {
              width: 4
            },
            label: {
              show: true,
              color: "#3B7D5E",
              fontWeight: "bolder",
              fontSize: 18
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    monthCostSum() {
      this.drawLine();
    }
  }
};
</script>

<style scoped>
#YMChart {
  width: 100%;
  height: 400px;
}
</style>