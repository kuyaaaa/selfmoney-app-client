import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const type = {
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_USER: 'SET_USER',
  SET_PROFILES: 'SET_PROFILES',
  SET_MPROFILES: 'SET_MPROFILES',
  UPDATA_USERNAME: 'UPDATA_USERNAME'
}

const state = {
  isAuthenticated: false,
  user: {},
  profiles: [],
  mProfiles: [],
  yProfiles: [],
  type_cost_list: [
    "餐饮美食",
    "服饰美容",
    "生活日用",
    "日常缴费",
    "交通出行",
    "通讯物流",
    "休闲娱乐",
    "医疗保健",
    "住房物业",
    "文教体育",
    "收支转账",
    "金融理财",
    "其他"
  ]
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user,
  profiles: state => state.profiles,
  mProfiles: state => state.mProfiles,
  yProfiles: state => state.yProfiles
}

const mutations = {
  [type.SET_AUTHENTICATED](state,isAuthenticated) {
    if(isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    } else {
      state.isAuthenticated = false
    }
  },

  [type.SET_PROFILES](state,profiles) {
      state.profiles = profiles
  },

  [type.SET_MPROFILES](state,mProfiles) {
    state.mProfiles = mProfiles
  },

  [type.SET_YPROFILES](state,yProfiles) {
    state.yProfiles = yProfiles
  },

  [type.SET_USER](state,user) {
    if(user) {
      state.user = user
    } else {
      state.user = {}
    }
  },

  [type.UPDATA_USERNAME](state,name) {
    if(name) {
      state.user.name = name
    }
  }
}

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(type.SET_AUTHENTICATED, isAuthenticated)
  },
  setUser: ({commit}, user) => {
    commit(type.SET_USER, user)
  },
  setProfiles: ({commit}, profiles) => {
    commit(type.SET_PROFILES, profiles)
  },
  setMProfiles: ({commit}, mProfiles) => {
    commit(type.SET_MPROFILES, mProfiles)
  },
  setYProfiles: ({commit}, yProfiles) => {
    commit(type.SET_MPROFILES, yProfiles)
  },
  clearCurrentState: ({commit}) => {
    commit(type.SET_AUTHENTICATED, false)
    commit(type.SET_USER, null)
  },
  updataUserName: ({commit}, name) => {
    commit(type.UPDATA_USERNAME, name)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
