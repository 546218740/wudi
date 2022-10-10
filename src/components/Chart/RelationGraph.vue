<template>
  <div>
    <div v-loading="g_loading" style="margin-top:50px;width: calc(100% - 10px);height:calc(100vh - 140px);">
      <seeks-relation-graph ref="seeksRelationGraph" :options="graphOptions" :on-node-expand="onNodeExpand" />
    </div>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'RelationGraph',
  components: { SeeksRelationGraph },
  props: {
    relationGraphData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      g_loading: true,
      demoname: '---',
      graphOptions: {
        'backgrounImage': '',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-tree',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'centerOffset_x': -300,
            'centerOffset_y': 0,
            'min_per_width': '60',
            'min_per_height': '400'
          }
        ],
        'defaultExpandHolderPosition': 'bottom',
        'defaultLineShape': 4,
        'defaultJunctionPoint': 'tb',
        'defaultNodeShape': 1,
        'defaultNodeWidth': '50',
        'defaultNodeHeight': '250',
        'defaultNodeBorderWidth': 0
      }
    }
  },
  watch: {
    relationGraphData() {
      this.setGraphData()
    }
  },
  created() {
  },
  mounted() {
    this.demoname = this.$route.params.demoname
  },
  methods: {
    setGraphData() {
      var __graph_json_data = this.relationGraphData
      console.log(JSON.stringify(__graph_json_data))
      __graph_json_data.nodes.forEach(thisNode => {
        if (thisNode.text === '深圳市腾讯计算机系统有限公司') {
          thisNode.width = 300
          thisNode.height = 100
          thisNode.offset_x = -80
        }
        if (thisNode.text === '张志东' || thisNode.text === '陈一丹' || thisNode.text === '许晨晔' || thisNode.text === '马化腾') {
          thisNode.width = 100
          thisNode.height = 80
          thisNode.offset_y = 80
        }
        // 为节点《这个节点原本是没有子节点的》设置属性expandHolderPosition，使其在没有子节点的情况下也能显示【展开/收缩】按钮，当点击展开时动态加载子节点数据
        if (thisNode.text === '这个节点原本是没有子节点的') {
          thisNode.data = { asyncChild: true, loaded: false } // 这是一个自定义属性，用来在后续判断如果点击了这个节点，则动态获取数据
          thisNode.expandHolderPosition = 'bottom'
          thisNode.expanded = false
        }
      })
      setTimeout(function() {
        this.g_loading = false
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        })
      }.bind(this), 1000)
    },
    onNodeExpand(node, e) {
      // 模拟动态加载数据
      if (node.data && node.data.asyncChild === true && node.data.loaded === false) {
        this.g_loading = true
        node.data.loaded = true
        setTimeout(function() {
          this.g_loading = false
          var _new_json_data = {
            nodes: [
              { id: node.id + '-child-1', text: node.id + '-的子节点1' },
              { id: node.id + '-child-2', text: node.id + '-的子节点2' },
              { id: node.id + '-child-3', text: node.id + '-的子节点3' }
            ],
            links: [
              { from: node.id, to: node.id + '-child-1', text: '动态子节点' },
              { from: node.id, to: node.id + '-child-2', text: '动态子节点' },
              { from: node.id, to: node.id + '-child-3', text: '动态子节点' }
            ]
          }
          this.$refs.seeksRelationGraph.appendJsonData(_new_json_data, (seeksRGGraph) => {
            // 这些写上当图谱初始化完成后需要执行的代码
          })
        }.bind(this), 1000)
        return
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
