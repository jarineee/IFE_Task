export default {
  namespaced: true,
  state: {
    ORDER: [
      {name: '皮蛋瘦肉粥', price: 10, amount: 1},
      {name: '红豆薏米美肤粥', price: 12, amount: 3},
      {name: '田园蔬菜粥', price: 10, amount: 1}
    ],
    BALLSHELL: [
      { show: false },
      { show: false },
      { show: false },
      { show: false },
      { show: false }
    ],
    BALLQUEUE: []
  },
  getters: {
    ORDER_AMOUNT (state) {
      if (state.ORDER.length === 0) return false

      let amount = 0
      state.ORDER.forEach(el => {
        amount += el.amount
      })
      return amount
    },
    PRICE_TOTAL (state) {
      if (state.ORDER.length === 0) return 0

      let total = 0
      state.ORDER.forEach(el => {
        total += el.amount * el.price
      })
      return total
    }
  },
  mutations: {
    PLUS_AMOUNT ({ ORDER }, { index }) {
      ORDER[index].amount ++
    },
    MINUS_AMOUNT ({ ORDER }, { index }) {
      ORDER[index].amount --
    },
    ZERO_AMOUNT ({ ORDER }, { index }) {
      ORDER.splice(index, 1)
    },
    EMPTY_ORDER ({ ORDER }) {
      ORDER.splice(0, ORDER.length)
    },
    ADD_ORDER ({ ORDER }, { item }) {
      ORDER.push(item)
    },
    LAUNCH (state, { target }) {
      state.BALLSHELL.some(el => {
        if (!el.show) {
          el.show = true
          el.target = target
          state.BALLQUEUE.push(el)
          return true
        }
        return false
      })
    },
    SHIFT_BALLQUEUE ({ BALLQUEUE }) {
      let ballCurrent = BALLQUEUE.shift()
      ballCurrent.show = false
    }
  },
  actions: {
    plus_Amount ({ commit }, index) {
      commit({
        type: 'PLUS_AMOUNT',
        index: index
      })
    },
    minus_Amount ({ commit, state }, index) {
      if (state.ORDER[index].amount > 1) {
        commit({
          type: 'MINUS_AMOUNT',
          index: index
        })
      } else {
        commit({
          type: 'ZERO_AMOUNT',
          index: index
        })
      }
    },
    empty_Order ({ commit }) {
      commit('EMPTY_ORDER')
    },
    add_Order ({ commit }, itemObject) {
      commit({
        type: 'ADD_ORDER',
        item: itemObject
      })
    },
    commit_Launch ({ commit }, target) {
      commit({
        type: 'LAUNCH',
        target: target
      })
    },
    shift_BallQueue ({ commit }) {
      commit('SHIFT_BALLQUEUE')
    }
  }
}
