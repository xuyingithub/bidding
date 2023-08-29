const font_family = {
  fontFamily: "PingFang SC, PingFang SC-Medium",
};
const textStyle = {
  color: "#262d61",
  fontSize: "16px",
  fontWeight: "bold",
  ...font_family,
};

export const chartCustomer_config = {
  title: {
    text: "招标情况-按客户",
    textStyle,
    left: "left",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  legend: {
    data: ["投标数", "中标数", "中标率"],
    top: "30",
    textStyle: font_family,
  },
  grid: {
    bottom: "15%",
    right: "13%",
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        ...font_family,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      // min: 0,
      // max: 100,
      // interval: 50,
    },
    {
      type: "value",
      // min: 0,
      // max: 100,
      // interval: 50,
      axisLabel: {
        formatter: "{value} %",
      },
    },
  ],
  series: [
    {
      name: "投标数",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "个";
        },
      },
      data: [],
    },
    {
      name: "中标数",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "个";
        },
      },
      data: [],
    },
    {
      name: "中标率",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + "%";
        },
      },
      data: [],
    },
  ],
};
export const chartKind_config = {
  title: {
    text: "招标情况-按险种",
    textStyle,
    left: "left",
  },

  tooltip: {
    trigger: "item",
    textStyle: font_family,
  },
  // legend: {
  //   orient: "horizontal",
  //   bottom: "bottom",
  // },
  series: [
    {
      name: "招标情况-按险种",
      type: "pie",
      center: ["50%", "50%"], // 控制图表在画布中心的位置
      radius: "50%",
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
export const chartGeo_config = {
  // 背景颜色
  backgroundColor: "transparent",
  // // 提示浮窗样式
  tooltip: {
    show: true,
    trigger: "item",
    alwaysShowContent: false,
    backgroundColor: "#0C121C",
    borderColor: "rgba(0, 0, 0, 0.16);",
    hideDelay: 100,
    triggerOn: "mousemove",
    enterable: true,
    textStyle: {
      color: "#DADADA",
      fontSize: "12",
      width: 20,
      height: 30,
      overflow: "break",
    },
    formatter: function (a) {
      if (Array.isArray(a.data.subname)) {
        const dataArr = a.data.subname.map((item, index) => {
          return `${item}<br />招标数${a.data.zbnumb[index]}<br />中标数${a.data.zhbnumb[index]}<br />中标率${a.data.zbl[index]}`;
        });
        return dataArr.reduce((total, cur) => {
          return total + cur + "<br />";
        }, "");
      } else {
        return `${a.data.subname}<br />招标数${a.data.zbnumb}<br />中标数${a.data.zhbnumb}<br />中标率${a.data.zbl}`;
      }
    },
    showDelay: 100,
  },
  series: [
    {
      type: "map",
      map: "china",
      label: {
        // 通常状态下的样式
        normal: {
          // show: true,
          textStyle: {
            color: "#fff",
          },
        },
        // 鼠标放上去的样式
        emphasis: {
          textStyle: {
            color: "#fff",
          },
        },
      },
      // 地图区域的样式设置
      itemStyle: {
        normal: {
          borderColor: "#fff",
          borderWidth: 1,
          areaColor: "#79bdfe",
          shadowColor: "rgba(47,86,127,0.23)",
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
        },
        // 鼠标放上去高亮的样式
        emphasis: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
      },
      select: {
        disabled: true,
      },
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      aspectScale: 0.75,
      data: [],
    },
  ],
};
export const chartCompany_config = {
  title: {
    text: "分公司投标情况",
    textStyle,
    left: "left",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  legend: {
    data: ["投标数", "中标数", "中标率"],
    top: "30",
    textStyle: font_family,
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        rotate: 45,
        ...font_family,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      // min: 0,
      // max: 100,
      // interval: 40,
    },
    {
      type: "value",
      // min: 0,
      // max: 100,
      // interval: 20,
      axisLabel: {
        formatter: "{value} %",
      },
    },
  ],
  dataZoom: [
    {
      type: "slider", // 使用滑动条型的 dataZoom
      xAxisIndex: 0, // 对应横向坐标轴
      start: 0, // 起始位置（百分比）
      end: 50, // 结束位置（百分比）
      height: 10,
    },
  ],
  series: [
    {
      name: "投标数",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "个";
        },
      },
      data: [],
    },
    {
      name: "中标数",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "个";
        },
      },
      data: [],
    },
    {
      name: "中标率",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + "%";
        },
      },
      data: [],
    },
  ],
};
export const chartBusiness_config = {
  title: {
    text: "商机转化情况",
    textStyle,
    left: "left",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  legend: {
    data: ["商机数", "立项数", "商机转化率"],
    top: "30",
    textStyle: font_family,
  },
  grid: {
    right: "13%",
  },
  dataZoom: [
    {
      type: "slider", // 使用滑动条型的 dataZoom
      xAxisIndex: 0, // 对应横向坐标轴
      start: 0, // 起始位置（百分比）
      end: 50, // 结束位置（百分比）
      height: 10,
    },
  ],
  xAxis: [
    {
      type: "category",
      data: [],
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        rotate: 45,
        ...font_family,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      // min: 0,
      // max: 100,
      // interval: 10,
    },
    {
      type: "value",
      // min: 0,
      // max: 100,
      // interval: 10,
      axisLabel: {
        formatter: "{value} %",
      },
    },
  ],
  series: [
    {
      name: "商机数",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "个";
        },
      },
      data: [],
    },
    {
      name: "立项数",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "个";
        },
      },
      data: [],
    },
    {
      name: "商机转化率",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + "%";
        },
      },
      data: [],
    },
  ],
};
