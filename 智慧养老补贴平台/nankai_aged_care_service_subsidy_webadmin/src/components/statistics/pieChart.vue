<template>
  <div class="pie-chart">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="charts-items" ref="chartsPie1"></div>
      </el-col>
      <el-col :span="8">
        <div class="charts-items" ref="chartsPie2"></div>
      </el-col>
      <el-col :span="8">
        <div class="charts-items" ref="chartsPie3"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: {
    echartsData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.echartsFun(this.echartsData.echarts1.title, this.echartsData.echarts1.options, this.$refs.chartsPie1);
    this.echartsFun(this.echartsData.echarts2.title, this.echartsData.echarts2.options, this.$refs.chartsPie2);
    this.echartsFun(this.echartsData.echarts3.title, this.echartsData.echarts3.options, this.$refs.chartsPie3);
  },
  methods: {
    echartsFun(text, dataList, dom) {
      let myChart = echarts.init(dom);
      let option = {
        title: {
          text: text,
          top: "10",
          left: '10',
          textStyle: {
            color: '#555',
            fontSize: 16,
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        // },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['30%', '50%'],
            data: dataList,
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    color: "#555"
                  },
                }
              }
            },
          }
        ]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
.pie-chart {
  .charts-items {
    width: 100%;
    height: 300px;
    border-radius: 5px;
    box-shadow: $back-shadow;
  }
}
</style>
