/** When your routing table is too long, you can split it into small modules **/

const topMenus = [
  {
    name: 'home',
    title: 'home',
    meta: { title: 'home' }
  },
  {
    name: 'menu_1',
    title: '菜单1',
    meta: { title: 'menu_1', roles: ['pcr_admin'] }
  },
  {
    name: 'menu_1',
    title: '菜单2',
    meta: { title: 'menu_2' }
  },
  {
    name: 'menu_1',
    title: '菜单3',
    meta: { title: 'menu_3' }
  },
  {
    name: 'menu_1',
    title: '菜单4',
    meta: { title: 'menu_4' }
  },
  {
    name: 'menu_1',
    title: '菜单5',
    meta: { title: 'menu_1' }
  }
]

export default topMenus
