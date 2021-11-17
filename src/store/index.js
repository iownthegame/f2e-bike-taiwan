import { createStore } from "vuex"

const SAMPLE_RESULTS = [
  {
    name: '中正路（北側）',
    direction: 2,
    start: '蘇府王爺廟(中正路旁)',
    end: '中正路一段 87 巷',
    distance: 0.5
  },
  {
    name: '台2乙(中正路)北側',
    direction: 2,
    start: '中正路一段32巷',
    end: '蘇府王爺廟',
    distance: 0.21
  },
  {
    name: '台2乙(中正路)南側',
    direction: 2,
    start: '中正路87巷',
    end: '中正路51巷',
    distance: 0.36
  },
  {
    name: '台2乙(中正路)南側',
    direction: 2,
    start: '中正路87巷',
    end: '蘇府王爺廟蘇府王爺廟蘇府王爺廟蘇府王爺廟',
    distance: 0.36
  },
]

const store = createStore({
  state: {
    menuVisible: false,
    activeMenuItem: 'routes',
    searchResults: [],
    routeInfo: null,
    bikeInfo: null
  },
  mutations: {
    setMenuVisible (state, visible) {
      state.menuVisible = visible
    },
    setMenuItem (state, page) {
      state.activeMenuItem = page
    },
    setSearchResults (state, results) {
      state.searchResults = results
    },
    setRouteInfo(state, result) {
      state.routeInfo = result
    },
    setBikeInfo(state, result) {
      state.bikeInfo = result
    },
  },
  actions: {
    searchRoute ({ commit }) {
      commit('setSearchResults', SAMPLE_RESULTS)
    }
  }
})

export default store
