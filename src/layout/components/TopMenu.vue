<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    active-text-color="#ffd04b"
    text-color="#fff"
    background-color="#304156"
  >
    <el-menu-item v-for="topMenu in permission_topMenus" :key="topMenu.name" @click="setTopMenu(topMenu.name)">{{ topMenu.title }}</el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    ...mapGetters([
      'permission_topMenus'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    setTopMenu(name) {
      this.$store.dispatch('app/setTopNavState', name)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    setLeftInnerMenu() {
      if (this.$route.meta.routerType === 'topmenu') { // 点击的为左侧的2级菜单
        this.$store.dispatch('ClickTopInnerMenu',
          { 'name': this.$route.name }
        )
      } else { // 点击顶部的菜单
        this.$store.dispatch('ClickTopMenu',
          { 'title': this.$route.meta.title }
        )
      }
    }
  }
}
</script>
