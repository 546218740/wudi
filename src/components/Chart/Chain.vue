<template>
  <div>
    <div id="bothWayChainFigure" class="chain-class" />
  </div>
</template>

<script>
// const echarts = require('echarts')
const echarts = require('echarts')

export default {
  name: 'ChainFigureTwo',
  props: {
    chainData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: 'Mr吴',
      logo: '/static/img/logo.642fe539.png'
    }
  },
  watch: {
    chainData() {
      this.bothWayChainFigure()
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    bothWayChainFigure() {
      // const echarts = require('echarts')
      var myChartRight = echarts.init(document.getElementById('bothWayChainFigure'))
      // 间隔展开子数据，animate，display，physics，scale，vis是展开的
      echarts.util.each(this.chainData.children, function(datum, index) {
        index % 2 === 0 && (datum.collapsed = true)
      })
      myChartRight.clear()
      myChartRight.setOption({
        tooltip: {// 提示框组件
          trigger: 'item', // 触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
          triggerOn: 'mousemove' // 提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
        },
        // 系列列表
        series: [
          {
            type: 'tree', // 树形结构
            name: 'right-tree',
            data: [this.chainData],

            top: '1%', // 距离上
            left: '55%', // 左
            bottom: '1%', // 下
            right: '10%', // 右的距离

            symbolSize: 10, // 标记的大小，就是那个小圆圈，默认7

            // 每个节点所对应的标签的样式
            label: {
              position: 'left', // 标签的位置
              verticalAlign: 'middle', // 文字垂直对齐方式，默认自动。可选：top，middle，bottom
              align: 'right', // 文字水平对齐方式，默认自动。可选：top，center，bottom
              fontSize: 9 // 标签文字大小
            },

            // 叶子节点的特殊配置，如下叶子节点和非叶子节点的标签位置不同
            leaves: {
              label: {
                position: 'right',
                // rotate: -90,// 标签旋转。从 -90 度到 90 度。正值是逆时针。
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
            animationDuration: 550, // 初始动画的时长，支持回调函数,默认1000
            animationDurationUpdate: 750 // 数据更新动画的时长，默认300
          },
          {
            type: 'tree', // 树形结构
            name: 'left-tree',
            data: [this.chainData],

            top: '1%', // 距离上
            left: '10%', // 左
            bottom: '1%', // 下
            right: '55%', // 右的距离

            symbolSize: 7, // 标记的大小，就是那个小圆圈，默认7

            orient: 'RL',

            // 每个节点所对应的标签的样式
            label: {
              position: 'right', // 标签的位置
              verticalAlign: 'middle', // 文字垂直对齐方式，默认自动。可选：top，middle，bottom
              align: 'left', // 文字水平对齐方式，默认自动。可选：top，center，bottom
              fontSize: 9 // 标签文字大小
            },

            // 叶子节点的特殊配置，如下叶子节点和非叶子节点的标签位置不同
            leaves: {
              label: {
                position: 'left',
                // rotate: -90,// 标签旋转。从 -90 度到 90 度。正值是逆时针。
                verticalAlign: 'middle',
                align: 'right'
              }
            },

            expandAndCollapse: true, // 子树折叠和展开的交互，默认打开
            animationDuration: 550, // 初始动画的时长，支持回调函数,默认1000
            animationDurationUpdate: 300 // 数据更新动画的时长，默认300
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: white;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
.chain-class {
  width: 800px;
  height: 400px;
}
</style>
