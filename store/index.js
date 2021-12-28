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
  // { "id": 1, "user_id": 1, "name": "基本情報試験!", "period": "2021-11-20T12:00:00.000+09:00",  "created_at": "2021-11-23T19:47:03.756+09:00", "updated_at": "2021-11-23T19:47:03.756+09:00" }
  tasks: [],
          // { "id": 1, "project_id": 1, "title": "こんにちは", "created_at": "", "updated_at": '2021-11-23T19:47:03.756+09:00', period },
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
  },
  addProjects (state, payload) {
    state.projects.push(payload)
  },
  setTasks (state, payload) {
    state.tasks = payload
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
  },
  // 
  getTasks ({ commit }, tasks) {
    commit('setTasks', tasks)
  },
  // テスト
  getMessage ({ commit }, message) {
    commit('setMessage', message)
  }
}