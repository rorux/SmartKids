<template>
  <div>
    <Loader v-if="loading" />
    <div class="col s12 m6 l6">
      <h6 class="stat-title">Статистика общая</h6>
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">
            <i class="material-icons">clear_all</i>
            Задания
            <span class="badge">{{ total.quantity }}</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header green-text">
            <i class="material-icons">check</i>
            Верно
            <span class="new badge green" data-badge-caption="">{{
              total.correct
            }}</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header red-text">
            <i class="material-icons">clear</i>
            Ошибки
            <span class="new badge red" data-badge-caption="">{{
              total.wrong
            }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="col s12 m6 l6">
      <h6 class="stat-title">Статистика за сегодня</h6>
      <ul class="collapsible">
        <li>
          <div class="collapsible-header">
            <i class="material-icons">clear_all</i>
            Задания
            <span class="badge">{{ today.quantity }}</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header green-text">
            <i class="material-icons">check</i>
            Верно
            <span class="new badge green" data-badge-caption="">{{
              today.correct
            }}</span>
          </div>
        </li>
        <li>
          <div class="collapsible-header red-text">
            <i class="material-icons">clear</i>
            Ошибки
            <span class="new badge red" data-badge-caption="">{{
              today.wrong
            }}</span>
          </div>
        </li>
      </ul>
    </div>
    <p>{{}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["modelValue"],
  data() {
    return {
      level: 0,
      total: {},
      today: {},
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["getInfo", "getStat"]),
  },
  methods: {
    ...mapActions(["fetchInfo", "getStatDb"]),
  },
  async mounted() {
    const statReq = {
      token: localStorage.getItem("token"),
      sub: this.$route.name,
    };
    await this.getStatDb(statReq);
    this.level = this.getStat.level;
    this.total = this.getStat.total;
    this.today = this.getStat.today;
    this.loading = false;
  },
};
</script>

<style scoped>
.stat-title {
  margin-bottom: 20px;
}
</style>