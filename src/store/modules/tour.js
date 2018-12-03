//import { firebaseAuth } from '../../firebaseConfig'

const state = {
	articleList: [],
	tourLoading: true
}

const mutations = {
	'SET_CREATED_ARTICLE' (state, payload) {
		state.articleList.push(payload)
  },
  'LOAD_ARTICLE_LIST' (state, payload) {
    state.articleList = payload
	},
	'DISPLAY_TOUR_LOADING' (state, payload) {
    state.tourLoading = payload
  }
}

const actions = {
	displayTourLoading({commit}, payload) {
    commit('DISPLAY_TOUR_LOADING', payload)
  }
}

const getters = {
	articles (state) {
		return state.articleList
	},

	tourById (state) {
    return (id) => {
      return state.articleList.find((tour) => {
        return tour.id === id
      })
    }
	},
	isTourLoading (state) {
		return state.tourLoading
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}