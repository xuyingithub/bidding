<!--
* @Description: 商机转化情况
* @Date: 2021-08-23 
* @Author: xuyin
* @LastEditTime: 2021-08-30 
-->
<template>
  <section class="business" v-loading="businessLoading">
    <div id="chartBusiness"></div>
  </section>
</template>

<script>
import { chartBusiness_config as option } from "@/config/chartConfig";
import { getBusiness } from "@/api";
export default {
  name: "chartBusiness",
  props: {
    selectTime: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      option,
      businessLoading: false,
      myChart: "",
    };
  },
  watch: {
    selectTime: {
      deep: true,
      handler(nVal) {
        nVal && this.getBusiness();
      },
    },
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(
        document.getElementById("chartBusiness")
      );
      // 绘制图表
      this.myChart.setOption(this.option);
    },
    async getBusiness() {
      this.businessLoading = true;
      const res = await getBusiness({
        star_time: this.selectTime[0],
        end_time: this.selectTime[1],
      });
      this.businessLoading = false;
      if (res && res.status == "1") {
        const dataBusiness = res.list;
        this.option.xAxis[0].data = dataBusiness.map((data) =>
          data.name.replace("分公司", "").replace("总公司", "")
        );
        this.option.series[0].data = dataBusiness.map((data) => data.sjs);
        this.option.series[1].data = dataBusiness.map((data) => data.lxs);
        this.option.series[2].data = dataBusiness.map((data) =>
          data.sjs == 0 ? 0 : ((data.lxs / data.sjs) * 100).toFixed(0) * 1
        );
        this.initChart();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.business {
  padding-top: 12px;
}
#chartBusiness {
  width: 100%;
  height: 300px;
}
</style>
