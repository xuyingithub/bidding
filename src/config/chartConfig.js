const font_family = {
  fontFamily: "PingFang SC, PingFang SC-Medium",
  fontWeight: "bold",
};
const textStyle = {
  color: "#262d61",
  fontSize: "16px",
  fontWeight: "bold",
  ...font_family,
};
const titleRich = {
  width: 25,
  height: 15,
  borderRadius: 5,
};
export const geoColor = {
  color_low: "#437EBD",
  color_middle: "#5095DC",
  color_high: "#79bdfe",
};
export const chartCustomer_config = {
  title: {
    text: "投标情况-按客户",
    textStyle,
    left: "0",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
    textStyle: { ...font_family, align: "left" },
  },
  legend: {
    data: ["投标数", "中标数", "中标率"],
    top: "30",
    textStyle: font_family,
  },
  grid: {
    bottom: "15%",
    right: "42",
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
      itemStyle: {
        color: {
          type: "linear", // 设置渐变颜色
          x: 0, // 渐变起点的 x 坐标
          y: 0, // 渐变起点的 y 坐标
          x2: 0, // 渐变终点的 x 坐标
          y2: 1, // 渐变终点的 y 坐标
          colorStops: [
            {
              offset: 0, // 渐变起点的颜色
              color: "rgba(0, 0, 255, 1)", // rgba 格式的颜色
            },
            {
              offset: 1, // 渐变终点的颜色
              color: "rgba(0, 0, 0, 0)",
            },
          ],
        },
      },
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
      itemStyle: {
        color: {
          type: "linear", // 设置渐变颜色
          x: 0, // 渐变起点的 x 坐标
          y: 0, // 渐变起点的 y 坐标
          x2: 0, // 渐变终点的 x 坐标
          y2: 1, // 渐变终点的 y 坐标
          colorStops: [
            {
              offset: 0, // 渐变起点的颜色
              color: "rgba(0, 255, 0, 1)", // rgba 格式的颜色
            },
            {
              offset: 1, // 渐变终点的颜色
              color: "rgba(0, 0, 0, 0)",
            },
          ],
        },
      },
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
      itemStyle: {
        color: "#d48265",
      },
    },
  ],
};
export const chartKind_config = {
  title: {
    text: "投标情况-按险种",
    textStyle,
    left: "0",
  },

  tooltip: {
    trigger: "item",
    textStyle: { ...font_family, align: "left" },
    formatter: function (a) {
      return `${a.data.name}<br />投标数${a.data.zhbnumb}个<br />中标数${a.data.value}个<br />中标率${a.data.zbl}`;
    },
  },
  // legend: {
  //   orient: "horizontal",
  //   bottom: "bottom",
  // },
  series: [
    {
      name: "投标情况-按险种",
      type: "pie",
      center: ["50%", "50%"], // 控制图表在画布中心的位置
      radius: "60%",
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
export class getGeoConfig {
  constructor(props) {
    this.average = props;
  }
  getConfig() {
    return {
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
          align: "left",
        },
        formatter: function (a) {
          if (Array.isArray(a.data.subname)) {
            const dataArr = a.data.subname.map((item, index) => {
              return `${item}<br />投标数${a.data.zhbnumb[index]}个<br />中标数${a.data.zbnumb[index]}个<br />中标率${a.data.zbl_f[index]}%`;
            });
            return dataArr.reduce((total, cur) => {
              return total + cur + "<br />";
            }, "");
          } else {
            return `${a.data.subname}<br />投标数${a.data.zhbnumb}个<br />中标数${a.data.zbnumb}个<br />中标率${a.data.zbl_f}%`;
          }
        },
        showDelay: 100,
      },
      title: {
        text: `{a|} [0.0%]  {b|} (0,${this.average}%)  {c|} [${this.average}%,100.0%]`,
        textStyle: {
          fontSize: "12px",
          ...font_family,
          rich: {
            a: {
              ...titleRich,
              backgroundColor: geoColor.color_low,
            },
            b: {
              ...titleRich,
              backgroundColor: geoColor.color_middle,
            },
            c: {
              ...titleRich,
              backgroundColor: geoColor.color_high,
            },
          },
        },
        left: "8",
        bottom: "15",
      },
      series: [
        {
          type: "map",
          map: "china",
          label: {
            // 通常状态下的样式
            normal: {
              // show: true,
              // textStyle: {
              // color: "#fff",
              // },
            },
            // 鼠标放上去的样式
            emphasis: {
              textStyle: {
                color: "#262D61",
              },
            },
          },
          // 地图区域的样式设置
          itemStyle: {
            normal: {
              borderColor: "#fff",
              borderWidth: 1,
              areaColor: geoColor.color_low,
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
  }
}
export const chartCompany_config = {
  title: {
    text: "分公司投标情况",
    textStyle,
    left: "10",
  },
  grid: {
    left: "35",
    right: "45",
  },
  tooltip: {
    trigger: "axis",
    textStyle: { ...font_family, align: "left" },
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
      end: 20, // 结束位置（百分比）
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
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#3D84FB", // 浅蓝色
            },
            {
              offset: 1,
              color: "#6BC4FF", // 深蓝色
            },
          ],
        },
      },
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
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#1DF4C4", // 浅绿色
            },
            {
              offset: 1,
              color: "#00D09F", // 深绿色
            },
          ],
        },
      },
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
      itemStyle: {
        color: "#fc9001",
      },
    },
  ],
};
export const chartBusiness_config = {
  title: {
    text: "商机转化情况",
    textStyle,
    left: "0",
  },
  tooltip: {
    trigger: "axis",
    textStyle: { ...font_family, align: "left" },
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  legend: {
    data: ["商机数(来自商机库)", "投标数", "商机转化率"],
    top: "30",
    textStyle: font_family,
  },
  grid: {
    left: "27",
    right: "42",
  },
  dataZoom: [
    {
      type: "slider", // 使用滑动条型的 dataZoom
      xAxisIndex: 0, // 对应横向坐标轴
      start: 0, // 起始位置（百分比）
      end: 10, // 结束位置（百分比）
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
      name: "商机数(来自商机库)",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + "个";
        },
      },
      data: [],
    },
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
