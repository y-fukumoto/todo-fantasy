<template>
  <div class="setting">
    <h2 class="setting__title">レベル設定</h2>
    <form @submit.prevent="submit">
      <div class="setting__content">
        <p class="setting__text">1レベルアップするTODOの数</p>
        <input type="tel" ref="input" @focus="select()" class="setting__level" maxlength="3" :value="levelSetting">
      </div>
      <button class="setting__button">設定を保存する</button>
    </form>
    <transition tag="div">
      <div v-if="showMessage" class="setting__message">レベル設定を{{levelSetting}}に変更しました</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMessage: false,
      messageTimer: ''
    }
  },
  computed: {
    levelSetting() {
      return this.$store.getters.getLevelSetting
    }
  },
  methods: {
    select() {
      this.$refs.input.select()
    },
    submit() {
      // 1以下、1000以上は入力不可
      if(this.$refs.input.value < 1 || 1000 <= this.$refs.input.value) return
      this.$store.dispatch('updateLevelSetting',this.$refs.input.value)
      // メッセージを表示
      this.showMessage = true
      if(this.messageTimer) clearTimeout(this.messageTimer)
      this.messageTimer = setTimeout(() => {
        this.showMessage = false
      }, 3000)
    }
  }
}
</script>


<style lang="scss" scoped>
.setting {
  padding: 0 10px 20px;

  &__title {
    margin-bottom: 10px;
  }

  &__content {
    overflow: hidden;
    margin-bottom: 16px;
  }

  &__text {
    float: left;
    font-size: 14px;
    line-height: 45px;
  }

  &__level {
    float: right;
    display: inline-block;
    width: 50px;
    height: 45px;
    padding: 10px 0;
    font-size: 20px;
    text-align: center;
    border: 1px solid #979797;
  }

  &__button {
    width: 100%;
    line-height: 50px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    background-color: #ffffff;
    border: 0;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.5);
  }

  &__message {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-left: 10px;
    color: #ffffff;
    line-height: 40px;
    background-color: rgba(4,156,107,.9);
  }
}

.v-enter-active {
  transition: all .4s ease;
}
.v-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.v-enter, .v-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
