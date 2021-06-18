<template>
  <div>
    <h4 class="center grey-text text-darken-3">Уровень {{ levelRender }}</h4>
    <p class="center grey-text text-darken-1" style="font-size: 1.2rem">
      {{ describeTextRender }}{{ levelRestRender }}.
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    const describeText = [
      "На начальном уровне предалагаются простые задания на написание слов. Для перехода на следующий уровень необходимо решить правильно 5 заданий подряд. Для достижения уровня 1 осталось решить заданий: ",
      "На начальном уровне предалагаются простые задания на написание слов. Для перехода на следующий уровень необходимо решить правильно 10 заданий подряд. Для достижения уровня 1 осталось решить заданий: ",
      "На 2-м уровне предалагаются детские загадки. Для перехода на следующий уровень необходимо отгадать правильно 15 загадок подряд. Для достижения уровня 3 осталось решить заданий: ",
      "На 3-м уровне предалагаются задания с картинками на написание слов. Для перехода на следующий уровень необходимо решить правильно 15 заданий подряд. Для достижения уровня 4 осталось решить заданий: ",
      "На данном уровне предалагаются различные задания на написание слов. Для перехода на следующий уровень необходимо решить правильно 15 заданий подряд. Для достижения следующего уровня осталось решить заданий: ",
    ];
    const levelRender = 0;
    const levelRestRender = 0;
    return {
      describeText,
      levelRender,
      levelRestRender,
    };
  },
  computed: {
    describeTextRender() {
      return this.levelRender < 4
        ? this.describeText[this.levelRender]
        : this.describeText[4];
    },
    ...mapGetters(["getInfo"]),
  },
  mounted() {
    this.levelRender = this.getInfo.subjectsRest
      ? this.getInfo.subjectsRest.rus.level
      : 0;
    this.levelRestRender = this.getInfo.subjectsRest
      ? this.getInfo.subjectsRest.rus.levelRest
      : 5;
  },
};
</script>

<style>
</style>