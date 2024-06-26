<!--
* @Description: 材料申请处理时效
* @Date: 2023-08-23 
* @Author: xuyin
* @LastEditTime: 2024-05-11
-->
<template>
  <section class="material" v-loading="materialLoading">
    <h3 @mouseover="mouseEnter" @mouseleave="mouseLeave">
      材料申请处理情况
      <i
        class="el-icon-download animate__animated animate__fadeIn animate__slower"
        v-if="exportShow"
        @click="exportExcel"
      />
    </h3>
    <el-table class="header" style="width: 100%; background: transparent">
      <el-table-column label="分公司" min-width="62"></el-table-column>
      <el-table-column label="管理员" min-width="165"></el-table-column>
      <el-table-column label="待办流程数量" min-width="104"></el-table-column>
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
          <el-table-column prop="jsname" min-width="165"></el-table-column>
          <el-table-column
            prop="num"
            min-width="104"
            :formatter="formatterNum"
          ></el-table-column>
        </el-table>
      </vue-seamless-scroll>
    </div>
  </section>
</template>

<script>
import { getMaterial } from "@/api";
import VueSeamlessScroll from "vue-seamless-scroll";
import * as XLSX from "xlsx";
export default {
  name: "material",
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      tableData: [],
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
      exportShow: false,
      timer: "",
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
          data.num == "-" && (data.num = 0);
        });
        this.tableData = this.tableData.sort((a, b) => {
          return b.num - a.num;
        });
        console.log("this.tableData", this.tableData);
      }
    },
    formatterNum(row, column, cellValue) {
      return cellValue > 0 ? cellValue : "-";
    },
    mouseEnter() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.exportShow = true;
      }, 3000);
    },
    mouseLeave() {
      clearTimeout(this.timer);
      this.exportShow = false;
    },
    exportExcel() {
      const data = this.tableData.map((data) => ({
        分公司: data.name,
        管理员: data.jsname,
        代办流程数量: data.num,
      }));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "材料申请处理情况.xlsx");
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
    padding-left: 8px;
    i {
      cursor: pointer;
      font-weight: bold;
    }
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
