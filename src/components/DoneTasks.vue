<template>
  <div class="done">
    <section class="done__body" v-for="(data, index) in obj" :key="index">
      <p class="done__date">{{formatDate(data.date)}}</p>
      <div class="done__task task" v-for="(task, index) in data.tasks" :key="index">
        <div class="task__body" @click="toggleControl(task.id)">
          <p class="task__main"><img src="../assets/icon/done.svg" class="task__status"><span class="task__text">{{task.text}}</span></p>
          <div class="task__color">
            <div class="circle" :class="'circle--' + task.color"></div>
          </div>
        </div>
        <div class="task__editor" v-if="showControl === task.id">
          <div class="task__control" @click="restoreTask(task.id)">
            <img src="../assets/icon/restore.svg" class="task__restore">
            <span class="task__action">戻す</span>
          </div>
          <div class="task__control" @click="deleteTask(task.id)">
            <img src="../assets/icon/delete.svg" class="task__delete">
            <span class="task__action">削除する</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      selected: false,
      showControl: ''
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).isSame(moment(), 'd')) {
        return '今日'
      } else {
        return moment(date).format('YYYY年M月D日')
      }
    },
    restoreTask(id) {
      this.showControl = ''
      this.$store.dispatch('restoreTask', id)
    },
    deleteTask(id) {
      this.showControl = ''
      this.$store.dispatch('deleteTask', id)
    },
    toggleControl(id) {
      if (this.showControl !== '') {
        this.showControl = ''
      } else {
        this.showControl = id
      }
    }
  },
  computed: {
    obj() {
      const list = []
      for(let key in this.$store.getters.getDoneTasks) {
        list.push({date: key, tasks: this.$store.getters.getDoneTasks[key]})
      }
      return list.sort((a,b) => {
        return (a.date > b.date) ? -1 : 1;
      })
    }
  },

}
</script>


<style lang="scss" scoped>
.done {
  &__date {
    margin-bottom: 10px;
    font-weight: bold;
    line-height: 1;
  }

  &__body {
    margin-bottom: 22px;
  }

  &__task {
    border: 1px solid #000000;
  }
}

.task {
  &__status {
    display: inline-block;
    width: 26px;
    margin-right: 20px;
    vertical-align: middle;
  }

  &__main {
    display: flex;
    margin-right: 60px;
    padding: 16px 0 16px 20px;
    font-size: 14px;
    line-height: 1.2;
  }

  &__text {
    display: inline-block;
    margin-right: 0;
    padding: 0;
    vertical-align: middle;
  }

  &__restore {
    display: inline-block;
    margin-right: 4px;
    width: 22px;
    vertical-align: middle;
  }

  &__delete {
    display: inline-block;
    margin-right: 4px;
    width: 22px;
    vertical-align: middle;
  }
}

.circle {
  position: absolute;
  top: 50%;
  right: 25px;
  width: 10px;
  height: 10px;
  transform: translate(0, -5px);
  border: 1px solid #B8B8B8;
  border-radius: 10px;
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
