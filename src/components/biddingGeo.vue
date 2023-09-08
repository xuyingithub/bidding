<!--
* @Description: 材料申请处理时效
* @Date: 2023-08-23 
* @Author: xuyin
* @LastEditTime: 2023-09-08
-->
<template>
  <section>
    <div id="chartGeo"></div>
  </section>
</template>

<script>
import china from "@/assets/china.json";
import { geoColor, getGeoConfig } from "@/config/chartConfig";
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
      return ((this.zbnumb / this.zhbnumb) * 100).toFixed(1) * 1;
    },
    option() {
      return new getGeoConfig(this.zbl).getConfig();
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
          areaColor = geoColor.color_high;
        } else if (value.some((item) => item < target)) {
          areaColor = geoColor.color_middle;
        } else if (value.some((item) => item == 0)) {
          areaColor = geoColor.color_low;
        }
      } else {
        areaColor =
          value == 0
            ? geoColor.color_low
            : value < target
            ? geoColor.color_middle
            : geoColor.color_high;
      }
      return {
        itemStyle: {
          areaColor,
        },
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
