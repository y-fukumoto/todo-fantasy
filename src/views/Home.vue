<template>
  <div class="home">
    <Tasks/>
    <transition tag="div" name="add">
      <Add v-if="adding"/>
    </transition>
    <div class="button" v-if="!adding" @click="showInput">
      <img src="../assets/icon/plus.svg" alt="TODOを追加" class="button__plus">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Add from '@/components/Add.vue'
import Tasks from '@/components/Tasks.vue'

export default {
  name: 'home',
  components: {
    Add,
    Tasks
  },
  computed: {
    adding() {
      return this.$store.getters.addStatus
    }
  },
  methods: {
    showInput() {
      this.$store.dispatch('showInput')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow-y: scroll;
}

.button {
  position: absolute;
  bottom: 20px;
  right: 10px;
  width: 62px;
  height: 62px;
  padding: 17px;
  border-radius: 62px;
  background-color: #ffffff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5);
  z-index: 2;
  &__plus {

  }
}

.add-enter-active {
  transition: all .4s ease-in;
}
.add-enter {
  transform: translateX(-10px);
}
</style>
