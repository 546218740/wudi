<template>
  <div>
    <div style="height:calc(100vh - 100px);">
      <SeeksRelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      />
    </div>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'BothwayTree',
  components: { SeeksRelationGraph },
  props: {
    bothwayTreeData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentCase: '双向树',
      isShowCodePanel: false,
      graphOptions: {
        'backgrounImage': '', // 背景图
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'from': 'left',
            'max_per_width': '300',
            'min_per_height': '40'
          }
        ],
        'defaultLineMarker': {
          'markerWidth': 12,
          'markerHeight': 12,
          'refX': 6,
          'refY': 6,
          'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        'defaultExpandHolderPosition': 'right',
        'defaultNodeShape': 1,
        'defaultNodeWidth': '100',
        'defaultLineShape': 4,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)'
      }
    }
  },
  watch: {
    bothwayTreeData() {
      this.showBothwayTree()
    }
  },
  mounted() {
  },
  methods: {
    showBothwayTree() {
      var __graph_json_data = this.bothwayTreeData
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
</style>
