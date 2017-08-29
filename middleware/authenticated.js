// 除了登录页外，其他页面都需加入该中间件，当session过期导致authUser为空是，跳转到登录页
export default function ({ store, redirect }) {
  if (!store.state.authUser) {
    return redirect('/login');
  }
}