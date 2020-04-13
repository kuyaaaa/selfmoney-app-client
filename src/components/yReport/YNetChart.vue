<template>
  <div id="YNetChart"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    monthNetSum: Array,
    monthCostSum: Array
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      let YNetChart = this.$echarts.init(document.getElementById("YNetChart"));
      // 绘制图表
      YNetChart.setOption({
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
            return value.min - 1000;
          },
          max: function(value) {
            return value.max + 1000;
          }
        },
        series: [
          {
            data: this.monthNetSum,
            type: "line",
            symbolSize: 8,
            lineStyle: {
              width: 4
            },
            label: {
              show: true,
              color: "#eb8146",
              fontWeight: "bolder",
              fontSize: 18
            }
          },
          {
            data: this.monthCostSum,
            type: "bar",
            barWidth: "40%",
            itemStyle: {
              color: "#8BE09C"
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
#YNetChart {
  width: 100%;
  height: 400px;
}
</style>