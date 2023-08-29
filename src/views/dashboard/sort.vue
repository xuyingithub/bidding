<!--
* @Description: 中标数排行
* @Date: 2021-08-18 
* @Author: xuyin
* @LastEditTime: 2021-08-18 
-->
<template>
  <section class="sort">
    <h3>中标数排行榜</h3>
    <el-row :gutter="40" type="flex" justify="space-around">
      <el-col>
        <h4>TOP10</h4>
        <div class="top">
          <div v-for="(item, index) in topData" :key="item.id + index">
            <h5>{{ item.name }}:</h5>
            <div class="progressBox">
              <div class="progress">
                <el-progress
                  :percentage="item.top"
                  :stroke-width="8"
                  zhbnumb
                  :show-text="false"
                ></el-progress>
              </div>
              <span>{{ item.zhbnumb }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col>
        <h4>BACK10</h4>
        <div class="back">
          <div v-for="(item, index) in backData" :key="item.id + index">
            <h5>{{ item.name }}:</h5>
            <div class="progressBox">
              <div class="progress">
                <el-progress
                  :percentage="item.back"
                  :stroke-width="8"
                  zhbnumb
                  :show-text="false"
                  status="exception"
                ></el-progress>
              </div>
              <span>{{ item.zhbnumb }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: "sort",
  props: {
    seriesData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    topData() {
      const _seriesData = this.seriesData.slice(0, 10);
      _seriesData.forEach((element) => {
        element.top =
          _seriesData[0].zhbnumb == 0
            ? 0
            : ((element.zhbnumb / _seriesData[0].zhbnumb) * 100).toFixed(0) * 1;
      });
      return _seriesData;
    },
    backData() {
      const _seriesData = this.seriesData.slice().reverse().slice(0, 10);
      _seriesData.forEach((element) => {
        element.back =
          _seriesData[0].zhbnumb == 0
            ? 0
            : ((1 / (element.zhbnumb / _seriesData[0].zhbnumb)) * 100).toFixed(
                0
              ) * 1;
      });
      return _seriesData;
    },
  },
};
</script>
<style lang="scss" scoped>
.sort {
  height: 260px;
  .top,
  .back {
    height: 186px;
    overflow: auto;
  }
  h3 {
    text-align: left;
    color: #262d61;
    font-size: 16px;
    font-weight: bold;
    line-height: 29px;
  }
  h4 {
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    color: #181819;
    line-height: 25px;
  }
  h5 {
    opacity: 0.8;
    font-size: 12px;
    text-align: left;
    color: #455070;
    line-height: 14px;
    margin: 4px 0 5px;
  }
  .progressBox {
    display: flex;
    justify-content: space-between;
    height: 14px;
    .progress {
      width: 80%;
      display: inline-block;
    }
    span {
      line-height: 10px;
      margin-right: 4px;
    }
  }
}
</style>
