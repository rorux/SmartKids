<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click="$emit('toggleMenu')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text" style="line-height: 20px">{{
          dateConverted
        }}</span>
      </div>

      <ul class="right">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            <span class="welcome">Привет, {{ getInfo.username }}!</span>
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <!-- <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li> -->
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="userLogout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
import Materialize from "materialize-css";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
  }),
  methods: {
    async userLogout() {
      await this.logout();
      this.$router.push("/login?message=logout");
    },
    ...mapActions(["logout"]),
  },
  computed: {
    dateConverted() {
      const options = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
      };
      return new Intl.DateTimeFormat("ru-RU", options).format(
        new Date(this.date)
      );
    },
    ...mapGetters(["getInfo"]),
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    this.dropdown = Materialize.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style>
@media (max-width: 767px) {
  .welcome {
    display: none;
  }
}
</style>
