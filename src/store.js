import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const initialState = {
    tasks: [],
    adding: false,
    level: {
      number: 1,
      count: 0,
      weekNumber: 0,
      weekCount: 0,
    },
    setting: {
      levelCount: 5
    }
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    /**
     * todoの追加処理。
     * @param {Object} state 
     * @param {Text} text 
     */
    addTask(state, text) {
      const id = state.tasks.length !== 0 ? state.tasks[state.tasks.length -1].id + 1 : 0
      const task = {
        id,
        text,
        done: false,
        doneDate: '',
        color: 'normal'
      }
      state.tasks = [ ...state.tasks, task ]
    },
    /**
     * todoの編集処理。対象のtaskをdoneにしmapで新しく配列を作る。
     * @param {Object} state 
     * @param {Object} payload
     */
    editTask(state, payload) {
      state.tasks.map(task => {
        if(task.id == payload.id) {
          task.text = payload.text
        }
      })
    },
    /**
     * todoの完了処理。対象のtaskをdoneにしmapで新しく配列を作る。
     * @param {Object} state 
     * @param {Number} id 
     */
    doneTask(state, id) {
      state.tasks.map(task => {
        if(task.id == id) {
          task.done = true
          task.doneDate = moment().format('YYYYMMDD')
        }
      })
    },
    restoreTask(state, id) {
      state.tasks.map(task => {
        if(task.id == id) {
          task.done = false
          task.doneDate = ''
        }
      })
    },
    deleteTask(state, id) {
      for(let i = 0; i < state.tasks.length; i++) {
        if(state.tasks[i].id == id) {
          state.tasks.splice(i, 1)
          break
        }
      }
    },
    selectColor(state, payload) {
      state.tasks.map(task => {
        if(task.id == payload.id) {
          task.color = payload.color
        }
      })
    },
    countUpLevel(state) {
      state.level.count ++
      if(state.setting.levelCount <= state.level.count) {
        state.level.number++
        state.level.count = 0
        state.level.weekCount++
      }
    },
    countDownLevel(state) {
      state.level.count --
      if(state.level.count < 0) {
        state.level.number--
        state.level.count = state.setting.levelCount - 1
        state.level.weekCount--
      }
    },
    checkWeek(state) {
      const thisWeek = moment().week()
      if(state.level.weekNumber !== thisWeek) {
        state.level.weekNumber = thisWeek
        state.level.weekCount = 0
      }
    },
    updateLevelSetting(state, data) {
      state.setting.levelCount = parseInt(data)
    },
    showInput(state) {
      state.adding = true
    },
    hideInput(state) {
      state.adding = false
    },
  },
  actions: {
    addTask({commit}, text) {
      commit('addTask', text)
    },
    editTask({commit}, payload) {
      commit('editTask', payload)
    },
    doneTask({commit}, id) {
      commit('checkWeek')
      commit('doneTask', id)
      commit('countUpLevel')
    },
    restoreTask({commit}, id) {
      commit('restoreTask', id)
      commit('countDownLevel')
    },
    deleteTask({commit}, id) {
      commit('deleteTask', id)
    },
    selectColor({commit}, payload) {
      commit('selectColor', payload)
    },
    countUpLevel({commit}) {
      commit('countUpLevel')
    },
    countDownLevel({commit}) {
      commit('countDownLevel')
    },
    checkWeek({commit}) {
      commit('checkWeek')
    },
    updateLevelSetting({commit}, data) {
      commit('updateLevelSetting', data)
    },
    showInput({commit}) {
      commit('showInput')
    },
    hideInput({commit}) {
      commit('hideInput')
    }
  },
  getters: {
    getTasks: state => {
      return state.tasks.filter(task => {
        return task.done === false
      })
    },
    getDoneTasks: state => {
      const doneList = state.tasks.filter(task => {
        return task.done === true
      })
      // 完了日をkeyにしたobjectにして返す
      var doneTasks = {}
      for(let i = 0; i < doneList.length; i++) {
        const doneDate = doneList[i].doneDate
        if (doneDate in doneTasks) {
          doneTasks[doneList[i].doneDate].push(doneList[i])
        } else {
          doneTasks[doneList[i].doneDate] = [doneList[i]]
        }
      }
      return doneTasks
    },
    addStatus: state => {
      return state.adding
    },
    getLevel: state => {
      return state.level.number
    },
    getLevelCount: state => {
      return state.level.count
    },
    getSettingLevelCount: state => {
      return state.setting.levelCount
    },
    getWeekCount: state => {
      return state.level.weekCount
    },
    getLevelSetting: state => {
      return state.setting.levelCount
    }
  },
  plugins: [createPersistedState({key: 'todo-fantasy'})]
})
