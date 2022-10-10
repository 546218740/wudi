/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const newPcrRouter = [
  {
    topMenu: 'menu_1',
    path: '/pcr_new_example',
    component: Layout,
    redirect: '/example/table',
    name: 'pcr_new_Example',
    meta: { title: 'pcr_new_Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table_table_table_table_table_table_table_table_table_table_table_table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  }
]

export default newPcrRouter
