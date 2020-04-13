<template>
  <div id="YMChart"></div>
</template>

<script>
export default {
  props: {
    dayData: Array,
    dayTypeData: Array
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      let YMChart = this.$echarts.init(document.getElementById("YMChart"));
      // 绘制图表
      YMChart.setOption({
        legend: {
          show: true,
          type: "plain",
          data: ["净收入", "每日收/支"],
        },
        xAxis: {
          type: "category",
          data: this.cutData(this.dayTypeData, "name")
        },
        yAxis: {
          type: "value",
          min: function(value) {
            if (value.min - 100 > 0) {
              return value.min - 100;
            } else {
              return 0;
            }
          },
          max: function(value) {
            return value.max + 100;
          }
        },
        series: [
          {
            name: "每日收/支",
            data: this.cutData(this.dayTypeData, "value"),
            type: "line",
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 4,
              color: "#E87C25"
            },
            label: {
              show: true,
              color: "#C1232B",
              fontWeight: "bolder",
              fontSize: 18
            }
          },
          {
            name: "净收入",
            data: this.cutData(this.dayData, "value"),
            type: "line",
            smooth: true,
            symbolSize: 0,
            lineStyle: {
              width: 2,
              color: "#27727B"
            }
          }
        ]
      });
    },
    cutData(arr, name) {
      // 原数据切割成图表数据
      let newArr = [];
      arr.forEach(item => {
        newArr.push(item[name]);
      });
      return newArr;
    }
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    dayTypeData() {
      this.drawLine();
    }
  }
};
</script>

<style scoped>
#YMChart {
  width: 100%;
  height: 300px;
}
</style>