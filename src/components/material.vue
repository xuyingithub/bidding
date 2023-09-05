<!--
* @Description: 材料申请处理时效
* @Date: 2023-08-23 
* @Author: xuyin
* @LastEditTime: 2023-09-05
-->
<template>
  <section class="material" v-loading="materialLoading">
    <h3>材料申请处理情况</h3>
    <el-table class="header" style="width: 100%; background: transparent">
      <el-table-column label="分公司" min-width="62"></el-table-column>
      <el-table-column label="管理员" min-width="180"></el-table-column>
      <el-table-column label="代办事项" min-width="76"></el-table-column>
    </el-table>
    <div class="materialBox">
      <vue-seamless-scroll :data="tableData" :class-option="defaultOption">
        <el-table
          class="body"
          :data="tableData"
          style="width: 100%; background: transparent"
          cell-class-name="tableCell"
        >
          <el-table-column prop="name" min-width="62"></el-table-column>
          <el-table-column prop="jsname" min-width="180"></el-table-column>
          <el-table-column prop="num" min-width="76"></el-table-column>
        </el-table>
      </vue-seamless-scroll>
    </div>
  </section>
</template>

<script>
import { getMaterial } from "@/api";
import VueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "material",
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      tableData: [
        {
          company: "**分公司",
          name: "王小虎",
          date: "2016-05-04",
        },
        {
          company: "**分公司",
          name: "王小虎",
          date: "2016-05-04",
        },
        {
          company: "**分公司",
          name: "王小虎",
          date: "2016-05-04",
        },
        {
          company: "**分公司",
          name: "王小虎",
          date: "2016-05-04",
        },
      ],
      defaultOption: {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      },
      materialLoading: false,
    };
  },
  mounted() {
    this.getMaterial();
  },
  methods: {
    async getMaterial() {
      this.materialLoading = true;
      const res = await getMaterial({});
      this.materialLoading = false;
      if (res && res.status == "1") {
        this.tableData = res.list;
        this.tableData.forEach((data) => {
          data.name = data.name.replace("分公司", "").replace("总公司", "");
          data.jsname = data.jsname.join(",");
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.material {
  font-weight: bold !important;
  h3 {
    text-align: left;
    color: #262d61;
    font-size: 16px;
    font-weight: bold;
    line-height: 29px;
  }
  ::v-deep .header {
    .el-table__body-wrapper {
      display: none;
    }
    tr,
    th {
      background-color: transparent !important;
    }
  }

  .materialBox {
    width: 100%;
    height: 440px;
    overflow: hidden;

    ::v-deep .body {
      .el-table__header-wrapper {
        display: none;
      }
      tr,
      th {
        background-color: transparent !important;
      }
    }
  }
}
</style>
