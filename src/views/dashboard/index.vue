<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!--<el-button @click="initChainData">chain</el-button>
    <chain :chain-data="chainData" />-->

    <!--<el-button @click="initRelationGraphData">relationGraph</el-button>
    <relation-graph :relation-graph-data="relationGraphData" />-->

    <!--<el-button @click="initBothwayTreeData">bothwayTree</el-button>
    <bothway-tree :bothway-tree-data="bothwayTreeData" />-->

    <general-tree />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Chain from '@/components/Chart/Chain'
// import RelationGraph from '@/components/Chart/RelationGraph'
// import BothwayTree from '@/components/Chart/BothwayTree'
import GeneralTree from '@/components/Chart/GeneralTree'
import { getChainList } from '@/api/chart'
import { getRelationGraphList } from '@/api/chart'
import { getBothwayTreeList } from '@/api/chart'
// import echarts from 'echarts'

export default {
  name: 'Dashboard',
  components: {
    // Chain,
    // RelationGraph,
    // BothwayTree,
    GeneralTree
  },
  data() {
    return {
      testApi: null,
      chainData: {},
      relationGraphData: {},
      bothwayTreeData: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
  },
  created() {
    // this.initChainData()
  },
  mounted() {
  },
  methods: {
    initChainData() {
      getChainList().then(response => {
        this.chainData = response.data.chainData
        console.log(this.chainData)
      })
    },
    initRelationGraphData() {
      getRelationGraphList().then(response => {
        this.relationGraphData = response.data.relationGraphData
        console.log(this.relationGraphData)
      })
    },
    initBothwayTreeData() {
      getBothwayTreeList().then(response => {
        this.bothwayTreeData = response.data.bothwayTreeData
        console.log(this.bothwayTreeData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    height: 100%;
    width: 100%;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
