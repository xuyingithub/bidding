<!--
* @Description: 材料申请处理时效
* @Date: 2021-08-23 
* @Author: xuyin
* @LastEditTime: 2021-08-31
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
  computed: {
    zbnumb() {
      return this.seriesData.reduce((total, cur) => total + cur.zbnumb, 0);
    },
    zhbnumb() {
      return this.seriesData.reduce((total, cur) => total + cur.zhbnumb, 0);
    },
    zbl() {
      return ((this.zbnumb / this.zhbnumb) * 100).toFixed(0) * 1;
    },
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
      const _seriesData = JSON.parse(JSON.stringify(seriesData)).reduce(
        (total, cur) => {
          const idList = total.map((item) => item.id);
          if (idList.includes(cur.id)) {
            const index = idList.findIndex((id) => id === cur.id);
            if (Array.isArray(total[index].name)) {
              total[index].name = [...total[index].name, cur.name];
              total[index].zbnumb = [...total[index].zbnumb, cur.zbnumb];
              total[index].zhbnumb = [...total[index].zhbnumb, cur.zhbnumb];
              total[index].zbl = [...total[index].zbl, cur.zbl];
              total[index].zbl_f = [...total[index].zbl_f, cur.zbl_f];
            } else {
              total[index].name = [total[index].name, cur.name];
              total[index].zbnumb = [total[index].zbnumb, cur.zbnumb];
              total[index].zhbnumb = [total[index].zhbnumb, cur.zhbnumb];
              total[index].zbl = [total[index].zbl, cur.zbl];
              total[index].zbl_f = [total[index].zbl_f, cur.zbl_f];
            }
          } else {
            total = [...total, cur];
          }
          return total;
        },
        []
      );
      console.log("this.zbl", this.zbl);
      return _seriesData.map((data) => {
        [data.subname, data.name] = [data.name, data.subname];
        return {
          ...data,
          ...this.formatterColor(data.zbl_f, this.zbl),
        };
      });
    },
    formatterColor(value, target) {
      let areaColor = "";
      if (Array.isArray(value)) {
        if (value.some((item) => item >= target)) {
          areaColor = "#79bdfe";
        } else if (value.some((item) => item < target)) {
          areaColor = "#449FFF";
        } else if (value.some((item) => item == 0)) {
          areaColor = "#437EBD";
        }
      } else {
        areaColor =
          value == 0 ? "#437EBD" : value < target ? "#449FFF" : "#79bdfe";
      }
      return {
        itemStyle: { areaColor },
      };
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
