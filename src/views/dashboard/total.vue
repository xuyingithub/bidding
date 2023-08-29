<!--
* @Description: 看板总数统计
* @Date: 2023-08-18
* @Author: xuyin
* @LastEditTime: 2023-08-28
-->
<template>
  <section class="total" v-if="seriesData.length > 0">
    <el-row>
      <el-col :span="5">
        <div class="toubiao">
          <img
            class="animate__animated animate__fadeInDown animate__delay-3s"
            src="@/assets/total/data.png"
            alt
          />
          <span class="label">投标数</span>
          <count-to
            ref="zbnumb"
            :start-val="0"
            :end-val="zbnumb"
            :duration="duration"
            class="value"
          />
        </div>
      </el-col>
      <el-col :span="5">
        <div class="toubiao">
          <img
            class="animate__animated animate__fadeInDown animate__delay-3s"
            src="@/assets/total/data1.png"
            alt
          />
          <span class="label">中标数</span>
          <count-to
            ref="zhbnumb"
            :start-val="0"
            :end-val="zhbnumb"
            :duration="duration"
            class="value"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="toubiao">
          <el-progress
            class="animate__animated animate__fadeInDown animate__delay-3s"
            type="circle"
            :percentage="zbl"
            :width="48"
            :show-text="false"
            define-back-color="rgba(47,86,127,0.23)"
          ></el-progress>
          <span class="label">中标率</span>
          <span class="zbl">
            <count-to
              ref="zbl"
              :start-val="0"
              :end-val="zbl"
              :duration="duration"
              class="value"
            />
            <span class="percent">%</span>
          </span>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="toubiao">
          <el-date-picker
            v-model="selectTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
            @change="change"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  name: "total",
  props: {
    seriesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    CountTo,
  },
  data() {
    return {
      selectTime: [],
      duration: 4000,
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
      const _zbl =
        this.seriesData.reduce((total, cur) => total + cur.zbl_f, 0) /
        this.seriesData.length;
      return _zbl.toFixed(0) * 1;
    },
  },
  methods: {
    change(time) {
      this.$emit("getTime", time);
    },
    reset() {
      this.$refs.zbnumb.start();
      this.$refs.zhbnumb.start();
      this.$refs.zbl.start();
    },
  },
};
</script>
<style lang="scss" scoped>
.total {
  height: 60px;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
    }
  }
  .toubiao {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #455070;
    font-weight: 500;
    .label {
      opacity: 0.8;
      font-size: 14px;
    }
    .zbl {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .value {
      font-size: 26px;
    }
    .percent {
      font-size: 22px;
    }
  }
}
</style>
