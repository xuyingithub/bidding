<!--
* @Description: dashboard
* @Date: 2021-08-23 
* @Author: xuyin
* @LastEditTime: 2021-08-28
-->
<template>
  <section class="dashboard">
    <el-container>
      <el-header>
        <div class="title">全国投标情况一览图</div>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="6">
            <el-row v-loading="dataGeoLoading">
              <sort :seriesData="dataSort(dataGeo)" />
            </el-row>
            <el-row>
              <biddingCustomer ref="biddingCustomer" :selectTime="selectTime" />
            </el-row>
            <el-row>
              <biddingKind ref="biddingKind" :selectTime="selectTime" />
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row v-loading="dataGeoLoading">
              <total ref="total" :seriesData="dataGeo" @getTime="getTime" />
            </el-row>
            <el-row v-loading="dataGeoLoading">
              <biddingGeo
                :seriesData="dataGeo"
                ref="biddingGeo"
                class="animate__animated animate__zoomIn animate__delay-4s animate__slower"
              />
            </el-row>
            <el-row v-loading="dataGeoLoading">
              <biddingCompany ref="biddingCompany" :seriesData="dataGeo" />
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <biddingBusiness ref="biddingBusiness" :selectTime="selectTime" />
            </el-row>
            <el-row>
              <material />
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </section>
</template>

<script>
import total from "@/views/dashboard/total";
import sort from "@/views/dashboard/sort";
import biddingCustomer from "@/components/biddingCustomer";
import biddingKind from "@/components/biddingKind";
import biddingCompany from "@/components/biddingCompany";
import biddingBusiness from "@/components/biddingBusiness";
import biddingGeo from "@/components/biddingGeo";
import material from "@/components/material.vue";
import { getGeo } from "@/api";
import dayjs from "dayjs";
export default {
  name: "dashboard",
  components: {
    total,
    sort,
    biddingCustomer,
    biddingKind,
    biddingCompany,
    biddingBusiness,
    biddingGeo,
    material,
  },
  data() {
    return {
      dataGeo: [],
      selectTime: [],
      dataGeoLoading: false,
      dateObj: "",
    };
  },
  mounted() {
    this.dateObj = dayjs();
    this.selectTime = [
      this.dateObj.startOf("year").format("YYYY-MM-DD"),
      this.dateObj.format("YYYY-MM-DD"),
    ];
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  watch: {
    selectTime: {
      deep: true,
      handler(nVal) {
        nVal && this.getGeo();
      },
    },
  },
  methods: {
    async getGeo() {
      this.dataGeoLoading = true;
      const res = await getGeo({
        star_time: this.selectTime[0],
        end_time: this.selectTime[1],
      });
      this.dataGeoLoading = false;
      if (res && res.status == "1") {
        this.dataGeo = res.list;
        this.dataGeo.forEach((data) => {
          data.name = data.name.replace("分公司", "");
          if (data.zbnumb == 0) {
            data.zbl_f = 0;
          } else {
            data.zbl_f = ((data.zhbnumb / data.zbnumb) * 100).toFixed(0);
          }
        });
      }
    },
    dataSort(data) {
      const _data = JSON.parse(JSON.stringify(data));
      return _data.sort((a, b) => {
        return b.zhbnumb - a.zhbnumb;
      });
    },
    getTime(time) {
      this.selectTime = time
        ? time
        : [
            this.dateObj.startOf("year").format("YYYY-MM-DD"),
            this.dateObj.format("YYYY-MM-DD"),
          ];
      this.$refs.total.reset();
    },
    handleResize() {
      this.$refs.biddingCustomer && this.$refs.biddingCustomer.myChart.resize();
      this.$refs.biddingKind && this.$refs.biddingKind.myChart.resize();
      this.$refs.biddingGeo && this.$refs.biddingGeo.myChart.resize();
      this.$refs.biddingCompany && this.$refs.biddingCompany.myChart.resize();
      this.$refs.biddingBusiness && this.$refs.biddingBusiness.myChart.resize();
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard {
  background: url("../../assets/index/background.png") no-repeat 0 0;
  background-size: 100% 100%;
}
.el-header {
  display: flex;
  justify-content: center;
}
.title {
  width: 100%;
  padding-top: 6px;
  font-size: 30px;
  font-weight: 500;
  color: #0f4c9a;
  line-height: 42px;
  background: url("../../assets/index/title.png") no-repeat 0 0;
  background-size: 100% 100%;
  text-align: center;
}
.el-main {
  padding-bottom: 0;
}
</style>
