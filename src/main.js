import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Container,
  Header,
  Main,
  Row,
  Col,
  Table,
  TableColumn,
  DatePicker,
  Progress,
  Loading,
  Button,
  RadioGroup,
  RadioButton,
} from "element-ui";
import animate from "animate.css";

Vue.use(Container)
  .use(Header)
  .use(Main)
  .use(Row)
  .use(Col)
  .use(Table)
  .use(DatePicker)
  .use(Progress)
  .use(TableColumn)
  .use(Button)
  .use(RadioButton)
  .use(RadioGroup)
  .use(Loading)
  .use(animate);
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { BarChart, LineChart, PieChart, MapChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  LegendComponent,
  DataZoomComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
]);

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
