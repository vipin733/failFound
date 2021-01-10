
import DialogStep from '~/lib/DialogStep'
export const state = () => ({
    baseUrl: process.env.API_URL,
    webUrl: process.env.BASE_URL,
    isOpen: false,
    isSearch: false,
    isOpenDialog: false,
    dialogStep: DialogStep.Login,
    isLoading: false,
    isError: false,
    error:{
        type: 'error',
        message: ''
    }
})
  
export const mutations = {
    SET_OPEN: function(state) {
      state.isOpen = !state.isOpen
    },
    SET_SEARCH: function(state) {
        state.isSearch = !state.isSearch
    },
    SET_OPEN_DIALOG: function(state) {
        state.isOpenDialog = !state.isOpenDialog
    },
    SET_DIALOG_STEP: function(state, step) {
        state.dialogStep = step
    },
    SET_LOADING: function(state, status) {
        state.isLoading = status
    },
    SET_ERROR: function(state) {
        state.isError = !state.isError
    },
    SET_ERROR_DATA: function(state, data) {
        state.error = data
    }
}

// getters
export const getters = {
    isOpen: state => state.isOpen,
    isSearch: state => state.isSearch,
    isOpenDialog: state => state.isOpenDialog,
    dialogStep: state => state.dialogStep,
    isLoading: state => state.isLoading,
    isError: state => state.isError,
    error: state => state.error
}


export const actions = {
    changeMenu({ commit }) {
        commit('SET_OPEN')
    },

    changeSearchMenu({ commit }) {
        commit('SET_SEARCH')
    },

    changeOpenDialog({ commit }) {
        commit('SET_OPEN_DIALOG')
    },

    changeDialogStep({ commit }, step) {
        commit('SET_DIALOG_STEP', step)
    },

    changeLoading({ commit }, status) {
        commit('SET_LOADING', status)
    },

    changeError({ commit }) {
        commit('SET_ERROR')
    },

    changeErrorData({ commit }, error) {
        commit('SET_ERROR_DATA', error)
    },
}