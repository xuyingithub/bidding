<!--
* @Description: 分公司投标情况
* @Date: 2021-08-23 
* @Author: xuyin
* @LastEditTime: 2021-08-23 
-->
<template>
  <section>
    <div id="chartCompany"></div>
  </section>
</template>

<script>
import { chartCompany_config as option } from "@/config/chartConfig";
export default {
  name: "chartCompany",
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
        nVal && this.getCompany();
      },
    },
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(
        document.getElementById("chartCompany")
      );
      this.myChart.setOption(this.option);
    },
    getCompany() {
      this.option.xAxis[0].data = this.seriesData.map((data) => data.name);
      this.option.series[0].data = this.seriesData.map((data) => data.zbnumb);
      this.option.series[1].data = this.seriesData.map((data) => data.zhbnumb);
      this.option.series[2].data = this.seriesData.map((data) => data.zbl_f);
      this.initChart();
    },
  },
};
</script>
<style lang="scss" scoped>
#chartCompany {
  width: 100%;
  height: 300px;
}
</style>
