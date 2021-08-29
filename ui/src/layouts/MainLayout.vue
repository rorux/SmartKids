<template>
  <div class="app-main-layout">
    <Loader v-if="loading" />
    <Navbar @toggleMenu="isOpen = !isOpen" />
    <Sidebar v-model="isOpen" />
    <router-view v-model="isOpen" />
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import messages from "@/utils/messages";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "main-layout",
  data: () => ({
    isOpen: false,
    loading: true,
  }),
  async mounted() {
    await this.fetchInfo();
    this.loading = false;
    const screenWidth = window.screen.width;
    if (screenWidth > 800) this.isOpen = true;
  },
  components: {
    Navbar,
    Sidebar,
  },
  methods: {
    ...mapActions(["fetchInfo"]),
  },
  computed: {
    ...mapGetters(["getInfo", "error"]),
  },
  watch: {
    error(error) {
      this.$error(messages[error] || "Что-то пошло не так");
    },
  },
};
</script>