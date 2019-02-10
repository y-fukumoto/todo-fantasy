<template>
  <div class="add">
    <form @submit.prevent="submit">
      <input ref="input" @blur="submit" v-model="text" type="text" placeholder="次にやりたいことを入れよう！" class="add__input">
    </form>
  </div>
</template>

<script>
export default {
  name: 'add',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    submit() {
      this.text = this.text.trim()
      if (this.text == '') {
        return false
      } else {
        this.$store.dispatch('addTask', this.text)
        this.text = ''
        this.$store.dispatch('hideInput')
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.add__input {
  display: block;
  width: 100%;
  height: 62px;
  padding-left: 25px;
  font-size: 16px;
  border: 4px solid #000000;
}
</style>
