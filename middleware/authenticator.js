export default async ({ $auth, store, route, redirect }) => {
  // トップページかつユーザーが存在しない場合、何もしない(layouts/welcome.vue表示のため)
  if (route.name === 'index' && !$auth.isUserPresent()) {
    return false
  }
  // テスト
  // store.dispatch('getCurrentUser', null)

  // トップページでユーザーが存在する場合はここを通過する
  if (!$auth.isAuthenticated()) {
    // 有効期限外の時
    let msg = 'ログインが必要です'

    if ($auth.isUserPresent()) {
      // ログイン中のユーザー
      msg = 'もう一度ログインしてください'
      await $auth.logout()
    } else {
      // ログイン前ユーザー
      store.dispatch('getRememberRoute', route)
    }

    // TODOトースター出力
    store.dispatch('getToast', { msg })
    return redirect('/login')
  } else if (!$auth.isUserPresent()) {
    // 有効期限内でユーザーが存在しない場合
    return $auth.unauthError()
  } // ログインしたとき成功トースター
  //   else {
  //     store.dispatch('getToast', { msg: 'ログインしました', color: 'success'} )
  // }
}