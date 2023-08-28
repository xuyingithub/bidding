<!--
* @Description: 材料申请处理时效
* @Date: 2021-08-23 
* @Author: xuyin
* @LastEditTime: 2021-08-28
-->
<template>
  <section>
    <div id="chartGeo"></div>
  </section>
</template>

<script>
import china from "@/assets/china.json";
import { chartGeo_config as option } from "@/config/chartConfig";
export default {
  name: "biddingGeo",
  props: {
    seriesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      option,
      myChart: "",
    };
  },
  watch: {
    seriesData: {
      deep: true,
      handler(nVal) {
        nVal && this.getInitData();
      },
    },
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("chartGeo"));
      this.$echarts.registerMap("china", { geoJSON: china });
      // 绘制图表
      this.myChart.setOption(this.option);
    },
    getInitData() {
      this.option.series[0].data = this.formatterData(this.seriesData);
      this.initChart();
    },
    formatterData(seriesData) {
      const _seriesData = JSON.parse(JSON.stringify(seriesData));
      return _seriesData.map((data) => {
        return {
          ...data,
          itemStyle: { areaColor: data.zhbnumb < 5 ? "#437EBD" : "#79bdfe" },
        };
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#chartGeo {
  width: 100%;
  height: 500px;
}
</style>
