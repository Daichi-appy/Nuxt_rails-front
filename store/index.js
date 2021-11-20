export const state = () => ({
  // loggedIn: true,
  styles: {
    beforeLogin: {
      appBarHeight: 56
    }
  },
  current: {
    user: null,
    project: null
  },
  projects: [],
    // { id: 1, name: 'MyProject01', updatedAt: '2020-04-01T12:00:00+09:00' },
    // { id: 2, name: 'MyProject02', updatedAt: '2020-04-05T12:00:00+09:00' },
    // { id: 3, name: 'MyProject03', updatedAt: '2020-04-03T12:00:00+09:00' },
    // { id: 4, name: 'MyProject04', updatedAt: '2020-04-04T12:00:00+09:00' },
    // { id: 5, name: 'MyProject05', updatedAt: '2020-04-01T12:00:00+09:00' }
  rememberRoute: {
    name: 'index',
    params: {}
  },
  toast: {
    msg: null,
    color: 'error',
    timeout: 4000
  }
})

export const getters = {}

export const mutations = {
  // setLoggedIn (state, payload) {
  //   state.loggedIn = payload
  // },
  setCurrentProject (state, payload) {
    state.current.project = payload
  },
  setCurrentUser (state, payload) {
    state.current.user = payload
  },
  setRememberRoute (state, payload) {
    state.rememberRoute = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setProjects (state, payload) {
    state.projects = payload
  }
}

export const actions = {
  // login ({ commit }) {
  //   commit('setLoggedIn', true)
  // },
  // logout ({ commit }) {
  //   commit('setLoggedIn', false)
  // },
  getCurrentProject ({ state, commit }, params) {
    const currentProject = state.projects.find(project => project.id === Number(params.id))
    commit('setCurrentProject', currentProject)
  },
  // 現在のユーザーを設定する
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  //
  getRememberRoute ({ commit }, route) {
    route = route || { name: 'index', params: {} }
    commit('setRememberRoute', { name: route.name, params: route.params })
  },
  // トースターデータをセットする
  getToast ({ commit }, toast) {
    toast.color = toast.color || 'error'
    toast.timeout = toast.timeout || 4000
    commit('setToast', toast)
  },
  // ユーザーのプロジェクト一覧をセットする
  getProjects ({ commit }, projects) {
    commit('setProjects', projects)
  }
}