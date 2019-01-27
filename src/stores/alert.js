export default {
    namespaced : true,
    state : {
        status : false,
        text : '',
        type : 'success'
    },
    mutations : {
        set : (state, payload) => {
            state.status = payload.status
            state.text = payload.text
            state.type = payload.type
        },
    },
    actions : {
        set : ({commit}, payload) => {
            commit('set', payload)
        },
    },
    getters : {
        status : state => state.status,
        text : state => state.text,
        type : state => state.type,
    }
}
