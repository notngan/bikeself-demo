const state = {
  messageGroup: {
    class: '', 
    message: '',
    show: false
  },
  timeoutEvent: null,
  loading: false
}

const mutations = {
  'ADD_MESSAGE' (state, payload) {
    state.messageGroup = {
			class: payload.class,
      message: payload.message,
      show: true
		}
    
    if (state.timeoutEvent) {
      clearTimeout(state.timeoutEvent)
    }
    state.timeoutEvent = setTimeout(() => {
      state.messageGroup = {
        class: '',
        message: '',
        show: false
      }
    }, 5000)
  },
  'CLEAR_MESSAGE' (state) {
    state.messageGroup = {
			class: '',
      message: '',
      show: false
		}
  },
  'DISPLAY_LOADING' (state, payload) {
    state.loading = payload
  }
}

const actions = {
  addMessage({commit}, payload) {
    //console.log('addMessage')
    commit('ADD_MESSAGE', payload)
  },
  clearMessage({commit}) {
    commit('CLEAR_MESSAGE')
  },
  displayLoading({commit}, payload) {
    commit('DISPLAY_LOADING', payload)
  }
}

const getters = {
  messages: (state) => {
    return state.messageGroup
  },
  isLoading: (state) => {
    return state.loading
  }
}
export default {
	state,
	mutations,
	actions,
	getters
}