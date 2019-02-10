<template>
  <nav class="nav">
    <ul class="nav__body">
      <li class="nav__list">
        <router-link to="/" class="nav__link" :class="list">
          <img src="../assets/icon/nav_list.svg" class="nav__icon">
          <span class="nav__text">これからの<br>TODO</span>
        </router-link>
      </li>
      <li class="nav__list">
        <router-link to="/done" class="nav__link" :class="done">
          <img src="../assets/icon/nav_done.svg" class="nav__icon">
          <span class="nav__text">完了した<br>TODO</span>
        </router-link>
      </li>
    </ul>
    <router-link to="/level" class="nav__level level" :class="{'levelUp': levelUp, 'levelDown': levelDown}">
      <div class="level__body">
        <span class="level__title">LV</span>
        <span class="level__number">{{levelNumber}}</span>
        <div class="level__bg" :style="{height: levelCount + 'px'}"></div>
      </div>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      levelUp: false,
      levelDown: false
    }
  },
  computed: {
    list() {
      return this.$route.name === 'home' ?
        'nav__link--active' :
        ''
    },
    done() {
      return this.$route.name === 'done' ?
        'nav__link--active' :
        ''
    },
    levelNumber() {
      return this.$store.getters.getLevel
    },
    levelCount() {
      const count = this.$store.getters.getLevelCount
      const levelSetting = this.$store.getters.getSettingLevelCount
      const calc = count / levelSetting * 47
      return calc
    },
  },
  mounted() {
    const unwatch = this.$store.watch(
      state => state.level.number,
      (newValue, oldValue) => {
        this.levelUp = false
        this.levelDown = false
        if(oldValue < newValue) {
          this.levelUp = true
          setTimeout(() => {this.levelUp = false}, 1000)
        } else {
          this.levelDown = true
          setTimeout(() => {this.levelDown = false}, 1000)
        }
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 10px 0;
  z-index: 2;
  &:before {
    position: absolute;
    content: '';
    top: -5px;
    right: -5px;
    bottom: -5px;
    left: -5px;
    z-index: -1;
    filter: blur(5px);
  }

  &__body {
    display: flex;
    width: 290px;
  }

  &__list {
    width: 100%;
  }

  &__link {
    display: block;
    width: 100%;
    padding: 8px 0 8px 16px;
    font-family: kozuka-gothic-pr6n, sans-serif;
    font-weight: 700;
    color: #000000;
    text-decoration: none;
    &--active {
      background-color: rgba(255,255,255,.3);
    }
  }
  
  &__icon {
    display: inline-block;
    margin-right: 4px;
    vertical-align: middle;
  }

  &__text {
    display: inline-block;
    vertical-align: middle;
  }

}

.level {
  position: absolute;
  top: 15px;
  right: 10px;
  width: 47px;
  height: 47px;
  background-color: #ffffff;
  text-align: center;
  text-shadow: 1px 1px 0 #ffffff, -1px 1px 0 #ffffff, 1px -1px 0 #ffffff, -1px -1px 0 #ffffff;
  line-height: 43px;
  font-family: Arial Black, sans-serif;
  font-weight: bold;
  overflow: hidden;
  border: 2px solid #049C6B;
  border-radius: 47px;

  &__body {
    position: relative;
  }

  &__title {
    position: relative;
    color: #049C6B;
    font-size: 10px;
    z-index: 2;
  }

  &__number {
    position: relative;
    color: #049C6B;
    font-size: 16px;
    z-index: 2;
  }

  &__bg {
    position: absolute;
    width: 100%;
    height: 0;
    left: 0;
    bottom: 0;
    background-color: #D5FDF0;
    transition: all .6s ease-out;
  }
}

.levelUp {
  animation: bound .6s ease-in-out;
}

@keyframes squash {
  0% {transform: scale(1) translate(0, 0);}
  50% {transform: scale(1.5, 1) translate(0, -10px);}
  100% {transform: scale(1) translate(0, 0);}
}

@keyframes bound {
  0% {transform: translate(0, 0);}
  25% {transform:  translate(0, -5px);}
  50% {transform: translate(0, 0px);}
  75% {transform: translate(0, -5px);}
  100% {transform: translate(0, 0);}
}

@media screen and (max-width:320px) {
  .nav {
    &__body {
      width: 240px;
    }
    &__link {
      font-size: 12px;
    }
  }
}
</style>