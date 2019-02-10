<template>
  <div class="done">
    <DoneTasks/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import DoneTasks from '@/components/DoneTasks.vue'

export default {
  name: 'done',
  components: {
    Navigation,
    DoneTasks
  }
}
</script>

<style lang="scss" scoped>
.done {
  height: 100%;
  overflow-y: scroll;
}
</style>
