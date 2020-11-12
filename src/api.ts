const commonApi: Record<string, unknown> = {
  userApi: {
    login: '/login',
    token: '/token'
  },
  authorApi: {
    getList: '/author',
    addAuthor: '/author/add',
    getMenuList: '/author/menuList', // 获取菜单列表
  }

};

export default commonApi;
