<!--
* @Description: 投标情况按客户
* @Date: 2023-08-23 
* @Author: xuyin
* @LastEditTime: 2023-09-13 
-->
<template>
  <section v-loading="customerLoading">
    <div id="chartCustomer"></div>
  </section>
</template>

<script>
import { getCustomer } from "@/api";
import { chartCustomer_config as option } from "@/config/chartConfig";
export default {
  name: "chartCustomer",
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
      customerLoading: false,
      myChart: "",
    };
  },
  watch: {
    selectTime: {
      deep: true,
      handler(nVal) {
        nVal && this.getCustomer();
      },
    },
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(
        document.getElementById("chartCustomer")
      );
      // 绘制图表
      this.myChart.setOption(this.option);
    },
    async getCustomer() {
      this.customerLoading = true;
      const res = await getCustomer({
        star_time: this.selectTime[0],
        end_time: this.selectTime[1],
      });
      this.customerLoading = false;
      if (res && res.status == "1") {
        const dataCustomer = res.list;
        this.option.xAxis[0].data = dataCustomer.map((data) => data.name);
        this.option.series[0].data = dataCustomer.map((data) => data.zhbnumb);
        this.option.series[1].data = dataCustomer.map((data) => data.zbnumb);
        this.option.series[2].data = dataCustomer.map((data) =>
          data.zhbnumb == 0
            ? 0
            : ((data.zbnumb / data.zhbnumb) * 100).toFixed(1)
        );
        this.initChart();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#chartCustomer {
  width: 100%;
  height: 300px;
}
</style>
