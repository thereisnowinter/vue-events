
const state = {
  notes: [],
  timestamps: []
}
const mutations = {
  ADD_NOTE (state, payload) {
    let newNote = payload
    state.notes.push(newNote)
  },
  ADD_TIMESTAMP (state, payload) {
    let newTimeStamp = payload
    state.timestamps.push(newTimeStamp)
  }
}

const actions = {
  addNote (context, payload) {
    context.commit('ADD_NOTE', payload)
  },
  addTimestamp (context, payload) {
    context.commit('ADD_TIMESTAMP', payload)
  }
}

const getters = {
  getNotes (state) {
    return state.notes
  },
  getTimestamps (state) {
    return state.timestamps
  },
  getNoteCount (state) {
    return state.notes.length
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
const inputComponent = {
  template: `<input 
  :placeholder="placeholder"
  v-model="input"
  @keyup.enter="monitorEnterKey"
  class="input is-small" type="text" />`,
  props: ['placeholder'],
  data() {
    return {
      input: ''
    }
  },
  methods: {
    monitorEnterKey() {
      this.$store.dispatch('addNote', this.input)
      this.$store.dispatch('addTimestamp', new Date().toLocaleString())  
      this.input = ''
    }
  }
}

const noteCountComponent = {
  template: `<div class="note-count">Note count: <strong>{{ noteCount }}</strong></div>`,
  computed: {
    noteCount() {
      return this.$store.getters.getNoteCount
    }
  }
}

new Vue({
  el: '#app',
  data: {
    placeholder: 'Enter your note'
  },
  store,
  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent
  },
  computed: {
    notes() {
      return this.$store.getters.getNotes
    },
    timestamps() {
      return this.$store.getters.getTimestamps
    }
  }
})