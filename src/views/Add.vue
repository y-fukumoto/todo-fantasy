<template>
  <div class="add">
    <form @submit.prevent="submit">
      <input ref="aaa" type="text" placeholder="次にやりたいことを入れよう！" class="add__input">
    </form>
  </div>
</template>

<script>
export default {
  name: 'add',
  methods: {
    submit() {
      this.$router.push(`/`)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.aaa.focus()
    })
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
