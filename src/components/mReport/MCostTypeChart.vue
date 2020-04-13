<template>
  <div class="chart-container">
    <el-row>
      <!-- 图表 -->
      <el-col :span="14">
        <div id="typeChart"></div>
      </el-col>
      <el-col :span="10">
        <div class="tc-rank-container">
          <template v-for="(item,index) in tcRankData">
            <div :class="'tc-rank-container-' + (index + 1)" :key="index" v-if="item">
              <p :class="'tc-rank-' + (index + 1)">{{index + 1}}</p>
              <p :class="'tc-rank-info-' + (index + 1)">{{item.name}}：{{item.value}}</p>
            </div>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartType: "收入",
      tcRankData: []
    };
  },
  props: {
    ctProfiles: Array
  },
  computed: {
    mProfiles() {
      return this.$store.state.mProfiles;
    },
    type_cost_list() {
      return this.$store.state.type_cost_list;
    }
  },
  methods: {
    drawLine() {
      // 初始化echarts实例
      let typeChart = this.$echarts.init(document.getElementById("typeChart"));
      // 绘制图表
      typeChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 10,
          top: 10,
          data: this.type_cost_list
        },
        series: [
          {
            name: "用途类型",
            type: "pie",
            radius: ["40%", "80%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "22",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.ctProfiles
          }
        ]
      });
    },
    tcRankSortFn(data) {
      // 获取类型前三数据
      let newArr = [];
      if (data.length >= 3) {
        newArr = data;
        newArr = newArr.slice(0, 3);
      }
      return newArr;
    }
  },
  created() {
    this.tcRankData = this.tcRankSortFn(this.ctProfiles);
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    ctProfiles(newVal) {
      this.drawLine();
      this.tcRankData = [];
      this.tcRankData = this.tcRankSortFn(newVal);
    }
  }
};
</script>

<style scoped>
.chart-container {
  margin: 35px 10px;
}
.type-radio {
  margin: 10px 0;
}
#typeChart {
  width: 100%;
  height: 250px;
  min-width: 360px;
}
.tc-rank-container {
  margin: 25px 0;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 50px;
}
.tc-rank-container-1,
.tc-rank-container-2,
.tc-rank-container-3 {
  border: solid 3px;
  margin: 0 50px;
  border-radius: 5px;
  display: flex;
}
.tc-rank-container-1 {
  border-color: gold;
}
.tc-rank-container-2 {
  border-color: silver;
}
.tc-rank-container-3 {
  border-color: #b87333;
}
.tc-rank-1,
.tc-rank-2,
.tc-rank-3 {
  color: #fff;
  font-size: 38px;
  width: 70px;
  text-align: center;
}
.tc-rank-1 {
  background-color: gold;
}
.tc-rank-2 {
  background-color: silver;
}
.tc-rank-3 {
  background-color: #b87333;
}
.tc-rank-info-1,
.tc-rank-info-2,
.tc-rank-info-3 {
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}
</style>