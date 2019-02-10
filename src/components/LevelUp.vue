<template>
  <div class="levelUp" v-if=" 0 < upWeekCount">
    <h1 class="levelUp__title">今週はレベルが{{upWeekCount}}上がりました！</h1>
    <div class="levelUp__circle">
      +{{upWeekCount}}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    upWeekCount() {
      return this.$store.getters.getWeekCount
    }
  },
  methods: {
    checkWeek() {
      this.$store.dispatch('checkWeek')
    }
  },
  created() {
    this.checkWeek()
  }
}
</script>


<style lang="scss" scoped>
.levelUp {
  padding: 0 10px 30px;

  &__title {
    margin-bottom: 10px;
    font-size: 20px;
    text-align: center;
  }

  &__circle {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    font-family: Arial Black;
    font-size: 42px;
    font-weight: bold;
    color: #049c6b;
    text-align: center;
    line-height: 96px;
    background-color: #ffffff;
    border: 2px solid #049c6b;
    border-radius: 100px;
  }

}
</style>
