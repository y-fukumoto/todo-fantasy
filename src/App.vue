<template>
  <div id="app" class="app" :class="'app--' + bgClass">
    <Navigation/>
    <transition tag="div">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  },
  data() {
    return {
      bgClass: 1
    }
  },
  created() {
    this.bgClass = Math.floor( Math.random() * (4 + 1 - 1) ) + 1
  }
}
</script>


<style lang="scss">
@import 'assets/_reset';
</style>

<style lang="scss" scoped>
.app {
  height: 100vh;
  padding: 80px 10px 15px;
  font-family: Arial,Helvetica,sans-serif;
  overflow-y: hidden;
  background-image: url('assets/bg/1.png');
  background-repeat: none;
  background-size: cover;
  box-sizing: border-box;
  &--1 {
    background-image: url('assets/bg/1.png');
  }
  &--2 {
    background-image: url('assets/bg/2.png');
  }
  &--3 {
    background-image: url('assets/bg/3.png');
  }
  &--4 {
    background-image: url('assets/bg/4.png');
  }
}

.v-enter-active {
  transition: all .8s ease;
}
.v-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.v-enter, .v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
