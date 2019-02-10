<template>
  <div class="tasks">
    <transition-group tag="div" name="list">
      <div class="task" v-for="task in tasks" :key="task.id" :id="'task-' + task.id">
        <div class="task__body">
          <p class="task__text" @click="toggleControl(task.id)">{{task.text}}</p>
          <form @submit.prevent="editTask(task.id, task.text)">
            <input type="text" @blur="editTask(task.id, task.text)" class="task__input" v-model="task.text">
          </form>
          <div class="task__color" @click="toggleColors(task.id)">
            <div class="circle" :class="'circle--' + task.color"></div>
          </div>
        </div>
        <div class="task__editor" v-if="showControl === task.id">
          <div class="task__control" @click="changeEditStatus(task.id)">
            <img src="../assets/icon/edit.svg" class="task__edit">
            <span class="task__action">編集する</span>
          </div>
          <div class="task__control" @click="doneTask(task.id)">
            <img src="../assets/icon/done.png" class="task__done">
            <span class="task__action">完了にする</span>
          </div>
        </div>
        <div class="colors" v-if="showColors === task.id">
          <div class="colors__item colors__item--orange" @click="selectColor(task.id, 'orange')"></div>
          <div class="colors__item colors__item--yellow" @click="selectColor(task.id, 'yellow')"></div>
          <div class="colors__item colors__item--green" @click="selectColor(task.id, 'green')"></div>
          <div class="colors__item colors__item--blue" @click="selectColor(task.id, 'blue')"></div>
          <div class="colors__item colors__item--red" @click="selectColor(task.id, 'red')"></div>
          <div class="colors__item colors__item--normal" @click="selectColor(task.id, 'normal')"></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: false,
      showControl: '',
      showColors: ''
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasks
    }
  },
  methods: {
    doneTask(id) {
      this.$store.dispatch('doneTask', id)
    },
    changeEditStatus(id) {
      // iosでクリック時にinputにfocusできない問題があるため、DOMにアクセス
      this.showControl = ''
      const targetTask = document.querySelector(`#task-${id}`)
      targetTask.querySelector('.task__text').style.display = 'none'
      targetTask.querySelector('.task__input').style.display = 'block'
      targetTask.querySelector('.task__input').focus()
    },
    editTask(id, text) {
      const targetTask = document.querySelector(`#task-${id}`)
      targetTask.querySelector('.task__input').style.display = 'none'
      targetTask.querySelector('.task__text').style.display = 'block'
      targetTask.querySelector('.task__input').blur()
      this.$store.dispatch('editTask', {id, text})
    },
    toggleControl(id) {
      this.showColors = ''
      if (this.showControl !== '' && this.showControl == id) {
        this.showControl = ''
      } else {
        this.showControl = id
      }
    },
    toggleColors(id) {
      this.showControl = ''
      if (this.showColors !== '' && this.showColors == id) {
        this.showColors = ''
      } else {
        this.showColors = id
      }
    },
    selectColor(id, color) {
      this.showColors = ''
      this.$store.dispatch('selectColor', {id, color})
    }
  }
}
</script>

<style lang="scss">
.task {
  margin-bottom: 8px;
  border: 2px solid #000000;
  border-radius: 4px;

  &__body {
    position: relative;
    background-color: rgba(255,255,255,.85);
    border-radius: 2px 2px 0 0;
  }

  &__text {
    margin-right: 60px;
    padding: 20px 0 20px 20px;
    font-size: 14px;
  }

  &__input {
    display: none;
    margin-right: 60px;
    padding: 20px;
    font-size: 16px;
    border: none;
    background-color: transparent;
  }

  &__color {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    color: rgba(255,255,255,.85);
  }
  
  &__editor {
    display: flex;
    width: 100%;
    background-color: rgba(216, 216, 216, 0.85);
    border-radius: 0 0 2px 2px;
  }

  &__control {
    width: 100%;
    align-items: 1;
    line-height: 47px;
    text-align: center;
    font-size: 14px;
    &:first-child {
      border-right: 1px solid #a1a1a1;
    }
  }

  &__edit {
    display: inline-block;
    margin-right: 7px;
    width: 16px;
    height: 16px;;
    vertical-align: middle;
  }

  &__done {
    display: inline-block;
    margin-right: 4px;
    width: 19px;
    height: 14px;;
    vertical-align: middle;
  }

  &__action {
    display: inline-block;
    vertical-align: middle;
  }

}

.circle {
  position: absolute;
  top: 50%;
  right: 24px;
  width: 12px;
  height: 12px;
  transform: translate(0, -6px);
  border: 1px solid #B8B8B8;
  border-radius: 12px;
  background-color: rgb(255,255,255);
  transition: all .4s;

  &--red {
    background-color: rgb(222, 76, 74);
    border: 1px solid #eeeeee;
  }
  &--blue {
    background-color: #12ddf3;
    border: 1px solid #eeeeee;
  }
  &--green {
    background-color: #4ade95;
    border: 1px solid #eeeeee;
  }
  &--orange {
    background-color: #f38612;
    border: 1px solid #eeeeee;
  }
  &--yellow {
    background-color: #fadc37;
    border: 1px solid #eeeeee;
  }
}
</style>

<style lang="scss" scoped>
.colors {
  display: flex;
  width: 100%;
  background-color: rgba(255,255,255,.5);
  &__item {
    position: relative;
    height: 50px;
    line-height: 50px;
    text-align: center;
    flex-grow: 1;
    &:after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 1px solid #B8B8B8;
      border-radius: 10px;
    }
    &--normal {
      &:after {
        background-color: #fff;
        border: 1px solid #eeeeee;
      }
    }
    &--red {
      &:after {
        background-color: rgb(222, 76, 74);
        border: 1px solid #eeeeee;
      }
    }
    &--blue {
      &:after {
        background-color: #12ddf3;
        border: 1px solid #eeeeee;
      }
    }
    &--green {
      &:after {
        background-color: #4ade95;
        border: 1px solid #eeeeee;
      }
    }
    &--orange {
      &:after {
        background-color: #f38612;
        border: 1px solid #eeeeee;
      }
    }
    &--yellow {
      &:after {
        background-color: #fadc37;
        border: 1px solid #eeeeee;
      }
    }
  }
}

.list-enter-active {
  transition: all .6s ease;
}
.list-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.list-enter {
  transform: translateY(10px);
}
.list-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
