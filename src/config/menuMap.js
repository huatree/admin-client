/* 菜单 */

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'icon-home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/products',
    icon: 'icon-modular',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: 'icon-menu'
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'icon-setting'
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'icon-user'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'icon-security',
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'icon-chart-area',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'icon-chart-bar'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'icon-chart-line'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'icon-chart-pie'
      },
    ]
  }
]

export default menuList