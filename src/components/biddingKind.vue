<!--
* @Description: 投标情况按险种
* @Date: 2023-08-23 
* @Author: xuyin
* @LastEditTime: 2023-08-23 
-->
<template>
  <section v-loading="kindLoading">
    <div id="chartKind"></div>
  </section>
</template>

<script>
import { getKind } from "@/api";
import { chartKind_config as option } from "@/config/chartConfig";
export default {
  name: "chartKind",
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
      kindLoading: false,
      myChart: "",
    };
  },
  watch: {
    selectTime: {
      deep: true,
      handler(nVal) {
        nVal && this.getKind();
      },
    },
  },
  methods: {
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("chartKind"));
      // 绘制图表
      this.myChart.setOption(this.option);
    },
    async getKind() {
      this.kindLoading = true;
      const res = await getKind({
        star_time: this.selectTime[0],
        end_time: this.selectTime[1],
      });
      this.kindLoading = false;
      if (res && res.status == "1") {
        const dataKind = res.list.map((res) => ({
          name: res.name,
          value: res.zbnumb,
          zhbnumb: res.zhbnumb,
          zbl: res.zbl,
        }));
        this.option.series[0].data = dataKind;
        this.initChart();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#chartKind {
  width: 100%;
  height: 300px;
}
</style>
