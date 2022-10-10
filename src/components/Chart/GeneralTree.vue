<template>
  <div>
    <div v-loading="g_loading" style="margin-top:50px;width: calc(100% - 10px);height:calc(100vh - 140px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-expand="onNodeExpand" :on-node-collapse="onNodeCollapse" />
    </div>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
import { getGeneralTreeRightList, getGeneralTreeLeftList } from '@/api/chart'
export default {
  name: 'GeneralTree',
  components: { SeeksRelationGraph },
  data() {
    return {
      g_loading: true,
      remoteData: {},
      graphOptions: {
        'backgrounImage': '',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '布局',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            // 'defaultJunctionPoint': 'border',
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
        // 'defaultExpandHolderPosition': 'right',
        'defaultNodeShape': 1,
        'defaultNodeWidth': '100',
        'defaultLineShape': 4,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        // 'defaultLineColor': 'rgba(0, 186, 189, 1)',
        // 'defaultNodeColor': 'rgba(0, 206, 209, 1)',
        // 'disableDragNode': true
        'moveToCenterWhenResize': false,
        'defaultLineColor': '#C7E9FF',
        'defaultNodeColor': '#4ea2f0'
      }
    }
  },
  created() {
  },
  mounted() {
    this.setGraphData()
  },
  methods: {
    setGraphData() {
      // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
      //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
      var graphData = {
        'rootId': 'a',
        'nodes': [],
        'links': []
      }

      var _graphSetting = this.$refs.seeksRelationGraph.graphSetting
      // 手工设置节点的坐标
      const _center = {
        x: (_graphSetting.viewSize.width) / 2 - _graphSetting.canvasOffset.x,
        y: (_graphSetting.viewSize.height) / 2 - _graphSetting.canvasOffset.y
      }

      // 添加根节点和虚拟节点
      var rootNode = { 'id': graphData.rootId, 'text': '根节点', styleClass: 'c-g-center', color: '#2E4E8F', width: 200, height: 40, fixed: true, x: _center.x - 100, y: _center.y - 15, data: { childrenLoaded: false }}
      var leftNode = { 'id': 'b', 'text': '', expanded: false, expandHolderPosition: 'left', html: '<span style="color:#ff8c00">血缘分析</span>', fixed: true, width: 100, height: 40, data: { childrenLoaded: false }}
      var rightNode = { 'id': 'c', 'text': '', expanded: false, expandHolderPosition: 'right', html: '<span style="color:#ff8c00">影响分析</span>', fixed: true, width: 100, height: 40, data: { childrenLoaded: false }}

      leftNode.x = _center.x - 100 - leftNode.width + 15
      leftNode.y = _center.y - 3
      rightNode.x = _center.x + 100 + 19
      rightNode.y = _center.y - 3

      // 添加节点数据到graphData
      graphData.nodes.push(rootNode)
      graphData.nodes.push(leftNode)
      graphData.nodes.push(rightNode)
      // 添加根节点和虚拟节点之间的关系，并将关系数据放入graphData
      graphData.links.push({ from: leftNode.id, to: rootNode.id, isHideArrow: true, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 4 })
      graphData.links.push({ from: rootNode.id, to: rightNode.id, isHideArrow: true, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 4 })

      console.log(JSON.stringify(graphData))
      this.$refs.seeksRelationGraph.setJsonData(graphData, (seeksRGGraph) => {
        this.g_loading = false
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    onNodeCollapse(node, e) {
      // 画布偏移量
      console.log(this.$refs.seeksRelationGraph.graphSetting.canvasOffset.x)
      console.log(this.$refs.seeksRelationGraph.graphSetting.canvasOffset.y)
      // 刷新后画布会回到中心，体验不好，需要重新设置画布偏移量到原来位置
      this.$refs.seeksRelationGraph.refresh()
      // this.$refs.seeksRelationGraph.focusNodeById(node.id)
    },
    // 通过onNodeExpand事件监听节点的展开事件，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
    onNodeExpand(node, e) {
      console.log('onNodeExpand:', node)
      // 根据具体的业务需要决定是否需要从后台加载数据
      /** if (!node.data.isNeedLoadDataFromRemoteServer) {
        console.log('这个节点的子节点已经加载过了')
        this.$refs.seeksRelationGraph.refresh()
        return
      } **/
      // 判断是否已经动态加载数据了
      if (node.data.childrenLoaded) {
        // 刷新后画布会回到中心，体验不好，需要重新设置画布偏移量到原来位置
        this.$refs.seeksRelationGraph.refresh()
        return
      }
      this.g_loading = true
      node.data.childrenLoaded = true
      // 左子树和右子树分别调用不同的接口
      if (node.expandHolderPosition === 'left') {
        console.log('这是左子树')
        this.loadLeftChildNodesFromRemoteServer(node)
      } else {
        console.log('这是右子树')
        this.loadRightChildNodesFromRemoteServer(node)
      }
    },
    loadLeftChildNodesFromRemoteServer(currNode) {
      getGeneralTreeLeftList().then(response => {
        this.remoteData = response.data.generalTreeData
        console.log(this.relationGraphData)
        this.addRemoteData(this.remoteData, currNode)
      })
    },
    loadRightChildNodesFromRemoteServer(currNode) {
      getGeneralTreeRightList().then(response => {
        this.remoteData = response.data.generalTreeData
        console.log(this.relationGraphData)
        this.addRemoteData(this.remoteData, currNode)
      })
    },
    // 给当前展开结点添加动态数据
    addRemoteData(remoteData, currNode) {
      var _new_json_data = {
        'nodes': [],
        'links': []
      }
      remoteData.nodes.forEach((thisNode, _index) => {
        thisNode.width = 100
        /** thisNode.x = currNode.x - 200
        thisNode.y = currNode.y + _index * 30 **/
        console.log('node' + _index + ':' + thisNode.x + ',' + thisNode.y)
        _new_json_data.nodes.push(thisNode)

        if (currNode.expandHolderPosition === 'left') {
          _new_json_data.links.push({ from: thisNode.id, to: currNode.id, isHideArrow: true, lineShape: 5 })
        } else {
          _new_json_data.links.push({ from: currNode.id, to: thisNode.id, isHideArrow: true, lineShape: 5 })
        }
      })
      this.g_loading = false
      this.$refs.seeksRelationGraph.appendJsonData(_new_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .c-expand-positon-left {
  margin-left: -30px;
}
</style>
