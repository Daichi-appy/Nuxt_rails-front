export default ({ $auth, route, redirect }) => {
  // ログインごのユーザーのリダイレクト処理
  const loggedInUserNotAccess = ['signup', 'login']
  if ($auth.loggedIn && loggedInUserNotAccess.includes(route.name)) {
    return redirect('/')
  }
}