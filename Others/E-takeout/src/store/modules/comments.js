export default {
  namespaced: true,
  state: {
    COMMENTS_ALL: [],
    HAS_CONTENT: false,
    RATETYPE: -1
  },
  getters: {
    COMMENTS_POS ({ COMMENTS_ALL }) {
      return COMMENTS_ALL.filter(el => {
        return el.rateType === 0
      })
    },
    COMMENTS_NEG ({ COMMENTS_ALL }) {
      return COMMENTS_ALL.filter(el => {
        return el.rateType === 1
      })
    },
    RATETYPE_COMMENTS ({ COMMENTS_ALL, RATETYPE }, { COMMENTS_NEG, COMMENTS_POS }) {
      if (RATETYPE === -1) return COMMENTS_ALL
      if (RATETYPE === 0) return COMMENTS_POS
      return COMMENTS_NEG
    },
    COMMENTS_COMPUTED ({ HAS_CONTENT }, { RATETYPE_COMMENTS }) {
      if (HAS_CONTENT === false) return RATETYPE_COMMENTS
      return RATETYPE_COMMENTS.filter(el => {
        return el.text !== ''
      })
    }
  },
  mutations: {
    INIT_COMMENTS (state, { commentsArr }) {
      state.COMMENTS_ALL = commentsArr
    },
    TOGGLE_HAS_CONTENT (state) {
      state.HAS_CONTENT = !state.HAS_CONTENT
    },
    SET_RATETYPE (state, { rateType }) {
      state.RATETYPE = rateType
    }
  },
  actions: {
    commit_ratetype ({ commit }, rateType) {
      commit({
        type: 'SET_RATETYPE',
        rateType: rateType
      })
    },
    toggle_has_content ({ commit }) {
      commit('TOGGLE_HAS_CONTENT')
    },
    init_comments ({ commit }, commentsArr) {
      commentsArr.forEach(el => {
        const commentTime = new Date(el.rateTime)
        const formate = 'yyyy-mth-dd hh:mm'
        let timeArr = []
        let i = 0

        timeArr.push(commentTime.getFullYear())
        timeArr.push(commentTime.getMonth())
        timeArr.push(commentTime.getDate())
        timeArr.push(commentTime.getHours())
        timeArr.push(commentTime.getMinutes())

        const str = formate.replace(/(\w+)/g, (a) => {
          let replacement = timeArr[i].toString()
          replacement = replacement.length > 1 ? replacement : '0' + replacement
          i++
          return replacement
        })
        el.rateTime = str
      })
      commit({
        type: 'INIT_COMMENTS',
        commentsArr: commentsArr
      })
    },
    init_filter ({ commit, state, dispatch }) {
      if (state.HAS_CONTENT === true) dispatch('toggle_has_content')
      dispatch('commit_ratetype', -1)
    }
  }
}
