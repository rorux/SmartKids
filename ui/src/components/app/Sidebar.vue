<template>
  <ul class="sidenav app-sidenav" :class="{ open: modelValue }">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      :exact="link.exact"
      v-slot="{ isActive }"
    >
      <li :class="{ active: isActive }">
        <a href="#">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ["modelValue"],
  data: () => ({
    links: [
      { title: "Статистика", url: "/", exact: true },
      { title: "Математика", url: "/math" },
      { title: "Русский язык", url: "/rus" },
    ],
  }),
};
</script>



