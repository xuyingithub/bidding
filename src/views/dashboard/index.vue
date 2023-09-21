<!--
* @Description: dashboard
* @Date: 2023-08-23 
* @Author: xuyin
* @LastEditTime: 2023-09-21
-->
<template>
  <section class="dashboard">
    <el-container>
      <el-header>
        <el-button
          class="goTo"
          type="primary"
          plain
          size="medium"
          round
          @click="goTo"
          >进入首页</el-button
        >
        <div class="title">
          <div
            class="animate__animated animate__flipInX animate__delay-3s animate__slower"
          >
            全国投标情况一览图
          </div>
        </div>
        <div class="date">
          <span>投标日/落单日期:</span>
          <el-date-picker
            style="width: 220px"
            v-model="selectTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
            :clearable="false"
            :unlink-panels="true"
            @change="change"
          ></el-date-picker>
        </div>
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
              <total ref="total" :seriesData="dataGeo" />
            </el-row>
            <el-row v-loading="dataGeoLoading">
              <biddingGeo
                :seriesData="dataGeo"
                ref="biddingGeo"
                :class="
                  dataGeo.length > 0
                    ? 'animate__animated animate__zoomIn animate__delay-3s animate__slower'
                    : ''
                "
              />
            </el-row>
            <el-row v-loading="dataGeoLoading">
              <biddingCompany
                ref="biddingCompany"
                :seriesData="dataLocaleCompare(dataGeo)"
              />
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
          data.name = data.name.replace("分公司", "").replace("总公司", "");
          if (data.zhbnumb == 0) {
            data.zbl_f = "0.0";
          } else {
            data.zbl_f = ((data.zbnumb / data.zhbnumb) * 100).toFixed(1);
          }
        });
      }
    },
    dataSort(data) {
      const _data = JSON.parse(JSON.stringify(data));
      return _data.sort((a, b) => {
        return b.zbnumb - a.zbnumb;
      });
    },
    dataLocaleCompare(data) {
      const _data = JSON.parse(JSON.stringify(data));
      return _data.sort((a, b) => {
        return a.name.localeCompare(b.name, "zh-Hans-CN-u-co-pinyin", {
          sensitivity: "accent",
        });
      });
    },
    change(time) {
      this.selectTime = time
        ? time
        : [
            this.dateObj.startOf("year").format("YYYY-MM-DD"),
            this.dateObj.format("YYYY-MM-DD"),
          ];
      this.dataGeo = [];
      this.$refs.total.reset();
    },
    handleResize() {
      this.$refs.biddingCustomer && this.$refs.biddingCustomer.myChart.resize();
      this.$refs.biddingKind && this.$refs.biddingKind.myChart.resize();
      this.$refs.biddingGeo && this.$refs.biddingGeo.myChart.resize();
      this.$refs.biddingCompany && this.$refs.biddingCompany.myChart.resize();
      this.$refs.biddingBusiness && this.$refs.biddingBusiness.myChart.resize();
    },
    goTo() {
      window.location.href = "/emp/work/wui/index.html";
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
  align-items: center;
  position: relative;
}
.title {
  width: 1326px;
  font-size: 30px;
  font-weight: bold;
  color: #0f4c9a;
  line-height: 60px;
  background: url("../../assets/index/title.png") no-repeat 0 0;
  background-size: 100% 100%;
  text-align: center;
}
.goTo {
  position: absolute;
  left: 14px;
  top: 8px;
  z-index: 100;
}
.date {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #262d61;
  span {
    font-size: 14px;
    width: 120px;
  }
  position: absolute;
  left: 50%;
  margin-left: 274px;
  top: 12px;
  ::v-deep .el-date-editor {
    .el-range__close-icon {
      width: 10px;
    }
    .el-range-input {
      font-weight: bold;
    }
  }
}
.el-main {
  padding: 10px 10px 0;
}
</style>
