<template>
  <div class="dashboard-container">

    <general-tree />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GeneralTree from '@/components/Chart/GeneralTree'
import { getChainList } from '@/api/chart'
import { getRelationGraphList } from '@/api/chart'
import { getBothwayTreeList } from '@/api/chart'

export default {
  name: 'Dashboard',
  components: {
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
