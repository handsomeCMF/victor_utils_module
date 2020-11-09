const commonApi: Record<string, unknown> = {
  userApi: {
    login: '/login',
    token: '/token'
  },
  authorApi: {
    getList: '/author',
    addAuthor: '/author/add',
  }

};

export default commonApi;
