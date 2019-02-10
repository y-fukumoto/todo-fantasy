<template>
  <div class="level">
    <LevelUp/>
    <Setting/>
  </div>
</template>

<script>
// @ is an alias to /src
import LevelUp from '@/components/LevelUp.vue'
import Setting from '@/components/Setting.vue'

export default {
  name: 'level',
  components: {
    LevelUp,
    Setting
  },
}
</script>

<style lang="scss" scoped>
.level {
  padding-top: 12px;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
