<template>
  <div id="modal1" class="modal" ref="modal">
    <div class="modal-content" v-if="modelValue == 'correct'">
      <h3 class="center green-text text-accent-4">Молодец!</h3>
      <p class="center grey-text">Ответ правильный</p>
    </div>
    <div class="modal-content" v-else-if="modelValue == 'wrong'">
      <h3 class="center red-text text-accent-4">Ошибка!</h3>
      <p class="center grey-text">К сожалению, ответ не верный</p>
    </div>
    <div
      class="modal-content level-describe"
      v-else-if="modelValue == 'math' || modelValue == 'rus'"
    >
      <component :is="modelValue + '-describe'" />
    </div>
    <div class="modal-content baloons" v-else-if="+modelValue > 0">
      <h4 class="center green-text text-darken-2">Новое достижение!</h4>
      <h4 class="center blue-text text-darken-4">Уровень {{ modelValue }}</h4>
      <h4 class="center green-text text-darken-2">Поздравляем!</h4>
      <p class="center grey-text">Продолжай в том же духе!</p>
    </div>

    <div class="modal-content" v-else>
      <h3 class="center grey-text text-darken-4">Хмм...</h3>
      <p class="center grey-text">Что-то пошло не так...</p>
    </div>
  </div>
</template>

<script>
import Materialize from "materialize-css";
import store from "../store";
import MathDescribe from "@/components/MathDescribe";
import RusDescribe from "@/components/RusDescribe";

export default {
  props: ["modelValue"],
  emits: ["levelDescribeNull"],
  data() {
    const modalWindow = null;
    return {
      modalWindow,
    };
  },
  computed: {
    checkModal() {
      return this.modelValue;
    },
  },
  watch: {
    checkModal(value) {
      if (value) this.modalWindow.open();
    },
  },
  components: {
    MathDescribe,
    RusDescribe,
  },
  mounted() {
    this.modalWindow = Materialize.Modal.init(this.$refs.modal, {
      onCloseEnd: () => {
        if (+this.modelValue > 0) {
          store.commit("clearNewLevel");
        }
        if (this.modelValue == "math" || this.modelValue == "rus") {
          this.$emit("levelDescribeNull", null);
        }
      },
    });
  },
  beforeUnmount() {
    if (this.modalWindow && this.modalWindow.destroy) {
      this.modalWindow.destroy();
    }
  },
};
</script>

<style scoped>
.modal {
  max-width: 600px;
  top: 25% !important;
}
.baloons {
  background-image: url("/img/baloons2.gif");
}
.baloons h4,
.baloons h3 {
  text-shadow: 2px 2px 2px #999;
}
</style>